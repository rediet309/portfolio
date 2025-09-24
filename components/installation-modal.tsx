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

export function InstallationModal({ project, isOpen, onClose }: InstallationModalProps) {
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
      project.id === "except-thise-time-nothing-returns-from-the-ashes"
    ) {
      slides.push({
        type: "grid",
        images: project.images || [],
        title: project.title,
        gridLayout:
          project.id === "yal-exhibition" ||
          project.id === "hulet-neteb-project" ||
          project.id === "except-thise-time-nothing-returns-from-the-ashes"
            ? "4x4"
            : "3x3",
      })
    } else if (project.id === "yal-studio") {
      slides.push({
        type: "video",
        videoUrl: project.videoUrl,
        title: project.title,
        aspectRatio: "9/16",
      })
    } else if (project.id === "msfts-ethiopia-skate-commission") {
      slides.push({
        type: "video",
        videoUrl: project.videoUrl,
        title: project.title,
        aspectRatio: "9/16",
      })
    } else if (project.id === "msfts-ethiopia-skate-photos") {
      slides.push({
        type: "scrollable-bento-grid",
        images: project.images || [],
        title: project.title,
      })
    } else if (project.id === "tilla-photoshoot") {
      slides.push({
        type: "custom-grid",
        images: project.images || [],
        title: project.title,
        gridType: "2x2",
      })
    } else if (project.id === "in-red-photos-archive") {
      slides.push({
        type: "custom-grid",
        images: project.images || [],
        title: project.title,
        gridType: "3x3-mixed",
      })
    } else if (project.id === "portal-to-u-thiopia-archive") {
      slides.push({
        type: "custom-grid",
        images: project.images || [],
        title: project.title,
        gridType: "1x4-portrait",
      })
    } else if (project.id === "decoding-legends-photos-archive") {
      slides.push({
        type: "custom-grid",
        images: project.images || [],
        title: project.title,
        gridType: "1x3-portrait",
      })
    } else if (project.id === "to-identify-photos-archive") {
      slides.push({
        type: "scrollable-bento-grid",
        images: project.images || [],
        title: project.title,
      })
    } else if (project.id === "tibeb-be-adebabay-archive") {
      slides.push({
        type: "scrollable-bento-grid",
        images: project.images || [],
        title: project.title,
      })
    } else if (project.id === "vibrant-hues-archive") {
      slides.push({
        type: "scrollable-bento-grid",
        images: project.images || [],
        title: project.title,
      })
    } else if (project.id === "graphic-posters-illustrations-archive") {
      slides.push({
        type: "custom-grid",
        images: project.images || [],
        title: project.title,
        gridType: "4-column-five-images",
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
              slideImages.push(
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1067&h=600&fit=crop&crop=center", // Skateboarding landscape
              )
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
              slideImages.push(
                "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=1067&fit=crop&crop=center", // Skateboarding portrait
              )
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
              const unsplashImages = [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center", // Contemporary art installation
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center", // Cultural textile work
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center", // Ethiopian artistic practice
                "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&crop=center", // Traditional art forms
              ]
              slideImages.push(unsplashImages[(imageIndex + j) % unsplashImages.length])
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
        const unsplashImages = [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center", // Ethiopian cultural art
          "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop&crop=center", // Traditional textile installation
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center", // Contemporary Ethiopian art
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center", // Cultural heritage display
        ]

        for (let i = 0; i < photoCount; i++) {
          slides.push({
            type: "photos",
            images: [unsplashImages[i % unsplashImages.length]],
            title: `${project.title} - Photo ${i + 1}`,
          })
        }
      }
    }

    if (
      project.videoUrl &&
      ![
        "yal-exhibition",
        "hulet-neteb-installation",
        "decoding-legends-installation",
        "yal-studio",
        "msfts-ethiopia-skate-commission",
      ].includes(project.id)
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
    "tilla-photoshoot",
    "in-red-photos-archive",
    "portal-to-u-thiopia-archive",
    "decoding-legends-photos-archive",
    "to-identify-photos-archive",
    "tibeb-be-adebabay-archive",
    "graphic-posters-illustrations-archive",
  ].includes(project.id)
  const isHorizontalProject = project.id === "skins-north-ethiopia"
  const isVideoProject = project.id === "yal-studio" || project.id === "msfts-ethiopia-skate-commission"
  const isBentoProject =
    project.id === "msfts-ethiopia-skate-photos" ||
    project.id === "vibrant-hues-archive" ||
    project.id === "to-identify-photos-archive" ||
    project.id === "tibeb-be-adebabay-archive"

  const modalWidth = isGridProject || isHorizontalProject || isVideoProject || isBentoProject ? "w-[95vw]" : "w-[90vw]"
  const modalHeight = isGridProject || isHorizontalProject || isVideoProject || isBentoProject ? "h-[96vh]" : "h-[95vh]"

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
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
          className={`${isGridProject || isHorizontalProject || isVideoProject || isBentoProject ? "w-full" : "w-[70%]"} relative overflow-hidden bg-neutral-50 flex items-center justify-center`}
        >
          {currentSlide?.type === "grid" ? (
            <div className="w-full h-full p-6 overflow-y-auto">
              <div
                className={`grid gap-4 ${
                  currentSlide.gridLayout === "4x4" ? "grid-cols-4 auto-rows-fr" : "grid-cols-3 auto-rows-fr"
                }`}
              >
                {currentSlide.images.map((image, index) => {
                  let aspectRatio = "aspect-[4/3]" // Default aspect ratio

                  if (project.id === "hulet-neteb-project") {
                    // Images 3, 7, and 15 (0-indexed: 2, 6, 14) should be aspect-[9/16]
                    if ([2, 6, 14].includes(index)) {
                      aspectRatio = "aspect-[9/16]"
                    }
                  } else if (project.id === "yal-exhibition") {
                    aspectRatio = "aspect-[4/3]"
                  } else if (project.id === "hulet-neteb-installation") {
                    aspectRatio = "aspect-[4/3]"
                  } else if (project.id === "sheret-project") {
                    aspectRatio = "aspect-[9/16]"
                  } else if (project.id === "decoding-legends-installation") {
                    // Keep existing logic for decoding-legends-installation
                    aspectRatio = [0, 1, 5, 6].includes(index) ? "aspect-[4/3]" : "aspect-[4/5]"
                  }

                  return (
                    <div
                      key={index}
                      className={`${aspectRatio} relative overflow-hidden rounded-lg bg-neutral-100 flex items-center justify-center`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${currentSlide.title} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
                    className="h-full aspect-[4/5] relative overflow-hidden bg-neutral-100 flex items-center justify-center"
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${currentSlide.title} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 40vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : currentSlide?.type === "video" ? (
            <div className="w-full h-full flex items-center justify-center p-8">
              <div
                className={`w-full ${currentSlide.aspectRatio === "9/16" ? "max-w-sm" : "max-w-6xl"} max-h-full ${currentSlide.aspectRatio === "9/16" ? "aspect-[9/16]" : "aspect-video"} bg-neutral-900 rounded-lg flex items-center justify-center`}
              >
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
                      <div className="text-sm text-white/70">
                        {currentSlide.aspectRatio === "9/16" ? "1080 × 1920" : "1920 × 1080"}
                      </div>
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
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919-.058 1.265-.069 1.645-.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771 4.919 4.919-1.266.058-1.644.073-4.849.073zm0-2.163c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919-.058 1.265-.069 1.645-.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771 4.919 4.919-1.266.058-1.644.073-4.849.073-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.059-1.28.073-1.689.073-4.948 0-3.259.013-3.583.07-4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 4.354-.2 6.782-2.618 6.979-6.98-.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Visit @red_studyo</span>
                  </a>
                </div>
              </div>
            </div>
          ) : currentSlide?.type === "bento-grid" ? (
            <div className="w-full h-full p-4 overflow-y-auto">
              <div className="grid grid-cols-6 grid-rows-8 gap-2 h-full min-h-[800px]">
                {/* 5 landscape images (16:9) - positioned strategically */}
                <div className="col-span-3 row-span-2 relative overflow-hidden rounded-lg bg-neutral-100">
                  <img
                    src={
                      currentSlide.images[0] ||
                      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1067&h=600&fit=crop&crop=center" || // Skateboarding action themed image
                      "/placeholder.svg"
                    }
                    alt="MSFTS Landscape 1"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="col-span-3 row-span-2 relative overflow-hidden rounded-lg bg-neutral-100">
                  <img
                    src={
                      currentSlide.images[1] ||
                      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1067&h=600&fit=crop&crop=center" || // Ethiopian skate culture themed image
                      "/placeholder.svg"
                    }
                    alt="MSFTS Landscape 2"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="col-span-2 row-span-1 relative overflow-hidden rounded-lg bg-neutral-100">
                  <img
                    src={
                      currentSlide.images[2] ||
                      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1067&h=600&fit=crop&crop=center" || // Collaboration themed image
                      "/placeholder.svg"
                    }
                    alt="MSFTS Landscape 3"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="col-span-2 row-span-1 relative overflow-hidden rounded-lg bg-neutral-100">
                  <img
                    src={
                      currentSlide.images[3] ||
                      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1067&h=600&fit=crop&crop=center" || // Behind-the-scenes photography themed image
                      "/placeholder.svg"
                    }
                    alt="MSFTS Landscape 4"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="col-span-2 row-span-1 relative overflow-hidden rounded-lg bg-neutral-100">
                  <img
                    src={
                      currentSlide.images[4] ||
                      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1067&h=600&fit=crop&crop=center" || // Youth skateboarding themed image
                      "/placeholder.svg"
                    }
                    alt="MSFTS Landscape 5"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* 19 portrait images (9:16) - fill remaining spaces */}
                {Array.from({ length: 19 }, (_, i) => (
                  <div
                    key={`portrait-${i}`}
                    className="col-span-1 row-span-2 relative overflow-hidden rounded-lg bg-neutral-100"
                  >
                    <img
                      src={
                        currentSlide.images[5 + i] ||
                        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=1067&fit=crop&crop=center" || // Ethiopian youth portrait themed image
                        "/placeholder.svg"
                      }
                      alt={`MSFTS Portrait ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : currentSlide?.type === "scrollable-bento-grid" ? (
            <div className="w-full h-full p-4 overflow-y-auto">
              {project.id === "msfts-ethiopia-skate-photos" ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 auto-rows-max">
                  {/* 5 landscape images with consistent size */}
                  {currentSlide.images.slice(0, 5).map((image, index) => (
                    <div
                      key={`landscape-${index}`}
                      className="md:col-span-2 aspect-video relative overflow-hidden rounded-lg bg-neutral-100"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`MSFTS Landscape ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                  {/* 19 portrait images with consistent size */}
                  {currentSlide.images.slice(5, 24).map((image, index) => (
                    <div
                      key={`portrait-${index}`}
                      className="aspect-[9/16] relative overflow-hidden rounded-lg bg-neutral-100"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`MSFTS Portrait ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 auto-rows-max">
                  {project.id === "to-identify-photos-archive" ? (
                    <>
                      {/* 17 portrait 9:16 images */}
                      {currentSlide.images.slice(0, 17).map((image, index) => (
                        <div
                          key={`portrait-${index}`}
                          className="aspect-[9/16] relative overflow-hidden rounded-lg bg-neutral-100"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`To Identify Portrait ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 25vw"
                          />
                        </div>
                      ))}
                      {/* 1 landscape image */}
                      {currentSlide.images.slice(17, 18).map((image, index) => (
                        <div
                          key={`landscape-${index}`}
                          className="md:col-span-2 aspect-video relative overflow-hidden rounded-lg bg-neutral-100"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`To Identify Landscape ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      ))}
                    </>
                  ) : project.id === "tibeb-be-adebabay-archive" ? (
                    <>
                      {/* 4 square images */}
                      {currentSlide.images.slice(0, 4).map((image, index) => (
                        <div
                          key={`square-${index}`}
                          className="aspect-square relative overflow-hidden rounded-lg bg-neutral-100"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Tibeb Square ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 25vw"
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {/* 11 small 9:16 images */}
                      {currentSlide.images.slice(0, 11).map((image, index) => (
                        <div
                          key={`portrait-${index}`}
                          className="aspect-[9/16] relative overflow-hidden rounded-lg bg-neutral-100"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Vibrant Portrait ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 25vw"
                          />
                        </div>
                      ))}
                      {/* 7 landscape images */}
                      {currentSlide.images.slice(11, 18).map((image, index) => (
                        <div
                          key={`landscape-${index}`}
                          className="md:col-span-2 aspect-square relative overflow-hidden rounded-lg bg-neutral-100"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Vibrant Landscape ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          ) : currentSlide?.type === "custom-grid" ? (
            <div className="w-full h-full p-6 overflow-y-auto flex items-center justify-center">
              {currentSlide.gridType === "2x2" && (
                <div className="flex justify-center items-center h-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[85vh] w-fit">
                    {project.id === "tilla-photoshoot" ? (
                      <>
                        {/* First row - three portrait images (9:16 aspect ratio) */}
                        <div className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-[9/16] md:h-[70vh]">
                          <img
                            src={currentSlide.images[0] || "/placeholder.svg"}
                            alt={`${currentSlide.title} Portrait 1`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>

                        <div className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-[9/16] md:h-[70vh]">
                          <img
                            src={currentSlide.images[1] || "/placeholder.svg"}
                            alt={`${currentSlide.title} Portrait 2`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>

                        <div className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-[9/16] md:h-[70vh]">
                          <img
                            src={currentSlide.images[2] || "/placeholder.svg"}
                            alt={`${currentSlide.title} Portrait 3`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>

                        <div className="md:col-span-3 flex justify-center mt-4">
                          <div className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-video md:w-2/3">
                            <img
                              src={currentSlide.images[3] || "/placeholder.svg"}
                              alt={`${currentSlide.title} Landscape 1`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, 66vw"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Default 2x2 layout for other projects */}
                        <div className="space-y-1">
                          <div className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-[9/16] md:h-[60vh]">
                            <img
                              src={currentSlide.images[0] || "/placeholder.svg"}
                              alt={`${currentSlide.title} Portrait 1`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                          <div className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-[9/16] md:h-[60vh]">
                            <img
                              src={currentSlide.images[1] || "/placeholder.svg"}
                              alt={`${currentSlide.title} Portrait 2`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                        </div>

                        <div className="space-y-0.5">
                          <div className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-[9/16] md:h-[60vh]">
                            <img
                              src={currentSlide.images[2] || "/placeholder.svg"}
                              alt={`${currentSlide.title} Portrait 3`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                          <div className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-video md:h-[35vh]">
                            <img
                              src={currentSlide.images[3] || "/placeholder.svg"}
                              alt={`${currentSlide.title} Landscape 1`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
              {currentSlide.gridType === "3x3-mixed" && (
                <div className="w-full h-full overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 min-h-full">
                    {/* First row: 3 portrait images (9:16 aspect ratio) - Always visible without scrolling */}
                    <div className="aspect-[9/16] relative overflow-hidden rounded-lg bg-neutral-100 shadow-sm">
                      <img
                        src={currentSlide.images[0] || "/placeholder.svg"}
                        alt={`${currentSlide.title} Portrait 1`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="aspect-[9/16] relative overflow-hidden rounded-lg bg-neutral-100 shadow-sm">
                      <img
                        src={currentSlide.images[1] || "/placeholder.svg"}
                        alt={`${currentSlide.title} Portrait 2`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="aspect-[9/16] relative overflow-hidden rounded-lg bg-neutral-100 shadow-sm">
                      <img
                        src={currentSlide.images[2] || "/placeholder.svg"}
                        alt={`${currentSlide.title} Portrait 3`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    {/* Second row: 1 square image (1:1 aspect ratio) centered in middle column */}
                    <div className="md:col-start-2 aspect-square relative overflow-hidden rounded-lg bg-neutral-100 shadow-sm">
                      <img
                        src={currentSlide.images[3] || "/placeholder.svg"}
                        alt={`${currentSlide.title} Square`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    {/* Third row: 3 landscape images (16:9 aspect ratio) */}
                    <div className="aspect-video relative overflow-hidden rounded-lg bg-neutral-100 shadow-sm">
                      <img
                        src={currentSlide.images[4] || "/placeholder.svg"}
                        alt={`${currentSlide.title} Landscape 1`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="aspect-video relative overflow-hidden rounded-lg bg-neutral-100 shadow-sm">
                      <img
                        src={currentSlide.images[5] || "/placeholder.svg"}
                        alt={`${currentSlide.title} Landscape 2`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="aspect-video relative overflow-hidden rounded-lg bg-neutral-100 shadow-sm">
                      <img
                        src={currentSlide.images[6] || "/placeholder.svg"}
                        alt={`${currentSlide.title} Landscape 3`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentSlide.gridType === "1x4-portrait" && (
                <div className="flex flex-col gap-6 h-full overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:h-[90vh] flex-shrink-0">
                    {currentSlide.images.slice(0, 2).map((image, index) => (
                      <div
                        key={index}
                        className="aspect-[9/16] relative overflow-hidden rounded-lg bg-neutral-100 md:h-full"
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${currentSlide.title} ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-shrink-0">
                    {currentSlide.images.slice(2, 4).map((image, index) => (
                      <div key={index + 2} className="aspect-[9/16] relative overflow-hidden rounded-lg bg-neutral-100">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${currentSlide.title} ${index + 3}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentSlide.gridType === "1x3-portrait" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full max-h-[85vh] items-center">
                  {currentSlide.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-square md:h-[50vh]"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${currentSlide.title} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              )}

              {currentSlide.gridType === "4-column-grid" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-full max-h-[85vh] overflow-y-auto">
                  {/* 17 portrait images with aspect-[9/16] */}
                  {currentSlide.images.slice(0, 17).map((image, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-[9/16] md:h-[40vh]"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${currentSlide.title} Portrait ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                  ))}

                  {/* 1 landscape image */}
                  {currentSlide.images[17] && (
                    <div className="md:col-span-2 relative overflow-hidden rounded-lg bg-neutral-100 aspect-video">
                      <img
                        src={currentSlide.images[17] || "/placeholder.svg"}
                        alt={`${currentSlide.title} Landscape 1`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                </div>
              )}

              {currentSlide.gridType === "2x2-five-images" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full max-h-[85vh]">
                  {/* First 4 images with aspect-[3/4] */}
                  {currentSlide.images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-[3/4] md:h-[50vh]"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${currentSlide.title} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}

                  {/* 5th image as square, spanning center */}
                  {currentSlide.images[4] && (
                    <div className="md:col-span-2 flex justify-center">
                      <div className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-square w-full md:w-1/2">
                        <img
                          src={currentSlide.images[4] || "/placeholder.svg"}
                          alt={`${currentSlide.title} Square`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentSlide.gridType === "4-column-five-images" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full max-h-[85vh] items-start">
                  {/* First 4 images with aspect-[3/4] */}
                  {currentSlide.images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-[3/4] md:h-[60vh]"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${currentSlide.title} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                  ))}

                  {/* 5th image as square, centered in remaining space */}
                  {currentSlide.images[4] && (
                    <div className="md:col-span-4 flex justify-center md:mt-4">
                      <div className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-square w-full md:w-1/4">
                        <img
                          src={currentSlide.images[4] || "/placeholder.svg"}
                          alt={`${currentSlide.title} Square`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentSlide.gridType === "3x3-18images" && (
                <div className="space-y-4 h-full max-h-[85vh] overflow-y-auto">
                  {/* First row - 17 images with aspect-[9/16] that fit viewport */}
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                    {/* Mobile: single column layout, Desktop: 6-column grid */}
                    {currentSlide.images.slice(0, 17).map((image, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-[9/16] md:h-[25vh]"
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${currentSlide.title} Portrait ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 16vw"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Second row - 1 landscape image with aspect-[4/3] */}
                  {currentSlide.images[17] && (
                    <div className="flex justify-center">
                      <div className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-[4/3] w-full md:w-1/2">
                        <img
                          src={currentSlide.images[17] || "/placeholder.svg"}
                          alt={`${currentSlide.title} Landscape 1`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full p-6">
              {currentSlide?.images.length === 1 ? (
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={currentSlide.images[0] || "/placeholder.svg"}
                    alt={currentSlide.title}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
              ) : currentSlide?.images.length === 2 ? (
                <div className="flex gap-6 h-full items-center justify-center">
                  {currentSlide.images.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-1 h-full flex items-center justify-center ${index === 1 ? "aspect-square" : ""}`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${currentSlide.title} ${index + 1}`}
                        className="max-w-full max-h-full object-contain rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ) : project.id === "bet-bota" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 md:grid-rows-2 gap-4 h-full">
                  <div className="md:col-span-2 row-span-2 relative overflow-hidden rounded-lg bg-neutral-100">
                    <img
                      src={currentSlide.images[0] || "/placeholder.svg"}
                      alt={`${currentSlide.title} 1`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-lg bg-neutral-100">
                    <img
                      src={currentSlide.images[1] || "/placeholder.svg"}
                      alt={`${currentSlide.title} 2`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={`grid grid-cols-1 md:grid-cols-4 gap-4 h-full ${
                    currentSlide?.images.length === 3
                      ? "md:grid-cols-3"
                      : currentSlide?.images.length === 4
                        ? "md:grid-cols-2 md:grid-rows-2"
                        : currentSlide?.images.length <= 6
                          ? "md:grid-cols-3 md:grid-rows-2"
                          : "md:grid-cols-4 md:grid-rows-3"
                  }`}
                >
                  {/* Mobile: single column layout, Desktop: responsive grid */}
                  {currentSlide.images.slice(0, 12).map((image, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg bg-neutral-100 flex items-center justify-center"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${currentSlide.title} ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                  {currentSlide.images.length > 12 && (
                    <div className="relative overflow-hidden rounded-lg bg-neutral-900 flex items-center justify-center">
                      <span className="text-white font-medium">+{currentSlide.images.length - 12} more</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {!isGridProject && !isHorizontalProject && !isVideoProject && !isBentoProject && (
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
    </div>
  )
}
