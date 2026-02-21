"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { CVRequestModal } from "@/components/cv-request-modal"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [isCVModalOpen, setIsCVModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const soloExhibitions = [
    {
      title: "Y.A.L./Y: Abaya Lij weha temesit",
      year: "2025",
      venue: "Artawi Gallery",
      location: "Addis Ababa, Ethiopia",
      curator: "Rediet Haddis",
      date: "March 28-30",
    },
    {
      title: "Bei Buja",
      year: "2022",
      venue: "Refanti Complex Exhibition Hall",
      location: "Addis Ababa, Ethiopia",
      curator: "Rediet Haddis",
      date: "October 26-30",
    },
  ]

  const screenings = [
    {
      title: "sKINs: Dire Dawa",
      year: "2025",
      venue: "Alliance Ethio-Francaise",
      location: "Dire Dawa",
      curator: "Miftah Zeleke",
      date: "May 10",
    },
    {
      title: "Decoding legends",
      year: "2021",
      venue: "Modern Art Museum/Gebre Kristos Desta Center",
      location: "Addis Ababa, Ethiopia",
      curator: "Sara Abdu Bushra",
      date: "September 26-25",
    },
  ]

  const articles = [
    {
      title: "Spotlight: Ethiopian Artist Rediet Haddis Is Her Own Cultural Muse",
      publication: "Okay Africa",
      year: "2024",
      link: "https://www.okayafrica.com/ethiopia-rediet-haddis-spotlight/",
    },
  ]

  if (!mounted) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPath="/about" />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-24 sm:pt-28 md:pt-20 shadow-2xl overflow-hidden">
        <div className="w-full max-w-none flex flex-col lg:flex-row px-4 sm:px-6 lg:pl-12 xl:pl-20">
          {/* Left Column - Text Content */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center mb-8 lg:mb-0 lg:pr-12">
            <div className="space-y-6 lg:space-y-8 pl-1 sm:pl-2">
              <div className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground font-light font-times">
                VISUAL ARTIST
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-stardom leading-tight text-foreground">
                Rediet
                <br />
                Haddis
                <br />
                Yalew
              </h1>

              <div className="w-12 sm:w-16 h-px bg-black"></div>

              <p className="text-base sm:text-lg font-light font-times text-neutral-600 leading-relaxed">
                Interdisciplinary artist exploring memory, migration, and material culture through experimental
                storytelling.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4 bg-black text-white font-light font-times text-base sm:text-lg rounded-full hover:bg-neutral-800 transition-all duration-300 transform hover:scale-105"
              >
                Get in touch
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex-1 flex items-center">
            <div className="overflow-hidden bg-neutral-100 w-full rounded-none h-[60vh] sm:h-[70vh] lg:h-[90vh]">
              <Image
                src="/images/Hero.webp"
                alt="Rediet Haddis Yalew - Visual Artist and Architect Portrait"
                width={1175}
                height={800}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 50vw"
                className="w-full h-full object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                quality={80}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Artist Statement Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-muted/50 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            <div className="md:col-span-1">
              <h2 className="text-xl sm:text-2xl font-stardom text-black md:sticky md:top-32">Artist Statement</h2>
            </div>

            <div className="md:col-span-2 space-y-6 sm:space-y-8">
              <p className="text-base sm:text-lg font-light font-times text-neutral-700 leading-relaxed">
                I am an interdisciplinary visual artist and trained Architect whose works explore the intersections of
                memory, migration, and material culture. My practice is rooted in investigating how cultural identity is
                shaped through ritual, adornment and the built environment.
              </p>

              <p className="text-base sm:text-lg font-light font-times text-neutral-700 leading-relaxed">
                My ongoing projects YAL, sKINs, and Sheret project trace stories of movement, use of resources, and
                sense of belonging through experimental story telling. My approach is research driven, site specific,
                immersive and grounded in strengthening cultural continuity.
              </p>

              <div className="pt-6 sm:pt-8 border-t border-neutral-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <span className="text-xs sm:text-sm font-light font-times text-neutral-500">
                    Full CV available upon request
                  </span>
                  <button
                    onClick={() => setIsCVModalOpen(true)}
                    className="text-xs sm:text-sm font-times text-black hover:underline transition-colors"
                  >
                    Request CV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            <div className="md:col-span-1">
              <h2 className="text-xl sm:text-2xl font-stardom text-black md:sticky md:top-32 my-4">Education</h2>
            </div>

            <div className="md:col-span-2 space-y-8 sm:space-y-12">
              <div className="group">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-2 sm:space-y-0">
                  <div>
                    <h3 className="text-lg sm:text-xl font-light font-times text-black">
                      BSc. Architecture and Urban Planning
                    </h3>
                    <p className="text-neutral-600 font-light font-times">Unity University, Addis Ababa, Ethiopia</p>
                  </div>
                  <span className="text-xs sm:text-sm font-light font-times text-neutral-400">2014 - 2019</span>
                </div>
              </div>

              <div className="group">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-2 sm:space-y-0">
                  <div>
                    <h3 className="text-lg sm:text-xl font-light font-times text-black">Dip. Apparel Production</h3>
                    <p className="text-neutral-600 font-light font-times">
                      Next Fashion Design School, Addis Ababa, Ethiopia
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-light font-times text-neutral-400">2018</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitions Grid */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-muted/50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
            {/* Solo Exhibitions */}
            <div className="space-y-8 sm:space-y-12">
              <h2 className="text-xl sm:text-2xl font-stardom text-black">Solo Exhibitions</h2>

              <div className="space-y-6 sm:space-y-8">
                {soloExhibitions.map((exhibition, index) => (
                  <div key={index} className="group space-y-3 pb-6 sm:pb-8 border-b border-neutral-200 last:border-b-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                      <h3 className="text-base sm:text-lg font-light font-times text-black italic max-w-xs">
                        {exhibition.title}
                      </h3>
                      <span className="text-xs sm:text-sm font-light font-times text-neutral-400">
                        {exhibition.year}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs sm:text-sm font-light font-times text-neutral-600">
                      <p>{exhibition.venue}</p>
                      <p>{exhibition.location}</p>
                      <p className="text-xs text-neutral-500">
                        curated by {exhibition.curator}, {exhibition.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Screenings */}
            <div className="space-y-8 sm:space-y-12">
              <h2 className="text-xl sm:text-2xl font-stardom text-black">Screenings / Presentations</h2>

              <div className="space-y-6 sm:space-y-8">
                {screenings.map((screening, index) => (
                  <div key={index} className="group space-y-3 pb-6 sm:pb-8 border-b border-neutral-200 last:border-b-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                      <h3 className="text-base sm:text-lg font-light font-times text-black italic max-w-xs">
                        {screening.title}
                      </h3>
                      <span className="text-xs sm:text-sm font-light font-times text-neutral-400">
                        {screening.year}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs sm:text-sm font-light font-times text-neutral-600">
                      <p>{screening.venue}</p>
                      <p>{screening.location}</p>
                      <p className="text-xs text-neutral-500">
                        curated by {screening.curator}, {screening.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            <div className="md:col-span-1">
              <h2 className="text-xl sm:text-2xl font-stardom text-black md:sticky md:top-32">Press & Articles</h2>
            </div>

            <div className="md:col-span-2">
              {articles.map((article, index) => (
                <div key={index} className="group space-y-3 pb-6 sm:pb-8 border-b border-neutral-200">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-light font-times text-black group-hover:text-neutral-600 transition-colors">
                        <Link href={article.link} className="flex items-start space-x-2">
                          <span>{article.title}</span>
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </h3>
                      <p className="text-xs sm:text-sm font-light font-times text-neutral-600">{article.publication}</p>
                    </div>
                    <span className="text-xs sm:text-sm font-light font-times text-neutral-400">{article.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CV Request Modal */}
      <CVRequestModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </div>
  )
}
