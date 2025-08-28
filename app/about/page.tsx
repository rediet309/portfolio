"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

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
    return <div className="min-h-screen bg-white" />
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/about" />

      {/* Hero Section */}
      <section className="h-screen flex items-center pl-4 md:pl-8 lg:pl-12 xl:pl-20 relative pt-16 md:pt-20 shadow-xl">
        <div className="w-full flex flex-col lg:flex-row">
          {/* Left side - Text content */}
          <div className="flex-1 lg:flex-none lg:w-1/3 flex flex-col justify-center pr-4 md:pr-8 lg:pr-12 mb-8 lg:mb-0">
            <div className="mb-6 md:mb-8">
              <div className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-neutral-400 font-light mb-4 md:mb-6 pl-1 md:pl-2">
                VISUAL ARTIST
              </div>

              <h1 className="text-5xl lg:text-6xl font-light leading-tight text-black">
                Rediet
                <br />
                Haddis
                <br />
                Yalew
              </h1>
            </div>

            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              <div className="w-12 md:w-16 h-px bg-black ml-1 md:ml-2 mb-4 md:mb-6"></div>
              <div className="text-base md:text-lg lg:text-xl leading-relaxed font-light text-neutral-600">
                <p className="text-lg md:text-base mb-4 text-justify pl-1 md:pl-2">
                  Interdisciplinary artist exploring memory, migration, and material culture through experimental
                  storytelling.
                </p>
              </div>
            </div>

            <div className="pl-1 md:pl-2">
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-full border-2 font-times border-neutral-300 text-black hover:bg-black hover:text-white transition-all duration-300 bg-transparent"
                >
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Image holder */}
          <div className="flex-1 flex items-center">
            <div className="overflow-hidden bg-neutral-100 group cursor-pointer w-full rounded-none h-full max-h-[868px] xl:h-[90vh]">
              <Image
                src="/images/Hero.webp"
                alt="About Portrait"
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

      {/* Artist Statement Section */}
      <section className="py-32 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-light text-black sticky top-32">Artist Statement</h2>
            </div>

            <div className="md:col-span-2 space-y-8">
              <p className="text-lg font-light text-neutral-700 leading-relaxed">
                I am an interdisciplinary visual artist and trained Architect whose works explore the intersections of
                memory, migration, and material culture. My practice is rooted in investigating how cultural identity is
                shaped through ritual, adornment and the built environment.
              </p>

              <p className="text-lg font-light text-neutral-700 leading-relaxed">
                My ongoing projects YAL, sKINs, and Sheret project trace stories of movement, use of resources, and
                sense of belonging through experimental story telling. My approach is research driven, site specific,
                immersive and grounded in strengthening cultural continuity.
              </p>

              <div className="pt-8 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-light text-neutral-500">Full CV available upon request</span>
                  <Link href="#" className="text-sm text-black hover:underline">
                    Request CV
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-light text-black sticky top-32">Education</h2>
            </div>

            <div className="md:col-span-2 space-y-12">
              <div className="group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-light text-black">BSc. Architecture and Urban Planning</h3>
                    <p className="text-neutral-600 font-light">Unity University, Addis Ababa, Ethiopia</p>
                  </div>
                  <span className="text-sm font-light text-neutral-400">2014 - 2019</span>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-light text-black">Dip. Apparel Production</h3>
                    <p className="text-neutral-600 font-light">Next Fashion Design School, Addis Ababa, Ethiopia</p>
                  </div>
                  <span className="text-sm font-light text-neutral-400">2018</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitions Grid */}
      <section className="py-32 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Solo Exhibitions */}
            <div className="space-y-12">
              <h2 className="text-2xl font-light text-black">Solo Exhibitions</h2>

              <div className="space-y-8">
                {soloExhibitions.map((exhibition, index) => (
                  <div key={index} className="group space-y-3 pb-8 border-b border-neutral-200 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-light text-black italic max-w-xs">{exhibition.title}</h3>
                      <span className="text-sm font-light text-neutral-400">{exhibition.year}</span>
                    </div>

                    <div className="space-y-1 text-sm font-light text-neutral-600">
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
            <div className="space-y-12">
              <h2 className="text-2xl font-light text-black">Screenings / Presentations</h2>

              <div className="space-y-8">
                {screenings.map((screening, index) => (
                  <div key={index} className="group space-y-3 pb-8 border-b border-neutral-200 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-light text-black italic max-w-xs">{screening.title}</h3>
                      <span className="text-sm font-light text-neutral-400">{screening.year}</span>
                    </div>

                    <div className="space-y-1 text-sm font-light text-neutral-600">
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
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-light text-black sticky top-32">Press & Articles</h2>
            </div>

            <div className="md:col-span-2">
              {articles.map((article, index) => (
                <div key={index} className="group space-y-3 pb-8 border-b border-neutral-200">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-light text-black group-hover:text-neutral-600 transition-colors">
                        <Link href={article.link} className="flex items-start space-x-2">
                          <span>{article.title}</span>
                          <ExternalLink className="h-4 w-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </h3>
                      <p className="text-sm font-light text-neutral-600">{article.publication}</p>
                    </div>
                    <span className="text-sm font-light text-neutral-400">{article.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
