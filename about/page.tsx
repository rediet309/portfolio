"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Palette, Heart, Globe } from "lucide-react"

interface AboutPageProps {
  isDark?: boolean
  toggleTheme?: () => void
}

export default function AboutPage({ isDark: propIsDark, toggleTheme: propToggleTheme }: AboutPageProps) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

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

  const philosophy = [
    {
      title: "Memory",
      description:
        "Preserving cultural narratives through contemporary artistic expression, bridging past and present.",
      icon: Heart,
    },
    {
      title: "Trade",
      description: "Exploring the historical and contemporary flows of culture, commerce, and human connection.",
      icon: Globe,
    },
    {
      title: "Material Culture",
      description: "Understanding identity through the objects, textiles, and artifacts that define our heritage.",
      icon: Palette,
    },
  ]

  const exhibitions = [
    {
      title: "Threads of Time",
      year: "2023",
      venue: "Venue 1",
      location: "Addis Ababa, Ethiopia",
      type: "Solo Exhibition",
    },
    {
      title: "Woven Narratives",
      year: "2022",
      venue: "Venue 2",
      location: "Addis Ababa, Ethiopia",
      type: "Group Exhibition",
    },
    {
      title: "Cultural Crossroads",
      year: "2021",
      venue: "Venue 3",
      location: "Addis Ababa, Ethiopia",
      type: "Featured Artist",
    },
    {
      title: "Ancestral Echoes",
      year: "2019",
      venue: "Venue 4",
      location: "Addis Ababa, Ethiopia",
      type: "Solo Exhibition",
    },
    {
      title: "Contemporary Voices",
      year: "2018",
      venue: "Venue 5",
      location: "Addis Ababa, Ethiopia",
      type: "International Pavilion",
    },
    {
      title: "Textile Traditions",
      year: "2017",
      venue: "Venue 6",
      location: "Addis Ababa, Ethiopia",
      type: "Collaborative Show",
    },
  ]

  if (!mounted) {
    return <div className="min-h-screen bg-white" />
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-neutral-900 text-white" : "bg-white text-black"}`}
    >
      <Navigation currentPath="/about" isDark={isDark} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className={`text-4xl md:text-6xl font-light leading-tight ${isDark ? "text-white" : "text-black"}`}>
                  Rediet Haddis
                </h1>
                <p
                  className={`text-lg md:text-xl leading-relaxed font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Interdisciplinary artist exploring the intersections of memory, trade, and material culture through
                  film, textile, and commissioned works that bridge traditional Ethiopian heritage with contemporary
                  expression.
                </p>
              </div>
            </div>

            {/* Portrait - Made smaller */}
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-lg max-w-sm mx-auto">
                <img
                  src="/placeholder.svg?height=500&width=375&text=Rediet+Haddis+Portrait"
                  alt="Rediet Haddis"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Elements */}
              <div
                className={`absolute -top-4 -right-4 w-20 h-20 rounded-full ${isDark ? "bg-amber-500/20" : "bg-amber-500/10"} animate-pulse`}
              />
              <div
                className={`absolute -bottom-6 -left-6 w-14 h-14 rounded-full ${isDark ? "bg-red-500/20" : "bg-red-500/10"} animate-pulse`}
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className={`py-16 px-6 lg:px-12 ${isDark ? "bg-neutral-800/30" : "bg-neutral-50"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-light mb-6 ${isDark ? "text-white" : "text-black"}`}>
              Artistic Philosophy
            </h2>
            <p
              className={`text-lg max-w-3xl mx-auto leading-relaxed font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              My work is grounded in three interconnected pillars that shape my understanding of cultural identity and
              artistic expression in our globalized world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {philosophy.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`p-8 rounded-lg border transition-all duration-300 hover:scale-105 ${isDark ? "bg-neutral-900/50 border-neutral-700" : "bg-white border-neutral-200"}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center space-y-4">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}
                  >
                    <pillar.icon className={`h-8 w-8 ${isDark ? "text-neutral-300" : "text-neutral-600"}`} />
                  </div>
                  <h3 className={`text-xl font-medium ${isDark ? "text-white" : "text-black"}`}>{pillar.title}</h3>
                  <p
                    className={`leading-relaxed font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <h2 className={`text-3xl md:text-4xl font-light ${isDark ? "text-white" : "text-black"}`}>Biography</h2>

              <div
                className="space-y-6 text-lg leading-relaxed font-serif"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                <p className={isDark ? "text-neutral-300" : "text-neutral-600"}>
                  Born in Addis Ababa, Ethiopia, I grew up surrounded by the rich tapestry of Ethiopian culture, where
                  ancient traditions seamlessly blend with contemporary life. This early exposure to the intersection of
                  old and new would later become a defining characteristic of my artistic practice.
                </p>

                <p className={isDark ? "text-neutral-300" : "text-neutral-600"}>
                  My journey as an artist began with textile work, learning traditional weaving techniques from master
                  craftswomen in rural Ethiopia. This foundation in material culture and traditional practices provided
                  the groundwork for my later explorations in film and contemporary art.
                </p>

                <p className={isDark ? "text-neutral-300" : "text-neutral-600"}>
After earning my BSc in Architecture in Addis Ababa, I have continued to explore the intersections between space, culture, and artistic expression. My work spans multiple mediums, consistently engaging with themes of cultural memory, trade relationships, and the material expressions of identity.
                </p>

                <p className={isDark ? "text-neutral-300" : "text-neutral-600"}>
                  Today, I continue to create work that challenges boundaries between traditional and contemporary,
                  local and global, individual and collective memory. Through exhibitions, films, and community
                  projects, I aim to foster dialogue about cultural preservation and evolution in our interconnected
                  world.
                </p>
              </div>
            </div>

            {/* Education Sidebar */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className={`text-xl font-medium ${isDark ? "text-white" : "text-black"}`}>Education</h3>
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded border ${isDark ? "bg-neutral-800/50 border-neutral-700" : "bg-neutral-50 border-neutral-200"}`}
                  >
                    <div className={`font-medium ${isDark ? "text-white" : "text-black"}`}>
                      BSc Architecture
                    </div>
                    <div
                      className={`text-sm font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      Addis Ababa University, 2019
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded border ${isDark ? "bg-neutral-800/50 border-neutral-700" : "bg-neutral-50 border-neutral-200"}`}
                  >
                    <div className={`font-medium ${isDark ? "text-white" : "text-black"}`}>Fine Arts</div>
                    <div
                      className={`text-sm font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      Addis Ababa University, 2020
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitions Section - Replacing Timeline */}
      <section className={`py-16 px-6 lg:px-12 ${isDark ? "bg-neutral-800/30" : "bg-neutral-50"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-light mb-6 ${isDark ? "text-white" : "text-black"}`}>
              Selected Exhibitions
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto leading-relaxed font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              A selection of significant exhibitions and presentations that have shaped my artistic journey and brought
              my work to international audiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exhibitions.map((exhibition, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border transition-all duration-300 hover:scale-105 ${isDark ? "bg-neutral-900/50 border-neutral-700" : "bg-white border-neutral-200"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div
                      className={`text-sm px-2 py-1 rounded ${isDark ? "bg-neutral-800 text-neutral-300" : "bg-neutral-100 text-neutral-600"}`}
                    >
                      {exhibition.type}
                    </div>
                    <div className={`text-sm font-medium ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                      {exhibition.year}
                    </div>
                  </div>

                  <h3 className={`text-lg font-medium ${isDark ? "text-white" : "text-black"}`}>{exhibition.title}</h3>

                  <div className="space-y-1">
                    <div
                      className={`font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {exhibition.venue}
                    </div>
                    <div
                      className={`text-sm font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {exhibition.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
