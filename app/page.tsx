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
      <section className="min-h-screen flex items-center justify-center px-12 lg:px-20 relative pt-20">
        <div className="w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left side - Text content */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] font-stardom leading-none text-black">
                  <div className="text-left px-0 mx-36">Visual</div>
                  <div className="text-left mx-[162px]">Artist</div>
                </h1>
              </div>

              {/* Text elements positioned beneath the heading */}
              <div className="space-y-6 mb-8">
                <div className="text-lg md:text-xl leading-relaxed font-times text-neutral-600 px-[38px] mx-[104px]">
                  <p className="text-sm md:text-base mb-4">
                    Multidisciplinary visual artist working across textiles, film, Installation and cultural
                    storytelling.
                  </p>
                  <p className="text-sm md:text-base mb-4">
                    Explores the intersections of memory, trade, and material culture.
                  </p>
                </div>
              </div>

              {/* CTA Button - Aligned with text on the left */}
              <div className="px-[38px] mx-[104px]">
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

            {/* Right side - Image placeholder with wider dimensions for 2728 x 2743 */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative">
                <div className="aspect-[2728/2743] w-full max-w-2xl rounded-sm overflow-hidden bg-neutral-100">
                  <Image
                    src="/placeholder.svg?height=2743&width=2728&text=Featured+Artwork"
                    alt="Featured artwork"
                    width={2728}
                    height={2743}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-neutral-300 animate-pulse"></div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section id="work" className="py-32 px-12 lg:px-20">
        <div className="w-full">
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-stardom text-black mb-4">Selected Works</h2>
            <div className="w-20 h-px bg-neutral-300"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-16">
            {[
              {
                title: "sKINs: East Ethiopia Textile Installation",
                year: "2024",
                medium: "Textile Installation",
                image: "/placeholder.svg?height=600&width=480&text=sKINs+East+Ethiopia",
                href: "/projects/installation",
              },
              {
                title: "sKINs : Dire Dawa",
                year: "2023",
                medium: "Documentary Film",
                image: "/placeholder.svg?height=600&width=480&text=sKINs+Dire+Dawa",
                href: "/projects/films",
              },
              {
                title: "Heart of a Child",
                year: "2023",
                medium: "Mixed Media",
                image: "/placeholder.svg?height=600&width=480&text=Heart+of+a+Child",
                href: "/projects/in-studio",
              },
            ].map((work, index) => (
              <Link key={index} href={work.href} className="group cursor-pointer block">
                <div className="aspect-[4/5] rounded-sm overflow-hidden mb-6 bg-neutral-100">
                  <Image
                    src={work.image || "/placeholder.svg"}
                    alt={work.title}
                    width={480}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-stardom text-black group-hover:text-neutral-600 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-sm font-times text-neutral-500">
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
                className="px-8 py-3 text-base rounded-full border-2 font-times border-neutral-300 text-black hover:bg-black hover:text-white transition-all duration-300 bg-transparent"
              >
                View All Projects
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
