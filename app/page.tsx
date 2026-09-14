"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowUpRight, ChevronDown, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"

// --- TYPES & DATA ---
interface DropdownLink {
  label: string
  href?: string
  onClick?: () => void
}

interface FeatureImage {
  src: string
  alt: string
}

const SKINS_LINKS: DropdownLink[] = [
  { label: "sKINS Dire Dawa", href: "/projects/films/skins-dire-dawa" },
  { label: "sKINS Addis Abeba", href: "/projects/films/skins-addis-abeba" },
  { label: "sKINS North", href: "/projects/films/skins-north" },
  { label: "Upcoming", href: "/projects/films/upcoming" },
]

const TRAD_LINKS: DropdownLink[] = [
  { label: "Sheret", href: "/projects/in-studio/sheret" },
  { label: "Cargo", href: "/projects/in-studio/cargo" },
  { label: "Gela", href: "/projects/in-studio/gela" },
]

const BET_BOTA_DESCRIPTION = [
  "Bet/Bota gathers work rooted in the idea of home as both a fixed place and a carried memory.",
  "Explore the visual archive and architectural stories from the region.",
]

const BET_BOTA_IMAGES: FeatureImage[] = [
  { src: "/placeholder.svg", alt: "Bet/Bota preview image 1" },
  { src: "/placeholder.svg", alt: "Bet/Bota preview image 2" },
  { src: "/placeholder.svg", alt: "Bet/Bota preview image 3" },
]

const HULET_NETEB_DESCRIPTION = [
  "Hulet: Neteb traces a pair of marks, two points, and what sits in the space between them.",
  "An exploration of cinematic pauses and punctuation in storytelling.",
]

const HULET_NETEB_IMAGES: FeatureImage[] = [
  { src: "/placeholder.svg", alt: "Hulet: Neteb featured photo 1" },
  { src: "/placeholder.svg", alt: "Hulet: Neteb featured photo 2" },
  { src: "/placeholder.svg", alt: "Hulet: Neteb featured photo 3" },
]

// --- COMPONENTS ---

function TreeCard({ title, items, delay, onHeaderClick }: { title: string; items: DropdownLink[]; delay: number; onHeaderClick?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border border-border bg-background hover:bg-muted/30 transition-colors duration-500"
    >
      <div 
        className={`flex items-center justify-center py-8 md:py-12 relative overflow-hidden ${onHeaderClick ? 'cursor-pointer hover:bg-muted/50 transition-colors' : ''}`}
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
              transition={{ duration: 0.4, delay: delay + 0.2 + (i * 0.1) }}
            >
              {item.onClick ? (
                <button
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

function YalOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter()
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflowY = "scroll" // Prevents layout shift from scrollbar disappearing
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflowY = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-background overflow-y-auto px-4 py-8 sm:p-12 md:p-16 lg:p-24"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-12 sm:right-12 p-2 hover:bg-muted rounded-full transition-colors z-10"
            aria-label="Close"
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          <div className="max-w-7xl mx-auto flex flex-col items-center mt-12 sm:mt-0">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-stardom text-4xl sm:text-6xl md:text-5xl tracking-widest text-center mb-16 sm:mb-24"
            >
              Y . A . L . <span className="mx-2 sm:mx-4 font-times italic lowercase text-[0.8em]">/</span> Thirsty is the Child of the Nile
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 w-full items-stretch">
              {/* Column 1: Installation View */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col space-y-8 h-full"
              >
                <div className="text-sm sm:text-base font-times italic text-muted-foreground leading-relaxed lg:min-h-[100px]">
                  <span>Installation View, Artawi Gallery,<br />Addis Ababa, Ethiopia, 2025</span>
                </div>

                <div className="space-y-4">
                  <div className="aspect-[16/9] relative bg-muted border border-border">
                    <Image src="/images/IMG_2859.webp" alt="Cargo containers installation" fill className="object-cover" />
                  </div>
                  <p className="text-xs sm:text-sm font-times text-muted-foreground leading-relaxed text-center">
                    Entrance, 3X6 meter canvas print on interior wall, stacked cargo containers /reading Y.A.L.(black) , open containers contain descriptions of the sub-projects/, 2025
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="aspect-[16/9] relative bg-muted border border-border">
                    <Image src="/images/IMG_4340.webp" alt="3 Haori jackets suspended" fill className="object-cover" />
                  </div>
                  <p className="text-xs sm:text-sm font-times text-muted-foreground leading-relaxed text-center">
                    3 Haori jackets suspended, 20 hand embroidered textile art pieces/jacket back panels/ cover 2 walls of the room, 2025
                  </p>
                </div>

              </motion.div>

              {/* Column 2: Visual Artist */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col space-y-8 h-full"
              >
                <div className="text-sm sm:text-base font-times text-center leading-relaxed lg:min-h-[100px]">
                  <span>Visual Artist : <span className="italic">Rediet Haddis Yalew</span><br />
                    Position: <span className="italic">Artist and Curator</span></span>
                </div>

                <div className="aspect-[3/4] relative bg-[#FFF323] p-4 sm:p-8">
                  <div className="relative w-full h-full">
                    <Image src="/images/02_YAL.webp" alt="Illustration of a cargo ship" fill className="object-contain" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-times text-muted-foreground leading-relaxed text-center">
                  Illustration: A cargo ship carries stacked containers across the water, serving as a metaphor for the lives of Ethiopian youth lost at sea /the organized stacks mirror how human lives are systemically displaced and commodified/
                </p>

              </motion.div>

              {/* Column 3: Text content */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col h-full text-sm sm:text-base lg:text-lg font-times leading-[1.8] text-foreground text-justify"
              >
                <div className="space-y-6 flex-1">
                  <div className="lg:min-h-[100px]">
                    <p className="italic">
                      The Amharic phrase “Ye Abayn Lij Weha Temaw” translates to “Thirsty is the child of the Nile” symbolizing the paradox of not benefiting from one’s own abundant resources.
                    </p>
                  </div>

                  <p>
                    YAL / Thirsty is the Child of the Nile is a long-form cinematic and installation project that brings together the research trajectories of sKINs and Traditionalized into a broader inquiry on African youth, migration, inheritance, and desire.
                  </p>

                  <p>
                    The project asks what it means to come from a continent rich in history, resources, and cultural intelligence, yet remain shaped by conditions that compel movement outward. “Thirst” becomes a metaphor for longing: for dignity, opportunity, and freedom.
                  </p>

                  <p>
                    Combining documentary cinema, sound, textiles, found materials, and immersive installation, YAL is both a political and poetic work tracing how young Africans move toward imagined futures while carrying ancestral memory and contemporary contradiction.
                  </p>
                </div>

              </motion.div>
            </div>

            {/* Centered Button Outside Grid */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 sm:mt-16 w-full max-w-sm mx-auto"
            >
              <button
                onClick={() => {
                  onClose()
                  router.push("/projects?open=yal-exhibition")
                }}
                className="group/btn flex items-center justify-center gap-2 w-full py-3 border border-foreground font-times italic text-sm sm:text-base text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
              >
                View Full Project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </button>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SkinsOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflowY = "scroll"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflowY = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/skins_addis_ababa.webp"
              alt="sKINs background"
              fill
              className="object-cover"
              priority
            />
          </div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-12 sm:right-12 p-2 bg-background/50 hover:bg-background/80 rounded-full transition-colors z-20"
            aria-label="Close"
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          {/* Right Panel Container */}
          <div className="absolute inset-0 flex items-center justify-end p-4 sm:p-12 lg:p-24 z-10 pointer-events-none">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full sm:w-[450px] md:w-[500px] lg:w-[600px] bg-white/85 dark:bg-black/85 shadow-2xl flex flex-col px-8 py-10 sm:px-12 sm:py-14 overflow-hidden backdrop-blur-sm pointer-events-auto"
            >
              <div className="text-right mb-10 space-y-2">
                <h2 className="font-stardom text-4xl sm:text-5xl text-foreground tracking-wider">
                  sKINs
                </h2>
                <p className="font-times italic text-sm sm:text-base text-foreground font-bold">
                  2025 - ongoing
                </p>
              </div>

              <div className="space-y-6 font-times text-sm sm:text-base lg:text-lg leading-[1.8] text-foreground text-justify">
                <p>
                  sKINs is an ongoing documentary archive project that navigates different geographies through first-person engagement.
                </p>
                <p>
                  At its core, it investigates why young Africans migrate toward the world, and how identity is shaped through movement. Working across three civilizational spheres: &#x2018;The un-colonized&#x2019; /Ethiopia as historical sovereignty/, &#x2018;The colonized&#x2019; /Africa through colonial afterlives/, and &#x2018;The colonizer&#x2019; /Western metropolitan centers as imperial destinations/&#x2014;the project examines borders, aspiration, labor, design languages, and the notion of elsewhere.
                </p>
                <p>
                  Each chapter is a Visual Essay contributing to a growing body of tactile and visual research. Through intimate self-filmed encounters and voice-led storytelling, sKINs asks how bodies carry memory across borders and how personal journeys reflect wider collective realities.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SkinsAddisOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflowY = "scroll"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflowY = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-background overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 p-2 bg-muted/50 hover:bg-muted/80 rounded-full transition-colors z-20"
            aria-label="Close"
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          <div className="min-h-full flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-4 sm:p-8 lg:p-16 gap-8 lg:gap-16 pt-24 lg:pt-16">
            
            {/* Left Column - Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full lg:w-1/2 flex flex-col gap-6"
            >
              <div className="w-full flex justify-between items-center px-4 font-times text-sm sm:text-base">
                <a href="#" className="text-[#c4251d] italic underline hover:opacity-80 transition-opacity">Click to go to Full film /linked here/</a>
                <span className="text-foreground">Password: <span className="text-[#c4251d]">sKINsAA2025finalversion</span></span>
              </div>
              <div className="relative aspect-[4/3] w-full bg-muted border border-border">
                <Image
                  src="/images/skins_addis_ababa.webp"
                  alt="sKINs Addis Abeba"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Right Column - Text */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full lg:w-1/2 flex flex-col justify-center"
            >
              <div className="text-right space-y-2 mb-12">
                <h2 className="font-stardom text-3xl sm:text-4xl text-foreground">
                  sKINs_Addis Abeba
                </h2>
                <p className="font-times italic text-sm sm:text-base text-foreground">
                  /Sub-project/
                </p>
                <p className="font-times text-sm sm:text-base text-foreground font-bold mt-4">
                  2026
                </p>
                <p className="font-times italic text-sm sm:text-base text-foreground">
                  Position: Director/writer, Producer,<br />Cinematographer
                </p>
              </div>

              <div className="space-y-6 font-times text-sm sm:text-base lg:text-lg leading-[1.8] text-foreground text-justify">
                <p>
                  sKINs: Addis Abeba is a 17-minute creative documentary/visual essay structured as a cyclical journey through four political eras that have shaped Ethiopia's capital. This essay documents an intimate family conversation that evokes imaginative curiosity within the filmmaker, taking the audience into scenes that reflect the conversations being held between the grandmother, a mother and a daughter.
                </p>
                <p>
                  The protagonists are the filmmaker and the city itself. Through first-person narration and enquiry the city becomes an archive revealing traces of past youth movements, forgotten struggles as figures evoke memories of the past and present without centering specific individuals.
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SkinsDireDawaOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflowY = "scroll"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflowY = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-background overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 p-2 bg-muted/50 hover:bg-muted/80 rounded-full transition-colors z-20"
            aria-label="Close"
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          <div className="min-h-full flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-4 sm:p-8 lg:p-16 gap-12 lg:gap-24 pt-24 lg:pt-16">
            
            {/* Left Column - Main Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full lg:w-[60%] flex flex-col gap-4"
            >
              <p className="font-times italic text-sm sm:text-base text-foreground pl-4">
                sKINs, Film screening + Textile art tent structure suspended inside a 3X3X3 meter wooden frame cube
              </p>
              <div className="relative aspect-[4/3] w-full bg-muted border border-border">
                <Image
                  src="/images/skins-diredawa.webp"
                  alt="sKINs Dire Dawa tent structure"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Right Column - Text & Small Image */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full lg:w-[40%] flex flex-col"
            >
              <div className="text-right space-y-2 mb-12 lg:mt-12">
                <h2 className="font-stardom text-3xl sm:text-4xl text-foreground">
                  sKINs_Dire Dawa
                </h2>
                <p className="font-times italic text-sm sm:text-base text-foreground">
                  /Sub-project/
                </p>
                <p className="font-times text-sm sm:text-base text-foreground font-bold mt-4">
                  2025
                </p>
                <p className="font-times italic text-sm sm:text-base text-foreground">
                  Position: Director, Producer,<br />Cinematographer, Writer, Textile Artist
                </p>
              </div>

              <div className="space-y-6 font-times text-sm sm:text-base lg:text-lg leading-[1.8] text-foreground text-justify mb-12">
                <p>
                  The film follows a circular timeline, mirroring the daily rhythms of Dire Dawa. The project expands beyond film into a textile installation, an abstract tent that houses the story and translates visual memory into physical form.
                </p>
                <p>
                  Dire Dawa is a place where trade, migration, and memory blur the lines between cultural nuances.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 mt-auto">
                <div className="relative aspect-[16/9] w-full bg-muted border border-border">
                  <Image
                    src="/images/01.webp" 
                    alt="Dire Dawa small image"
                    fill
                    className="object-cover"
                  />
                </div>
                <a href="#" className="font-times text-sm sm:text-base text-[#c4251d] italic underline hover:opacity-80 transition-opacity">
                  Click to go to Full film /linked here/
                </a>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TraditionalisedOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflowY = "scroll"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflowY = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/IMG_0612 (2).webp"
              alt="Traditionalized background"
              fill
              className="object-cover"
              priority
            />
          </div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-12 sm:right-12 p-2 bg-background/50 hover:bg-background/80 rounded-full transition-colors z-20"
            aria-label="Close"
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          {/* Right Panel */}
          <div className="absolute inset-0 flex items-center justify-end p-4 sm:p-12 lg:p-24 z-10 pointer-events-none">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full sm:w-[450px] md:w-[500px] lg:w-[600px] bg-white/85 dark:bg-black/85 shadow-2xl flex flex-col px-8 py-10 sm:px-12 sm:py-14 overflow-hidden backdrop-blur-sm pointer-events-auto"
            >
              <div className="text-right mb-10 space-y-2">
                <h2 className="font-stardom text-4xl sm:text-5xl text-foreground tracking-wider">
                  Traditionalized
                </h2>
                <p className="font-times italic text-sm sm:text-base text-foreground font-bold">
                  2023-ongoing
                </p>
              </div>

              <div className="space-y-6 font-times text-sm sm:text-base lg:text-lg leading-[1.8] text-foreground text-justify">
                <p>
                  <em>Traditionalized</em> is a research-driven art project that examines the cultural transformations emerging as tribal communities in East Africa engage with processes of urbanization.
                </p>
                <p>
                  Imported materials, silhouettes, and design practices are not simply adopted, but reconfigured and absorbed into everyday life, becoming &ldquo;Traditionalized&rdquo; within new social contexts.
                </p>
                <p>
                  Through a combination of critical research and material experimentation, <em>Traditionalized</em> reveals how indigenous forms persist, adapt, and evolve in response to globalization, offering insight into the ongoing negotiation between heritage, modernity, and identity in contemporary spheres.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SheretOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflowY = "scroll"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflowY = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-background overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 p-2 bg-muted/50 hover:bg-muted/80 rounded-full transition-colors z-20"
            aria-label="Close"
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          <div className="min-h-full flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-4 sm:p-8 lg:p-16 gap-8 lg:gap-12 pt-20 lg:pt-16">

            {/* Left Column - Archive photo + caption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full lg:w-[30%] flex flex-col gap-4"
            >
              <p className="font-times italic text-sm sm:text-base text-foreground">
                Sheret project is dedicated to my late father whose favorite piece of garment was the &lsquo;Sheret&rsquo;.
              </p>
              <div className="relative aspect-[3/4] w-full bg-muted border border-border">
                <Image
                  src="/images/Sheret 01.webp"
                  alt="Haddis Yalew, 1973, Eritrea"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-times text-xs sm:text-sm text-muted-foreground">
                Haddis Yalew, 1973, Eritrea. (Father of the artist /right/ seen wearing Sheret/Sarong/)
              </p>
            </motion.div>

            {/* Center Column - Model photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full lg:w-[35%] flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full bg-muted border border-border">
                <Image
                  src="/images/IMG_0612 (2).webp"
                  alt="Sheret project model"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Right Column - Title + Description */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="w-full lg:w-[35%] flex flex-col"
            >
              <div className="text-right space-y-1 mb-10 lg:mt-12">
                <p className="font-stardom text-xl sm:text-2xl text-foreground">1. Sheret project :</p>
                <p className="font-times italic text-sm sm:text-base text-foreground">/Sub-project/</p>
              </div>

              <div className="space-y-5 font-times text-sm sm:text-base lg:text-lg leading-[1.8] text-foreground text-justify">
                <p>
                  The Sheret/Sarong/ is a tubular textile usually worn as a long skirt, or scarf by men. Through its dynamic patterns and colorways, it conveys a story from far away <em>/originally from Malaysia/</em> and has made its way into East African traditions.
                </p>
                <p>
                  It is vital in hot climates and preferred during khat chewing rituals/as shown in sKINs: Dire Dawa opening scene/ where it provides a breathable silhouette.
                </p>
                <p>
                  For warriors in Ethiopia, it serves as protection from harsh sun and wind; a practical solution when carrying minimal items. During battle its role deepens even more; fallen soldiers are wrapped in their own Sheret/Sarong/ when burials aren&apos;t possible.
                </p>
                <p>
                  This fabric carries with it the intricate layers of trade, function, and battle making it a powerful cultural symbol. It also carries personal sentimental values for the artist which makes it a deeply intimate yet shared experience beyond textile and patterns.
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CargoOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflowY = "scroll"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflowY = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const cargoImages = [
    { src: "/images/IMG_4341.webp", alt: "Cargo garment 1" },
    { src: "/images/IMG_4342.webp", alt: "Cargo garment 2" },
    { src: "/images/IMG_5008.webp", alt: "Cargo garment 3" },
    { src: "/images/IMG_5009.webp", alt: "Cargo garment 4" },
    { src: "/images/IMG_5010.webp", alt: "Cargo garment 5" },
    { src: "/images/IMG_5011.webp", alt: "Cargo garment 6" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-background overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 p-2 bg-muted/50 hover:bg-muted/80 rounded-full transition-colors z-20"
            aria-label="Close"
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          <div className="min-h-full flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-4 sm:p-8 lg:p-16 gap-8 lg:gap-16 pt-20 lg:pt-16">

            {/* Left Column - Image Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full lg:w-[60%]"
            >
              <div className="grid grid-cols-3 gap-2">
                {cargoImages.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                    className="relative aspect-[3/4] bg-muted border border-border overflow-hidden"
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Title + Description */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full lg:w-[40%] flex flex-col"
            >
              <div className="text-right space-y-1 mb-10 lg:mt-12">
                <p className="font-stardom text-xl sm:text-2xl text-foreground">2. Cargo</p>
                <p className="font-times italic text-sm sm:text-base text-foreground">/Sub-project/</p>
              </div>

              <div className="space-y-5 font-times text-sm sm:text-base lg:text-lg leading-[1.8] text-foreground text-justify">
                <p>
                  Figures with elongated necks and floating heads stare back in defiance. Thread, fabric, and acrylic paint narrate stories of frustration over resource inequality while pulsing with youthful energy and self-awareness.
                </p>
                <p>
                  Cargo merges textile illustration and adaptable design to question how we inhabit space, share wisdom, and shape identities both individual and collective.
                </p>
                <p>
                  Cargo collection draws inspiration from both Eastern and Western global styles, focusing on utilitarian wear crafted from durable cotton textiles featuring multi-pocketed apparel designed for functionality and versatility.
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function GelaOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflowY = "scroll"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflowY = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-background overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 p-2 bg-muted/50 hover:bg-muted/80 rounded-full transition-colors z-20"
            aria-label="Close"
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          <div className="min-h-full flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-4 sm:p-8 lg:p-16 gap-8 lg:gap-12 pt-20 lg:pt-16">

            {/* Left Column - Archive B&W portrait + caption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full lg:w-[25%] flex flex-col gap-4 pt-8 lg:pt-24"
            >
              <div className="relative aspect-[3/4] w-full max-w-[200px] bg-muted border border-border">
                <Image
                  src="/images/skins-all_01.webp"
                  alt="Teblets Yefter, 1978, Addis Ababa"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <p className="font-times text-xs sm:text-sm text-muted-foreground">
                Teblets Yefter, 1978, Addis Ababa<br />(Great grandmother to the artist)
              </p>
            </motion.div>

            {/* Center Column - Model photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full lg:w-[35%] flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full bg-muted border border-border">
                <Image
                  src="/images/skins-all_04.webp"
                  alt="Gela project model with ancestral tattoo-inspired garment"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </motion.div>

            {/* Right Column - Title + Description */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="w-full lg:w-[40%] flex flex-col"
            >
              <div className="text-right space-y-1 mb-10 lg:mt-12">
                <p className="font-stardom text-xl sm:text-2xl text-foreground">3. Gela</p>
                <p className="font-times italic text-sm sm:text-base text-foreground">/Sub-project/</p>
              </div>

              <div className="space-y-5 font-times text-sm sm:text-base lg:text-lg leading-[1.8] text-foreground text-justify">
                <p>
                  Gela honors ancestral skin markings, where traditional Ethiopian tattoos serve as protection against illness, symbols of strength, expressions of beauty, interwoven with spiritual and social symbolism.
                </p>
                <p>
                  The project draws personal inspiration from a photograph of the artist&apos;s late great-grandmother /left/, whose neck bears these sacred markings.
                </p>
                <p>
                  The project celebrates ancestral body adornment as a form of wearable art, transforming symbols once etched into skin into garments that carry memory, meaning, and resilience.
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function FamilyTreeSection() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [isSkinsOverlayOpen, setIsSkinsOverlayOpen] = useState(false)
  const [isAddisOverlayOpen, setIsAddisOverlayOpen] = useState(false)
  const [isDireDawaOverlayOpen, setIsDireDawaOverlayOpen] = useState(false)
  const [isTradOverlayOpen, setIsTradOverlayOpen] = useState(false)
  const [isSheretOverlayOpen, setIsSheretOverlayOpen] = useState(false)
  const [isCargoOverlayOpen, setIsCargoOverlayOpen] = useState(false)
  const [isGelaOverlayOpen, setIsGelaOverlayOpen] = useState(false)

  const skinsLinksWithHandlers: DropdownLink[] = [
    { label: "sKINS Dire Dawa", onClick: () => setIsDireDawaOverlayOpen(true) },
    { label: "sKINS Addis Abeba", onClick: () => setIsAddisOverlayOpen(true) },
    { label: "sKINS North", href: "/projects/films/skins-north" },
    { label: "Upcoming", href: "/projects/films/upcoming" },
  ]

  const tradLinksWithHandlers: DropdownLink[] = [
    { label: "Sheret", onClick: () => setIsSheretOverlayOpen(true) },
    { label: "Cargo", onClick: () => setIsCargoOverlayOpen(true) },
    { label: "Gela", onClick: () => setIsGelaOverlayOpen(true) },
  ]

  return (
    <>
      <YalOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
      <SkinsOverlay isOpen={isSkinsOverlayOpen} onClose={() => setIsSkinsOverlayOpen(false)} />
      <SkinsAddisOverlay isOpen={isAddisOverlayOpen} onClose={() => setIsAddisOverlayOpen(false)} />
      <SkinsDireDawaOverlay isOpen={isDireDawaOverlayOpen} onClose={() => setIsDireDawaOverlayOpen(false)} />
      <TraditionalisedOverlay isOpen={isTradOverlayOpen} onClose={() => setIsTradOverlayOpen(false)} />
      <SheretOverlay isOpen={isSheretOverlayOpen} onClose={() => setIsSheretOverlayOpen(false)} />
      <CargoOverlay isOpen={isCargoOverlayOpen} onClose={() => setIsCargoOverlayOpen(false)} />
      <GelaOverlay isOpen={isGelaOverlayOpen} onClose={() => setIsGelaOverlayOpen(false)} />
      <section aria-label="Project Structure" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-24">
        <div className="w-full max-w-4xl flex flex-col items-center">

          {/* Main Root Box */}
          <motion.button
            onClick={() => setIsOverlayOpen(true)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-48 sm:w-64 h-24 border border-border bg-background flex items-center justify-center z-10 cursor-pointer hover:bg-muted/30 transition-colors duration-500"
          >
            <span className="font-stardom text-3xl sm:text-4xl text-foreground tracking-widest pointer-events-none">Y.A.L</span>
          </motion.button>

          {/* Tree Branch Connectors */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "3rem" }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
            className="w-px bg-border"
            aria-hidden="true"
          />

          {/* Horizontal Split Line for Desktop */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeInOut" }}
            className="hidden md:block h-px bg-border origin-center"
            aria-hidden="true"
          />

          {/* Vertical Drops for Branches */}
          <div className="hidden md:flex justify-between w-1/2 h-8" aria-hidden="true">
            <motion.div
              initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 0.4, delay: 1.1 }}
              className="w-px bg-border"
            />
            <motion.div
              initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 0.4, delay: 1.1 }}
              className="w-px bg-border"
            />
          </div>

          {/* Tree Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full mt-8 md:mt-0">
            <TreeCard title="sKINS" items={skinsLinksWithHandlers} delay={1.4} onHeaderClick={() => setIsSkinsOverlayOpen(true)} />
            <TreeCard title="Traditionalized" items={tradLinksWithHandlers} delay={1.6} onHeaderClick={() => setIsTradOverlayOpen(true)} />
          </div>
        </div>
      </section>
    </>
  )
}

function BetBotaOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflowY = "scroll"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflowY = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-background overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 p-2 bg-muted/50 hover:bg-muted/80 rounded-full transition-colors z-20"
            aria-label="Close"
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 lg:p-16 pt-20 lg:pt-16">

            {/* Row 1: installation caption (left) + title block (right) */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8 lg:mb-10">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="font-times italic text-sm sm:text-base text-foreground max-w-xs"
              >
                Installation view: Bet|Bota - Home|Place, Refenti complex gallery,<br />Addis Ababa, Ethiopia, 2022.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="text-right mt-4 lg:mt-0 space-y-1"
              >
                <h2 className="font-stardom text-3xl sm:text-4xl lg:text-5xl text-foreground">Bet|Bota &mdash; Home|Place</h2>
                <p className="font-times text-sm sm:text-base text-foreground font-bold">2022</p>
                <p className="font-times italic text-sm sm:text-base text-foreground">Position: Director, Curator, Set designer</p>
              </motion.div>
            </div>

            {/* Row 2: 3 portrait images (left ~60%) + description text (right ~40%) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.55 }}
              className="flex flex-col lg:flex-row gap-6 mb-10"
            >
              {/* Left: 3 images in a row with captions */}
              <div className="w-full lg:w-[60%] grid grid-cols-3 gap-3">
                {[
                  { src: "/images/a7_monochrome.webp", caption: "Monochrome set, mirrors, mats, cups, coat, 2022" },
                  { src: "/images/a8_nostalgia.webp", caption: "Nostalgia set, newspaper wall, traditional closet box, mat, 2022" },
                  { src: "/images/Bet bota project photo.webp", caption: "Dining room set, dining table and chairs /Livingroom(of fire) and bathroom(of water) seen in the back/, 2022" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="relative aspect-[3/4] bg-muted border border-border overflow-hidden">
                      <Image src={item.src} alt={item.caption} fill className="object-cover" />
                    </div>
                    <p className="font-times text-xs text-muted-foreground text-center leading-snug">{item.caption}</p>
                  </div>
                ))}
              </div>

              {/* Right: description text — vertically centred beside the images */}
              <div className="w-full lg:w-[40%] flex flex-col justify-center space-y-5 font-times text-sm sm:text-base lg:text-lg leading-[1.8] text-foreground text-justify">
                <p>
                  Bet/Bota explores space and time against the backdrop of 1970s Addis Ababa, examining the connection between humans, architecture and how space shapes our psyche.
                </p>
                <p>
                  The project unfolds through eight distinct sets, each blending conceptual storytelling with immersive design.
                </p>
              </div>
            </motion.div>

            {/* Row 3: large portrait (Air) | center text | large portrait (Earth) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-6 items-start"
            >
              {/* Left large image + caption */}
              <div className="flex flex-col gap-2">
                <div className="relative aspect-[3/4] bg-muted border border-border overflow-hidden">
                  <Image src="/images/a4_of air.webp" alt="Corridor Air set" fill className="object-cover" />
                </div>
                <p className="font-times text-xs text-muted-foreground leading-snug">
                  Corridor(Air) set, traditional Ethiopian chairs((painted yellow) hanging inside 2.5 X 2.5 X 2.5 cube frame, 2022
                </p>
              </div>

              {/* Center text */}
              <div className="flex flex-col justify-start gap-5 px-0 lg:px-4 font-times text-sm sm:text-base lg:text-lg leading-[1.8] text-foreground text-justify pt-2">
                <p>
                  The set &ldquo;of air&rdquo; /left/ highlights the dynamic nature of the Berchuma; a chair without a fixed place, effortlessly repositioned to fit any space. The set embodies the element of air, symbolizing its fluidity and adaptability.
                </p>
                <p>
                  The styling reflects a character deeply rooted in Ethiopian wisdom. As she moves the chairs with an invisible force, her actions evoke the essence of air bending, channeling the power of movement and control over the tangible.
                </p>
                <p className="font-times italic text-lg sm:text-xl font-bold">&bull; <em>of air :</em></p>
              </div>

              {/* Right large image + caption */}
              <div className="flex flex-col gap-2">
                <div className="relative aspect-[3/4] bg-muted border border-border overflow-hidden">
                  <Image src="/images/a4a.webp" alt="Bedroom Earth set" fill className="object-cover" />
                </div>
                <p className="font-times text-xs text-muted-foreground text-right leading-snug">
                  Bedroom(Earth) set. Bed, side table, closet, vintage poster, 2022
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function HuletNetebOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflowY = "scroll"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflowY = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-background overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 p-2 bg-muted/50 hover:bg-muted/80 rounded-full transition-colors z-20"
            aria-label="Close"
          >
            <X className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 lg:p-16 pt-20 lg:pt-16">

            {/* Installation label top-left, title top-right */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8 lg:mb-10">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="font-times italic text-sm sm:text-base text-foreground max-w-xs"
              >
                Installation view: Hulet Neteb : Two dots, Studio 11, Addis Ababa, Ethiopia
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="text-right mt-4 lg:mt-0 space-y-1"
              >
                <h2 className="font-stardom text-3xl sm:text-4xl lg:text-5xl text-foreground">Hulet neteb : Two dots</h2>
                <p className="font-times text-sm sm:text-base text-foreground font-bold">2022</p>
                <p className="font-times italic text-sm sm:text-base text-foreground">
                  Position: Director, Producer, Curator, and Textile Artist
                </p>
              </motion.div>
            </div>

            {/* Main 3-column body */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

              {/* Left: 2 stacked installation images */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="w-full lg:w-[30%] flex flex-col gap-5"
              >
                <div className="flex flex-col gap-2">
                  <div className="relative aspect-[4/3] bg-muted border border-border overflow-hidden">
                    <Image src="/images/FUA19675.webp" alt="Hulet Neteb installation view" fill className="object-cover" />
                  </div>
                  <p className="font-times text-xs text-muted-foreground leading-snug">
                    Hand painted denim jackets(left half) and hand made and embroidered Haori Jackets(right half) suspended inside exhibition hall, 2022.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="relative aspect-[4/3] bg-muted border border-border overflow-hidden">
                    <Image src="/images/FUA19684.webp" alt="Long coats suspended" fill className="object-cover" />
                  </div>
                  <p className="font-times text-xs text-muted-foreground leading-snug">
                    Long coats and painted with acrylic suspended inside exhibition hall, 2022.
                  </p>
                </div>
              </motion.div>

              {/* Center: model photo + film link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="w-full lg:w-[35%] flex flex-col items-center gap-5"
              >
                <div className="relative aspect-[3/4] w-full bg-muted border border-border overflow-hidden">
                  <Image src="/images/FUA10675.webp" alt="Hulet Neteb model" fill className="object-cover object-top" />
                </div>
                <a
                  href="https://drive.google.com/file/d/1mF4sGEPb7YrYdEeUFYA2vZERRdR9F7G5/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-times italic text-sm sm:text-base text-[#c4251d] underline hover:opacity-80 transition-opacity text-center"
                >
                  Click for Full film /linked here/
                </a>
              </motion.div>

              {/* Right: description text */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="w-full lg:w-[35%] flex flex-col space-y-5 font-times text-sm sm:text-base lg:text-lg leading-[1.8] text-foreground text-justify"
              >
                <p>
                  Named after the punctuation mark &ldquo;:&rdquo; symbolizing separation and connection of words in Amharic writing, this project draws parallels between identity, heritage and spirituality by visualizing concepts from Ethiopia. Angel Eyes ; a sub collection most visible in Hulet Neteb, attempts to redefine the use of eyes in painting, challenging their association with darker realms in today&apos;s Ethiopian context.
                </p>
                <p>
                  By combining accessories, makeup, and uniquely hand-painted garments, the artist engages in a process of self-transformation that interacts with her environment through visual coherence.
                </p>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
  const [isBetBotaOpen, setIsBetBotaOpen] = useState(false)
  const [isHuletNetebOpen, setIsHuletNetebOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <Navigation currentPath="/" />

      <BetBotaOverlay isOpen={isBetBotaOpen} onClose={() => setIsBetBotaOpen(false)} />
      <HuletNetebOverlay isOpen={isHuletNetebOpen} onClose={() => setIsHuletNetebOpen(false)} />

      <h1 className="sr-only">Y.AL - Portfolio & Visual Archive</h1>

      <main>
        <FamilyTreeSection />

        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 py-24">
          <ExpandableFeature
            title="Bet / Bota"
            subtitle="Home / Place"
            onOpen={() => setIsBetBotaOpen(true)}
          />
        </section>

        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 py-24">
          <ExpandableFeature
            title="Hulet : Neteb"
            subtitle="Two : Dots"
            onOpen={() => setIsHuletNetebOpen(true)}
          />
        </section>
      </main>
    </div>
  )
}