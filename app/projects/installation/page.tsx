"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Calendar, Building, User, Users } from "lucide-react"
import { InstallationModal } from "@/components/installation-modal"

interface InstallationProject {
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
  dimensions?: string
  materials?: string[]
  tags: string[]
  photoCount?: number
  slidesLayout?: number[]
  videoUrl?: string
  images?: string[]
  imageDescriptions?: string[]
}

const installationProjects: InstallationProject[] = [
  {
    id: "skins-east-ethiopia",
    title: "sKINs: East Ethiopia Textile Installation",
    year: "2025",
    category: "Installation",
    description:
      "An immersive textile installation and film screening exploring the r/s between skin, fabric, and cultural identity in Eastern Ethiopia.",
    detailedDescription:
      "This large-scale installation features traditional textiles from Eastern Ethiopia arranged in a contemporary gallery context, creating dialogue between historical textile practices and modern artistic expression. The work transforms gallery space into a meditation on cultural memory and material heritage. Currently available for sale, this installation represents the culmination of extensive research into Ethiopian textile traditions.",
    image: "/placeholder.svg?height=600&width=800&text=sKINs+East+Ethiopia+Installation",
    position: "Textile Artist, Director, Producer, Cinematographer, Writer",
    materials: ["Traditional textiles", "Contemporary display systems", "Lighting", "Sound"],
    tags: ["textile", "identity", "cultural heritage", "for sale"],
    photoCount: 4,
    imageDescriptions: [
      "Front side view/suspended tent structure incapsulating the sKins film screening within/, hand dyed and embroidered textile mixed with traditional garment fabrics of Dire Dawa, 2025",
      "Right side view, black textile, silver string textile knotted, love letter of the artists’ parents from the 80's encapsulated, 2025",
      "Left side view, hand printed yellow floral textile with cutouts, and embroidery mixed with traditional garment fabrics of Dire Dawa, 2025.",
      "Back side view, black tea dyed textile with hand embroidery, Image of artists’ mother form 80's, henna paste hand painted decorative art, 2025.",
    ],
    images: Array.from({ length: 4 }, (_, i) => `/placeholder.svg?height=800&width=600&text=sKINs+East+${i + 1}`),
  },
  {
    id: "yal-exhibition",
    title: "YAL Exhibition",
    year: "2025",
    category: "Installation",
    description:
      "“YAL / Ye Abayn Lij” explores ritual and design, named for the paradox of lacking one’s own abundance.",
    detailedDescription:
      "The YAL (Young African Leaders) exhibition features multimedia installations that examine leadership, youth culture, and artistic innovation in modern Ethiopia. The exhibition includes 17 distinct photographic works alongside an immersive walkthrough video experience that guides viewers through the conceptual framework of contemporary Ethiopian artistic practice.",
    image: "/placeholder.svg?height=600&width=800&text=YAL+Exhibition",
    position: "Textile Artist and curator ",
    materials: ["Photography", "Video installations", "Interactive displays", "Sound systems"],
    tags: ["contemporary", "multimedia", "youth", "leadership"],
    photoCount: 17,
    videoUrl: "https://drive.google.com/file/d/1AV8mLySkKCYWztSNfcE5uOuKVSwCGzb7/view?usp=sharing",
    images: Array.from({ length: 17 }, (_, i) => `/placeholder.svg?height=800&width=600&text=YAL+Exhibition+${i + 1}`),
  },
  {
    id: "bet-bota",
    title: "Bet Bota",
    year: "2022",
    category: "Installation",
    description:
      "“Bet/Bota” reimagines the Ethiopian home, exploring memory and history through immersive sets and everyday objects.",
    detailedDescription:
      "“Bet/Bota” reimagines the Ethiopian home as a space where memory and history intersect with imagination. Set against 1970s Addis Ababa, the project unfolds through eight immersive sets ranging from elemental abstractions to reconstructed living spaces. At its heart, a dining room unites these worlds, revealing the quiet power of everyday objects. Both house and archive, “Bet/Bota” invites reflection on how space shapes us, and how we, in turn, shape space.",
    image: "/placeholder.svg?height=600&width=800&text=Bet+Bota+Installation",
    position: "Model, Director",
    materials: ["Traditional textiles", "Architectural elements", "Lighting systems", "Interactive spaces"],
    tags: ["architecture", "domestic", "cultural memory", "space"],
    photoCount: 18,
    slidesLayout: [2, 2, 2, 2, 2, 2, 2, 2, 2], // 2 photos per carousel slide
    images: Array.from({ length: 18 }, (_, i) => `/placeholder.svg?height=800&width=600&text=Bet+Bota+${i + 1}`),
  },
  {
    id: "hulet-neteb-installation",
    title: "Hulet Neteb Installation",
    year: "2022",
    category: "Installation",
    description:
      "“Hulet Neteb / Two Dots” uses the Ethiopian “:” to explore identity and heritage through hand-painted and pre-owned garments.",
    detailedDescription:
      "Building on the themes from the experimental film of the same name, this installation creates an immersive environment where visitors can physically engage with the concept of 'Hulet Neteb' (two things). The work demonstrates how philosophical concepts can be experienced through spatial and tactile engagement, documented through 7 comprehensive photographs.",
    image: "/placeholder.svg?height=600&width=800&text=Hulet+Neteb+Installation",
    position: "Director, Producer, Curator, and Textile Artist",
    materials: ["Interactive sensors", "Digital displays", "Physical objects", "Sound design"],
    tags: ["interactive", "philosophy", "duality", "digital"],
    photoCount: 7,
    images: Array.from(
      { length: 7 },
      (_, i) => `/placeholder.svg?height=800&width=600&text=Hulet+Neteb+Install+${i + 1}`,
    ),
  },
  {
    id: "decoding-legends-installation",
    title: "Decoding Legends Installation",
    year: "2021",
    category: "Installation",
    description: "“Ete’ya” reimagines traditional Ethiopian attire with a blue cloak, red pants, and headscarf, honoring the legendary queen.",
    detailedDescription:
      "Created during the prestigious Gojo residency program, this immersive work combines video, sound, textile, and sculptural elements to create an environment where visitors can experience legendary narratives through multiple sensory channels. The installation demonstrates how traditional storytelling can be transformed through contemporary artistic methodologies, documented through 9 comprehensive photographs.",
    image: "/placeholder.svg?height=600&width=800&text=Decoding+Legends+Installation",
    position: "Creative director, costume design",
    materials: ["Video screens", "Traditional artifacts", "Audio systems", "Lighting", "Textiles"],
    tags: ["legends", "multimedia", "storytelling", "gojo residency"],
    photoCount: 9,
    images: Array.from({ length: 9 }, (_, i) => `/placeholder.svg?height=800&width=600&text=Decoding+Install+${i + 1}`),
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
    return "text-blue-600"
  }

  const getCategoryBg = (category: string) => {
    return "bg-blue-100 border-blue-200"
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects/installation" />

      <main className="pt-32 pb-20">
        <div className="w-full px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6">Installation</h1>
          </div>

          {/* Projects Grid - Full width with proper alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {installationProjects.map((project) => (
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
                      <Building className={`h-4 w-4 ${getCategoryColor(project.category)}`} />
                      <span className={`text-xs font-medium capitalize ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Visitors Badge */}
                    {project.visitors && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {project.visitors.toLocaleString()} visitors
                        </div>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="text-center space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="text-white text-sm font-medium">View Installation</div>
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
                            <span>{project.visitors.toLocaleString()}</span>
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

                    {/* Dimensions */}
                    {project.dimensions && (
                      <div className="text-xs text-neutral-400">Dimensions: {project.dimensions}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Installation Modal */}
      {selectedProject && <InstallationModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  )
}
