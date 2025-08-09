"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ProjectModal } from "@/components/project-modal"
import { Calendar, Clock, MapPin, Search, Filter, Grid, List, ArchiveIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface ArchivePageProps {
  isDark?: boolean
  toggleTheme?: () => void
}

const archiveProjects = [
  {
    id: 1,
    title: "Memory Threads",
    category: "textile",
    year: "2019",
    status: "archived",
    image: "/placeholder.svg?height=400&width=600&text=Memory+Threads",
    description: "An exploration of cultural memory through traditional weaving techniques and contemporary materials.",
    location: "Addis Ababa",
    duration: "6 months",
    medium: "Mixed textile installation",
    dimensions: "3m x 4m x 2m",
    materials: ["Cotton", "Silk", "Metal threads", "Natural dyes"],
    detailedDescription:
      "Memory Threads was a groundbreaking installation that bridged traditional Ethiopian weaving practices with contemporary artistic expression. The piece explored themes of cultural preservation and evolution through the medium of textile art.",
    awards: ["Ethiopian Arts Council Award 2019", "Best Installation - Addis Art Fair"],
    visitors: 2500,
    impact: "Cultural Bridge",
  },
  {
    id: 2,
    title: "Echoes of Trade",
    category: "films",
    year: "2018",
    status: "archived",
    image: "/placeholder.svg?height=400&width=600&text=Echoes+of+Trade",
    description: "A documentary exploring the historical trade routes that shaped Ethiopian culture and identity.",
    location: "Various locations",
    duration: "45 minutes",
    medium: "Documentary film",
    screenings: "12+",
    detailedDescription:
      "This documentary traced the ancient trade routes that connected Ethiopia to the world, examining how commerce shaped cultural exchange and artistic traditions.",
    awards: ["Best Documentary - African Film Festival 2018"],
    impact: "Historical Awareness",
  },
  {
    id: 3,
    title: "Urban Tapestry",
    category: "commissions",
    year: "2017",
    status: "archived",
    image: "/placeholder.svg?height=400&width=600&text=Urban+Tapestry",
    description: "A large-scale public art commission celebrating the diversity of urban Ethiopian life.",
    location: "Addis Ababa",
    client: "City of Addis Ababa",
    budget: "$25,000",
    medium: "Public mural and textile elements",
    dimensions: "15m x 8m",
    materials: ["Acrylic paint", "Weather-resistant textiles", "Metal framework"],
    detailedDescription:
      "Urban Tapestry was commissioned to celebrate the centennial of Addis Ababa's founding. The piece combined traditional motifs with contemporary urban imagery.",
    visitors: 50000,
    impact: "Community Pride",
  },
  {
    id: 4,
    title: "Ancestral Voices",
    category: "textile",
    year: "2016",
    status: "archived",
    image: "/placeholder.svg?height=400&width=600&text=Ancestral+Voices",
    description: "A series of textile works inspired by oral traditions and ancestral wisdom.",
    location: "Gallery Asni",
    duration: "3 months exhibition",
    medium: "Hand-woven textiles",
    dimensions: "Various sizes",
    materials: ["Traditional cotton", "Natural pigments", "Gold thread"],
    detailedDescription:
      "This series translated oral histories into visual narratives through the medium of traditional weaving, creating a bridge between past and present.",
    visitors: 1800,
    impact: "Cultural Preservation",
  },
  {
    id: 5,
    title: "Digital Diaspora",
    category: "films",
    year: "2015",
    status: "archived",
    image: "/placeholder.svg?height=400&width=600&text=Digital+Diaspora",
    description: "An experimental short film exploring identity in the digital age.",
    location: "Multiple cities",
    duration: "22 minutes",
    medium: "Experimental film",
    screenings: "8+",
    detailedDescription:
      "This experimental work examined how digital technology affects cultural identity and connection to homeland among diaspora communities.",
    awards: ["Innovation Award - International Short Film Festival"],
    impact: "Digital Identity",
  },
  {
    id: 6,
    title: "Heritage Restoration",
    category: "commissions",
    year: "2014",
    status: "archived",
    image: "/placeholder.svg?height=400&width=600&text=Heritage+Restoration",
    description: "Restoration and reinterpretation of historical textile artifacts.",
    location: "National Museum",
    client: "Ethiopian National Museum",
    budget: "$18,000",
    medium: "Textile restoration and documentation",
    materials: ["Archival materials", "Conservation threads", "Digital documentation"],
    detailedDescription:
      "A comprehensive project to restore and document historical textile artifacts, creating both physical preservation and digital archives.",
    impact: "Historical Preservation",
  },
]

export default function ArchivePage({ isDark: propIsDark, toggleTheme: propToggleTheme }: ArchivePageProps) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filteredProjects, setFilteredProjects] = useState(archiveProjects)

  useEffect(() => {
    setMounted(true)

    if (propIsDark !== undefined) {
      setIsDark(propIsDark)
    } else {
      // Default to light mode, only use dark if explicitly set
      const savedTheme = localStorage.getItem("theme")
      const shouldBeDark = savedTheme === "dark"
      setIsDark(shouldBeDark)

      // Apply theme to document
      if (shouldBeDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [propIsDark])

  useEffect(() => {
    let filtered = archiveProjects

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    setFilteredProjects(filtered)
  }, [searchTerm, selectedCategory])

  const toggleTheme = () => {
    if (propToggleTheme) {
      propToggleTheme()
    } else {
      // Fallback for direct navigation
      const newTheme = !isDark
      setIsDark(newTheme)

      if (newTheme) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }
    }
  }

  const openModal = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const categories = [
    { id: "all", label: "All Projects", count: archiveProjects.length },
    { id: "films", label: "Films", count: archiveProjects.filter((p) => p.category === "films").length },
    { id: "textile", label: "Textile", count: archiveProjects.filter((p) => p.category === "textile").length },
    {
      id: "commissions",
      label: "Commissions",
      count: archiveProjects.filter((p) => p.category === "commissions").length,
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "films":
        return "text-red-500"
      case "textile":
        return "text-amber-500"
      case "commissions":
        return "text-emerald-500"
      default:
        return "text-neutral-500"
    }
  }

  const getCategoryBg = (category: string) => {
    switch (category) {
      case "films":
        return "bg-red-500/10 border-red-500/20"
      case "textile":
        return "bg-amber-500/10 border-amber-500/20"
      case "commissions":
        return "bg-emerald-500/10 border-emerald-500/20"
      default:
        return "bg-neutral-500/10 border-neutral-500/20"
    }
  }

  if (!mounted) {
    return <div className="min-h-screen bg-white" />
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-neutral-900 text-white" : "bg-white text-black"}`}
    >
      <Navigation currentPath="/archive" isDark={isDark} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <ArchiveIcon className={`h-8 w-8 ${isDark ? "text-neutral-400" : "text-neutral-600"}`} />
              <h1 className={`text-4xl md:text-6xl font-light ${isDark ? "text-white" : "text-black"}`}>Archive</h1>
            </div>
            <p
              className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              A curated collection of past works, experiments, and explorations that have shaped my artistic journey.
              Each piece represents a moment in time, a question explored, or a boundary pushed.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className={`text-2xl font-light ${isDark ? "text-white" : "text-black"}`}>
                  {archiveProjects.length}
                </div>
                <div
                  className={`uppercase tracking-wider font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Archived Works
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-light ${isDark ? "text-white" : "text-black"}`}>2014-2019</div>
                <div
                  className={`uppercase tracking-wider font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Time Period
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-light ${isDark ? "text-white" : "text-black"}`}>3</div>
                <div
                  className={`uppercase tracking-wider font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Categories
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
              />
              <Input
                placeholder="Search archived projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 font-serif ${isDark ? "bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400" : "bg-white border-neutral-300 text-black placeholder:text-neutral-500"}`}
                style={{ fontFamily: "Times New Roman, serif" }}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className={`h-4 w-4 ${isDark ? "text-neutral-400" : "text-neutral-500"}`} />
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={
                      selectedCategory === category.id
                        ? "font-serif"
                        : `font-serif ${isDark ? "border-neutral-700 text-neutral-300 hover:bg-neutral-800" : "border-neutral-300 text-neutral-600 hover:bg-neutral-50"}`
                    }
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    {category.label} ({category.count})
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className={`${isDark ? "border-neutral-700 text-neutral-300 hover:bg-neutral-800" : "border-neutral-300 text-neutral-600 hover:bg-neutral-50"}`}
              >
                {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Projects Display */}
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => openModal(project)}
                  className={`group cursor-pointer space-y-4 p-6 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${isDark ? "bg-neutral-800/50 border-neutral-700 hover:bg-neutral-800" : "bg-neutral-50 border-neutral-200 hover:bg-white hover:shadow-lg"}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={`${getCategoryBg(project.category)} border`}>
                        <span
                          className={`text-xs font-medium capitalize font-serif ${getCategoryColor(project.category)}`}
                          style={{ fontFamily: "Times New Roman, serif" }}
                        >
                          {project.category}
                        </span>
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="secondary"
                        className={`text-xs font-serif ${isDark ? "bg-neutral-800/80 text-neutral-300" : "bg-white/80 text-neutral-600"}`}
                        style={{ fontFamily: "Times New Roman, serif" }}
                      >
                        {project.year}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3
                      className={`text-lg font-medium group-hover:${getCategoryColor(project.category)} transition-colors ${isDark ? "text-white" : "text-black"}`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {project.description}
                    </p>
                    <div
                      className={`flex items-center space-x-4 text-xs font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {project.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{project.location}</span>
                        </div>
                      )}
                      {project.duration && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{project.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => openModal(project)}
                  className={`group cursor-pointer p-6 rounded-lg border transition-all duration-300 hover:scale-[1.01] ${isDark ? "bg-neutral-800/50 border-neutral-700 hover:bg-neutral-800" : "bg-neutral-50 border-neutral-200 hover:bg-white hover:shadow-lg"}`}
                >
                  <div className="flex space-x-6">
                    <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden rounded">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3
                              className={`text-lg font-medium group-hover:${getCategoryColor(project.category)} transition-colors ${isDark ? "text-white" : "text-black"}`}
                            >
                              {project.title}
                            </h3>
                            <Badge className={`${getCategoryBg(project.category)} border`}>
                              <span
                                className={`text-xs font-medium capitalize font-serif ${getCategoryColor(project.category)}`}
                                style={{ fontFamily: "Times New Roman, serif" }}
                              >
                                {project.category}
                              </span>
                            </Badge>
                          </div>
                          <p
                            className={`text-sm leading-relaxed font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                            style={{ fontFamily: "Times New Roman, serif" }}
                          >
                            {project.description}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`text-xs font-serif ${isDark ? "bg-neutral-800/80 text-neutral-300" : "bg-white/80 text-neutral-600"}`}
                          style={{ fontFamily: "Times New Roman, serif" }}
                        >
                          {project.year}
                        </Badge>
                      </div>
                      <div
                        className={`flex items-center space-x-4 text-xs font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                        style={{ fontFamily: "Times New Roman, serif" }}
                      >
                        {project.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{project.location}</span>
                          </div>
                        )}
                        {project.duration && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{project.duration}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Archived {project.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <ArchiveIcon className={`h-16 w-16 mx-auto mb-4 ${isDark ? "text-neutral-600" : "text-neutral-400"}`} />
              <h3 className={`text-lg font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}>
                No archived projects found
              </h3>
              <p
                className={`font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDark={isDark}
      />
    </div>
  )
}
