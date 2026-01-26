"use client"

import { useState } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Calendar, Camera, User, Users } from "lucide-react"
import { InstallationModal } from "@/components/installation-modal"

interface StudioProject {
  id: string
  title: string
  year: string
  category: string
  medium?: string
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
  position?: string
}

const studioProjects: StudioProject[] = [
  {
    id: "skins-north-ethiopia",
    title: "sKINs: North Ethiopia",
    year: "2025",
    category: "In Studio",
    medium: "Photography",
    description:
      "",
    detailedDescription:
      "This sub-collection/middle/ honors ancestral skin markings, where traditional tattoos serve as protection against illness, symbols of strength, expressions of beauty, and are interwoven with spiritual and social symbolism. The project draws personal inspiration from a photograph of the artist's late great-grandmother /top/, whose neck bears these sacred markings. Her image serves as a quiet yet powerful thread connecting past and present. sKINs N.E. celebrates ancestral body adornment as a form of wearable art, transforming symbols once etched into skin into garments that carry memory, meaning, and resilience. (This sub-project is currently on hold due to ongoing instability in the northern regions of Ethiopia.)",
    image: "/images/skins-all_04.webp?height=600&width=800&text=sKINs+North+Ethiopia",
    position: "Filmmaker and textile artist",
    tags: ["kinship", "aesthetics", "architecture"],
    images: [
      "/images/skins-all_01.webp",
      "/images/skins-all_02.webp",
      "/images/skins-all_03.webp",
      "/images/skins-all_04.webp",
    ],
  },
  {
    id: "hulet-neteb-project",
    title: "Hulet neteb project",
    year: "2022",
    category: "In Studio",
    medium: "Studio documentation",
    description:
      "",
    detailedDescription:
      'Hulet Neteb / Two Dots takes its name from the Ethiopian punctuation mark ":", a symbol that both separates and connects words in Amharic writing. This project is an exploration of identity, history, and culture drawing from moments near and far in time, all rooted in Ethiopia\'s rich heritage. Through a thoughtful interplay of accessories, makeup, and a diverse range of garments including hand-painted pieces and thoughtfully chosen pre-owned clothing, the artist embraces the transformative power of revival in fashion. By reimagining these elements, Hulet Neteb creates a living bond between herself and her environment, weaving personal presence and cultural narrative into a vibrant visual language. This process of embodiment, bringing to life a blend of remembered and imagined stories, unfolds across a series of concepts. Here, clothing becomes more than adornment; it is a medium through which history, identity, and creativity converse and coexist.',
    image: "/images/northern lines.webp?height=600&width=800&text=Hulet+Neteb",
    position: "Director, Producer, Curator, and Textile Artist",
    tags: ["symbology", "textile art", "ethiopian history"],
    images: [
      "/images/01_ The four elements-a.webp",
      "/images/01_ The four elements-b.webp",
      "/images/01_ The four elements-c.webp",
      "/images/02_Keber Grace-a.webp",
      "/images/02_Keber Grace-b.webp",
      "/images/02_Keber Grace-c.webp",
      "/images/03_Mebrek Lightning_a.webp",
      "/images/03_Mebrek Lightning_b.webp",
      "/images/03_Mebrek Lightning_c.webp",
      "/images/04_Deshet_a.webp",
      "/images/04_Deshet_b.webp",
      "/images/04_Deshet_c.webp",
      "/images/05_Maya Sight_a.webp",
      "/images/05_Maya Sight_b.webp",
      "/images/05_Maya Sight_c.webp",
      "/images/06_Eteya_a.webp",
      "/images/06_Eteya_b.webp",
      "/images/06_Eteya_c.webp",
      "/images/07_Tente on_study of skies_a.webp",
      "/images/07_Tente on_study of skies_b.webp",
      "/images/07_Tente on_study of skies_c.webp",
      "/images/08_Gerir.webp",
      "/images/09_Earth_a.webp",
      "/images/09_Earth_b.webp",
      "/images/10_day and night_a.webp",
      "/images/10_day and night_b.webp",
      "/images/10_day and night_c.webp",
    ],
  },
  {
    id: "sheret-project",
    title: "Sheret Project",
    year: "2025",
    category: "In Studio",
    medium: "Textile",
    description:
      "",
    detailedDescription:
      "The Sheret/Sarong/ is a tubular textile usually worn as a long skirt, or scarf by men. Through its dynamic patterns and colorways, it conveys a story from far away /originally from Indonesia/ and has made its way into East African traditions. It is vital in hot climates and preferred during khat chewing rituals/as shown in sKINs: Dire Dawa opening scene/ where it provides a breathable silhouette. For warriors in Ethiopia, it serves as protection from harsh sun and wind; a practical solution when carrying minimal items. During battle its role deepens even more; fallen soldiers are wrapped in their own Sheret when burials aren't possible.",
    image: "/images/b-11.webp?height=600&width=800&text=Sheret+Project",
    position: "Textile Artist and researcher",
    tags: ["documentation", "preservation"],
    images: [
      "/images/00_Coat.webp",
      "/images/a-11.webp",
      "/images/b-11.webp",
      "/images/c-11.webp",
      "/images/Convertable.webp",
      "/images/IMG_0612 (2).webp",
    ],
  },
  {
    id: "yal-studio",
    title: "YAL",
    year: "2025",
    category: "In Studio",
    medium: "Studio documentation",
    description:
      "",
    detailedDescription:
      "This studio-based work involves extensive field research and documentation of cultural practices related to body modification, traditional scarification, and ceremonial body art in Northern Ethiopian communities. The project serves as both artistic exploration and cultural preservation, creating a visual archive of practices that connect contemporary Ethiopian identity to ancestral traditions.",
    image: "/images/kins.webp?height=600&width=800&text=YAL+Studio",
    position: "Artist and curator",
    tags: ["ritual", "beautification", "functional design"],
    videoUrl: "/vid/Yal launch 8 bit video.mp4",
  },
  {
    id: "portal-to-u-thiopia-archive",
    title: "Portal to U-thiopia",
    year: "2022",
    category: "Archive",
    medium: "Conceptual photography",
    description: "",
    detailedDescription: "",
    image: "/images/j.webp?height=600&width=800&text=Portal+U-thiopia+Archive",
    location: "Conceptual Archive",
    status: "Conceptual Archive",
    position: "Conceptual artist and photographer",
    tags: ["conceptual", "utopia", "alternative reality"],
    photoCount: 4,
    images: ["/images/a.webp", "/images/b.webp", "/images/c.webp", "/images/d.webp"],
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

      <main className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Header */}
          <div className="mb-12 sm:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-stardom text-black mb-4 sm:mb-6">In Studio</h1>
          </div>

          {/* Projects Grid - Enhanced responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {studioProjects.map((project, index) => (
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
                      <Camera className={`h-3 w-3 sm:h-4 sm:w-4 ${getCategoryColor(project.category)}`} />
                      <span className={`text-xs font-medium capitalize ${getCategoryColor(project.category)}`}>
                        In Studio
                      </span>
                    </div>

                    {/* Photo Count Badge */}
                    {project.photoCount && (
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                        <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {project.photoCount} photos
                        </div>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 flex items-center justify-center">
                      <div className="text-center space-y-2 sm:space-y-3 transform translate-y-4 transition-transform duration-500">
                        <div className="text-white text-xs sm:text-sm font-medium">View Studio Work</div>
                        <div className="w-6 sm:w-8 h-px bg-white/50 mx-auto" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-stardom leading-tight text-black">{project.title}</h3>

                      <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                        
                        {project.position && (
                          <div className="flex items-center space-x-1 text-neutral-500">
                            <User className="h-3 w-3" />
                            <span className="truncate">{project.position}</span>
                          </div>
                        )}
                        {project.visitors && (
                          <div className="flex items-center space-x-1 text-neutral-500">
                            <Users className="h-3 w-3" />
                            <span>{project.visitors}</span>
                          </div>
                        )}
                      </div>

                      {project.medium && <p className="text-xs text-neutral-400">{project.medium}</p>}
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

      {/* Studio Modal */}
      {selectedProject && <InstallationModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  )
}
