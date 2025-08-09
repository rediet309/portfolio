"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"

interface HomePageProps {
  isDark?: boolean
  toggleTheme?: () => void
}

export default function HomePage({ isDark: propIsDark, toggleTheme: propToggleTheme }: HomePageProps) {
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

  if (!mounted) {
    return <div className="min-h-screen bg-white" />
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-neutral-900 text-white" : "bg-white text-black"}`}
    >
      <Navigation currentPath="/" isDark={isDark} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-12 relative pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h1
                className={`text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-stardom leading-none mb-8 ${isDark ? "text-white" : "text-black"}`}
              >
                Visual
                <br />
                Artist
              </h1>

              {/* Text elements positioned beneath the heading */}
              <div className="space-y-6 mb-8">
                <div
                  className={`text-lg md:text-xl leading-relaxed font-times ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                >
                  <p className="text-sm md:text-base mb-4">Specialized in Textiles, Film, and Cultural Storytelling.</p>
                  <p className="text-sm md:text-base mb-4">
                    Explores the intersections of memory, trade, and material culture.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <Link href="/shop">
                  <Button
                    variant="outline"
                    className={`px-8 py-3 text-base rounded-full border-2 font-times ${
                      isDark
                        ? "border-neutral-600 text-white hover:bg-white hover:text-black"
                        : "border-neutral-300 text-black hover:bg-black hover:text-white"
                    } transition-all duration-300`}
                  >
                    Explore Shop
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Image placeholder */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div
                  className={`aspect-[3/4] w-full max-w-md rounded-sm overflow-hidden ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}
                >
                  <Image
                    src="/placeholder.svg?height=600&width=450&text=Featured+Artwork"
                    alt="Featured artwork"
                    width={450}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className={`w-px h-16 ${isDark ? "bg-neutral-700" : "bg-neutral-300"} animate-pulse`}></div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section id="work" className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className={`text-3xl md:text-4xl font-stardom ${isDark ? "text-white" : "text-black"} mb-4`}>
              Selected Works
            </h2>
            <div className={`w-20 h-px ${isDark ? "bg-neutral-700" : "bg-neutral-300"}`}></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-16">
            {[
              {
                title: "Memory Threads",
                year: "2024",
                medium: "Textile Installation",
                image: "/placeholder.svg?height=600&width=480&text=Memory+Threads",
              },
              {
                title: "Trade Winds",
                year: "2023",
                medium: "Documentary Film",
                image: "/placeholder.svg?height=600&width=480&text=Trade+Winds",
              },
              {
                title: "Material Stories",
                year: "2023",
                medium: "Mixed Media",
                image: "/placeholder.svg?height=600&width=480&text=Material+Stories",
              },
            ].map((work, index) => (
              <div key={index} className="group cursor-pointer">
                <div
                  className={`aspect-[4/5] rounded-sm overflow-hidden mb-6 ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}
                >
                  <Image
                    src={work.image || "/placeholder.svg"}
                    alt={work.title}
                    width={480}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h3
                    className={`text-xl font-stardom ${isDark ? "text-white group-hover:text-neutral-300" : "text-black group-hover:text-neutral-600"} transition-colors`}
                  >
                    {work.title}
                  </h3>
                  <p className={`text-sm font-times ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                    {work.medium}, {work.year}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/projects">
              <Button
                variant="outline"
                className={`px-8 py-3 text-base rounded-full border-2 font-times ${
                  isDark
                    ? "border-neutral-600 text-white hover:bg-white hover:text-black"
                    : "border-neutral-300 text-black hover:bg-black hover:text-white"
                } transition-all duration-300`}
              >
                View All Projects
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-8">
              <h2
                className={`text-5xl md:text-6xl lg:text-7xl font-stardom ${isDark ? "text-white" : "text-black"} mb-8 leading-tight`}
              >
                Let's create
                <br />
                something together
              </h2>
              <p className={`text-xl mb-8 font-times ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                Interested in collaborating or learning more about my work?
              </p>

              {/* CTA to contact page */}
              <Link href="/contact">
                <Button
                  className={`px-8 py-4 text-lg rounded-full font-times ${
                    isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"
                  } transition-all duration-300`}
                >
                  Get In Touch
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
