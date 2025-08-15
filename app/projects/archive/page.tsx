"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { InstallationModal } from "@/components/installation-modal"
import { Calendar, Archive, MapPin, Users } from "lucide-react"

interface Project {
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
  status?: string
  tags: string[]
  photoCount?: number
  slidesLayout?: number[]
  instagramUrl?: string
}

const archiveProjects: Project[] = [
  {
    id: "msfts-ethiopia-skate-photos",
    title: "MSFTS x Ethiopia Skate Photos",
    year: "2024",
    category: "Archive",
    medium: "Photography archive",
    description: "Behind-the-scenes and outtake photographs from the MSFTS x Ethiopia skateboarding collaboration.",
    detailedDescription:
      "This archive contains 24 photographs from the MSFTS collaboration, including 5 landscape format images (16:9 ratio) arranged as 2 per slide plus 1 extra, and 19 portrait format images (9:16 ratio) arranged as 2 per slide plus 1 extra, capturing candid moments, alternative shots, and process documentation that didn't make it into the final campaign.",
    image: "/placeholder.svg?height=600&width=800&text=MSFTS+Skate+Photos+Archive",
    location: "Studio Archive",
    status: "Digital Archive",
    tags: ["photography", "skateboarding", "behind-the-scenes", "collaboration"],
    photoCount: 24,
    // Will be handled specially in the modal for 2 per slide + extras
  },
  {
    id: "tilla-photoshoot",
    title: "Tilla Photoshoot",
    year: "2023",
    category: "Archive",
    medium: "Fashion photography",
    description:
      "Archive of a fashion photoshoot exploring traditional Ethiopian gold jewelry and contemporary styling.",
    detailedDescription:
      "Tilla, meaning gold in Amharic, was a photoshoot that explored the beauty and cultural significance of traditional Ethiopian gold jewelry, combining heritage pieces with contemporary fashion. This archive contains 4 carefully curated photographs.",
    image: "/placeholder.svg?height=600&width=800&text=Tilla+Photoshoot+Archive",
    location: "Studio Archive",
    status: "Fashion Archive",
    tags: ["fashion", "jewelry", "traditional", "gold"],
    photoCount: 4,
  },
  {
    id: "in-red-photos",
    title: "In Red Photos",
    year: "2022",
    category: "Archive",
    medium: "Artistic photography",
    description:
      "A series of photographs exploring the color red in Ethiopian culture, from traditional clothing to landscapes.",
    detailedDescription:
      "This photographic series documents the significance of red in Ethiopian culture, capturing everything from traditional red clothing and ceremonial objects to natural red landscapes and architectural elements. Contains 7 striking photographs.",
    image: "/placeholder.svg?height=600&width=800&text=In+Red+Photos+Archive",
    location: "Various locations",
    status: "Artistic Archive",
    tags: ["color study", "cultural significance", "photography", "red"],
    photoCount: 7,
  },
  {
    id: "portal-to-u-thiopia",
    title: "Portal to U-thiopia",
    year: "2022",
    category: "Archive",
    medium: "Conceptual photography",
    description: "Conceptual photographs imagining alternative realities and utopian visions of Ethiopian society.",
    detailedDescription:
      "This conceptual series creates visual portals to imagined versions of Ethiopia, exploring themes of possibility, hope, and alternative futures through surreal and dreamlike imagery. Features 4 conceptual photographs.",
    image: "/placeholder.svg?height=600&width=800&text=Portal+to+U-thiopia+Archive",
    location: "Conceptual Archive",
    status: "Conceptual Archive",
    tags: ["conceptual", "utopia", "alternative reality", "surreal"],
    photoCount: 4,
  },
  {
    id: "decoding-legends-photos",
    title: "Decoding Legends Photos",
    year: "2021",
    category: "Archive",
    medium: "Documentary photography",
    description: "Photographic documentation supporting the Decoding Legends film series and installation work.",
    detailedDescription:
      "This archive contains 3 key photographs from the extensive research and documentation that supported the Decoding Legends project, including location scouting, cultural research, and process documentation.",
    image: "/placeholder.svg?height=600&width=800&text=Decoding+Legends+Photos+Archive",
    location: "Research Archive",
    status: "Research Collection",
    tags: ["documentary", "research", "legends", "cultural documentation"],
    photoCount: 3,
  },
  {
    id: "ti-identity-photos",
    title: "To Identify",
    year: "2021",
    category: "Archive",
    medium: "Identity exploration",
    description:
      "Personal photographic exploration of individual and collective identity within Ethiopian diaspora communities.",
    detailedDescription:
      "Ti (meaning 'you' in Amharic) is a personal photographic project exploring questions of identity, belonging, and cultural connection within Ethiopian diaspora communities around the world. Contains 19 photographs arranged in a specific narrative sequence.",
    image: "/placeholder.svg?height=600&width=800&text=Ti+Identity+Photos+Archive",
    location: "Global locations",
    status: "Personal Archive",
    tags: ["identity", "diaspora", "personal", "belonging"],
    photoCount: 19,
    slidesLayout: [1, 5, 7, 6], // 1 photo in first slide, 5 in second, 7 in third, 6 in fourth
  },
  {
    id: "tibeb-be-adebabay",
    title: "Tibeb Be Adebabay",
    year: "2021",
    category: "Archive",
    medium: "Cultural documentation",
    description:
      "Photographic documentation of traditional Ethiopian art forms and their contemporary interpretations.",
    detailedDescription:
      "Tibeb Be Adebabay (meaning 'art in Addis Ababa') documents the rich artistic traditions of Ethiopia's capital city, capturing both traditional art forms and their contemporary evolution. Features 4 documentary photographs.",
    image: "/placeholder.svg?height=600&width=800&text=Tibeb+Be+Adebabay+Archive",
    location: "Addis Ababa, Ethiopia",
    status: "Cultural Archive",
    tags: ["cultural documentation", "traditional art", "contemporary", "addis ababa"],
    photoCount: 4,
  },
  {
    id: "vibrant-hues",
    title: "Vibrant Hues",
    year: "2020",
    category: "Archive",
    medium: "Color studies",
    description: "An exploration of color in Ethiopian culture, from traditional dyes to contemporary color palettes.",
    detailedDescription:
      "This archive documents the rich color traditions of Ethiopian culture, exploring everything from traditional natural dyes and their cultural meanings to contemporary color applications in art and design. Contains two experiments: 11 photos in experiment 01 and 7 photos in experiment 02.",
    image: "/placeholder.svg?height=600&width=800&text=Vibrant+Hues+Archive",
    location: "Color Archive",
    status: "Study Collection",
    tags: ["color theory", "traditional dyes", "cultural meaning", "design"],
    photoCount: 18,
    slidesLayout: [11, 7], // 11 photos in experiment 1, 7 in experiment 2
  },
  {
    id: "graphic-posters-illustrations",
    title: "Graphic Posters & Illustrations",
    year: "2020",
    category: "Archive",
    medium: "Graphic design",
    description: "Collection of graphic design work including posters, illustrations, and visual identity projects.",
    detailedDescription:
      "This archive contains various graphic design projects including 5 event posters and editorial illustrations that explore Ethiopian cultural themes through contemporary design approaches. Also includes links to ongoing illustration work on Instagram.",
    image: "/placeholder.svg?height=600&width=800&text=Graphic+Posters+Illustrations+Archive",
    location: "Design Archive",
    status: "Design Collection",
    tags: ["graphic design", "posters", "illustrations", "visual identity"],
    photoCount: 5,
    instagramUrl: "https://www.instagram.com/red_studyo/",
  },
]

export default function ArchivePage() {
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
    return "text-neutral-500"
  }

  const getCategoryBg = (category: string) => {
    return "bg-neutral-500/10 border-neutral-500/20"
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects/archive" />

      <main className="pt-32 pb-20">
        <div className="w-full px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-black mb-6">Archive</h1>
          </div>

          {/* Projects Grid - Full width with proper alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {archiveProjects.map((project) => (
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
                    <Archive className={`h-4 w-4 ${getCategoryColor(project.category)}`} />
                    <span className={`text-xs font-medium capitalize ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Status Badge */}
                  {project.status && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-neutral-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {project.status}
                      </div>
                    </div>
                  )}

                  {/* Instagram Badge for Graphic Posters */}
                  {project.instagramUrl && (
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-center space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-white text-sm font-medium">View Archive</div>
                      <div className="w-8 h-px bg-white/50 mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-light leading-tight text-black group-hover:text-neutral-600 transition-colors duration-300">
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
                      {project.visitors && (
                        <div className="flex items-center space-x-1 text-neutral-500">
                          <Users className="h-3 w-3" />
                          <span>{project.visitors}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-neutral-400">{project.medium}</p>
                  </div>

                  <p className="text-sm leading-relaxed text-neutral-600 line-clamp-3">
                    {project.description}
                    {project.instagramUrl && (
                      <span className="inline-flex items-center ml-2 text-purple-600">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        Instagram
                      </span>
                    )}
                  </p>

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
