"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { FilmModal } from "@/components/film-modal"
import { InstallationModal } from "@/components/installation-modal"
import { Calendar, Briefcase, Users, MapPin, Play, Camera } from "lucide-react"

interface Project {
  id: string
  title: string
  year: string
  category: string
  medium: string
  description: string
  detailedDescription?: string
  image: string
  client?: string
  location?: string
  visitors?: number
  tags: string[]
  videoUrl?: string
  duration?: string
  photoCount?: number
  slidesLayout?: number[]
  images?: string[]
  type: "video" | "photo"
}

const commissionProjects: Project[] = [
  {
    id: "heart-of-a-child",
    title: "Heart of a Child",
    year: "2025",
    category: "Commissioned",
    medium: "Commercial film",
    description:
      "A heartwarming commercial film exploring childhood innocence and dreams through Ethiopian cultural lens.",
    detailedDescription:
      "This commissioned work captures the universal language of childhood while celebrating Ethiopian cultural values, creating an emotional narrative that resonates across cultures and generations.",
    image: "/placeholder.svg?height=600&width=800&text=Heart+of+a+Child",
    client: "International NGO",
    location: "Addis Ababa, Ethiopia",
    videoUrl: "https://youtu.be/bLUtlsYxqpU?si=eU5MdCaaTsTjOGsJ",
    duration: "3:45",
    tags: ["commercial", "childhood", "cultural values", "emotional", "NGO"],
    type: "video",
  },
  {
    id: "arada-easter-commercial",
    title: "Arada Easter Commercial",
    year: "2024",
    category: "Commissioned",
    medium: "Commercial advertisement",
    description:
      "A vibrant commercial celebrating Ethiopian Easter traditions in the historic Arada district of Addis Ababa.",
    detailedDescription:
      "This commercial captures the joy and community spirit of Ethiopian Easter celebrations, showcasing traditional practices and modern life in one of Addis Ababa's most culturally rich neighborhoods.",
    image: "/placeholder.svg?height=600&width=800&text=Arada+Easter+Commercial",
    client: "Local Business Consortium",
    location: "Arada, Addis Ababa",
    videoUrl: "https://youtu.be/gHnCjF4GLHk?si=X7Zleobndl873NaO",
    duration: "2:30",
    tags: ["commercial", "easter", "traditions", "community", "arada"],
    type: "video",
  },
  {
    id: "the-river-commission",
    title: "The River",
    year: "2024",
    category: "Commissioned",
    medium: "Documentary trailer",
    description:
      "A commissioned documentary trailer exploring water rights and environmental conservation along Ethiopian rivers.",
    detailedDescription:
      "This commissioned documentary examines the complex relationship between communities and water resources, highlighting both challenges and solutions in Ethiopian water management and conservation efforts.",
    image: "/placeholder.svg?height=600&width=800&text=The+River+Commission",
    client: "Environmental Foundation",
    location: "Various river locations, Ethiopia",
    videoUrl: "https://youtu.be/z_ijqn0ewM0?si=CwfuWOyAfWqHjDK6",
    duration: "4:12",
    tags: ["environmental", "water rights", "conservation", "documentary", "trailer"],
    type: "video",
  },
  {
    id: "msfts-ethiopia-skate",
    title: "MSFTS x Ethiopia Skate",
    year: "2024",
    category: "Commissioned",
    medium: "Brand collaboration video",
    description:
      "A creative collaboration documenting the emerging skateboarding culture in Ethiopia through fashion and lifestyle.",
    detailedDescription:
      "This brand collaboration explores the intersection of global skateboarding culture with Ethiopian youth identity, creating visual narratives that celebrate both local and international influences.",
    image: "/placeholder.svg?height=600&width=800&text=MSFTS+Ethiopia+Skate",
    client: "MSFTS Brand",
    location: "Addis Ababa, Ethiopia",
    videoUrl: "https://drive.google.com/file/d/1EguZ8WEBDYJItUhAVcpyyAoVgcxfwnMA/view?usp=sharing",
    duration: "5:20",
    tags: ["skateboarding", "youth culture", "fashion", "collaboration", "brand"],
    type: "video",
  },
  {
    id: "ashes-modeling",
    title: "Ashes Modeling",
    year: "2023",
    category: "Commissioned",
    medium: "Fashion photography",
    description:
      "A high-fashion modeling project exploring themes of transformation and renewal through Ethiopian aesthetics.",
    detailedDescription:
      "This fashion photography commission uses the metaphor of ashes and renewal to create striking visual narratives that blend Ethiopian cultural elements with contemporary fashion aesthetics.",
    image: "/placeholder.svg?height=600&width=800&text=Ashes+Modeling",
    client: "Fashion Magazine",
    location: "Studio and outdoor locations",
    photoCount: 8,
    slidesLayout: [3, 3, 2], // First slide: 3 photos, Second slide: 3 photos, Third slide: 2 photos
    images: [
      "/placeholder.svg?height=800&width=600&text=Ashes+Model+1",
      "/placeholder.svg?height=800&width=600&text=Ashes+Model+2",
      "/placeholder.svg?height=800&width=600&text=Ashes+Model+3",
      "/placeholder.svg?height=800&width=600&text=Ashes+Model+4",
      "/placeholder.svg?height=800&width=600&text=Ashes+Model+5",
      "/placeholder.svg?height=800&width=600&text=Ashes+Model+6",
      "/placeholder.svg?height=800&width=600&text=Ashes+Model+7",
      "/placeholder.svg?height=800&width=600&text=Ashes+Model+8",
    ],
    tags: ["fashion", "modeling", "transformation", "aesthetics", "photography"],
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
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6">Commissioned Works</h1>
          </div>

          {/* Projects Grid - Full width with proper alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {commissionProjects.map((project) => (
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
                    <Briefcase className={`h-4 w-4 ${getCategoryColor(project.category)}`} />
                    <span className={`text-xs font-medium capitalize ${getCategoryColor(project.category)}`}>
                      Commissioned
                    </span>
                  </div>

                  {/* Media Type Indicator */}
                  <div className="absolute top-4 right-4">
                    {project.type === "video" ? (
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
                        {project.type === "video" ? "Watch Video" : "View Photos"}
                      </div>
                      <div className="w-8 h-px bg-white/50 mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-light leading-tight text-black group-hover:text-emerald-500 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1 text-neutral-500">
                        <Calendar className="h-3 w-3" />
                        <span>{project.year}</span>
                      </div>
                      {project.client && (
                        <div className="flex items-center space-x-1 text-neutral-500">
                          <Users className="h-3 w-3" />
                          <span>{project.client}</span>
                        </div>
                      )}
                      {project.location && (
                        <div className="flex items-center space-x-1 text-neutral-500">
                          <MapPin className="h-3 w-3" />
                          <span>{project.location}</span>
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
                    {project.type === "video" && project.duration && `Duration: ${project.duration}`}
                    {project.type === "photo" && project.photoCount && `${project.photoCount} photos`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Conditional Modal Rendering */}
      {selectedProject?.type === "video" ? (
        <FilmModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
      ) : (
        <InstallationModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  )
}
