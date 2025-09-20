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
      <section className="min-h-screen flex items-center relative pt-20 overflow-hidden">
        <div className="w-full max-w-none flex flex-col lg:flex-row px-4 sm:px-6 sm:pr-0 lg:pl-12 lg:pr-0 xl:pl-20 xl:pr-0">
          {/* Left side - Text content */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center mb-8 lg:mb-0 lg:pr-12">
            <div className="mb-6 lg:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-stardom leading-none text-black">
                <div className="text-left pl-1 sm:pl-2">Visual</div>
                <div className="text-left pl-1 sm:pl-2">Artist</div>
              </h1>
            </div>

            <div className="space-y-4 lg:space-y-6 mb-6 lg:mb-8">
              <div className="text-base sm:text-lg md:text-xl leading-relaxed font-times text-neutral-600">
                <p className="text-sm sm:text-base mb-4 text-justify pl-1 sm:pl-2">
                  Multidisciplinary artist working across Film, installation, textile and clothing.
                </p>
              </div>
            </div>

            <div className="pl-1 sm:pl-2">
              <Link href="/shop">
                <Button
                  variant="outline"
                  className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full border-2 font-times border-neutral-300 text-black hover:bg-black hover:text-white transition-all duration-300 bg-transparent"
                >
                  Visit Shop
                  <ArrowUpRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Image holder */}
          <div className="flex-1 flex items-center">
            <div className="overflow-hidden bg-neutral-100 group cursor-pointer w-full rounded-none h-[60vh] sm:h-[70vh] lg:h-[90vh]">
              <Image
                src="/images/hero 2e.webp"
                alt="Rediet Haddis - Visual Artist Portrait"
                width={1175}
                height={800}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 50vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-neutral-300 animate-pulse"></div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section
        id="work"
        className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-20 overflow-hidden scroll-smooth bg-neutral-50"
      >
        <div className="w-full py-8 lg:py-12">
          <div className="mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-stardom text-black mb-4">
              Selected Works
            </h2>
            <div className="w-16 h-px bg-neutral-300"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 mb-8 lg:mb-12">
            {[
              {
                title: "sKINs: East Ethiopia Textile Installation",
                year: "2024",
                medium: "Textile Installation",
                image: "/images/01_front.webp",
                href: "/projects/installation",
              },
              {
                title: "Bet Bota",
                year: "2022",
                medium: "Installation",
                image: "/images/a4a.webp",
                href: "/projects/films",
              },
              {
                title: "sKINs: North Ethiopia",
                year: "2025",
                medium: "Textile",
                image: "/images/skins-all_04.webp",
                href: "/projects/in-studio",
              },
            ].map((work, index) => (
              <Link
                key={index}
                href={work.href}
                className="group cursor-pointer block transform transition-all duration-500 hover:scale-105"
              >
                <div className="aspect-square rounded-sm overflow-hidden mb-4 bg-neutral-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={
                      work.image ||
                      "/images/01_front.webp" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt={`${work.title} - ${work.medium} by Rediet Haddis (${work.year})`}
                    width={400}
                    height={400}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-stardom text-black group-hover:text-neutral-600 transition-colors duration-300">
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
                className="px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full border-2 font-times border-neutral-300 text-black hover:bg-black hover:text-white transition-all duration-300 bg-transparent transform hover:scale-105"
              >
                View All Projects
                <ArrowUpRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
