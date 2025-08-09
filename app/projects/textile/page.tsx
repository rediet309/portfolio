"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ProjectModal } from "@/components/project-modal"
import { Scissors, Users, Eye, Award, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TextilePage() {
  const [isDark, setIsDark] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Prevent FOUC and ensure consistent theme
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

  const textileProjects = [
    {
      id: 1,
      title: "Woven Memories",
      year: "2024",
      category: "textile",
      image: "/placeholder.svg?height=600&width=800&text=Woven+Memories",
      description:
        "Large-scale textile installation exploring generational knowledge transmission through traditional Ethiopian weaving techniques.",
      detailedDescription:
        "This monumental installation consists of over 200 individual textile pieces created in collaboration with master weavers from the Ethiopian highlands. Each piece represents a different family story, migration journey, or cultural memory, woven using traditional techniques but incorporating contemporary materials and colors that reflect the diaspora experience.",
      medium: "Textile Installation",
      dimensions: "15 x 8 x 3 meters",
      location: "Museum of Contemporary Art, New York",
      visitors: 45000,
      impact: "Cultural Bridge",
      materials: ["Ethiopian Cotton", "Silk Threads", "Natural Dyes", "Contemporary Fibers", "Traditional Looms"],
      awards: ["Best Installation - Venice Biennale 2024", "Cultural Impact Award - Smithsonian 2024"],
    },
    {
      id: 2,
      title: "Trade Route Tapestries",
      year: "2023",
      category: "textile",
      image: "/placeholder.svg?height=600&width=800&text=Trade+Route+Tapestries",
      description:
        "Series of tapestries mapping historical trade connections between Ethiopia and the Mediterranean world.",
      detailedDescription:
        "This series of twelve large-scale tapestries traces the ancient spice and textile trade routes that connected the Ethiopian highlands to Mediterranean markets. Each tapestry incorporates materials and techniques from different regions along these routes, creating a textile map of cultural exchange and economic interdependence that spans centuries.",
      medium: "Tapestry Series",
      dimensions: "Series of 12, 3 x 2 meters each",
      location: "Tate Modern, London",
      visitors: 32000,
      impact: "Historical Dialogue",
      materials: ["Wool", "Silk", "Gold Thread", "Spices", "Natural Pigments", "Historical Maps"],
      awards: ["Excellence in Craft - Turner Prize 2023"],
    },
    {
      id: 3,
      title: "Diaspora Threads",
      year: "2022",
      category: "textile",
      image: "/placeholder.svg?height=600&width=800&text=Diaspora+Threads",
      description:
        "Interactive textile installation allowing visitors to contribute their own migration stories through collaborative weaving.",
      detailedDescription:
        "An evolving installation that invites members of diaspora communities to contribute threads, fabrics, and stories to a growing textile narrative. Over the course of its exhibition, the piece transforms as new voices and experiences are literally woven into the work, creating a living document of contemporary migration and cultural adaptation.",
      medium: "Interactive Installation",
      dimensions: "Variable, grows throughout exhibition",
      location: "Brooklyn Museum, New York",
      visitors: 28000,
      impact: "Community Engagement",
      materials: ["Donated Fabrics", "Community Threads", "Personal Objects", "Digital Stories", "Traditional Tools"],
      awards: ["Community Engagement Award - Brooklyn Museum 2022"],
    },
    {
      id: 4,
      title: "Material Genealogies",
      year: "2021",
      category: "textile",
      image: "/placeholder.svg?height=600&width=800&text=Material+Genealogies",
      description:
        "Textile works that trace family histories through inherited fabrics and clothing across three generations.",
      detailedDescription:
        "This intimate series examines how textiles function as repositories of family memory, incorporating actual clothing and fabrics passed down through three generations of Ethiopian families. Each piece combines traditional weaving techniques with contemporary artistic practices to create new works that honor both ancestral knowledge and contemporary experience.",
      medium: "Mixed Textile Media",
      dimensions: "Series of 8, various sizes",
      location: "National Museum of African Art, Washington DC",
      visitors: 22000,
      impact: "Cultural Preservation",
      materials: [
        "Inherited Textiles",
        "Family Photographs",
        "Traditional Dyes",
        "Contemporary Threads",
        "Archival Materials",
      ],
      awards: ["Heritage Preservation Award - Smithsonian 2021"],
    },
  ]

  const totalVisitors = textileProjects.reduce((sum, project) => sum + project.visitors, 0)
  const totalAwards = textileProjects.reduce((sum, project) => sum + project.awards.length, 0)

  const openModal = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-neutral-900" : "bg-white"}`}>
      <Navigation currentPath="/projects/textile" isDark={isDark} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Scissors className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-500">Textile Arts</span>
            </div>

            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-light leading-none ${isDark ? "text-white" : "text-black"}`}
            >
              Textile
            </h1>

            <p
              className={`text-xl leading-relaxed max-w-3xl mx-auto font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Large-scale installations and intimate textile works exploring cultural memory, traditional craft
              knowledge, and the stories woven into fabric across generations.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-12 pt-8">
              <div className="text-center">
                <div className={`text-3xl font-light ${isDark ? "text-white" : "text-black"}`}>
                  {textileProjects.length}
                </div>
                <div
                  className={`text-sm uppercase tracking-wider font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Installations
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-light ${isDark ? "text-white" : "text-black"}`}>
                  {totalVisitors.toLocaleString()}
                </div>
                <div
                  className={`text-sm uppercase tracking-wider font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Visitors
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-light ${isDark ? "text-white" : "text-black"}`}>{totalAwards}</div>
                <div
                  className={`text-sm uppercase tracking-wider font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Awards
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Installation */}
      <section className="pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className={`text-2xl font-light ${isDark ? "text-white" : "text-black"}`}>Featured Installation</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group cursor-pointer" onClick={() => openModal(textileProjects[0])}>
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={textileProjects[0].image || "/placeholder.svg"}
                  alt={textileProjects[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Materials Preview */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-wrap gap-2">
                  {textileProjects[0].materials.slice(0, 3).map((material, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded bg-white/20 backdrop-blur-sm text-white font-serif"
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {material}
                    </span>
                  ))}
                  <span
                    className="px-2 py-1 text-xs rounded bg-white/20 backdrop-blur-sm text-white font-serif"
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    +{textileProjects[0].materials.length - 3} more
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className={`text-3xl md:text-4xl font-light ${isDark ? "text-white" : "text-black"}`}>
                  {textileProjects[0].title}
                </h3>

                <div
                  className="flex items-center space-x-6 text-sm font-serif"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className={isDark ? "text-neutral-300" : "text-neutral-600"}>{textileProjects[0].year}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-amber-500" />
                    <span className={isDark ? "text-neutral-300" : "text-neutral-600"}>
                      {textileProjects[0].location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-amber-500" />
                    <span className={isDark ? "text-neutral-300" : "text-neutral-600"}>
                      {textileProjects[0].visitors.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <p
                className={`text-lg leading-relaxed font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                {textileProjects[0].description}
              </p>

              <div className="space-y-3">
                <h4 className={`font-medium ${isDark ? "text-white" : "text-black"}`}>Key Materials</h4>
                <div className="flex flex-wrap gap-2">
                  {textileProjects[0].materials.slice(0, 4).map((material, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-sm rounded-full font-serif ${isDark ? "bg-amber-500/20 text-amber-300" : "bg-amber-500/10 text-amber-700"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => openModal(textileProjects[0])}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                >
                  View Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Textile Grid */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className={`text-2xl font-light ${isDark ? "text-white" : "text-black"}`}>All Textile Works</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {textileProjects.slice(1).map((project) => (
              <div key={project.id} className="group cursor-pointer" onClick={() => openModal(project)}>
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Impact Badge */}
                    <div className="absolute top-4 right-4 px-2 py-1 rounded bg-amber-500/20 backdrop-blur-sm border border-amber-500/30">
                      <span
                        className="text-xs text-amber-300 font-serif"
                        style={{ fontFamily: "Times New Roman, serif" }}
                      >
                        {project.impact}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3
                      className={`text-xl font-light group-hover:text-amber-500 transition-colors ${isDark ? "text-white" : "text-black"}`}
                    >
                      {project.title}
                    </h3>

                    <div
                      className="flex items-center space-x-4 text-sm font-serif"
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      <span className={isDark ? "text-neutral-400" : "text-neutral-500"}>{project.year}</span>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span className={isDark ? "text-neutral-400" : "text-neutral-500"}>
                          {project.visitors.toLocaleString()}
                        </span>
                      </div>
                      {project.awards.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Award className="h-3 w-3 text-amber-500" />
                          <span className={isDark ? "text-neutral-400" : "text-neutral-500"}>
                            {project.awards.length}
                          </span>
                        </div>
                      )}
                    </div>

                    <p
                      className={`text-sm leading-relaxed font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDark={isDark}
      />

      {/* Footer */}
    </div>
  )
}
