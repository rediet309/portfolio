"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ProjectModal } from "@/components/project-modal"
import { Calendar, Users } from "lucide-react"

interface Project {
  id: string
  title: string
  year: string
  category: string
  medium: string
  description: string
  detailedDescription?: string
  image: string
  dimensions?: string
  materials?: string[]
  collaborators?: string
  tags: string[]
}

const textileProjects: Project[] = [
  {
    id: "quantum-threads",
    title: "Quantum Threads",
    year: "2025",
    category: "Textile",
    medium: "Interactive Installation",
    description: "A revolutionary textile installation that responds to viewer movement using fiber optic technology.",
    detailedDescription:
      "Quantum Threads explores the intersection of traditional Ethiopian weaving techniques with cutting-edge fiber optic technology. The installation creates an immersive environment where ancient textile patterns come alive through light and movement, responding to viewers' presence and creating unique visual experiences.",
    image: "/placeholder.svg?height=600&width=800&text=Quantum+Threads",
    dimensions: "12m x 8m x 3m",
    materials: ["Traditional Ethiopian cotton", "Fiber optic cables", "Motion sensors", "LED systems"],
    collaborators: "8K+",
    tags: ["Interactive", "Technology", "Fiber Optics"],
  },
  {
    id: "woven-memories",
    title: "Woven Memories",
    year: "2024",
    category: "Textile",
    medium: "Traditional weaving",
    description:
      "A series of traditional textiles that incorporate family photographs and personal narratives into the weaving process.",
    detailedDescription:
      "This project combines traditional Ethiopian weaving techniques with contemporary storytelling, incorporating digitally printed family photographs and personal narratives directly into the textile structure, creating a new form of cultural documentation.",
    image: "/placeholder.svg?height=600&width=800&text=Woven+Memories",
    dimensions: "Various sizes",
    materials: ["Handspun cotton", "Natural dyes", "Digital printing", "Traditional looms"],
    tags: ["traditional", "family", "storytelling", "heritage"],
  },
  {
    id: "digital-habesha",
    title: "Digital Habesha",
    year: "2023",
    category: "Textile",
    medium: "Digital textile design",
    description:
      "Contemporary interpretations of traditional Habesha clothing using digital design and modern manufacturing techniques.",
    detailedDescription:
      "Digital Habesha reimagines traditional Ethiopian clothing for the digital age, using computational design to create new patterns while respecting cultural significance and traditional aesthetics.",
    image: "/placeholder.svg?height=600&width=800&text=Digital+Habesha",
    dimensions: "Garment collection",
    materials: ["Digital printing", "Sustainable fabrics", "Traditional patterns", "Modern cuts"],
    tags: ["digital", "contemporary", "sustainable", "fashion"],
  },
  {
    id: "threads-of-diaspora",
    title: "Threads of Diaspora",
    year: "2022",
    category: "Textile",
    medium: "Community collaboration",
    description:
      "A collaborative textile project involving Ethiopian diaspora communities worldwide, creating a global tapestry of shared experiences.",
    detailedDescription:
      "This community-driven project connects Ethiopian diaspora communities across the globe through textile creation, with each community contributing pieces that reflect their local experiences while maintaining connections to Ethiopian heritage.",
    image: "/placeholder.svg?height=600&width=800&text=Threads+of+Diaspora",
    dimensions: "Global installation",
    materials: ["Community contributions", "Mixed textiles", "Local materials", "Shipping containers"],
    collaborators: "50+ communities",
    tags: ["diaspora", "community", "global", "collaboration"],
  },
]

export default function TextilePage() {
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
    return "text-amber-500"
  }

  const getCategoryBg = (category: string) => {
    return "bg-amber-500/10 border-amber-500/20"
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects/textile" />

      <main className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Header */}
          <div className="mb-12 sm:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-black mb-4 sm:mb-6">Textile Works</h1>
          </div>

          {/* Projects Grid - Enhanced responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {textileProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer bg-white border border-neutral-200 rounded-sm overflow-hidden"
                onClick={() => handleProjectClick(project)}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Category Badge */}
                  <div
                    className={`absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 rounded-full border backdrop-blur-sm ${getCategoryBg(project.category)}`}
                  >
                    <span className={`text-xs font-medium capitalize ${getCategoryColor(project.category)}`}>
                      Textile
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 flex items-center justify-center">
                    <div className="text-center space-y-2 sm:space-y-3 transform translate-y-4 transition-transform duration-500">
                      <div className="text-white text-xs sm:text-sm font-medium">View Textile</div>
                      <div className="w-6 sm:w-8 h-px bg-white/50 mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-light leading-tight text-black">{project.title}</h3>

                    <p className="text-xs sm:text-sm text-neutral-600">{project.medium}</p>

                    <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                      <div className="flex items-center space-x-1 text-neutral-500">
                        <Calendar className="h-3 w-3" />
                        <span>{project.year}</span>
                      </div>
                      {project.collaborators && (
                        <div className="flex items-center space-x-1 text-neutral-500">
                          <Users className="h-3 w-3" />
                          <span>{project.collaborators}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-2">
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
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} isDark={false} />
    </div>
  )
}
