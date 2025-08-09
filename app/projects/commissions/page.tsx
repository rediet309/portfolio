"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ProjectModal } from "@/components/project-modal"
import { Briefcase, DollarSign, Users, Calendar, MapPin, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CommissionsPage() {
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

  const commissions = [
    {
      id: 1,
      title: "Cultural Heritage Center Installation",
      year: "2024",
      category: "commissions",
      image: "/placeholder.svg?height=600&width=800&text=Cultural+Heritage+Center",
      description: "Monumental textile installation for the new Ethiopian Cultural Heritage Center in Washington, DC.",
      detailedDescription:
        "This large-scale commission involved creating a permanent installation that serves as the centerpiece for the Ethiopian Cultural Heritage Center. The work incorporates traditional weaving techniques with contemporary materials to create an immersive environment that tells the story of Ethiopian cultural traditions and their evolution in diaspora communities. The installation includes interactive elements that allow visitors to engage with the cultural narratives embedded in the work.",
      medium: "Permanent Installation",
      dimensions: "20 x 12 x 4 meters",
      location: "Washington, DC",
      client: "Ethiopian Cultural Heritage Foundation",
      budget: "$450,000",
      visitors: 75000,
      impact: "Cultural Education",
      materials: [
        "Traditional Ethiopian Cotton",
        "Contemporary Fibers",
        "LED Integration",
        "Interactive Sensors",
        "Natural Dyes",
      ],
      awards: ["Excellence in Public Art - Smithsonian 2024", "Cultural Impact Award - DC Arts Commission 2024"],
    },
    {
      id: 2,
      title: "Corporate Headquarters Art Program",
      year: "2023",
      category: "commissions",
      image: "/placeholder.svg?height=600&width=800&text=Corporate+Headquarters",
      description:
        "Series of textile works exploring themes of global connection and cultural exchange for multinational corporation.",
      detailedDescription:
        "A comprehensive art program for the global headquarters of a major technology company, consisting of twelve large-scale textile works distributed throughout the building. Each piece explores themes of global connectivity, cultural exchange, and technological innovation through the lens of traditional craft practices. The works serve both as aesthetic elements and as conversation starters about cultural diversity in the workplace.",
      medium: "Corporate Art Series",
      dimensions: "Series of 12, various sizes",
      location: "San Francisco, CA",
      client: "Global Tech Corporation",
      budget: "$320,000",
      visitors: 25000,
      impact: "Workplace Culture",
      materials: ["International Textiles", "Digital Integration", "Sustainable Fibers", "Corporate Branding Elements"],
      awards: ["Best Corporate Art Program - ArtBusiness 2023"],
    },
    {
      id: 3,
      title: "University Campus Memorial",
      year: "2022",
      category: "commissions",
      image: "/placeholder.svg?height=600&width=800&text=University+Memorial",
      description:
        "Memorial installation honoring the contributions of international students and faculty to university community.",
      detailedDescription:
        "This memorial installation was commissioned to honor the diverse international community that has contributed to the university's academic excellence over its 150-year history. The work consists of a series of textile panels that incorporate materials and techniques from around the world, creating a visual representation of the global nature of academic collaboration and knowledge exchange.",
      medium: "Memorial Installation",
      dimensions: "8 x 6 x 2 meters",
      location: "Yale University, New Haven, CT",
      client: "Yale University",
      budget: "$180,000",
      visitors: 40000,
      impact: "Educational Legacy",
      materials: ["International Textiles", "Archival Materials", "Weather-Resistant Fibers", "Memorial Plaques"],
      awards: ["Memorial Design Excellence - American Institute of Architects 2022"],
    },
    {
      id: 4,
      title: "Public Transit Art Integration",
      year: "2021",
      category: "commissions",
      image: "/placeholder.svg?height=600&width=800&text=Public+Transit+Art",
      description:
        "Textile-based art integration for new subway station celebrating neighborhood's immigrant communities.",
      detailedDescription:
        "This public art commission transformed a new subway station into a celebration of the neighborhood's rich immigrant history. The installation consists of textile elements integrated into the station's architecture, including ceiling installations, wall panels, and seating areas that incorporate patterns and materials representing the various communities that have called the neighborhood home over the past century.",
      medium: "Public Art Integration",
      dimensions: "Station-wide installation",
      location: "Brooklyn, NY",
      client: "Metropolitan Transportation Authority",
      budget: "$275,000",
      visitors: 150000,
      impact: "Community Pride",
      materials: [
        "Weather-Resistant Textiles",
        "Architectural Integration",
        "Community-Sourced Materials",
        "Transit-Safe Materials",
      ],
      awards: [
        "Excellence in Public Transit Art - NYC Arts Commission 2021",
        "Community Engagement Award - Brooklyn Arts Council 2021",
      ],
    },
  ]

  const totalBudget = commissions.reduce((sum, commission) => {
    const budget = Number.parseInt(commission.budget.replace(/[$,]/g, ""))
    return sum + budget
  }, 0)
  const totalVisitors = commissions.reduce((sum, commission) => sum + commission.visitors, 0)
  const totalAwards = commissions.reduce((sum, commission) => sum + commission.awards.length, 0)

  const openModal = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-neutral-900" : "bg-white"}`}>
      <Navigation currentPath="/projects/commissions" isDark={isDark} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Briefcase className="h-4 w-4 text-emerald-500" />
              <span
                className="text-sm font-medium text-emerald-500 font-serif"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Commissioned Works
              </span>
            </div>

            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-light leading-none ${isDark ? "text-white" : "text-black"}`}
            >
              Commissions
            </h1>

            <p
              className={`text-xl leading-relaxed max-w-3xl mx-auto font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Large-scale commissioned works for cultural institutions, corporations, and public spaces, creating
              meaningful connections between communities and contemporary art practice.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-12 pt-8">
              <div className="text-center">
                <div className={`text-3xl font-light ${isDark ? "text-white" : "text-black"}`}>
                  {commissions.length}
                </div>
                <div
                  className={`text-sm uppercase tracking-wider font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Projects
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-light ${isDark ? "text-white" : "text-black"}`}>
                  ${(totalBudget / 1000000).toFixed(1)}M
                </div>
                <div
                  className={`text-sm uppercase tracking-wider font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Total Value
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
            </div>
          </div>
        </div>
      </section>

      {/* Featured Commission */}
      <section className="pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className={`text-2xl font-light ${isDark ? "text-white" : "text-black"}`}>Featured Commission</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group cursor-pointer" onClick={() => openModal(commissions[0])}>
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={commissions[0].image || "/placeholder.svg"}
                  alt={commissions[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Budget Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30">
                <span
                  className="text-sm font-medium text-emerald-300 font-serif"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  {commissions[0].budget}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className={`text-3xl md:text-4xl font-light ${isDark ? "text-white" : "text-black"}`}>
                  {commissions[0].title}
                </h3>

                <div
                  className="grid grid-cols-2 gap-4 text-sm font-serif"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-emerald-500" />
                    <span className={isDark ? "text-neutral-300" : "text-neutral-600"}>{commissions[0].year}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-emerald-500" />
                    <span className={isDark ? "text-neutral-300" : "text-neutral-600"}>{commissions[0].location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-emerald-500" />
                    <span className={isDark ? "text-neutral-300" : "text-neutral-600"}>{commissions[0].budget}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-emerald-500" />
                    <span className={isDark ? "text-neutral-300" : "text-neutral-600"}>
                      {commissions[0].visitors.toLocaleString()} visitors
                    </span>
                  </div>
                </div>
              </div>

              <p
                className={`text-lg leading-relaxed font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                {commissions[0].description}
              </p>

              <div className="space-y-3">
                <h4 className={`font-medium ${isDark ? "text-white" : "text-black"}`}>Client</h4>
                <p
                  className={`text-sm font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  {commissions[0].client}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => openModal(commissions[0])}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  View Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commissions Timeline */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className={`text-2xl font-light ${isDark ? "text-white" : "text-black"}`}>Project Timeline</h2>
          </div>

          <div className="space-y-12">
            {commissions.slice(1).map((commission, index) => (
              <div
                key={commission.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative group cursor-pointer" onClick={() => openModal(commission)}>
                    <div className="aspect-[4/3] rounded-lg overflow-hidden">
                      <img
                        src={commission.image || "/placeholder.svg"}
                        alt={commission.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/60 backdrop-blur-sm">
                      <span
                        className="text-sm font-medium text-white font-serif"
                        style={{ fontFamily: "Times New Roman, serif" }}
                      >
                        {commission.year}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="space-y-4">
                    <h3
                      className={`text-2xl md:text-3xl font-light group-hover:text-emerald-500 transition-colors ${isDark ? "text-white" : "text-black"}`}
                    >
                      {commission.title}
                    </h3>

                    <div
                      className="grid grid-cols-2 gap-3 text-sm font-serif"
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      <div className={`${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                        <span className="font-medium">Client:</span> {commission.client}
                      </div>
                      <div className={`${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                        <span className="font-medium">Budget:</span> {commission.budget}
                      </div>
                      <div className={`${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                        <span className="font-medium">Location:</span> {commission.location}
                      </div>
                      <div className={`${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                        <span className="font-medium">Impact:</span> {commission.impact}
                      </div>
                    </div>
                  </div>

                  <p
                    className={`leading-relaxed font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    {commission.description}
                  </p>

                  {commission.awards.length > 0 && (
                    <div className="space-y-2">
                      <h4 className={`font-medium ${isDark ? "text-white" : "text-black"}`}>Recognition</h4>
                      <div className="space-y-1">
                        {commission.awards.map((award, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <Award className="h-3 w-3 text-emerald-500" />
                            <span
                              className={`text-sm font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                              style={{ fontFamily: "Times New Roman, serif" }}
                            >
                              {award}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={() => openModal(commission)}
                    variant="outline"
                    className={`${isDark ? "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10" : "border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10"}`}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-20 px-6 lg:px-12 ${isDark ? "bg-neutral-800/30" : "bg-neutral-50/50"}`}>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className={`text-3xl md:text-4xl font-light ${isDark ? "text-white" : "text-black"}`}>
            Interested in Commissioning Work?
          </h2>
          <p
            className={`text-lg leading-relaxed font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            I work with cultural institutions, corporations, and public organizations to create meaningful art
            installations that connect communities with contemporary artistic practice.
          </p>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Start a Conversation</Button>
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
