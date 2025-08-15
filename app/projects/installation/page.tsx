"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { InstallationModal } from "@/components/installation-modal"
import { Calendar, MapPin, Palette } from "lucide-react"

interface InstallationProject {
  id: string
  title: string
  year: string
  category: string
  medium: string
  description: string
  detailedDescription?: string
  images: string[]
  location?: string
  visitors?: number
  materials?: string[]
  dimensions?: string
  tags: string[]
  videoUrl?: string
  photoCount: number
  slidesLayout?: number[] // photos per slide
}

const installationProjects: InstallationProject[] = [
  {
    id: "skins-east-ethiopia",
    title: "sKINs: East Ethiopia Textile Installation",
    year: "2025",
    category: "Installation",
    medium: "Large-scale textile installation",
    description:
      "An immersive textile installation exploring the relationship between skin, fabric, and cultural identity in Eastern Ethiopia.",
    detailedDescription:
      "This monumental installation combines traditional Ethiopian textiles with contemporary materials to create an immersive environment that explores themes of identity, belonging, and cultural memory through the metaphor of skin as both protection and expression.",
    images: [
      "/placeholder.svg?height=600&width=800&text=sKINs+East+Ethiopia+1",
      "/placeholder.svg?height=600&width=800&text=sKINs+East+Ethiopia+2",
      "/placeholder.svg?height=600&width=800&text=sKINs+East+Ethiopia+3",
      "/placeholder.svg?height=600&width=800&text=sKINs+East+Ethiopia+4",
    ],
    location: "Contemporary Art Museum",
    visitors: 25000,
    materials: ["Traditional Ethiopian cotton", "Contemporary fibers", "LED lighting", "Natural dyes"],
    dimensions: "15m x 10m x 4m",
    tags: ["textile", "identity", "cultural heritage", "immersive"],
    photoCount: 4,
    slidesLayout: [1, 1, 1, 1], // 1 photo per slide
  },
  {
    id: "yal-exhibition",
    title: "YAL Exhibition",
    year: "2025",
    category: "Installation",
    medium: "Mixed media exhibition",
    description:
      "A comprehensive exhibition showcasing the evolution of contemporary Ethiopian art through multimedia installations.",
    detailedDescription:
      "YAL (Young African Leaders) exhibition presents a curated collection of works that represent the voice of contemporary Ethiopian artists, combining traditional techniques with modern technology and global perspectives.",
    images: [
      "/placeholder.svg?height=600&width=800&text=YAL+Exhibition+1",
      "/placeholder.svg?height=600&width=800&text=YAL+Exhibition+2",
      "/placeholder.svg?height=600&width=800&text=YAL+Exhibition+3",
    ],
    location: "National Gallery",
    visitors: 18000,
    materials: ["Mixed media", "Digital displays", "Traditional materials", "Interactive elements"],
    dimensions: "Gallery-wide installation",
    tags: ["contemporary", "multimedia", "youth", "leadership"],
    videoUrl: "https://drive.google.com/file/d/1AV8mLySkKCYWztSNfcE5uOuKVSwCGzb7/view?usp=sharing",
    photoCount: 3,
    slidesLayout: [1, 1, 1], // 3 photos + 1 video slide
  },
  {
    id: "bet-bota",
    title: "Bet Bota",
    year: "2022",
    category: "Installation",
    medium: "Architectural intervention",
    description:
      "An architectural intervention that transforms domestic spaces through textile elements and cultural memory.",
    detailedDescription:
      "Bet Bota (meaning 'house' in Amharic) is an installation that reimagines domestic spaces through the lens of Ethiopian cultural practices, using textiles and spatial interventions to create new narratives about home and belonging.",
    images: Array.from({ length: 18 }, (_, i) => `/placeholder.svg?height=600&width=800&text=Bet+Bota+${i + 1}`),
    location: "Cultural Center",
    visitors: 12000,
    materials: ["Architectural elements", "Traditional textiles", "Domestic objects", "Lighting"],
    dimensions: "Room-scale installation",
    tags: ["architecture", "domestic", "cultural memory", "space"],
    photoCount: 18,
    slidesLayout: Array(9).fill(2), // 9 slides with 2 photos each
  },
  {
    id: "hulet-neteb-installation",
    title: "Hulet Neteb Installation",
    year: "2022",
    category: "Installation",
    medium: "Interactive installation",
    description:
      "An interactive installation exploring the philosophical concept of duality through physical and digital elements.",
    detailedDescription:
      "This installation translates the film 'Hulet Neteb' into a physical space where visitors can experience the concept of duality through interactive elements that respond to movement and presence.",
    images: Array.from(
      { length: 7 },
      (_, i) => `/placeholder.svg?height=600&width=800&text=Hulet+Neteb+Installation+${i + 1}`,
    ),
    location: "Digital Arts Center",
    visitors: 8000,
    materials: ["Motion sensors", "Projection mapping", "Traditional elements", "Digital interfaces"],
    dimensions: "8m x 8m x 3m",
    tags: ["interactive", "philosophy", "duality", "digital"],
    photoCount: 7,
    slidesLayout: [1, 1, 1, 1, 1, 1, 1], // 1 photo per slide
  },
  {
    id: "decoding-legends-installation",
    title: "Decoding Legends Installation",
    year: "2021",
    category: "Installation",
    medium: "Multimedia installation",
    description:
      "A multimedia installation that brings ancient Ethiopian legends to life through contemporary art practices.",
    detailedDescription:
      "This installation creates an immersive environment where visitors can experience Ethiopian legends through a combination of visual, auditory, and tactile elements, bridging ancient storytelling with contemporary art.",
    images: Array.from({ length: 9 }, (_, i) => `/placeholder.svg?height=600&width=800&text=Decoding+Legends+${i + 1}`),
    location: "Gojo Residency",
    visitors: 15000,
    materials: ["Audio systems", "Visual projections", "Traditional artifacts", "Interactive displays"],
    dimensions: "Multi-room installation",
    tags: ["legends", "multimedia", "storytelling", "heritage"],
    photoCount: 9,
    slidesLayout: [1, 1, 1, 1, 1, 1, 1, 1, 1], // 1 photo per slide
  },
]

export default function InstallationPage() {
  const [selectedProject, setSelectedProject] = useState<InstallationProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProjectClick = (project: InstallationProject) => {
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
      <Navigation currentPath="/projects/installation" />

      <main className="pt-32 pb-20">
        <div className="w-full px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6">Installation Works</h1>
          </div>

          {/* Projects Grid - Full width with proper alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {installationProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer bg-white border border-neutral-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-500"
                onClick={() => handleProjectClick(project)}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.images[0] || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Category Badge */}
                  <div
                    className={`absolute top-4 left-4 flex items-center space-x-2 px-3 py-1 rounded-full border backdrop-blur-sm ${getCategoryBg(project.category)}`}
                  >
                    <Palette className={`h-4 w-4 ${getCategoryColor(project.category)}`} />
                    <span className={`text-xs font-medium capitalize ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Photo Count Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {project.photoCount} {project.videoUrl ? "+ video" : "photos"}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-center space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-white text-sm font-medium">View Installation</div>
                      <div className="w-8 h-px bg-white/50 mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-light leading-tight text-black group-hover:text-amber-500 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1 text-neutral-500">
                        <Calendar className="h-3 w-3" />
                        <span>{project.year}</span>
                      </div>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Installation Modal */}
      <InstallationModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}
