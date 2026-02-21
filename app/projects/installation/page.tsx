"use client"

import { useState } from "react"
import Image from "next/image"
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
      "",
    detailedDescription:
      "sKINs, Film screening inside a Textile art tent Installation: Suspended tappering tent structure incapsulating the film screening within. Bottom 3m x 3m, top 2.3m x 2.3 m, height 2m",
    image: "/images/01_front.webp",
    position: "Textile artist",
    materials: ["Traditional textiles", "Contemporary display systems", "Lighting", "Sound"],
    tags: ["textile", "handmade", "visual culture"],
    photoCount: 4,
    imageDescriptions: [
      "Front side view/suspended tent structure incapsulating the sKins film screening within/, hand dyed and embroidered textile mixed with traditional garment fabrics of Dire Dawa, 2025",
      "Right side view, black textile, silver string textile knotted, love letter of the artists' parents from the 80's encapsulated, 2025",
      "Left side view, hand printed yellow floral textile with cutouts, and embroidery mixed with traditional garment fabrics of Dire Dawa, 2025.",
      "Back side view, black tea dyed textile with hand embroidery, Image of artists' mother form 80's, henna paste hand painted decorative art, 2025.",
    ],
    images: [
      "/images/01_front.webp", // Traditional textile patterns
      "/images/04_right.webp", // Embroidered fabric detail
      "/images/02_left.webp", // Hand-dyed textile
      "/images/03_back.webp", // Cultural textile installation
    ],
  },
  {
    id: "yal-exhibition",
    title: "YAL Exhibition",
    year: "2025",
    category: "Installation",
    description:
      "",
    detailedDescription:
      "YAL/Ye Abayn Lij/ is an evolving body of work that houses a growing number of sub-collections each narrating a story focused on ritual, beautification, and functional design. The Amharic phrase “Ye Abayn Lij Weha Temaw” translates to “Thirsty is the child of the Nile” symbolizing the paradox of not benefiting from one’s own abundant resources.",
    image: "/images/IMG_2859.webp",
    position: "Artist and curator",
    materials: ["Photography", "Video installations", "Interactive displays", "Sound systems"],
    tags: ["ritual", "beautification", "functional design"],
    photoCount: 17,
    videoUrl: "https://drive.google.com/file/d/1AV8mLySkKCYWztSNfcE5uOuKVSwCGzb7/view?usp=sharing",
    images: [
      "/images/IMG_2859.webp",
      "/images/IMG_4340.webp",
      "/images/IMG_4341.webp",
      "/images//IMG_5008.webp",
      "/images/IMG_5009.webp",
      "/images/IMG_5010.webp",
      "/images/IMG_5011.webp",
      "/images/IMG_5012.webp",
      "/images/IMG_5013.webp",
      "/images/IMG_5014.webp",
      "/images/IMG_5021.webp",
      "/images/IMG_5020.webp",
      "/images/IMG_5019.webp",
      "/images/IMG_5018.webp",
      "/images/IMG_5017.webp",
      "/images/IMG_5016.webp",
      "/images/IMG_5015.webp",
    ],
  },
  {
    id: "bet-bota",
    title: "Bet Bota",
    year: "2022",
    category: "Installation",
    description:
      "",
    detailedDescription:
      "Bet/Bota reimagines the domestic interior as a site where memory, history, and imagination converge. Against the backdrop of 1970s Addis Ababa, the exhibition explores how architecture and the everyday objects we live with shape our emotions, identities, and collective memory. Through eight immersive sets, the work moves between elemental abstractions:- fire, air, water, earth and reconstructions of lived Ethiopian spaces, from the monochrome photo studios to the compact bachelor rooms of the 1970s. A dining room at the center binds these worlds together, its suspended sack of household items exposing what is often hidden: the quiet significance of what we keep and carry. Bet/Bota is both house and history, exhibition and archive- an invitation to reflect on how space holds us, and how we in turn hold space.",
    image: "/images/a4a.webp",
    position: "Model, Director",
    materials: ["Traditional textiles", "Architectural elements", "Lighting systems", "Interactive spaces"],
    tags: ["architecture", "domestic", "cultural memory"],
    photoCount: 18,
    slidesLayout: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], // 2 photos per carousel slide
    images: [
      "/images/a1_of fire.webp", // Traditional Ethiopian home interior
      "/images/a1a.webp", // Domestic dining space
      "/images/a2_of water.webp", // Living room reconstruction
      "/images/a2a.webp",
      "/images/a3_of earth.webp",
      "/images/Bet bota project photo.webp",
      "/images/a4_of air.webp",
      "/images/a4a.webp",
      "/images/a5_merger.webp",
      "/images/a5a.webp",
      "/images/a6_portal.webp",
      "/images/a6a.webp",
      "/images/a7_monochrome.webp",
      "/images/a7a.webp",
      "/images/a7b.webp",
      "/images/a7c.webp",
      "/images/a8_nostalgia.webp",
      "/images/a8_nostalgia_a.webp",
      "/images/a8a.webp",
      "/images/a9_gathering.webp",
    ],
  },
  {
    id: "hulet-neteb-installation",
    title: "Hulet Neteb Installation",
    year: "2022",
    category: "Installation",
    description:
      "",
    detailedDescription:
      "Hulet Neteb / Two Dots takes its name from the Ethiopian punctuation mark “:”, a symbol that both separates and connects words in Amharic writing. This project is an exploration of identity, history, and culture drawing from moments near and far in time, all rooted in Ethiopia’s rich heritage. Through a thoughtful interplay of accessories, makeup, and a diverse range of garments including hand-painted pieces and thoughtfully chosen pre-owned clothing, the artist embraces the transformative power of revival in fashion. By reimagining these elements, Hulet Neteb creates a living bond between herself and her environment, weaving personal presence and cultural narrative into a vibrant visual language. This process of embodiment, bringing to life a blend of remembered and imagined stories, unfolds across a series of concepts. Here, clothing becomes more than adornment; it is a medium through which history, identity, and creativity converse and coexist.",
    image: "/images/IMG_4342.webp",
    position: "Director, Producer, Curator, and Textile Artist",
    materials: ["Interactive sensors", "Digital displays", "Physical objects", "Sound design"],
    tags: ["symbology", "textile art", "ethiopian history"],
    photoCount: 7,
    images: [
      "/images/IMG_4342.webp",
      "/images/FUA19675.webp",
      "/images/FUA19684.webp",
      "/images/FUA19689.webp",
      "/images/FUA19719.webp",
      "/images/FUA19745.webp",
      "/images/FUA19755.webp",
    ],
  },
  {
    id: "decoding-legends-installation",
    title: "Decoding Legends Installation",
    year: "2021",
    category: "Installation",
    description:
      "",
    detailedDescription:
      "“Ete’ya,” a tribute to the revered Queen of Ethiopia, draws inspiration from her iconic blue cloak. This project modernizes traditional Ethiopian garments, featuring a hand-dyed cotton cloak with extended sleeves in homage to the queen. Complementing the cloak, the red wrap pant prioritizes comfort and flexibility for the dancer, tied at the wrists and embroidered with wing imagery symbolizing Ete’ya’s angelic disappearance. Inspired by the tradition in Gojam, where women shave their heads and wear black headscarves in tribute to Ete’ya, this project incorporates a red headscarf, symbolizing love and devotion to the queen. Set in the lively Merkato market in Addis Ababa, the dancer moves through the bustling crowd, embodying the struggle to preserve identity amid change. The choreography captures the beauty of fearlessness, creating a powerful tribute to Queen Ete’ya’s legacy.",
    image: "/images/IMG_5082.webp",
    position: "Creative director, costume design",
    materials: ["Video screens", "Traditional artifacts", "Audio systems", "Lighting", "Textiles"],
    tags: ["history", "story telling", "costume"],
    photoCount: 12,
    images: [
      "/images/IMG_5082.webp",
      "/images/IMG_5093.webp",
      "/images/IMG_5100.webp",
      "/images/IMG_5109.webp",
      "/images/IMG_5124.webp",
      "/images/photo_2021-09-24_22-16-46.webp",
      "/images/photo_2021-09-24_22-16-49.webp",
      "/images/photo_2021-09-24_22-16-51.webp",
      "/images/photo_2021-09-24_22-16-55.webp",
      "/images/a1-5.webp",
      "/images/a2-5.webp",
      "/images/a3-5.webp",
    ],
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
            <h1 className="text-4xl md:text-5xl font-stardom text-black mb-6">Installation</h1>
          </div>

          {/* Projects Grid - Full width with proper alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {installationProjects.map((project, index) => (
              <div key={project.id} className="group cursor-pointer" onClick={() => handleProjectClick(project)}>
                <div className="rounded-lg overflow-hidden bg-white shadow-lg">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading={index < 4 ? "eager" : "lazy"}
                      quality={80}
                      decoding="async"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
                    <div className="absolute inset-0 bg-black/60 opacity-0 flex items-center justify-center">
                      <div className="text-center space-y-3 transform translate-y-4 transition-transform duration-500">
                        <div className="text-white text-sm font-medium">View Installation</div>
                        <div className="w-8 h-px bg-white/50 mx-auto" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-stardom leading-tight text-black">{project.title}</h3>

                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1 text-neutral-500">
                          
                          
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
