"use client"

import { Navigation } from "@/components/navigation"
import { ProjectTimeline } from "@/components/project-timeline"

// Comprehensive project data from 2020-2025
const projectsData = [
  // 2025 Projects
  {
    id: "skins-dire-dawa",
    title: "sKINs : Dire Dawa",
    year: 2025,
    category: "Films",
    medium: "Documentary film",
    description:
      "An intimate exploration of skin as a canvas for cultural identity and personal expression in Dire Dawa, Ethiopia.",
    image: "/placeholder.svg?height=600&width=480&text=sKINs+Dire+Dawa",
    featured: true,
    awards: [],
    visitors: "15K+",
    tags: ["identity", "cultural practices", "body art", "contemporary"],
  },
  {
    id: "skins-east-ethiopia-installation",
    title: "sKINs: East Ethiopia textile installation",
    year: 2025,
    category: "Textile",
    medium: "Large-scale textile installation",
    description:
      "An immersive textile installation exploring the relationship between skin, fabric, and cultural identity in Eastern Ethiopia.",
    image: "/placeholder.svg?height=600&width=480&text=sKINs+East+Ethiopia",
    featured: true,
    awards: [],
    visitors: "25K+",
    tags: ["textile", "identity", "cultural heritage", "immersive"],
  },
  {
    id: "yal-exhibition",
    title: "YAL Exhibition",
    year: 2025,
    category: "Textile",
    medium: "Mixed media exhibition",
    description:
      "A comprehensive exhibition showcasing the evolution of contemporary Ethiopian art through multimedia installations.",
    image: "/placeholder.svg?height=600&width=480&text=YAL+Exhibition",
    featured: false,
    awards: [],
    visitors: "18K+",
    tags: ["contemporary", "multimedia", "youth", "leadership"],
  },
  {
    id: "heart-of-a-child",
    title: "Heart of a Child",
    year: 2025,
    category: "Commissions",
    medium: "Commercial film",
    description:
      "A heartwarming commercial film exploring childhood innocence and dreams through Ethiopian cultural lens.",
    image: "/placeholder.svg?height=600&width=480&text=Heart+of+a+Child",
    featured: false,
    awards: [],
    visitors: "12K+",
    tags: ["commercial", "childhood", "cultural values", "emotional"],
  },

  // 2024 Projects
  {
    id: "the-river-2024",
    title: "The River",
    year: 2024,
    category: "Films",
    medium: "Short documentary",
    description:
      "A poetic journey following the flow of water and stories along Ethiopian rivers, connecting communities and traditions.",
    image: "/placeholder.svg?height=600&width=480&text=The+River",
    featured: true,
    awards: ["Audience Choice Award - Environmental Film Festival"],
    visitors: "28K+",
    tags: ["environmental", "community", "water", "poetic"],
  },
  {
    id: "arada-easter-commercial",
    title: "Arada Easter Commercial",
    year: 2024,
    category: "Commissions",
    medium: "Commercial advertisement",
    description:
      "A vibrant commercial celebrating Ethiopian Easter traditions in the historic Arada district of Addis Ababa.",
    image: "/placeholder.svg?height=600&width=480&text=Arada+Easter+Commercial",
    featured: false,
    awards: [],
    visitors: "16K+",
    tags: ["commercial", "easter", "traditions", "community"],
  },
  {
    id: "msfts-ethiopia-skate",
    title: "MSFTS x Ethiopia Skate",
    year: 2024,
    category: "Commissions",
    medium: "Brand collaboration",
    description:
      "A creative collaboration documenting the emerging skateboarding culture in Ethiopia through fashion and lifestyle.",
    image: "/placeholder.svg?height=600&width=480&text=MSFTS+Ethiopia+Skate",
    featured: false,
    awards: [],
    visitors: "22K+",
    tags: ["skateboarding", "youth culture", "fashion", "collaboration"],
  },
  {
    id: "msfts-ethiopia-skate-photos",
    title: "MSFTS x Ethiopia Skate Photos",
    year: 2024,
    category: "Commissions",
    medium: "Photography archive",
    description: "Behind-the-scenes and outtake photographs from the MSFTS x Ethiopia skateboarding collaboration.",
    image: "/placeholder.svg?height=600&width=480&text=MSFTS+Skate+Photos+Archive",
    featured: false,
    awards: [],
    visitors: "8K+",
    tags: ["photography", "skateboarding", "behind-the-scenes", "collaboration"],
  },

  // 2023 Projects
  {
    id: "tilla-photoshoot",
    title: "Tilla Photoshoot",
    year: 2023,
    category: "Commissions",
    medium: "Fashion photography",
    description:
      "Archive of a fashion photoshoot exploring traditional Ethiopian gold jewelry and contemporary styling.",
    image: "/placeholder.svg?height=600&width=480&text=Tilla+Photoshoot+Archive",
    featured: false,
    awards: [],
    visitors: "14K+",
    tags: ["fashion", "jewelry", "traditional", "gold"],
  },
  {
    id: "ashes-modeling",
    title: "Ashes Modeling",
    year: 2023,
    category: "Commissions",
    medium: "Fashion photography",
    description:
      "A high-fashion modeling project exploring themes of transformation and renewal through Ethiopian aesthetics.",
    image: "/placeholder.svg?height=600&width=480&text=Ashes+Modeling",
    featured: false,
    awards: [],
    visitors: "11K+",
    tags: ["fashion", "modeling", "transformation", "aesthetics"],
  },

  // 2022 Projects
  {
    id: "hulet-neteb-2022",
    title: "Hulet Neteb",
    year: 2022,
    category: "Films",
    medium: "Experimental film",
    description:
      "An experimental visual narrative exploring duality and balance through Ethiopian philosophical concepts.",
    image: "/placeholder.svg?height=600&width=480&text=Hulet+Neteb",
    featured: false,
    awards: [],
    visitors: "15K+",
    tags: ["experimental", "philosophy", "duality", "abstract"],
  },
  {
    id: "bet-bota",
    title: "Bet Bota",
    year: 2022,
    category: "Textile",
    medium: "Architectural intervention",
    description:
      "An architectural intervention that transforms domestic spaces through textile elements and cultural memory.",
    image: "/placeholder.svg?height=600&width=480&text=Bet+Bota",
    featured: false,
    awards: [],
    visitors: "12K+",
    tags: ["architecture", "domestic", "cultural memory", "space"],
  },
  {
    id: "hulet-neteb-installation",
    title: "Hulet Neteb Installation",
    year: 2022,
    category: "Textile",
    medium: "Interactive installation",
    description:
      "An interactive installation exploring the philosophical concept of duality through physical and digital elements.",
    image: "/placeholder.svg?height=600&width=480&text=Hulet+Neteb+Installation",
    featured: false,
    awards: [],
    visitors: "8K+",
    tags: ["interactive", "philosophy", "duality", "digital"],
  },
  {
    id: "in-red-photos",
    title: "In Red Photos",
    year: 2022,
    category: "Commissions",
    medium: "Artistic photography",
    description:
      "A series of photographs exploring the color red in Ethiopian culture, from traditional clothing to landscapes.",
    image: "/placeholder.svg?height=600&width=480&text=In+Red+Photos+Archive",
    featured: false,
    awards: [],
    visitors: "9K+",
    tags: ["color study", "cultural significance", "photography", "red"],
  },
  {
    id: "portal-to-u-thiopia",
    title: "Portal to U-thiopia",
    year: 2022,
    category: "Commissions",
    medium: "Conceptual photography",
    description: "Conceptual photographs imagining alternative realities and utopian visions of Ethiopian society.",
    image: "/placeholder.svg?height=600&width=480&text=Portal+to+U-thiopia+Archive",
    featured: false,
    awards: [],
    visitors: "7K+",
    tags: ["conceptual", "utopia", "alternative reality", "surreal"],
  },

  // 2021 Projects
  {
    id: "decoding-legends-2021",
    title: "Decoding Legends",
    year: 2021,
    category: "Films",
    medium: "Documentary series",
    description:
      "A documentary series that decodes ancient Ethiopian legends and their relevance in contemporary society.",
    image: "/placeholder.svg?height=600&width=480&text=Decoding+Legends",
    featured: true,
    awards: ["Best Documentary Series - Pan-African Film Festival"],
    visitors: "42K+",
    tags: ["legends", "oral history", "cultural heritage", "series"],
  },
  {
    id: "decoding-legends-installation",
    title: "Decoding Legends Installation",
    year: 2021,
    category: "Textile",
    medium: "Multimedia installation",
    description:
      "A multimedia installation that brings ancient Ethiopian legends to life through contemporary art practices.",
    image: "/placeholder.svg?height=600&width=480&text=Decoding+Legends+Installation",
    featured: false,
    awards: [],
    visitors: "15K+",
    tags: ["legends", "multimedia", "storytelling", "heritage"],
  },
  {
    id: "decoding-legends-photos",
    title: "Decoding Legends Photos",
    year: 2021,
    category: "Commissions",
    medium: "Documentary photography",
    description: "Photographic documentation supporting the Decoding Legends film series and installation work.",
    image: "/placeholder.svg?height=600&width=480&text=Decoding+Legends+Photos+Archive",
    featured: false,
    awards: [],
    visitors: "6K+",
    tags: ["documentary", "research", "legends", "cultural documentation"],
  },
  {
    id: "ti-identity-photos",
    title: "Ti Identity Photos",
    year: 2021,
    category: "Commissions",
    medium: "Identity exploration",
    description:
      "Personal photographic exploration of individual and collective identity within Ethiopian diaspora communities.",
    image: "/placeholder.svg?height=600&width=480&text=Ti+Identity+Photos+Archive",
    featured: false,
    awards: [],
    visitors: "5K+",
    tags: ["identity", "diaspora", "personal", "belonging"],
  },
  {
    id: "tibeb-be-adebabay",
    title: "Tibeb Be Adebabay",
    year: 2021,
    category: "Commissions",
    medium: "Cultural documentation",
    description:
      "Photographic documentation of traditional Ethiopian art forms and their contemporary interpretations.",
    image: "/placeholder.svg?height=600&width=480&text=Tibeb+Be+Adebabay+Archive",
    featured: false,
    awards: [],
    visitors: "8K+",
    tags: ["cultural documentation", "traditional art", "contemporary", "addis ababa"],
  },

  // 2020 Projects
  {
    id: "vibrant-hues",
    title: "Vibrant Hues",
    year: 2020,
    category: "Commissions",
    medium: "Color studies",
    description: "An exploration of color in Ethiopian culture, from traditional dyes to contemporary color palettes.",
    image: "/placeholder.svg?height=600&width=480&text=Vibrant+Hues+Archive",
    featured: false,
    awards: [],
    visitors: "10K+",
    tags: ["color theory", "traditional dyes", "cultural meaning", "design"],
  },
  {
    id: "graphic-posters-illustrations",
    title: "Graphic Posters & Illustrations",
    year: 2020,
    category: "Commissions",
    medium: "Graphic design",
    description: "Collection of graphic design work including posters, illustrations, and visual identity projects.",
    image: "/placeholder.svg?height=600&width=480&text=Graphic+Posters+Illustrations+Archive",
    featured: false,
    awards: [],
    visitors: "7K+",
    tags: ["graphic design", "posters", "illustrations", "visual identity"],
  },
]

export default function ProjectsPage() {
  // Calculate dynamic statistics
  const totalProjects = projectsData.length
  const totalAwards = projectsData.reduce((acc, project) => acc + project.awards.length, 0)
  const totalReach = projectsData.reduce((acc, project) => {
    const visitors = Number.parseInt(project.visitors.replace(/[^\d]/g, ""))
    return acc + visitors
  }, 0)

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects" />

      <div className="pt-24 pb-16">
        {/* Header Section - Aligned with Navigation */}
        <div className="px-12 lg:px-20 mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-stardom text-black mb-6 mt-5">All Projects</h1>
          </div>

          {/* Dynamic Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Total Projects</h2>
              <p className="text-xl">{totalProjects}</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Total Awards</h2>
              <p className="text-xl">{totalAwards}</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Total Reach</h2>
              <p className="text-xl">{totalReach.toLocaleString()}+</p>
            </div>
          </div>
        </div>

        {/* Projects Timeline - Aligned with Navigation */}
        <div className="px-12 lg:px-20">
          <ProjectTimeline projects={projectsData} isDark={false} />
        </div>
      </div>
    </div>
  )
}
