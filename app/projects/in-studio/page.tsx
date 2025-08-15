"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { InstallationModal } from "@/components/installation-modal"
import { Calendar, Palette, Clock } from "lucide-react"

interface Project {
  id: string
  title: string
  year: string
  category: string
  medium: string
  description: string
  detailedDescription?: string
  image: string
  duration?: string
  materials?: string[]
  dimensions?: string
  tags: string[]
  photoCount?: number
}

const studioProjects: Project[] = [
  {
    id: "skins-north-ethiopia",
    title: "sKINs: North Ethiopia",
    year: "2023",
    category: "In Studio",
    medium: "Photography and documentation",
    description:
      "Comprehensive photographic documentation of traditional skin practices and body art in Northern Ethiopia.",
    detailedDescription:
      "This extensive documentation project captures the rich tradition of body art, scarification, and skin decoration practices in Northern Ethiopian communities, serving as both artistic exploration and cultural preservation.",
    image: "/placeholder.svg?height=600&width=800&text=sKINs+North+Ethiopia",
    duration: "6 months",
    materials: ["Photography equipment", "Documentation tools", "Field notes", "Digital archives"],
    dimensions: "Photographic series - 4 photos",
    tags: ["documentation", "photography", "cultural practices", "preservation", "north ethiopia", "skin art"],
    photoCount: 4,
  },
]

export default function InStudioPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const getCategoryColor = (category: string) => {
    return "text-purple-500"
  }

  const getCategoryBg = (category: string) => {
    return "bg-purple-500/10 border-purple-500/20"
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
                    <Palette className={`h-4 w-4 ${getCategoryColor(project.category)}`} />
                    <span className={`text-xs font-medium capitalize ${getCategoryColor(project.category)}`}>
                      In Studio
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-center space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-white text-sm font-medium">View Process</div>
                      <div className="w-8 h-px bg-white/50 mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-light leading-tight text-black group-hover:text-purple-500 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1 text-neutral-500">
                        <Calendar className="h-3 w-3" />
                        <span>{project.year}</span>
                      </div>
                      {project.duration && (
                        <div className="flex items-center space-x-1 text-neutral-500">
                          <Clock className="h-3 w-3" />
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

      {/* Project Modal */}
      <InstallationModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}
