"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Ruler, Users } from "lucide-react"

interface InstallationProject {
  id: string
  title: string
  year: string
  category: string
  medium: string
  description: string
  detailedDescription?: string
  images?: string[]
  imageDescriptions?: string[]
  location?: string
  visitors?: number
  materials?: string[]
  dimensions?: string
  tags: string[]
  videoUrl?: string
  photoCount?: number
  slidesLayout?: number[]
  client?: string
  instagramUrl?: string
}

interface InstallationModalProps {
  project: InstallationProject | null
  isOpen: boolean
  onClose: () => void
}

function InstallationModal({ project, isOpen, onClose }: InstallationModalProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setCurrentSlideIndex(0)
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  const createSlides = () => {
    const slides = []
    let imageIndex = 0

    if (project.id === "skins-east-ethiopia") {
      project.images?.forEach((image, index) => {
        slides.push({
          type: "photos",
          images: [image],
          title: `${project.title} - Photo ${index + 1}`,
          description: project.imageDescriptions?.[index] || "",
        })
      })
    } else if (project.id === "skins-north-ethiopia") {
      slides.push({
        type: "horizontal-grid",
        images: project.images || [],
        title: project.title,
      })
    } else if (
      project.id === "yal-exhibition" ||
      project.id === "hulet-neteb-installation" ||
      project.id === "decoding-legends-installation" ||
      project.id === "hulet-neteb-project" ||
      project.id === "sheret-project" ||
      project.id === "except-thise-time-nothing-returns-from-the-ashes" ||
      project.id === "msfts-ethiopia-skate-photos" ||
      project.id === "msfts-ethiopia-skate-commission"
    ) {
      let images = project.images || []

      if (project.id === "except-thise-time-nothing-returns-from-the-ashes" && images.length === 0) {
        images = Array.from({ length: 8 }, (_, i) => `/placeholder.svg?height=800&width=600&text=Ashes+Photo+${i + 1}`)
      } else if (
        (project.id === "msfts-ethiopia-skate-photos" || project.id === "msfts-ethiopia-skate-commission") &&
        images.length === 0
      ) {
        images = [
          // 5 landscape images (16:9 ratio)
          ...Array.from(
            { length: 5 },
            (_, i) => `/placeholder.svg?height=600&width=1067&text=MSFTS+Landscape+${i + 1}`,
          ),
          // 19 portrait images (9:16 ratio)
          ...Array.from(
            { length: 19 },
            (_, i) => `/placeholder.svg?height=1067&width=600&text=MSFTS+Portrait+${i + 1}`,
          ),
        ]
      }

      slides.push({
        type: "grid",
        images: images,
        title: project.title,
        gridLayout: "4x4",
      })
    } else if (project.id === "yal-studio") {
      slides.push({
        type: "video",
        videoUrl: project.videoUrl,
        title: project.title,
        aspectRatio: "16/9",
      })
    } else if (project.slidesLayout && project.images) {
      for (let i = 0; i < project.slidesLayout.length; i++) {
        const photosPerSlide = project.slidesLayout[i]
        const slideImages = project.images.slice(imageIndex, imageIndex + photosPerSlide)

        let slideTitle = `${project.title} - Photos ${imageIndex + 1}-${imageIndex + photosPerSlide}`

        if (project.id === "msfts-ethiopia-skate-photos") {
          slideTitle =
            i === 0 ? `${project.title} - Landscape Photos (16:9)` : `${project.title} - Portrait Photos (9:16)`
        } else if (project.id === "vibrant-hues") {
          slideTitle = `${project.title} - Experiment ${i + 1}`
        } else if (project.id === "ti-identity-photos") {
          const slideNames = ["Opening", "Community", "Reflection", "Connection"]
          slideTitle = `${project.title} - ${slideNames[i] || `Part ${i + 1}`}`
        }

        slides.push({
          type: "photos",
          images: slideImages,
          title: slideTitle,
        })
        imageIndex += photosPerSlide
      }
    } else if (project.images) {
      project.images.forEach((image, index) => {
        slides.push({
          type: "photos",
          images: [image],
          title: `${project.title} - Photo ${index + 1}`,
        })
      })
    } else {
      const photoCount = project.photoCount || 4

      if (project.slidesLayout) {
        let imageIndex = 0

        if (project.id === "msfts-ethiopia-skate-photos") {
          const landscapeSlides = Math.ceil(5 / 2)
          for (let i = 0; i < landscapeSlides; i++) {
            const photosInThisSlide = i === landscapeSlides - 1 ? 1 : 2
            const slideImages = []

            for (let j = 0; j < photosInThisSlide; j++) {
              slideImages.push(`/placeholder.svg?height=600&width=1067&text=MSFTS+Landscape+${imageIndex + j + 1}`)
            }

            slides.push({
              type: "photos",
              images: slideImages,
              title: `${project.title} - Landscape Photos ${imageIndex + 1}-${imageIndex + photosInThisSlide}`,
            })
            imageIndex += photosInThisSlide
          }

          const portraitSlides = Math.ceil(19 / 2)
          for (let i = 0; i < portraitSlides; i++) {
            const photosInThisSlide = i === portraitSlides - 1 ? 1 : 2
            const slideImages = []

            for (let j = 0; j < photosInThisSlide; j++) {
              slideImages.push(`/placeholder.svg?height=1067&width=600&text=MSFTS+Portrait+${imageIndex + j + 1}`)
            }

            slides.push({
              type: "photos",
              images: slideImages,
              title: `${project.title} - Portrait Photos ${imageIndex + 1}-${imageIndex + photosInThisSlide}`,
            })
            imageIndex += photosInThisSlide
          }
        } else {
          for (let i = 0; i < project.slidesLayout.length; i++) {
            const photosPerSlide = project.slidesLayout[i]
            const slideImages = []

            for (let j = 0; j < photosPerSlide; j++) {
              slideImages.push(
                `/placeholder.svg?height=800&width=600&text=${project.title.replace(/\s+/g, "+")}+Photo+${imageIndex + j + 1}`,
              )
            }

            let slideTitle = `${project.title} - Photos ${imageIndex + 1}-${imageIndex + photosPerSlide}`

            if (project.id === "vibrant-hues") {
              slideTitle = `${project.title} - Experiment ${i + 1}`
            } else if (project.id === "ti-identity-photos") {
              const slideNames = ["Opening", "Community", "Reflection", "Connection"]
              slideTitle = `${project.title} - ${slideNames[i] || `Part ${i + 1}`}`
            }

            slides.push({
              type: "photos",
              images: slideImages,
              title: slideTitle,
            })
            imageIndex += photosPerSlide
          }
        }
      } else {
        for (let i = 0; i < photoCount; i++) {
          slides.push({
            type: "photos",
            images: [`/placeholder.svg?height=800&width=600&text=${project.title.replace(/\s+/g, "+")}+Photo+${i + 1}`],
            title: `${project.title} - Photo ${i + 1}`,
          })
        }
      }
    }

    if (
      project.videoUrl &&
      !["yal-exhibition", "hulet-neteb-installation", "decoding-legends-installation", "yal-studio"].includes(
        project.id,
      )
    ) {
      slides.push({
        type: "video",
        videoUrl: project.videoUrl,
        title: `${project.title} - Walkthrough Video`,
      })
    }

    if (project.instagramUrl) {
      slides.push({
        type: "instagram",
        instagramUrl: project.instagramUrl,
        title: `${project.title} - Instagram Gallery`,
      })
    }

    return slides
  }

  const slides = createSlides()
  const currentSlide = slides[currentSlideIndex]

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index)
  }

  const getEmbedUrl = (url: string) => {
    if (url.includes("drive.google.com")) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`
      }
    }
    return url
  }

  const isGridProject = [
    "yal-exhibition",
    "hulet-neteb-installation",
    "decoding-legends-installation",
    "hulet-neteb-project",
    "sheret-project",
    "except-thise-time-nothing-returns-from-the-ashes",
    "msfts-ethiopia-skate-photos",
    "msfts-ethiopia-skate-commission",
  ].includes(project.id)
  const isHorizontalProject = project.id === "skins-north-ethiopia"
  const isVideoProject = project.id === "yal-studio"

  const modalWidth = isGridProject || isHorizontalProject ? "w-[95vw]" : "w-[90vw]"
  const modalHeight = isGridProject || isHorizontalProject ? "h-[95vh]" : "h-[90vh]"

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {isVideoProject ? (
        <div className="max-w-2xl p-0 bg-black border-0 rounded-lg overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="relative" style={{ aspectRatio: "9/16" }}>
            {currentSlide?.videoUrl ? (
              <iframe
                src={getEmbedUrl(currentSlide.videoUrl)}
                className="w-full h-full rounded-lg"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="YAL Project Video"
              />
            ) : (
              <div className="w-full h-full bg-neutral-900 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="text-white">
                    <div className="text-lg font-medium">{currentSlide?.title}</div>
                    <div className="text-sm text-white/70">1920 × 1080</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={`bg-white rounded-lg shadow-2xl ${modalWidth} ${modalHeight} flex overflow-hidden relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
          >
            <X className="h-5 w-5 text-black" />
          </button>

          <div className="absolute top-4 left-4 z-10 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-black shadow-lg">
            {currentSlideIndex + 1} / {slides.length}
          </div>

          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
              >
                <ChevronLeft className="h-6 w-6 text-black" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
              >
                <ChevronRight className="h-6 w-6 text-black" />
              </button>
            </>
          )}

          <div
            className={`${isGridProject || isHorizontalProject ? "w-full" : "w-[70%]"} relative overflow-hidden bg-neutral-50 flex items-center justify-center`}
          >
            {currentSlide?.type === "grid" ? (
              <div className="w-full h-full p-6 overflow-y-auto max-h-[70vh]">
                <div
                  className={`grid gap-4 ${
                    currentSlide.gridLayout === "4x4" ? "grid-cols-4 auto-rows-fr" : "grid-cols-3 auto-rows-fr"
                  }`}
                >
                  {currentSlide.images.map((image, index) => {
                    const isLandscape =
                      (project.id === "msfts-ethiopia-skate-photos" ||
                        project.id === "msfts-ethiopia-skate-commission") &&
                      index < 5
                    const aspectClass = isLandscape ? "aspect-video col-span-2" : "aspect-square"

                    return (
                      <div
                        key={index}
                        className={`${aspectClass} relative overflow-hidden rounded-lg bg-neutral-100 flex items-center justify-center`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${currentSlide.title} ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : currentSlide?.type === "horizontal-grid" ? (
              <div className="w-full h-full p-6 overflow-x-auto">
                <div className="flex h-full gap-0 min-w-max">
                  {currentSlide.images.map((image, index) => (
                    <div
                      key={index}
                      className="h-full aspect-[3/4] relative overflow-hidden bg-neutral-100 flex items-center justify-center"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${currentSlide.title} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : currentSlide?.type === "video" ? (
              <div className="w-full h-full flex items-center justify-center p-8">
                <div className="w-full max-w-7xl aspect-video bg-neutral-900 rounded-lg flex items-center justify-center">
                  {currentSlide.videoUrl ? (
                    <iframe
                      src={getEmbedUrl(currentSlide.videoUrl)}
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <div className="text-white">
                        <div className="text-lg font-medium">{currentSlide.title}</div>
                        <div className="text-sm text-white/70">1080 × 1920</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : currentSlide?.type === "instagram" ? (
              <div className="w-full h-full flex items-center justify-center p-8">
                <div className="text-center space-y-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-3xl flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919-.058 1.265-.069 1.645-.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.073-4.849.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.69-.073 4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-stardom text-black">Follow on Instagram</h3>
                    <p className="text-neutral-600 max-w-md mx-auto">
                      Explore more illustrations and ongoing creative work on Instagram @red_studyo
                    </p>
                    <a
                      href={currentSlide.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919-.058 1.265-.069 1.645-.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.073-4.849.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.69-.073 4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.40-1.439-1.40z" />
                      </svg>
                      <span>Visit @red_studyo</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full p-6">
                {currentSlide?.images.length === 1 ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={currentSlide.images[0] || "/placeholder.svg"}
                      alt={currentSlide.title}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                ) : currentSlide?.images.length === 2 ? (
                  <div className="flex gap-6 h-full items-center justify-center">
                    {currentSlide.images.map((image, index) => (
                      <div key={index} className="flex-1 h-full flex items-center justify-center">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${currentSlide.title} ${index + 1}`}
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                ) : project.id === "bet-bota" ? (
                  <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full">
                    <div className="col-span-2 row-span-2 relative overflow-hidden rounded-lg bg-neutral-100">
                      <img
                        src={currentSlide.images[0] || "/placeholder.svg"}
                        alt={`${currentSlide.title} 1`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-lg bg-neutral-100">
                      <img
                        src={currentSlide.images[1] || "/placeholder.svg"}
                        alt={`${currentSlide.title} 2`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`grid gap-4 h-full ${
                      currentSlide?.images.length === 3
                        ? "grid-cols-3"
                        : currentSlide?.images.length === 4
                          ? "grid-cols-2 grid-rows-2"
                          : currentSlide?.images.length <= 6
                            ? "grid-cols-3 grid-rows-2"
                            : "grid-cols-4 grid-rows-3"
                    }`}
                  >
                    {currentSlide.images.slice(0, 12).map((image, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-lg bg-neutral-100 flex items-center justify-center"
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${currentSlide.title} ${index + 1}`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ))}
                    {currentSlide.images.length > 12 && (
                      <div className="relative overflow-hidden rounded-lg bg-neutral-900 flex items-center justify-center">
                        <span className="text-white font-medium">{`+${currentSlide.images.length - 12} more`}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {!isGridProject && !isHorizontalProject && (
            <div className="w-[30%] p-6 flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-6">
                  <div className="text-sm text-neutral-500 font-medium">{currentSlide?.title}</div>

                  <h2 className="text-3xl font-stardom text-black leading-tight">{project.title}</h2>

                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-neutral-600">
                      <Calendar className="h-4 w-4" />
                      <span>{project.year}</span>
                    </div>

                    {project.location && (
                      <div className="flex items-center space-x-2 text-neutral-600">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                      </div>
                    )}

                    {project.dimensions && (
                      <div className="flex items-center space-x-2 text-neutral-600">
                        <Ruler className="h-4 w-4" />
                        <span>{project.dimensions}</span>
                      </div>
                    )}

                    {project.visitors && (
                      <div className="flex items-center space-x-2 text-neutral-600">
                        <Users className="h-4 w-4" />
                        <span>{project.visitors.toLocaleString()} visitors</span>
                      </div>
                    )}

                    {project.client && (
                      <div className="flex items-center space-x-2 text-neutral-600">
                        <Users className="h-4 w-4" />
                        <span>{project.client}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-neutral-500 font-medium">{project.medium}</div>

                  {project.id === "skins-east-ethiopia" && currentSlide?.description ? (
                    <p className="text-neutral-700 leading-relaxed font-medium bg-gray-80 p-4 rounded-lg border-l-4 border-amber-400">
                      {currentSlide.description}
                    </p>
                  ) : (
                    <p className="text-neutral-700 leading-relaxed">
                      {project.detailedDescription || project.description}
                    </p>
                  )}

                  {project.materials && project.materials.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-neutral-800">Materials</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.materials.map((material) => (
                          <span
                            key={material}
                            className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium"
                          >
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {slides.length > 1 && (
                <div className="mt-6 pt-4 border-t border-neutral-200">
                  <div className="flex justify-center space-x-2 flex-wrap">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                          index === currentSlideIndex
                            ? "bg-black text-white"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { InstallationModal }
export default InstallationModal
