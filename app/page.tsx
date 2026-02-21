"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { InstallationModal } from "@/components/installation-modal"

interface SelectedWorkProject {
  id: string
  title: string
  year: string
  category: string
  medium: string
  description: string
  detailedDescription?: string
  images?: string[]
  imageDescriptions?: string[]
  location?: string
  materials?: string[]
  tags: string[]
  slidesLayout?: number[]
  role?: string
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [selectedProject, setSelectedProject] = useState<SelectedWorkProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const selectedWorks: SelectedWorkProject[] = [
    {
      id: "skins-east-ethiopia",
      title: "sKINs: East Ethiopia Textile Installation",
      year: "2024",
      category: "Installation",
      medium: "Textile Installation",
      role: "Director, Producer, Cinematographer, Writer, Narrator",
      description:
        "An immersive textile installation and film screening exploring the r/s between skin, fabric, and cultural identity in Eastern Ethiopia.",
      detailedDescription:
      "sKINs, Film screening inside a Textile art tent Installation: Suspended tappering tent structure incapsulating the film screening within. Bottom 3m x 3m, top 2.3m x 2.3 m, height 2m",
     materials: ["Traditional textiles", "Contemporary display systems", "Lighting", "Sound"],
      tags: ["textile", "handmade", "visual culture"],
      imageDescriptions: [
        "Front side view/suspended tent structure incapsulating the sKins film screening within/, hand dyed and embroidered textile mixed with traditional garment fabrics of Dire Dawa, 2025",
        "Right side view, black textile, silver string textile knotted, love letter of the artists' parents from the 80's encapsulated, 2025",
        "Left side view, hand printed yellow floral textile with cutouts, and embroidery mixed with traditional garment fabrics of Dire Dawa, 2025.",
        "Back side view, black tea dyed textile with hand embroidery, Image of artists' mother form 80's, henna paste hand painted decorative art, 2025.",
      ],
      images: ["/images/01_front.webp", "/images/04_right.webp", "/images/02_left.webp", "/images/03_back.webp"],
    },
    {
      id: "bet-bota",
      title: "Bet Bota",
      year: "2022",
      category: "Installation",
      medium: "Installation",
      role: "Director, producer, cinematographer, writer and narrator",
      description:
        '"Bet/Bota" reimagines the Ethiopian home, exploring memory and history through immersive sets and everyday objects.',
     detailedDescription:
      "Bet/Bota reimagines the domestic interior as a site where memory, history, and imagination converge. Against the backdrop of 1970s Addis Ababa, the exhibition explores how architecture and the everyday objects we live with shape our emotions, identities, and collective memory. Through eight immersive sets, the work moves between elemental abstractions:- fire, air, water, earth and reconstructions of lived Ethiopian spaces, from the monochrome photo studios to the compact bachelor rooms of the 1970s. A dining room at the center binds these worlds together, its suspended sack of household items exposing what is often hidden: the quiet significance of what we keep and carry. Bet/Bota is both house and history, exhibition and archive- an invitation to reflect on how space holds us, and how we in turn hold space.",
    materials: ["Traditional textiles", "Architectural elements", "Lighting systems", "Interactive spaces"],
      tags: ["architecture", "domestic", "cultural memory"],
      slidesLayout: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      images: [
        "/images/a1_of fire.webp",
        "/images/a1a.webp",
        "/images/a2_of water.webp",
        "/images/a2a.webp",
        "/images/a3_of earth.webp",
        "/images/a3a.webp",
        "/images/a4_of air.webp",
        "/images/a4a.webp",
        "/images/a5_merger.webp",
        "/images/a5a.webp",
        "/images/a6_portal.webp",
        "/images/a6a.webp",
        "/images/a7_monochrome.webp",
        "/images/a7a.webp",
        "/images/a7b.webp",
        "/images/a7c.webp",
        "/images/a8_nostalgia.webp",
        "/images/a8_nostalgia_a.webp",
        "/images/a8a.webp",
        "/images/a9_gathering.webp",
      ],
    },
    {
      id: "skins-north-ethiopia",
      title: "sKINs: North Ethiopia",
      year: "2025",
      category: "In Studio",
      medium: "Textile",
      description:
        "This sub-collection honors ancestral skin markings as symbols of protection, beauty, and spirituality. Inspired by the artist's late great-grandmother, transforms these sacred symbols into garments that carry memory, meaning, and resilience.",
     detailedDescription:
      "This sub-collection/middle/ honors ancestral skin markings, where traditional tattoos serve as protection against illness, symbols of strength, expressions of beauty, and are interwoven with spiritual and social symbolism. The project draws personal inspiration from a photograph of the artist’s late great-grandmother /top/, whose neck bears these sacred markings. Her image serves as a quiet yet powerful thread connecting past and present. sKINs N.E. celebrates ancestral body adornment as a form of wearable art, transforming symbols once etched into skin into garments that carry memory, meaning, and resilience. (This sub-project is currently on hold due to ongoing instability in the northern regions of Ethiopia.)",
    tags: ["kinship", "aesthetics", "architecture"],
      images: [
        "/images/skins-all_01.webp",
        "/images/skins-all_02.webp",
        "/images/skins-all_03.webp",
        "/images/skins-all_04.webp",
      ],
    },
  ]

  const handleProjectClick = (project: SelectedWorkProject) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  if (!mounted) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation currentPath="/" />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative pt-24 sm:pt-28 md:pt-20 overflow-hidden">
        <div className="w-full max-w-none flex flex-col lg:flex-row px-4 sm:px-6 sm:pr-0 lg:pl-12 lg:pr-0 xl:pl-20 xl:pr-0">
          {/* Left side - Text content */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center mb-8 lg:mb-0 lg:pr-12">
            <div className="mb-6 lg:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-stardom leading-none text-foreground">
                <div className="text-left pl-1 sm:pl-2">Visual</div>
                <div className="text-left pl-1 sm:pl-2">Artist</div>
              </h1>
            </div>

            <div className="space-y-4 lg:space-y-6 mb-6 lg:mb-8">
              <div className="text-base sm:text-lg md:text-xl leading-relaxed font-times text-muted-foreground">
                <p className="text-sm sm:text-base mb-4 text-justify pl-1 sm:pl-2">
                  Multidisciplinary artist working across Film, installation, textile and clothing.
                </p>
              </div>
            </div>

            <div className="pl-1 sm:pl-2">
              <Link href="/shop">
                <Button
                  variant="outline"
                  className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full border-2 font-times border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-300 bg-transparent"
                >
                  Visit Shop
                  <ArrowUpRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Image holder */}
          <div className="flex-1 flex items-center">
            <div className="overflow-hidden bg-muted w-full rounded-none h-[60vh] sm:h-[70vh] lg:h-[90vh]">
              <Image
                src="/images/hero 2e.webp"
                alt="Rediet Haddis - Visual Artist Portrait"
                width={1175}
                height={800}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 50vw"
                className="w-full h-full object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                quality={80}
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-border animate-pulse"></div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section
        id="work"
        className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-20 overflow-hidden scroll-smooth bg-muted/30"
      >
        <div className="w-full py-8 lg:py-12">
          <div className="mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-stardom text-foreground mb-4">
              Selected Works
            </h2>
            <div className="w-16 h-px bg-border"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 mb-8 lg:mb-12">
            {selectedWorks.map((work, index) => (
              <div key={index} onClick={() => handleProjectClick(work)} className="group cursor-pointer block">
                <div className="space-y-4">
                  <div className="aspect-square rounded-sm overflow-hidden mb-4 bg-muted shadow-lg">
                    <Image
                      src={work.images?.[0] || "/placeholder.svg"}
                      alt={`${work.title} - ${work.medium} by Rediet Haddis (${work.year})`}
                      width={400}
                      height={400}
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="w-full h-full object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      quality={80}
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-stardom text-foreground">{work.title}</h3>
                    <p className="text-sm font-times text-muted-foreground">
                      {work.medium}, {work.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/projects">
              <Button
                variant="outline"
                className="px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full border-2 font-times border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-300 bg-transparent"
              >
                View All Projects
                <ArrowUpRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* InstallationModal component */}
      {selectedProject && <InstallationModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  )
}
