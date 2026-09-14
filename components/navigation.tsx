"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, ChevronDown, Menu } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface NavigationProps {
  currentPath?: string
}

interface NavLink {
  href: string
  label: string
}

// Static data — defined once, not recreated on every render.
const PROJECTS_LINKS: NavLink[] = [
  { href: "/projects", label: "All" },
  { href: "/projects/films", label: "Films" },
  { href: "/projects/installation", label: "Installation" },
  { href: "/projects/in-studio", label: "In Studio" },
  { href: "/projects/commissions", label: "Commissioned" },
  { href: "/projects/archive", label: "Archive" },
]

const NAV_LINKS_AFTER_PROJECTS: NavLink[] = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
]

export function Navigation({ currentPath }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProjectsOpen, setIsProjectsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { state, dispatch } = useCart()
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close the Projects dropdown on outside click and on Escape.
  useEffect(() => {
    if (!isProjectsOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (projectsRef.current && !projectsRef.current.contains(event.target as Node)) {
        setIsProjectsOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsProjectsOpen(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isProjectsOpen])

  const closeAllMenus = useCallback(() => {
    window.scrollTo(0, 0)
    setIsMobileMenuOpen(false)
    setIsProjectsOpen(false)
  }, [])

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md" : ""
      }`}
    >
      {/* Mobile top bar */}
      <div className="w-full flex justify-between items-center md:hidden py-2 px-4 sm:px-8">
        <Link href="/" className="hover:opacity-70 transition-opacity flex-shrink-0" onClick={closeAllMenus}>
          <Image
            src="/images/logo.webp"
            alt="Rediet Haddis"
            width={400}
            height={200}
            className="h-12 sm:h-14 md:h-16 w-auto"
            priority
            quality={85}
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-stretch h-28 overflow-visible border-b border-border bg-background/95 backdrop-blur-sm">
        {/* Logo — left-aligned, own space, not squeezed into an equal column */}
        <Link
          href="/"
          className="relative flex items-center justify-start pl-8 pr-10 hover:bg-muted/50 transition-colors after:absolute after:right-0 after:top-1/2 after:h-10 after:w-px after:-translate-y-1/2 after:bg-border"
          onClick={() => window.scrollTo(0, 0)}
          aria-label="Rediet Haddis home"
          aria-current={currentPath === "/" ? "page" : undefined}
        >
          <Image
            src="/images/logo.webp"
            alt="Rediet Haddis"
            width={400}
            height={200}
            className="h-16 lg:h-20 w-auto"
            priority
            quality={85}
          />
        </Link>

        {/* Nav links — equal, proportional width among themselves */}
        <div className="flex flex-1">
          <div
            ref={projectsRef}
            className="relative flex flex-1 items-center justify-center after:absolute after:right-0 after:top-1/2 after:h-10 after:w-px after:-translate-y-1/2 after:bg-border"
            onMouseEnter={() => setIsProjectsOpen(true)}
            onMouseLeave={() => setIsProjectsOpen(false)}
          >
            <button
              type="button"
              className={`flex h-full w-full items-center justify-center gap-2 px-4 font-times text-xl lg:text-2xl ${
                currentPath?.startsWith("/projects")
                  ? "text-foreground font-medium"
                  : "text-black hover:text-gray-500"
              } transition-colors`}
              aria-haspopup="menu"
              aria-expanded={isProjectsOpen}
              aria-current={currentPath?.startsWith("/projects") ? "page" : undefined}
              onClick={() => setIsProjectsOpen((prev) => !prev)}
            >
              <span>Projects</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${isProjectsOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            <div
              role="menu"
              aria-label="Projects"
              className={`absolute top-full left-1/2 z-10 w-56 -translate-x-1/2 pt-2 transition-all duration-200 ${
                isProjectsOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="border border-border bg-background shadow-lg py-2">
                {PROJECTS_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    aria-current={currentPath === link.href ? "page" : undefined}
                    className={`block px-4 py-2 text-base font-times ${
                      currentPath === link.href
                        ? "text-foreground bg-muted"
                        : "text-black hover:text-gray-500 hover:bg-muted/50"
                    } transition-colors`}
                    onClick={closeAllMenus}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {NAV_LINKS_AFTER_PROJECTS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={currentPath === link.href ? "page" : undefined}
              className={`relative flex flex-1 items-center justify-center px-4 font-times text-xl lg:text-2xl ${
                currentPath === link.href
                  ? "text-foreground font-medium"
                  : "text-black hover:text-gray-500 hover:bg-muted/50"
              } transition-colors after:absolute after:right-0 after:top-1/2 after:h-10 after:w-px after:-translate-y-1/2 after:bg-border`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart — fixed, compact width at the far right */}
        <button
          type="button"
          onClick={() => dispatch({ type: "TOGGLE_CART" })}
          className="relative flex w-24 items-center justify-center text-black hover:text-gray-500 transition-colors"
          aria-label={`Open shopping cart${cartItemCount > 0 ? ` (${cartItemCount} items)` : ""}`}
        >
          <ShoppingCart className="h-6 w-6" aria-hidden="true" />
          {cartItemCount > 0 && (
            <span className="absolute top-4 right-6 text-xs rounded-full w-5 h-5 flex items-center justify-center font-times bg-foreground text-background">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Navigation (Hamburger Menu) */}
      <div className="flex md:hidden items-center space-x-3 sm:space-x-4">
        <button
          type="button"
          onClick={() => dispatch({ type: "TOGGLE_CART" })}
          className="relative p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          aria-label={`Open shopping cart${cartItemCount > 0 ? ` (${cartItemCount} items)` : ""}`}
        >
          <ShoppingCart className="h-5 w-5" aria-hidden="true" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center font-times bg-foreground text-background">
              {cartItemCount}
            </span>
          )}
        </button>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background text-foreground w-64 sm:w-72 flex flex-col overflow-y-auto">
            <div className="flex flex-col gap-4 py-6">
              {currentPath !== "/" && (
                <Link
                  href="/"
                  className="font-times text-lg text-muted-foreground hover:text-foreground transition-colors"
                  onClick={closeAllMenus}
                >
                  Home
                </Link>
              )}

              {/* Projects Accordion (Mobile) */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="projects">
                  <AccordionTrigger
                    className={`font-times text-lg ${
                      currentPath?.startsWith("/projects")
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    } transition-colors py-0`}
                  >
                    Projects
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2 pl-4 pt-2">
                    {PROJECTS_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        aria-current={currentPath === link.href ? "page" : undefined}
                        className={`font-times text-base ${
                          currentPath === link.href
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        } transition-colors`}
                        onClick={closeAllMenus}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {NAV_LINKS_AFTER_PROJECTS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={currentPath === link.href ? "page" : undefined}
                  className={`font-times text-lg ${
                    currentPath === link.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  } transition-colors`}
                  onClick={closeAllMenus}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}