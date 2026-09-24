"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { useProjectModals } from "@/hooks/use-project-modals"

interface DropdownLink {
  label: string
  href?: string
  onClick?: () => void
  disabled?: boolean
}

function TreeCard({
  title,
  items,
  delay,
  onHeaderClick,
}: {
  title: string
  items: DropdownLink[]
  delay: number
  onHeaderClick?: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border border-border bg-background hover:bg-muted/30 transition-colors duration-500"
    >
      <div
        className={`flex items-center justify-center py-8 md:py-12 relative overflow-hidden ${onHeaderClick ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""}`}
        onClick={onHeaderClick}
      >
        <span className="font-stardom text-2xl lg:text-3xl text-foreground tracking-wide pointer-events-none">{title}</span>
      </div>

      <div className="border-t border-border px-8 py-6">
        <ul className="flex flex-col space-y-3">
          {items.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: delay + 0.2 + i * 0.1 }}
            >
              {item.disabled ? (
                <span className="flex items-center justify-between py-1 text-sm sm:text-base font-times italic text-muted-foreground/50 cursor-not-allowed">
                  <span>{item.label}</span>
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="group/link w-full flex items-center justify-between py-1 text-sm sm:text-base font-times italic text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 translate-y-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 group-hover/link:translate-y-0 transition-all duration-300" />
                </button>
              ) : (
                <Link
                  href={item.href!}
                  className="group/link flex items-center justify-between py-1 text-sm sm:text-base font-times italic text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 translate-y-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 group-hover/link:translate-y-0 transition-all duration-300" />
                </Link>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

function FamilyTreeSection({
  openProjectById,
  openSkinsDireDawa,
}: {
  openProjectById: (id: string) => void
  openSkinsDireDawa: () => void
}) {
  const skinsLinks: DropdownLink[] = [
    { label: "sKINS Dire Dawa", onClick: openSkinsDireDawa },
    { label: "sKINS Addis Abeba", onClick: () => openProjectById("skins-addis-abeba") },
    { label: "sKINS North", disabled: true },
    { label: "Upcoming", disabled: true },
  ]

  const tradLinks: DropdownLink[] = [
    { label: "Sheret", onClick: () => openProjectById("sheret-project") },
    { label: "Cargo", href: "/shop/2" },
    { label: "Gela", onClick: () => openProjectById("skins-north-ethiopia") },
  ]

  return (
    <section aria-label="Project Structure" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-24">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <motion.button
          type="button"
          onClick={() => openProjectById("yal-exhibition")}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-48 sm:w-64 h-24 border border-border bg-background flex items-center justify-center z-10 cursor-pointer hover:bg-muted/30 transition-colors duration-500"
        >
          <span className="font-stardom text-3xl sm:text-4xl text-foreground tracking-widest pointer-events-none">Y.A.L</span>
        </motion.button>

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "3rem" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
          className="w-px bg-border"
          aria-hidden="true"
        />

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "50%" }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeInOut" }}
          className="hidden md:block h-px bg-border origin-center"
          aria-hidden="true"
        />

        <div className="hidden md:flex justify-between w-1/2 h-8" aria-hidden="true">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.4, delay: 1.1 }}
            className="w-px bg-border"
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.4, delay: 1.1 }}
            className="w-px bg-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full mt-8 md:mt-0">
          <TreeCard title="sKINS" items={skinsLinks} delay={1.4} />
          <TreeCard title="Traditionalized" items={tradLinks} delay={1.6} />
        </div>
      </div>
    </section>
  )
}

function ExpandableFeature({
  title,
  subtitle,
  onOpen,
}: {
  title: string
  subtitle: string
  onOpen: () => void
}) {
  return (
    <div className="w-full max-w-5xl border border-border bg-background">
      <button
        type="button"
        onClick={onOpen}
        className="group w-full text-center p-12 sm:p-20 focus:outline-none cursor-pointer flex flex-col items-center justify-center transition-colors hover:bg-muted/10"
      >
        <h2 className="font-stardom text-5xl sm:text-6xl md:text-7xl text-foreground tracking-tight transition-transform duration-500 group-hover:-translate-y-1">
          {title}
        </h2>
        <p className="font-times italic text-sm sm:text-base text-muted-foreground mt-6 tracking-[0.2em] uppercase">
          {subtitle}
        </p>
        <div className="mt-8 text-muted-foreground">
          <ArrowUpRight className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>
      </button>
    </div>
  )
}

export default function HomePage() {
  const { openProjectById, openSkinsDireDawa, ProjectModals } = useProjectModals()

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <Navigation currentPath="/" />
      {ProjectModals}

      <h1 className="sr-only">Y.AL - Portfolio & Visual Archive</h1>

      <main>
        <FamilyTreeSection openProjectById={openProjectById} openSkinsDireDawa={openSkinsDireDawa} />

        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 py-24">
          <ExpandableFeature
            title="Bet / Bota"
            subtitle="Home / Place"
            onOpen={() => openProjectById("bet-bota")}
          />
        </section>

        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 py-24">
          <ExpandableFeature
            title="Hulet : Neteb"
            subtitle="Two : Dots"
            onOpen={() => openProjectById("hulet-neteb-installation")}
          />
        </section>
      </main>
    </div>
  )
}
