"use client"

import { useState } from "react"
import Image from "next/image"
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
    medium: "Music Video",
    description:
      "",
    detailedDescription:
      "",
    image: "/images/HOC.webp?height=600&width=800&text=Heart+of+a+Child",
    position: "Art director",
    videoUrl: "https://youtu.be/bLUtlsYxqpU?si=eU5MdCaaTsTjOGsJ",
    tags: [],
    type: "film",
  },
  {
    id: "arada-easter-commercial",
    title: "Arada Easter Commercial",
    year: "2024",
    category: "Commissioned",
    medium: "Commercial Film",
    description: "",
    detailedDescription:
      "",
    image: "/images/arada.webp?height=600&width=800&text=Arada+Easter+Commercial",
    position: "Director, producer, stylist",
    videoUrl: "https://youtu.be/gHnCjF4GLHk?si=X7Zleobndl873NaO",
    tags: ["easter", "market", "beverage"],
    type: "film",
  },
  {
    id: "the-river-commission",
    title: "The River",
    year: "2024",
    category: "Commissioned",
    medium: "Film",
    description: "",
    detailedDescription:
      "",
    image: "/images/river.webp?height=600&width=800&text=The+River+Trailer",
    position: "Production designer and set designer",
    videoUrl: "https://youtu.be/z_ijqn0ewM0?si=CwfuWOyAfWqHjDK6",
    tags: ["community", "women", "water"],
    type: "film",
  },
  {
    id: "msfts-ethiopia-skate-commission",
    title: "MSFTS x Ethiopia Skate",
    year: "2024",
    category: "Commissioned",
    medium: "Skateboarding",
    description: "",
    detailedDescription:
      "",
    image: "/images/a12-1.webp",
    position: "Creative Direction, stylist, and video contributions",
    videoUrl: "https://drive.google.com/file/d/1EguZ8WEBDYJItUhAVcpyyAoVgcxfwnMA/view?usp=sharing",
    tags: ["skateboarding", "youth culture", "fashion"],
    type: "film",
  },
  {
    id: "except-thise-time-nothing-returns-from-the-ashes",
    title: "Except this time nothing returns from the ashes",
    year: "2023",
    category: "Commissioned",
    description: "",
    detailedDescription:
      "",
    image: "/images/a7-0.webp",
    position: "Modeling",
    images: Array.from({ length: 8 }, (_, i) => `/placeholder.svg?height=800&width=600&text=Ashes+Photo+${i + 1}`),
    photoCount: 8,
    tags: [],
    type: "photo",
    images: [
      "/images/a1-0.webp",
      "/images/a2-0.webp",
      "/images/a3-0.webp",
      "/images/a4-0.webp",
      "/images/a5-0.webp",
      "/images/a6-0.webp",
      "/images/a7-0.webp",
      "/images/a8-0.webp",
    ],
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

      <main className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Header */}
          <div className="mb-12 sm:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-stardom text-black mb-4 sm:mb-6">Commissions</h1>
          </div>

          {/* Projects Grid - Enhanced responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {commissionProjects.map((project, index) => (
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
                      decoding="async"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />

                    {/* Category Badge */}
                    <div
                      className={`absolute top-2 sm:top-4 left-2 sm:left-4 flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 rounded-full border backdrop-blur-sm ${getCategoryBg(project.category)}`}
                    >
                      <Briefcase className={`h-3 w-3 sm:h-4 sm:w-4 ${getCategoryColor(project.category)}`} />
                      <span className={`text-xs font-medium capitalize ${getCategoryColor(project.category)}`}>
                        Commissioned
                      </span>
                    </div>

                    {/* Media Type Indicator */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                      {project.type === "film" ? (
                        <div className="p-1.5 sm:p-2 rounded-full bg-black/70 backdrop-blur-sm">
                          <Play className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </div>
                      ) : (
                        <div className="p-1.5 sm:p-2 rounded-full bg-black/70 backdrop-blur-sm">
                          <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 flex items-center justify-center">
                      <div className="text-center space-y-2 sm:space-y-3 transform translate-y-4 transition-transform duration-500">
                        <div className="text-white text-xs sm:text-sm font-medium">
                          {project.type === "film" ? "Watch Film" : "View Photos"}
                        </div>
                        <div className="w-6 sm:w-8 h-px bg-white/50 mx-auto" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-stardom leading-tight text-black">{project.title}</h3>

                      <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                        
                        {project.duration && (
                          <div className="flex items-center space-x-1 text-neutral-500">
                            <Clock className="h-3 w-3" />
                            <span>{project.duration}</span>
                          </div>
                        )}
                        {project.position && (
                          <div className="flex items-center space-x-1 text-neutral-500">
                            <User className="h-3 w-3" />
                            <span className="truncate">{project.position}</span>
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
