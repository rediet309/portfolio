"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { FilmModal } from "@/components/film-modal"
import { InstallationModal } from "@/components/installation-modal"
import { Calendar, Clock, User, Briefcase, Play, Camera } from "lucide-react"

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
  client?: string
  videoUrl?: string
  tags: string[]
  photoCount?: number
  slidesLayout?: number[]
  images?: string[]
  type: "film" | "photo"
}

const commissionProjects: Project[] = [
  {
    id: "heart-of-a-child",
    title: "Heart of a Child",
    year: "2025",
    category: "Commissioned",
    medium: "Commercial Film",
    description:
      "A heartfelt commercial exploring childhood experiences and emotional development through Ethiopian cultural lens.",
    detailedDescription:
      "Heart of a Child is a heartwarming commercial film that captures the universal experience of childhood while celebrating specifically Ethiopian cultural values, family structures, and community relationships. The film combines professional commercial production values with authentic cultural storytelling, creating an emotionally resonant piece that speaks to both local and international audiences.",
    image: "/placeholder.svg?height=600&width=800&text=Heart+of+a+Child",
    position: "Art director",
    videoUrl: "https://youtu.be/bLUtlsYxqpU?si=eU5MdCaaTsTjOGsJ",
    tags: ["commercial", "childhood", "cultural values", "emotional"],
    type: "film",
  },
  {
    id: "arada-easter-commercial",
    title: "Arada Easter Commercial",
    year: "2024",
    category: "Commissioned",
    medium: "Commercial Film",
    description: "Easter celebration commercial for Arada showcasing community and tradition.",
    detailedDescription:
      "A vibrant commercial celebrating Ethiopian Easter traditions in the historic Arada district of Addis Ababa. This commissioned work captures the energy and spiritual significance of Ethiopian Orthodox Easter celebrations, featuring authentic community participation and traditional ceremonial elements. The commercial successfully balances commercial objectives with cultural authenticity.",
    image: "/placeholder.svg?height=600&width=800&text=Arada+Easter+Commercial",
    position: "Director, producer, stylist",
    videoUrl: "https://youtu.be/gHnCjF4GLHk?si=X7Zleobndl873NaO",
    tags: ["commercial", "easter", "community", "tradition"],
    type: "film",
  },
  {
    id: "the-river-commission",
    title: "The River",
    year: "2024",
    category: "Commissioned",
    medium: "Film Trailer",
    description: "Commissioned documentary trailer exploring water rights and environmental conservation.",
    detailedDescription:
      "A commissioned documentary trailer that demonstrates sophisticated understanding of both documentary filmmaking and environmental advocacy, creating compelling visual narratives that highlight the urgent need for water conservation in Ethiopia. The piece serves as both artistic expression and environmental activism, using cinematic techniques to draw attention to critical environmental issues.",
    image: "/placeholder.svg?height=600&width=800&text=The+River+Trailer",
    position: "Production designer and set designer",
    videoUrl: "https://youtu.be/z_ijqn0ewM0?si=CwfuWOyAfWqHjDK6",
    tags: ["trailer", "environmental", "water rights", "conservation"],
    type: "film",
  },
  {
    id: "msfts-ethiopia-skate-commission",
    title: "MSFTS x Ethiopia Skate",
    year: "2024",
    category: "Commissioned",
    medium: "Brand Collaboration",
    description: "Creative collaboration documenting the emerging skateboarding culture in Ethiopia.",
    detailedDescription:
      "A commissioned work for MSFTS that captures the intersection of global skateboarding culture with Ethiopian urban youth expression, featuring authentic documentation of skate culture development in Ethiopian cities. The project demonstrates how global youth movements adapt and transform within local cultural contexts.",
    image: "/placeholder.svg?height=600&width=800&text=MSFTS+Ethiopia+Skate",
    position: "Creative director",
    videoUrl: "https://drive.google.com/file/d/1EguZ8WEBDYJItUhAVcpyyAoVgcxfwnMA/view?usp=sharing",
    tags: ["skateboarding", "youth culture", "fashion", "collaboration"],
    type: "photo",
  },
    {
    id: "except-thise-time-nothing-returns-from-the-ashes",
    title: "Except this time nothing returns from the ashes",
    year: "2023",
    category: "Commissioned",
    medium: "Brand Collaboration",
    description: "Creative collaboration documenting the emerging skateboarding culture in Ethiopia.",
    detailedDescription:
      "A commissioned work for MSFTS that captures the intersection of global skateboarding culture with Ethiopian urban youth expression, featuring authentic documentation of skate culture development in Ethiopian cities. The project demonstrates how global youth movements adapt and transform within local cultural contexts.",
    image: "/placeholder.svg?height=600&width=800&text=MSFTS+Ethiopia+Skate",
    position: "modeling",
    videoUrl: "https://drive.google.com/file/d/1EguZ8WEBDYJItUhAVcpyyAoVgcxfwnMA/view?usp=sharing",
    tags: ["skateboarding", "youth culture", "fashion", "collaboration"],
    type: "photo",
  },
]

export default function CommissionsPage() {
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
    return "text-emerald-500"
  }

  const getCategoryBg = (category: string) => {
    return "bg-emerald-500/10 border-emerald-500/20"
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects/commissions" />

      <main className="pt-32 pb-20">
        <div className="w-full px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6">Commissions</h1>
          </div>

          {/* Projects Grid - Full width with proper alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {commissionProjects.map((project) => (
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
                      <Briefcase className={`h-4 w-4 ${getCategoryColor(project.category)}`} />
                      <span className={`text-xs font-medium capitalize ${getCategoryColor(project.category)}`}>
                        Commissioned
                      </span>
                    </div>

                    {/* Media Type Indicator */}
                    <div className="absolute top-4 right-4">
                      {project.type === "film" ? (
                        <div className="p-2 rounded-full bg-black/70 backdrop-blur-sm">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-full bg-black/70 backdrop-blur-sm">
                          <Camera className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="text-center space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="text-white text-sm font-medium">
                          {project.type === "film" ? "Watch Film" : "View Photos"}
                        </div>
                        <div className="w-8 h-px bg-white/50 mx-auto" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-light leading-tight text-black group-hover:text-emerald-500 transition-colors duration-300">
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
                        {project.position && (
                          <div className="flex items-center space-x-1 text-neutral-500">
                            <User className="h-3 w-3" />
                            <span>{project.position}</span>
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

                    {/* Media Info */}
                    <div className="text-xs text-neutral-400">
                      {project.type === "film" && project.duration && `Duration: ${project.duration}`}
                      {project.type === "photo" && project.photoCount && `${project.photoCount} photos`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modals */}
      {selectedProject && selectedProject.type === "film" && (
        <FilmModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
      )}
      {selectedProject && selectedProject.type === "photo" && (
        <InstallationModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  )
}
