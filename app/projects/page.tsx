"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ProjectFilters } from "@/components/project-filters"
import { ProjectTimeline } from "@/components/project-timeline"

// Comprehensive project data from 2020-2025
const projectsData = [
  // 2025 Projects
  {
    id: "future-visions-2025",
    title: "Future Visions",
    year: 2025,
    category: "Films",
    medium: "Documentary Film",
    description: "An exploration of contemporary African diaspora through digital storytelling and immersive media.",
    image: "/placeholder.svg?height=600&width=480&text=Future+Visions",
    featured: true,
    awards: ["Sundance Selection"],
    visitors: "15K+",
    tags: ["Digital", "Diaspora", "Contemporary"],
  },
  {
    id: "quantum-threads-2025",
    title: "Quantum Threads",
    year: 2025,
    category: "Textile",
    medium: "Interactive Installation",
    description: "A revolutionary textile installation that responds to viewer movement using fiber optic technology.",
    image: "/placeholder.svg?height=600&width=480&text=Quantum+Threads",
    featured: false,
    awards: [],
    visitors: "8K+",
    tags: ["Interactive", "Technology", "Fiber Optics"],
  },
  {
    id: "corporate-identity-2025",
    title: "Corporate Identity Series",
    year: 2025,
    category: "Commissions",
    medium: "Brand Identity",
    description: "A comprehensive brand identity project for emerging African tech companies.",
    image: "/placeholder.svg?height=600&width=480&text=Corporate+Identity",
    featured: false,
    awards: [],
    visitors: "5K+",
    tags: ["Branding", "Technology", "Corporate"],
  },

  // 2024 Projects
  {
    id: "memory-threads-2024",
    title: "Memory Threads",
    year: 2024,
    category: "Textile",
    medium: "Textile Installation",
    description:
      "An intricate exploration of ancestral memory through traditional weaving techniques and contemporary materials.",
    image: "/placeholder.svg?height=600&width=480&text=Memory+Threads",
    featured: true,
    awards: ["Venice Biennale", "Turner Prize Nomination"],
    visitors: "25K+",
    tags: ["Memory", "Ancestral", "Traditional"],
  },
  {
    id: "digital-diaspora-2024",
    title: "Digital Diaspora",
    year: 2024,
    category: "Films",
    medium: "Short Film Series",
    description: "A three-part documentary series examining the digital connections within the African diaspora.",
    image: "/placeholder.svg?height=600&width=480&text=Digital+Diaspora",
    featured: false,
    awards: ["IDFA Award"],
    visitors: "18K+",
    tags: ["Digital", "Documentary", "Series"],
  },
  {
    id: "museum-commission-2024",
    title: "Museum Commission",
    year: 2024,
    category: "Commissions",
    medium: "Permanent Installation",
    description: "A large-scale permanent installation for the National Museum of African Art.",
    image: "/placeholder.svg?height=600&width=480&text=Museum+Commission",
    featured: false,
    awards: [],
    visitors: "50K+",
    tags: ["Museum", "Permanent", "Large-scale"],
  },

  // 2023 Projects
  {
    id: "trade-winds-2023",
    title: "Trade Winds",
    year: 2023,
    category: "Films",
    medium: "Documentary Film",
    description:
      "A feature-length documentary tracing historical trade routes and their impact on contemporary culture.",
    image: "/placeholder.svg?height=600&width=480&text=Trade+Winds",
    featured: true,
    awards: ["Cannes Documentary Prize", "Emmy Nomination"],
    visitors: "35K+",
    tags: ["Historical", "Trade", "Culture"],
  },
  {
    id: "material-stories-2023",
    title: "Material Stories",
    year: 2023,
    category: "Textile",
    medium: "Mixed Media",
    description:
      "An investigation into the stories embedded within everyday materials and their cultural significance.",
    image: "/placeholder.svg?height=600&width=480&text=Material+Stories",
    featured: false,
    awards: ["Tate Modern Acquisition"],
    visitors: "22K+",
    tags: ["Materials", "Cultural", "Everyday"],
  },
  {
    id: "brand-evolution-2023",
    title: "Brand Evolution",
    year: 2023,
    category: "Commissions",
    medium: "Visual Identity",
    description: "A comprehensive rebranding project for a major cultural institution.",
    image: "/placeholder.svg?height=600&width=480&text=Brand+Evolution",
    featured: false,
    awards: [],
    visitors: "12K+",
    tags: ["Rebranding", "Cultural", "Institution"],
  },

  // 2022 Projects
  {
    id: "woven-narratives-2022",
    title: "Woven Narratives",
    year: 2022,
    category: "Textile",
    medium: "Tapestry Series",
    description: "A series of large-scale tapestries that weave together personal and collective histories.",
    image: "/placeholder.svg?height=600&width=480&text=Woven+Narratives",
    featured: false,
    awards: ["Whitney Biennial"],
    visitors: "28K+",
    tags: ["Tapestry", "History", "Collective"],
  },
  {
    id: "voices-unheard-2022",
    title: "Voices Unheard",
    year: 2022,
    category: "Films",
    medium: "Experimental Film",
    description:
      "An experimental film exploring silenced voices in historical narratives through innovative cinematography.",
    image: "/placeholder.svg?height=600&width=480&text=Voices+Unheard",
    featured: false,
    awards: ["Berlin Film Festival"],
    visitors: "16K+",
    tags: ["Experimental", "Voices", "Historical"],
  },
  {
    id: "public-art-2022",
    title: "Public Art Initiative",
    year: 2022,
    category: "Commissions",
    medium: "Public Installation",
    description: "A community-engaged public art project transforming urban spaces through collaborative design.",
    image: "/placeholder.svg?height=600&width=480&text=Public+Art",
    featured: false,
    awards: [],
    visitors: "100K+",
    tags: ["Public", "Community", "Urban"],
  },

  // 2021 Projects
  {
    id: "cultural-crossroads-2021",
    title: "Cultural Crossroads",
    year: 2021,
    category: "Films",
    medium: "Documentary Series",
    description: "A multi-part series examining cultural intersections in post-colonial societies.",
    image: "/placeholder.svg?height=600&width=480&text=Cultural+Crossroads",
    featured: false,
    awards: ["Peabody Award"],
    visitors: "42K+",
    tags: ["Cultural", "Post-colonial", "Intersections"],
  },
  {
    id: "fiber-futures-2021",
    title: "Fiber Futures",
    year: 2021,
    category: "Textile",
    medium: "Sustainable Textiles",
    description: "An exploration of sustainable textile practices and their role in environmental consciousness.",
    image: "/placeholder.svg?height=600&width=480&text=Fiber+Futures",
    featured: false,
    awards: ["Green Art Award"],
    visitors: "19K+",
    tags: ["Sustainable", "Environmental", "Future"],
  },
  {
    id: "heritage-branding-2021",
    title: "Heritage Branding",
    year: 2021,
    category: "Commissions",
    medium: "Cultural Branding",
    description: "A branding project that celebrates and preserves cultural heritage through modern design.",
    image: "/placeholder.svg?height=600&width=480&text=Heritage+Branding",
    featured: false,
    awards: [],
    visitors: "14K+",
    tags: ["Heritage", "Preservation", "Modern"],
  },

  // 2020 Projects
  {
    id: "pandemic-reflections-2020",
    title: "Pandemic Reflections",
    year: 2020,
    category: "Films",
    medium: "Short Documentary",
    description:
      "A intimate documentary capturing personal stories during the global pandemic through virtual connections.",
    image: "/placeholder.svg?height=600&width=480&text=Pandemic+Reflections",
    featured: false,
    awards: ["COVID-19 Stories Award"],
    visitors: "31K+",
    tags: ["Pandemic", "Personal", "Virtual"],
  },
  {
    id: "isolation-textiles-2020",
    title: "Isolation Textiles",
    year: 2020,
    category: "Textile",
    medium: "Quarantine Series",
    description: "A series of textile works created during lockdown, exploring themes of isolation and connection.",
    image: "/placeholder.svg?height=600&width=480&text=Isolation+Textiles",
    featured: false,
    awards: [],
    visitors: "13K+",
    tags: ["Isolation", "Lockdown", "Connection"],
  },
  {
    id: "virtual-exhibitions-2020",
    title: "Virtual Exhibitions",
    year: 2020,
    category: "Commissions",
    medium: "Digital Curation",
    description: "Pioneering virtual exhibition design for museums adapting to digital-first experiences.",
    image: "/placeholder.svg?height=600&width=480&text=Virtual+Exhibitions",
    featured: false,
    awards: [],
    visitors: "67K+",
    tags: ["Virtual", "Digital", "Museums"],
  },
]

export default function ProjectsPage() {
  const [isDark, setIsDark] = useState(false)
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [activeFilter, setActiveFilter] = useState("All")

  useEffect(() => {
    // Prevent FOUC by checking theme before mount
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)

    setIsDark(shouldBeDark)

    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Listen for theme changes from other pages
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme") {
        const newTheme = e.newValue === "dark"
        setIsDark(newTheme)
        if (newTheme) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }

    // Dispatch storage event for other tabs/pages
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "theme",
        newValue: newTheme ? "dark" : "light",
      }),
    )
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    if (filter === "All") {
      setFilteredProjects(projectsData)
    } else {
      setFilteredProjects(projectsData.filter((project) => project.category === filter))
    }
  }

  // Calculate dynamic statistics
  const totalProjects = filteredProjects.length
  const totalAwards = filteredProjects.reduce((acc, project) => acc + project.awards.length, 0)
  const totalReach = filteredProjects.reduce((acc, project) => {
    const visitors = Number.parseInt(project.visitors.replace(/[^\d]/g, ""))
    return acc + visitors
  }, 0)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-neutral-900" : "bg-white"}`}>
      <Navigation currentPath="/projects" isDark={isDark} toggleTheme={toggleTheme} />

      <div className="pt-24 pb-16">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
          <div className="text-center mb-12">
            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-stardom ${isDark ? "text-white" : "text-black"} mb-6`}
            >
              All Projects
            </h1>
            <p className={`text-xl font-times ${isDark ? "text-neutral-300" : "text-neutral-600"} max-w-3xl mx-auto`}>
              A comprehensive collection of works spanning 2020-2025, exploring themes of memory, culture, and material
              storytelling through various mediums.
            </p>
          </div>

          {/* Dynamic Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className={`text-4xl font-stardom ${isDark ? "text-white" : "text-black"} mb-2`}>
                {totalProjects}
              </div>
              <div
                className={`text-sm font-times uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
              >
                Projects
              </div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-stardom ${isDark ? "text-white" : "text-black"} mb-2`}>{totalAwards}</div>
              <div
                className={`text-sm font-times uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
              >
                Awards
              </div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-stardom ${isDark ? "text-white" : "text-black"} mb-2`}>
                {Math.round(totalReach / 1000)}K+
              </div>
              <div
                className={`text-sm font-times uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
              >
                Total Reach
              </div>
            </div>
          </div>

          {/* Filters */}
          <ProjectFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} isDark={isDark} />
        </div>

        {/* Projects Timeline */}
        <ProjectTimeline projects={filteredProjects} isDark={isDark} />
      </div>
    </div>
  )
}
