"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ProjectModal } from "@/components/project-modal"
import { Play, Calendar, Clock, Award, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FilmsPage() {
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

  const films = [
    {
      id: 1,
      title: "Threads of Memory",
      year: "2024",
      duration: "28 min",
      category: "films",
      image: "/placeholder.svg?height=600&width=800&text=Threads+of+Memory",
      description:
        "A poetic exploration of how textile traditions carry generational memories across Ethiopian diaspora communities.",
      detailedDescription:
        "This documentary follows three generations of Ethiopian women as they navigate the preservation of traditional weaving techniques in contemporary urban settings. Through intimate portraits and stunning cinematography, the film reveals how cultural practices adapt and survive in new environments while maintaining their essential meaning and connection to ancestral knowledge.",
      medium: "Documentary Film",
      dimensions: "4K Digital",
      location: "New York, Addis Ababa",
      screenings: 15,
      awards: ["Best Documentary - Tribeca Film Festival 2024", "Audience Choice Award - IDFA 2024"],
      materials: ["16mm Film", "Digital Video", "Archival Footage", "Traditional Music"],
    },
    {
      id: 2,
      title: "Trade Winds",
      year: "2023",
      duration: "45 min",
      category: "films",
      image: "/placeholder.svg?height=600&width=800&text=Trade+Winds",
      description: "An investigation into ancient trade routes and their impact on contemporary cultural identity.",
      detailedDescription:
        "Trade Winds traces the historical spice routes that connected Ethiopia to the Mediterranean world, examining how these ancient pathways continue to influence modern cultural exchange. The film combines historical research with contemporary interviews, creating a layered narrative about globalization, cultural identity, and the persistence of traditional knowledge systems.",
      medium: "Documentary Film",
      dimensions: "HD Digital",
      location: "Ethiopia, Italy, Turkey",
      screenings: 22,
      awards: ["Best Cinematography - Sundance 2023", "Special Jury Prize - Hot Docs 2023"],
      materials: ["Digital Cinema", "Drone Footage", "Historical Maps", "Traditional Instruments"],
    },
    {
      id: 3,
      title: "Material Witnesses",
      year: "2022",
      duration: "35 min",
      category: "films",
      image: "/placeholder.svg?height=600&width=800&text=Material+Witnesses",
      description: "Objects tell stories of migration, loss, and resilience in this experimental documentary.",
      detailedDescription:
        "An experimental approach to documentary filmmaking that gives voice to inanimate objects - textiles, jewelry, photographs, and household items - that have traveled with immigrant families. Through innovative cinematography and sound design, these objects become narrators of human stories of displacement, adaptation, and cultural preservation.",
      medium: "Experimental Documentary",
      dimensions: "HD Digital",
      location: "London, Berlin, New York",
      screenings: 18,
      awards: ["Innovation Award - Berlin International Film Festival 2022"],
      materials: ["Macro Photography", "Sound Design", "Animation", "Archival Materials"],
    },
    {
      id: 4,
      title: "Ancestral Echoes",
      year: "2021",
      duration: "52 min",
      category: "films",
      image: "/placeholder.svg?height=600&width=800&text=Ancestral+Echoes",
      description:
        "A multi-generational story exploring the transmission of cultural knowledge through oral traditions.",
      detailedDescription:
        "This feature-length documentary explores how oral traditions function as repositories of cultural knowledge, focusing on Ethiopian storytelling practices and their evolution in diaspora communities. The film weaves together multiple narrative threads, showing how stories adapt while maintaining their essential truths across generations and geographical boundaries.",
      medium: "Feature Documentary",
      dimensions: "4K Digital",
      location: "Ethiopia, USA, Canada",
      screenings: 28,
      awards: [
        "Best Feature Documentary - Toronto International Film Festival 2021",
        "Audience Award - Sheffield Doc/Fest 2021",
      ],
      materials: ["Multi-camera Setup", "Traditional Music Recording", "Oral History Archives", "Cultural Artifacts"],
    },
  ]

  const totalScreenings = films.reduce((sum, film) => sum + film.screenings, 0)
  const totalAwards = films.reduce((sum, film) => sum + film.awards.length, 0)

  const openModal = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-neutral-900" : "bg-white"}`}>
      <Navigation currentPath="/projects/films" isDark={isDark} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
              <Play className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-red-500">Documentary Films</span>
            </div>

            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-light leading-none ${isDark ? "text-white" : "text-black"}`}
            >
              Films
            </h1>

            <p
              className={`text-xl leading-relaxed max-w-3xl mx-auto ${isDark ? "text-neutral-300" : "text-neutral-600"} font-serif`}
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Documentary films exploring cultural memory, migration, and the stories embedded in material culture
              across Ethiopian diaspora communities.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-12 pt-8">
              <div className="text-center">
                <div className={`text-3xl font-light ${isDark ? "text-white" : "text-black"}`}>{films.length}</div>
                <div className={`text-sm uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                  Films
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-light ${isDark ? "text-white" : "text-black"}`}>{totalScreenings}</div>
                <div className={`text-sm uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                  Screenings
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-light ${isDark ? "text-white" : "text-black"}`}>{totalAwards}</div>
                <div className={`text-sm uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                  Awards
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Film */}
      <section className="pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className={`text-2xl font-light ${isDark ? "text-white" : "text-black"}`}>Featured Film</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group cursor-pointer" onClick={() => openModal(films[0])}>
              <div className="aspect-[16/10] rounded-lg overflow-hidden">
                <img
                  src={films[0].image || "/placeholder.svg"}
                  alt={films[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-6 w-6 text-white ml-1" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className={`text-3xl md:text-4xl font-light ${isDark ? "text-white" : "text-black"}`}>
                  {films[0].title}
                </h3>

                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-red-500" />
                    <span
                      className={`${isDark ? "text-neutral-300" : "text-neutral-600"} font-serif`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {films[0].year}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-red-500" />
                    <span
                      className={`${isDark ? "text-neutral-300" : "text-neutral-600"} font-serif`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {films[0].duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-red-500" />
                    <span
                      className={`${isDark ? "text-neutral-300" : "text-neutral-600"} font-serif`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {films[0].screenings} screenings
                    </span>
                  </div>
                </div>
              </div>

              <p
                className={`text-lg leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-600"} font-serif`}
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                {films[0].description}
              </p>

              <div className="flex items-center space-x-4">
                <Button onClick={() => openModal(films[0])} className="bg-red-500 hover:bg-red-600 text-white">
                  <Play className="h-4 w-4 mr-2" />
                  View Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Films Grid */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className={`text-2xl font-light ${isDark ? "text-white" : "text-black"}`}>All Films</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {films.slice(1).map((film) => (
              <div key={film.id} className="group cursor-pointer" onClick={() => openModal(film)}>
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                    <img
                      src={film.image || "/placeholder.svg"}
                      alt={film.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                        <Play className="h-4 w-4 text-white ml-0.5" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-4 right-4 px-2 py-1 rounded bg-black/60 backdrop-blur-sm">
                      <span className="text-xs text-white">{film.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3
                      className={`text-xl font-light group-hover:text-red-500 transition-colors ${isDark ? "text-white" : "text-black"}`}
                    >
                      {film.title}
                    </h3>

                    <div className="flex items-center space-x-4 text-sm">
                      <span
                        className={`${isDark ? "text-neutral-400" : "text-neutral-500"} font-serif`}
                        style={{ fontFamily: "Times New Roman, serif" }}
                      >
                        {film.year}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span
                          className={`${isDark ? "text-neutral-400" : "text-neutral-500"} font-serif`}
                          style={{ fontFamily: "Times New Roman, serif" }}
                        >
                          {film.screenings}
                        </span>
                      </div>
                      {film.awards.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Award className="h-3 w-3 text-amber-500" />
                          <span
                            className={`${isDark ? "text-neutral-400" : "text-neutral-500"} font-serif`}
                            style={{ fontFamily: "Times New Roman, serif" }}
                          >
                            {film.awards.length}
                          </span>
                        </div>
                      )}
                    </div>

                    <p
                      className={`text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-500"} font-serif`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {film.description}
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
