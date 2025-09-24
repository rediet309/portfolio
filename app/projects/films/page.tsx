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
}

const filmProjects: FilmProject[] = [
  {
    id: "skins-dire-dawa",
    title: "sKINs: Dire Dawa",
    year: "2025",
    category: "Films",
    medium: "Documentary film",
    description: "A documentary exploring the textile traditions and cultural identity of Dire Dawa, Ethiopia.",
    detailedDescription:
      "sKINs: Dire Dawa is a documentary that delves into the intricate relationship between skin, fabric, and cultural memory in Eastern Ethiopia. This film explores how traditional textile practices continue to shape contemporary identity in Dire Dawa, examining the connections between personal and cultural narratives through the lens of textile heritage. Available through private Google Drive link.",
    image: "/images/01_front.webp?height=600&width=800&text=sKINs+Dire+Dawa",
    location: "Dire Dawa, Ethiopia",
    tags: ["documentary", "textile", "culture", "identity"],
    videoUrl: "Private Google Drive link",
  },
  {
    id: "the-river",
    title: "The River",
    year: "2024",
    category: "Films",
    medium: "Documentary film",
    description:
      "A contemplative documentary about the relationship between communities and water sources in Ethiopia.",
    detailedDescription:
      "The River explores environmental conservation and water rights through intimate storytelling, examining how rivers shape both landscape and culture in Ethiopian communities. This film captures the essential role of water in Ethiopian life through compelling cinematography and personal narratives.",
    image: "/images/river.webp?height=600&width=800&text=The+River",
    location: "Ethiopia",
    tags: ["documentary", "environment", "water", "community"],
    videoUrl: "https://youtu.be/z_ijqn0ewM0?si=mbFQK0oZc8tatslH",
  },
  {
    id: "msfts-ethiopia-skate",
    title: "MSFTS x Ethiopia Skate",
    year: "2024",
    category: "Films",
    medium: "Collaboration documentary",
    description: "A collaborative film documenting the intersection of skateboarding culture and Ethiopian youth.",
    detailedDescription:
      "This collaborative film captures the vibrant skateboarding scene in Ethiopia, showcasing how young Ethiopians are embracing and redefining skateboarding culture within their own cultural context. The film follows several skaters as they navigate urban landscapes and create their own unique style.",
    image: "/images/c4-1.webp?height=600&width=800&text=MSFTS+Ethiopia+Skate",
    location: "Addis Ababa, Ethiopia",
    tags: ["skateboarding", "youth culture", "collaboration", "urban"],
    videoUrl: "https://drive.google.com/file/d/1EguZ8WEBDYJItUhAVcpyyAoVgcxfwnMA/view?usp=sharing",
  },
  {
    id: "hulet-neteb",
    title: "Hulet Neteb",
    year: "2022",
    category: "Films",
    medium: "Experimental film",
    description: "An experimental film exploring the philosophical concept of duality in Ethiopian culture.",
    detailedDescription:
      "Hulet Neteb (meaning 'two things' in Amharic) examines the tensions and harmonies between tradition and modernity, individual and collective identity, past and present. Through innovative cinematographic techniques and thoughtful narrative structure, the film creates a meditative exploration of Ethiopian philosophical concepts.",
    image: "/images/05_Maya Sight_d.webp?height=600&width=800&text=Hulet+Neteb",
    location: "Ethiopia",
    tags: ["experimental", "philosophy", "duality", "culture"],
    videoUrl: "https://drive.google.com/file/d/1mF4sGEPb7YrYdEeUFYA2vZERRdR9F7G5/view?usp=sharing",
  },
  {
    id: "decoding-legends",
    title: "Decoding Legends",
    year: "2021",
    category: "Films",
    medium: "Documentary series",
    description: "A documentary series exploring Ethiopian legends and their contemporary relevance in modern society.",
    detailedDescription:
      "Decoding Legends is a documentary series that delves into the rich tapestry of Ethiopian folklore and mythology, examining how these ancient stories continue to shape contemporary Ethiopian identity and culture. Through interviews with elders, historians, and cultural practitioners, the series reveals the hidden meanings and enduring wisdom embedded in traditional legends.",
    image: "/images/DecodingLegends.webp?height=600&width=800&text=Decoding+Legends",
    location: "Ethiopia",
    tags: ["documentary", "legends", "culture", "identity"],
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-black mb-4 sm:mb-6">Films</h1>
          </div>

          {/* Projects Grid - Enhanced responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filmProjects.map((project, index) => (
              <div
                key={project.id}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
                onClick={() => handleProjectClick(project)}
              >
                <div className="rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
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
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="text-center space-y-2 sm:space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
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
                      <h3 className="text-base sm:text-lg font-light leading-tight text-black group-hover:text-neutral-600 transition-colors duration-300">
                        {project.title}
                      </h3>

                      <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                        <div className="flex items-center space-x-1 text-neutral-500">
                          <Calendar className="h-3 w-3" />
                          <span>{project.year}</span>
                        </div>
                        {project.location && (
                          <div className="flex items-center space-x-1 text-neutral-500">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{project.location}</span>
                          </div>
                        )}
                        {project.visitors && (
                          <div className="flex items-center space-x-1 text-neutral-500">
                            <Users className="h-3 w-3" />
                            <span>{project.visitors}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-neutral-400">{project.medium}</p>
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
