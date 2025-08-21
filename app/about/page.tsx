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

      {/* Hero Section - Matching Home Page Layout with Previous Text Content */}
      <section className="min-h-screen flex items-center pl-12 lg:pl-20 pt-20">
        <div className="w-full flex">
          {/* Left Column - Text Content (1/3 width) */}
          <div className="w-1/3 flex flex-col justify-center pr-12">
            <div className="space-y-8 pl-2">
              <div className="text-sm uppercase tracking-[0.3em] text-neutral-400 font-light">VISUAL ARTIST</div>

              <h1 className="text-5xl lg:text-6xl font-light leading-tight text-black">
                Rediet
                <br />
                Haddis
                <br />
                Yalew
              </h1>

              <div className="w-16 h-px bg-black"></div>

              <p className="text-lg font-light text-neutral-600 leading-relaxed">
                Interdisciplinary artist exploring memory, migration, and material culture through experimental
                storytelling.
              </p>

              <Link
                href="/contact"
                className="group inline-flex items-center space-x-3 text-black hover:text-neutral-600 transition-colors duration-300"
              >
                <span className="text-lg font-light">Get in touch</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Right Column - Image Placeholder (2/3 width) */}
          <div className="flex-1 flex items-center">
            <div className="rounded-lg overflow-hidden bg-neutral-100 group cursor-pointer h-[800px] w-full">
              <Image
                src="/placeholder.svg?height=800&width=1000&text=About+Portrait"
                alt="About Portrait"
                width={2200}
                height={800}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
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
