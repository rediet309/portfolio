"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-white" />
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation currentPath="/" />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pl-12 lg:pl-20 relative pt-20 shadow-xl">
        <div className="w-full flex">
          {/* Left side - Text content (fixed width 1/3) */}
          <div className="w-1/3 flex flex-col justify-center pr-12">
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-stardom leading-none text-black">
                <div className="text-left pl-2">Visual</div>
                <div className="text-left pl-2">Artist</div>
              </h1>
            </div>

            <div className="space-y-6 mb-8">
              <div className="text-lg md:text-xl leading-relaxed font-times text-neutral-600">
                <p className="text-sm md:text-base mb-4 text-justify pl-2">
                  Multidisciplinary artist working across Film, installation, textile and clothing.
                </p>
              </div>
            </div>

            <div className="pl-2">
              <Link href="/shop">
                <Button
                  variant="outline"
                  className="px-8 py-3 text-base rounded-full border-2 font-times border-neutral-300 text-black hover:bg-black hover:text-white transition-all duration-300 bg-transparent"
                >
                  Visit Shop
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Image holder (expands to the right edge) */}
          <div className="flex-1 flex items-center">
            <div className="overflow-hidden bg-neutral-100 group cursor-pointer w-full rounded-none h-[820px]">
              <Image
                src="/placeholder.svg?height=600&width=1200&text=Hero+Portrait"
                alt="Hero Portrait"
                width={2200}
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-neutral-300 animate-pulse"></div>
        </div>
      </section>

      {/* Selected Works Section - Made more compact */}
      <section id="work" className="py-4 px-12 lg:px-20">
        <div className="w-full pt-4">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-stardom text-black mb-2">Selected Works</h2>
            <div className="w-12 h-px bg-neutral-300"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-6">
            {[
              {
                title: "sKINs: East Ethiopia Textile Installation",
                year: "2024",
                medium: "Textile Installation",
                image: "/placeholder.svg?height=200&width=200&text=sKINs+East+Ethiopia",
                href: "/projects/installation",
              },
              {
                title: "sKINs : Dire Dawa",
                year: "2023",
                medium: "Documentary Film",
                image: "/placeholder.svg?height=200&width=200&text=sKINs+Dire+Dawa",
                href: "/projects/films",
              },
              {
                title: "Heart of a Child",
                year: "2023",
                medium: "Mixed Media",
                image: "/placeholder.svg?height=200&width=200&text=Heart+of+a+Child",
                href: "/projects/in-studio",
              },
            ].map((work, index) => (
              <Link key={index} href={work.href} className="group cursor-pointer block">
                <div className="aspect-square rounded-sm overflow-hidden mb-2 bg-neutral-100">
                  <Image
                    src={work.image || "/placeholder.svg"}
                    alt={work.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-stardom text-black group-hover:text-neutral-600 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-xs font-times text-neutral-500">
                    {work.medium}, {work.year}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/projects">
              <Button
                variant="outline"
                className="px-6 py-2 text-sm rounded-full border-2 font-times border-neutral-300 text-black hover:bg-black hover:text-white transition-all duration-300 bg-transparent"
              >
                View All Projects
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
