"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Calendar, Camera, User, Users } from "lucide-react"
import InstallationModal from "@/components/installation-modal"

interface StudioProject {
  id: string
  title: string
  year: string
  category: string
  description: string
  detailedDescription?: string
  image: string
  location?: string
  visitors?: number
  tags: string[]
  photoCount?: number
  slidesLayout?: number[]
  images?: string[]
  client?: string
  videoUrl?: string
}

const studioProjects: StudioProject[] = [
  {
    id: "skins-north-ethiopia",
    title: "sKINs: North Ethiopia",
    year: "2025",
    category: "In Studio",
    description:
      "This sub-collection honors ancestral skin markings as symbols of protection, beauty, and spirituality. Inspired by the artist's late great-grandmother, transforms these sacred symbols into garments that carry memory, meaning, and resilience.",
    detailedDescription:
      "This studio-based work involves extensive field research and documentation of cultural practices related to body modification, traditional scarification, and ceremonial body art in Northern Ethiopian communities. The project serves as both artistic exploration and cultural preservation, creating a visual archive of practices that connect contemporary Ethiopian identity to ancestral traditions.",
    image: "/placeholder.svg?height=600&width=800&text=sKINs+North+Ethiopia",
    position: "Director, cinematographer, writer, and Textile Artist",
    tags: ["documentation", "photography", "cultural practices", "preservation"],
    images: Array.from({ length: 4 }, (_, i) => `/placeholder.svg?height=800&width=600&text=sKINs+North+${i + 1}`),
  },
  {
    id: "hulet-neteb-project",
    title: "Hulet neteb project",
    year: "2022",
    category: "In Studio",
    description:
      "“Hulet Neteb / Two Dots” uses the Ethiopian “:” to explore identity and heritage through hand-painted and pre-owned garments.",
    detailedDescription:
      "This studio-based work involves extensive field research and documentation of cultural practices related to body modification, traditional scarification, and ceremonial body art in Northern Ethiopian communities. The project serves as both artistic exploration and cultural preservation, creating a visual archive of practices that connect contemporary Ethiopian identity to ancestral traditions.",
    image: "/placeholder.svg?height=600&width=800&text=Hulet+Neteb",
    position: " Director, Producer, Curator, and Textile Artist",
    tags: ["documentation", "photography", "cultural practices", "preservation"],
    images: Array.from({ length: 16 }, (_, i) => `/placeholder.svg?height=800&width=600&text=Hulet+Neteb+${i + 1}`),
  },
  {
    id: "sheret-project",
    title: "Sheret Project",
    year: "2025",
    category: "In Studio",
    description:
      "The Sheret/Sarong is a tubular textile from Indonesia, used in East Africa for hot climates, rituals, and protection, and to wrap fallen soldiers.",
    detailedDescription:
      "This studio-based work involves extensive field research and documentation of cultural practices related to body modification, traditional scarification, and ceremonial body art in Northern Ethiopian communities. The project serves as both artistic exploration and cultural preservation, creating a visual archive of practices that connect contemporary Ethiopian identity to ancestral traditions.",
    image: "/placeholder.svg?height=600&width=800&text=Sheret+Project",
    position: "Textile Artist and researcher",
    tags: ["documentation", "photography", "cultural practices", "preservation"],
    images: Array.from({ length: 6 }, (_, i) => `/placeholder.svg?height=800&width=600&text=Sheret+${i + 1}`),
  },
  {
    id: "yal-studio",
    title: "YAL",
    year: "2025",
    category: "In Studio",
    description:
      "“YAL / Ye Abayn Lij” explores ritual and design, named for the paradox of lacking one's own abundance.",
    detailedDescription:
      "This studio-based work involves extensive field research and documentation of cultural practices related to body modification, traditional scarification, and ceremonial body art in Northern Ethiopian communities. The project serves as both artistic exploration and cultural preservation, creating a visual archive of practices that connect contemporary Ethiopian identity to ancestral traditions.",
    image: "/placeholder.svg?height=600&width=800&text=YAL+Studio",
    position: "Textile Artist and curator",
    tags: ["documentation", "photography", "cultural practices", "preservation"],
    videoUrl: "/placeholder.svg?height=1080&width=1920&text=YAL+Video",
  },
]

export default function InStudioPage() {
  const [selectedProject, setSelectedProject] = useState<StudioProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProjectClick = (project: StudioProject) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const getCategoryColor = (category: string) => {
    return "text-green-600"
  }

  const getCategoryBg = (category: string) => {
    return "bg-green-100 border-green-200"
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects/in-studio" />

      <main className="pt-32 pb-20">
        <div className="w-full px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6">In Studio</h1>
          </div>

          {/* Projects Grid - Full width with proper alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {studioProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
                onClick={() => handleProjectClick(project)}
              >
                <div className="rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                      <Camera className={`h-4 w-4 ${getCategoryColor(project.category)}`} />
                      <span className={`text-xs font-medium capitalize ${getCategoryColor(project.category)}`}>
                        In Studio
                      </span>
                    </div>

                    {/* Photo Count Badge */}
                    {project.photoCount && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {project.photoCount} photos
                        </div>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="text-center space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="text-white text-sm font-medium">View Studio Work</div>
                        <div className="w-8 h-px bg-white/50 mx-auto" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-light leading-tight text-black group-hover:text-neutral-600 transition-colors duration-300">
                        {project.title}
                      </h3>

                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1 text-neutral-500">
                          <Calendar className="h-3 w-3" />
                          <span>{project.year}</span>
                        </div>
                        {project.position && (
                          <div className="flex items-center space-x-1 text-neutral-500">
                            <User className="h-3 w-3" />
                            <span>{project.position}</span>
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

                    <p className="text-sm leading-relaxed text-neutral-600 line-clamp-3">{project.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
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

      {/* Studio Modal */}
      {selectedProject && <InstallationModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  )
}
