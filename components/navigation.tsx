"use client"

import { useState, useEffect } from "react"
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

export function Navigation({ currentPath }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProjectsOpen, setIsProjectsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { state, dispatch } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  const projectsLinks = [
    { href: "/projects", label: "All" },
    { href: "/projects/films", label: "Films" },
    { href: "/projects/installation", label: "Installation" },
    { href: "/projects/in-studio", label: "In Studio" },
    { href: "/projects/commissions", label: "Commissioned" },
    { href: "/projects/archive", label: "Archive" },
  ]

  const navLinksAfterProjects = [
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
  ]

  const allNavLinks =
    currentPath !== "/" ? [{ href: "/", label: "Home" }, ...navLinksAfterProjects] : navLinksAfterProjects

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 flex justify-between items-center py-2 sm:py-3 md:py-0">
        <Link
          href="/"
          className="hover:opacity-70 transition-opacity flex-shrink-0"
          onClick={() => {
            window.scrollTo(0, 0)
            setIsMobileMenuOpen(false)
          }}
        >
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {currentPath !== "/" && (
            <Link
              href="/"
              className={`font-times text-muted-foreground hover:text-foreground transition-colors`}
              onClick={() => window.scrollTo(0, 0)}
            >
              Home
            </Link>
          )}

          {/* Projects Dropdown (Desktop) */}
          <div
            className="relative"
            onMouseEnter={() => setIsProjectsOpen(true)}
            onMouseLeave={() => setIsProjectsOpen(false)}
          >
            <button
              className={`flex items-center space-x-1 font-times ${
                currentPath?.startsWith("/projects")
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              } transition-colors`}
            >
              <span>Projects</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isProjectsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                isProjectsOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="w-48 bg-background border border-border rounded-sm shadow-lg py-2">
                {projectsLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-2 text-sm font-times ${
                      currentPath === link.href
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    } transition-colors`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinksAfterProjects.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-times ${
                currentPath === link.href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              } transition-colors`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {link.label}
            </Link>
          ))}

          {/* Cart (Desktop) */}
          <button
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
            className="relative p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center font-times bg-foreground text-background">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Navigation (Hamburger Menu) */}
        <div className="flex md:hidden items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
            className="relative p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
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
            <SheetContent side="right" className="bg-background text-foreground w-64 sm:w-72 flex flex-col">
              <div className="flex flex-col gap-4 py-6">
                {currentPath !== "/" && (
                  <Link
                    href="/"
                    className={`font-times text-lg text-muted-foreground hover:text-foreground transition-colors`}
                    onClick={() => {
                      window.scrollTo(0, 0)
                      setIsMobileMenuOpen(false)
                    }}
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
                      {projectsLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`font-times text-base ${
                            currentPath === link.href
                              ? "text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          } transition-colors`}
                          onClick={() => {
                            window.scrollTo(0, 0)
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {navLinksAfterProjects.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-times text-lg ${
                      currentPath === link.href
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    } transition-colors`}
                    onClick={() => {
                      window.scrollTo(0, 0)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
