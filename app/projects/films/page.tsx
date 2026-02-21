"use client"

import { useState } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Calendar, Film, MapPin, Users } from "lucide-react"
import { FilmModal } from "@/components/film-modal"

interface FilmProject {
  id: string
  title: string
  year: string
  category: string
  medium: string
  description: string
  detailedDescription?: string
  image: string
  location?: string
  visitors?: number
  duration?: string
  tags: string[]
  videoUrl?: string
  client?: string
  position?: string // Added position field for artist role
}

const filmProjects: FilmProject[] = [
  {
    id: "skins-dire-dawa",
    title: "sKINs: Dire Dawa",
    year: "2025",
    category: "Films",
    medium: "Film",
    description: "",
    detailedDescription:
      "sKINs is a film and textile-based documentary project that traces the movement of visual elements such as motifs, symbols, rituals, and garments across mediums, cultures, and generations. It explores how visual language is exchanged, transformed, and reinterpreted through time. Rooted in the idea that our lives are extensions of our skin: surfaces where culture, memory, and place imprint themselves. The title plays on 'KIN', pointing to kinship and shared humanity, while the \"s\" speaks to skin as both protection and adornment",
    image: "/images/skins-diredawa.webp?height=600&width=800&text=sKINs+Dire+Dawa",
    location: "Dire Dawa, Ethiopia",
    position: "Director, producer, cinematographer, writer and narrator",
    tags: ["documentary", "migration", "culture"],
    videoUrl: "https://drive.google.com/file/d/1A7-FUXr5hK2-l2IoXyvif2LRU8qOCETl/preview",
  },

  {
    id: "hulet-neteb",
    title: "Hulet Neteb",
    year: "2022",
    category: "Films",
    medium: "Experimental film",
    description: "",
    detailedDescription:
      'Hulet Neteb / Two Dots takes its name from the Ethiopian punctuation mark ":", a symbol that both separates and connects words in Amharic writing. This project is an exploration of identity, history, and culture drawing from moments near and far in time, all rooted in Ethiopia\'s rich heritage. Through a thoughtful interplay of accessories, makeup, and a diverse range of garments including hand-painted pieces and thoughtfully chosen pre-owned clothing, the artist embraces the transformative power of revival in fashion. By reimagining these elements, Hulet Neteb creates a living bond between herself and her environment, weaving personal presence and cultural narrative into a vibrant visual language. This process of embodiment, bringing to life a blend of remembered and imagined stories, unfolds across a series of concepts. Here, clothing becomes more than adornment; it is a medium through which history, identity, and creativity converse and coexist.',
    image: "/images/05_Maya Sight_d.webp?height=600&width=800&text=Hulet+Neteb",
    location: "Ethiopia",
    position: "Director, producer, cinematographer, writer and narrator",
    tags: ["symbology", "textile art", "ethiopian history"],
    videoUrl: "https://drive.google.com/file/d/1mF4sGEPb7YrYdEeUFYA2vZERRdR9F7G5/view?usp=sharing",
  },
  {
    id: "decoding-legends",
    title: "Decoding Legends",
    year: "2021",
    category: "Films",
    medium: "Documentary series",
    description: "",
    detailedDescription:
      "\"Ete'ya,\" a tribute to the revered Queen of Ethiopia, draws inspiration from her iconic blue cloak. This project modernizes traditional Ethiopian garments, featuring a hand-dyed cotton cloak with extended sleeves in homage to the queen. Complementing the cloak, the red wrap pant prioritizes comfort and flexibility for the dancer, tied at the wrists and embroidered with wing imagery symbolizing Ete'ya's angelic disappearance. Inspired by the tradition in Gojam, where women shave their heads and wear black headscarves in tribute to Ete'ya, this project incorporates a red headscarf, symbolizing love and devotion to the queen. Set in the lively Merkato market in Addis Ababa, the dancer moves through the bustling crowd, embodying the struggle to preserve identity amid change. The choreography captures the beauty of fearlessness, creating a powerful tribute to Queen Ete'ya's legacy.",
    image: "/images/DecodingLegends.webp?height=600&width=800&text=Decoding+Legends",
    location: "Ethiopia",
    position: "Creative director, costume design",
    tags: ["history", "story telling", "costume"],
    videoUrl: "https://youtu.be/0v1vwgnqHRU?si=uJkjUumPFlwMwHJy",
  },
]

export default function FilmsPage() {
  const [selectedProject, setSelectedProject] = useState<FilmProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProjectClick = (project: FilmProject) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const getCategoryColor = (category: string) => {
    return "text-red-600"
  }

  const getCategoryBg = (category: string) => {
    return "bg-red-100 border-red-200"
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects/films" />

      <main className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Header */}
          <div className="mb-12 sm:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-stardom text-black mb-4 sm:mb-6">Films</h1>
          </div>

          {/* Projects Grid - Enhanced responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filmProjects.map((project, index) => (
              <div key={project.id} className="group cursor-pointer" onClick={() => handleProjectClick(project)}>
                <div className="rounded-lg overflow-hidden bg-white shadow-lg">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      loading={index < 4 ? "eager" : "lazy"}
                      quality={80}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />

                    {/* Category Badge */}
                    <div
                      className={`absolute top-2 sm:top-4 left-2 sm:left-4 flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 rounded-full border backdrop-blur-sm ${getCategoryBg(project.category)}`}
                    >
                      <Film className={`h-3 w-3 sm:h-4 sm:w-4 ${getCategoryColor(project.category)}`} />
                      <span className={`text-xs font-medium capitalize ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Duration Badge */}
                    {project.duration && (
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                        <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {project.duration}
                        </div>
                      </div>
                    )}

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 flex items-center justify-center">
                      <div className="text-center space-y-2 sm:space-y-3 transform translate-y-4 transition-transform duration-500">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <div className="w-0 h-0 border-l-[8px] sm:border-l-[12px] border-l-white border-t-[6px] sm:border-t-[8px] border-t-transparent border-b-[6px] sm:border-b-[8px] border-b-transparent ml-1" />
                        </div>
                        <div className="text-white text-xs sm:text-sm font-medium">Watch Film</div>
                        <div className="w-6 sm:w-8 h-px bg-white/50 mx-auto" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-stardom leading-tight text-black">{project.title}</h3>

                      

                      <p className="text-xs text-neutral-400">{project.medium}</p>

                      {project.position && <p className="text-xs text-neutral-600 italic">{project.position}</p>}
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs rounded-full bg-neutral-100 text-neutral-600">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Client */}
                    {project.client && <div className="text-xs text-neutral-400">Client: {project.client}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Film Modal */}
      {selectedProject && <FilmModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  )
}
