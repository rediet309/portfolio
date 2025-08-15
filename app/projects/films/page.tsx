"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { FilmModal } from "@/components/film-modal"
import { Calendar, Play, Film } from "lucide-react"

interface FilmProject {
  id: string
  title: string
  year: string
  category: string
  medium: string
  description: string
  detailedDescription?: string
  image: string
  videoUrl?: string
  duration?: string
  tags: string[]
}

const filmProjects: FilmProject[] = [
  {
    id: "skins-dire-dawa",
    title: "sKINs : Dire Dawa",
    year: "2025",
    category: "Film",
    medium: "Documentary Film",
    description: "A documentary exploring the textile traditions and cultural identity of Dire Dawa, Ethiopia.",
    detailedDescription:
      "This documentary delves into the rich textile heritage of Dire Dawa, examining how traditional craftsmanship intersects with contemporary identity and cultural expression in modern Ethiopia.",
    image: "/placeholder.svg?height=600&width=800&text=sKINs+Dire+Dawa",
    videoUrl: "private", // Private Google Drive link
    duration: "45 min",
    tags: ["documentary", "textile", "culture", "ethiopia"],
  },
  {
    id: "the-river",
    title: "The River",
    year: "2024",
    category: "Film",
    medium: "Short Documentary",
    description: "A contemplative short documentary about the relationship between communities and water sources.",
    detailedDescription:
      "The River explores the intimate connection between Ethiopian communities and their water sources, revealing stories of resilience, tradition, and environmental change through cinematic storytelling.",
    image: "/placeholder.svg?height=600&width=800&text=The+River",
    videoUrl: "https://youtu.be/z_ijqn0ewM0?si=mbFQK0oZc8tatslH",
    duration: "12 min",
    tags: ["documentary", "environment", "community", "water"],
  },
  {
    id: "hulet-neteb",
    title: "Hulet Neteb",
    year: "2022",
    category: "Film",
    medium: "Experimental Film",
    description: "An experimental film exploring the philosophical concept of duality in Ethiopian culture.",
    detailedDescription:
      "Hulet Neteb (meaning 'two things' in Amharic) is an experimental exploration of duality, examining the tensions and harmonies between tradition and modernity, individual and collective identity.",
    image: "/placeholder.svg?height=600&width=800&text=Hulet+Neteb",
    videoUrl: "https://drive.google.com/file/d/1mF4sGEPb7YrYdEeUFYA2vZERRdR9F7G5/view?usp=sharing",
    duration: "18 min",
    tags: ["experimental", "philosophy", "duality", "culture"],
  },
  {
    id: "decoding-legends",
    title: "Decoding Legends",
    year: "2021",
    category: "Film",
    medium: "Documentary Series",
    description: "A documentary series that decodes ancient Ethiopian legends through contemporary perspectives.",
    detailedDescription:
      "This documentary series bridges ancient Ethiopian storytelling with contemporary analysis, revealing the enduring relevance of traditional legends in modern cultural discourse.",
    image: "/placeholder.svg?height=600&width=800&text=Decoding+Legends",
    videoUrl: "https://youtu.be/0v1vwgnqHRU?si=uJkjUumPFlwMwHJy",
    duration: "25 min",
    tags: ["documentary", "legends", "storytelling", "heritage"],
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
    return "text-red-500"
  }

  const getCategoryBg = (category: string) => {
    return "bg-red-500/10 border-red-500/20"
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects/films" />

      <main className="pt-32 pb-20">
        <div className="w-full px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6">Film Works</h1>
          </div>

          {/* Projects Grid - Full width with proper alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filmProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer bg-white border border-neutral-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-500"
                onClick={() => handleProjectClick(project)}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Category Badge */}
                  <div
                    className={`absolute top-4 left-4 flex items-center space-x-2 px-3 py-1 rounded-full border backdrop-blur-sm ${getCategoryBg(project.category)}`}
                  >
                    <Film className={`h-4 w-4 ${getCategoryColor(project.category)}`} />
                    <span className={`text-xs font-medium capitalize ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-center space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                      <div className="text-white text-sm font-medium">Watch Film</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-light leading-tight text-black group-hover:text-red-500 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1 text-neutral-500">
                        <Calendar className="h-3 w-3" />
                        <span>{project.year}</span>
                      </div>
                      {project.duration && (
                        <div className="flex items-center space-x-1 text-neutral-500">
                          <Play className="h-3 w-3" />
                          <span>{project.duration}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-neutral-400">{project.medium}</p>
                  </div>

                  <p className="text-sm leading-relaxed text-neutral-600 line-clamp-3">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs rounded-full bg-neutral-100 text-neutral-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Film Modal */}
      <FilmModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}
