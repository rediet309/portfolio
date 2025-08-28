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
      <section className="h-screen flex items-center pl-4 md:pl-8 lg:pl-12 xl:pl-20 relative pt-16 md:pt-20 shadow-xl">
        <div className="w-full flex flex-col lg:flex-row">
          {/* Left side - Text content */}
          <div className="flex-1 lg:flex-none lg:w-1/3 flex flex-col justify-center pr-4 md:pr-8 lg:pr-12 mb-8 lg:mb-0">
            <div className="mb-6 md:mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-stardom leading-none text-black">
                <div className="text-left pl-1 md:pl-2">Visual</div>
                <div className="text-left pl-1 md:pl-2">Artist</div>
              </h1>
            </div>

            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              <div className="text-base md:text-lg lg:text-xl leading-relaxed font-times text-neutral-600">
                <p className="text-sm md:text-base mb-4 text-justify pl-1 md:pl-2">
                  Multidisciplinary artist working across Film, installation, textile and clothing.
                </p>
              </div>
            </div>

            <div className="pl-1 md:pl-2">
              <Link href="/shop">
                <Button
                  variant="outline"
                  className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full border-2 font-times border-neutral-300 text-black hover:bg-black hover:text-white transition-all duration-300 bg-transparent"
                >
                  Visit Shop
                  <ArrowUpRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Image holder */}
          <div className="flex-1 flex items-center">
            <div className="overflow-hidden bg-neutral-100 group cursor-pointer w-full rounded-none h-full max-h-[868px] xl:h-[90vh]">
              <Image
                src="/images/hero 2e.webp"
                alt="Hero Portrait"
                width={2200}
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-12 md:h-16 bg-neutral-300 animate-pulse"></div>
        </div>
      </section>

      {/* Selected Works Section - Made more compact */}
      <section id="work" className="py-4 px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="w-full pt-4">
          <div className="mb-6">
            <h2 className="text-lg md:text-xl lg:text-2xl font-stardom text-black mb-2">Selected Works</h2>
            <div className="w-8 md:w-12 h-px bg-neutral-300"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-6">
            {[
              {
                title: "sKINs: East Ethiopia Textile Installation",
                year: "2024",
                medium: "Textile Installation",
                image: "/images/webp/02_installations/01_sKINs_East Ethiopia textile installation/01_front.webp",
                href: "/projects/installation",
              },
              {
                title: "Bet Bota",
                year: "2022",
                medium: "Installation",
                image: "/images/webp/02_installations/03_Bet Bota_photos_2022/a4a.webp",
                href: "/projects/films",
              },
              {
                title: "sKINs: North Ethiopia",
                year: "2025",
                medium: "Textile",
                image: "/images/webp/03_In studyo/sKINs_ North Ethiopia/skins-all_04.webp",
                href: "/projects/in-studio",
              },
            ].map((work, index) => (
              <Link key={index} href={work.href} className="group cursor-pointer block">
                <div className="aspect-square rounded-sm overflow-hidden mb-2 bg-neutral-100">
                  <Image
                    src={
                      work.image ||
                      "/images/webp/02_installations/01_sKINs_East Ethiopia textile installation/01_front.webp"
                    }
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
                className="px-4 md:px-6 py-2 text-sm rounded-full border-2 font-times border-neutral-300 text-black hover:bg-black hover:text-white transition-all duration-300 bg-transparent"
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
