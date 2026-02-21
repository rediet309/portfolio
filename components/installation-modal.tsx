"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
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
  role?: string
}

interface InstallationModalProps {
  project: InstallationProject | null
  isOpen: boolean
  onClose: () => void
}

const preloadImage = (src: string) => {
  if (typeof window !== "undefined") {
    const img = new Image()
    img.src = src
  }
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

  if (project.id === "yal-exhibition") {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-[95vw] h-[96vh] flex overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
          >
            <X className="h-5 w-5 text-black" />
          </button>

          {/* Left side: Grid of images */}
          <div className="w-full md:w-[65%] lg:w-[70%] p-6 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.images?.map((image, index) => (
                <div key={index} className="aspect-[4/3] relative overflow-hidden rounded-lg bg-neutral-100">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} ${index + 1}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={80}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Description panel */}
          <div className="hidden md:flex md:w-[35%] lg:w-[30%] p-6 flex-col border-l border-neutral-200 overflow-y-auto">
            <div className="space-y-6">
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
              </div>

              <div className="text-sm text-neutral-500 font-medium">{project.medium}</div>

              {project.role && (
                <div className="text-sm text-neutral-600 italic">
                  <span className="font-medium">Role: </span>
                  {project.role}
                </div>
              )}

              <p className="text-neutral-700 leading-relaxed">{project.detailedDescription || project.description}</p>

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
        </div>
      </div>
    )
  }

  if (project.id === "skins-north-ethiopia") {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-[95vw] h-[96vh] flex overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
          >
            <X className="h-5 w-5 text-black" />
          </button>

          {/* Left side: Horizontal scrolling grid of images */}
          <div className="w-full md:w-[65%] lg:w-[70%] p-6 overflow-x-auto">
            <div className="flex h-full min-w-max gap-0">
              {project.images?.map((image, index) => (
                <div
                  key={index}
                  className="h-full aspect-[4/5] relative overflow-hidden rounded-lg bg-neutral-100 flex items-center justify-center"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} ${index + 1}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 80vw, 40vw"
                    quality={80}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Description panel */}
          <div className="hidden md:flex md:w-[35%] lg:w-[30%] p-6 flex-col border-l border-neutral-200 overflow-y-auto">
            <div className="space-y-6">
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
              </div>

              <div className="text-sm text-neutral-500 font-medium">{project.medium}</div>

              {project.role && (
                <div className="text-sm text-neutral-600 italic">
                  <span className="font-medium">Role: </span>
                  {project.role}
                </div>
              )}

              <p className="text-neutral-700 leading-relaxed">{project.detailedDescription || project.description}</p>

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
        </div>
      </div>
    )
  }

  if (project.id === "decoding-legends-installation") {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-[95vw] h-[96vh] flex overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
          >
            <X className="h-5 w-5 text-black" />
          </button>

          {/* Left side: Grid with varying aspect ratios, 2 rows visible */}
          <div className="w-full md:w-[65%] lg:w-[70%] p-6 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.images?.map((image, index) => {
                let aspectRatio = "aspect-square" // Default

                // Images 1, 2, 6, 7 (indices 0, 1, 5, 6): 4:3 aspect ratio
                if ([0, 1, 5, 6].includes(index)) {
                  aspectRatio = "aspect-[4/3]"
                }
                // Images 3, 4, 5, 8, 9 (indices 2, 3, 4, 7, 8): 3:4 aspect ratio
                else if ([2, 3, 4, 7, 8].includes(index)) {
                  aspectRatio = "aspect-[3/4]"
                }
                // Images 10, 11, 12 (indices 9, 10, 11): square aspect ratio
                else if ([9, 10, 11].includes(index)) {
                  aspectRatio = "aspect-square"
                }

                return (
                  <div key={index} className={`${aspectRatio} relative overflow-hidden rounded-lg bg-neutral-100`}>
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      quality={80}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right side: metadata panel */}
          <div className="hidden md:flex md:w-[35%] lg:w-[30%] p-6 flex-col border-l border-neutral-200 overflow-y-auto">
            <div className="space-y-6">
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
              </div>

              <div className="text-sm text-neutral-500 font-medium">{project.medium}</div>

              {project.role && (
                <div className="text-sm text-neutral-600 italic">
                  <span className="font-medium">Role: </span>
                  {project.role}
                </div>
              )}

              <p className="text-neutral-700 leading-relaxed">{project.detailedDescription || project.description}</p>

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
        </div>
      </div>
    )
  }

  if (project.id === "yal-studio") {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
        >
          <X className="h-5 w-5 text-black" />
        </button>

        {/* The following div replaces the original content for project.id === "yal-studio" */}
        <div className="flex items-center justify-center w-full h-[96vh] p-2 md:p-4">
          <div
            className="relative w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] bg-neutral-900 rounded-lg overflow-hidden shadow-2xl"
            style={{
              aspectRatio: "9 / 16",
              maxHeight: "96vh",
              maxWidth: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {project.videoUrl ? (
              <iframe
                src={project.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                style={{
                  border: "none",
                  display: "block",
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4 p-4">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="text-white">
                    <div className="text-lg font-medium">{project.title}</div>
                    <div className="text-sm text-white/70">1080 × 1920</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (
    project.id === "sheret-project" ||
    project.id === "hulet-neteb-installation" ||
    project.id === "hulet-neteb-project"
  ) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-[95vw] h-[96vh] flex overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
          >
            <X className="h-5 w-5 text-black" />
          </button>

          {/* Left side: Grid of images */}
          <div className="w-full md:w-[65%] lg:w-[70%] p-6 overflow-y-auto">
            <div
              className={`grid gap-4 ${
                project.id === "sheret-project"
                  ? "grid-cols-2 md:grid-cols-3"
                  : project.id === "hulet-neteb-project"
                    ? "grid-cols-2 md:grid-cols-4"
                    : "grid-cols-2 md:grid-cols-3"
              }`}
            >
              {project.images?.map((image, index) => {
                let aspectRatio = "aspect-square"

                if (project.id === "sheret-project") {
                  aspectRatio = "aspect-[9/16]"
                } else if (project.id === "hulet-neteb-installation") {
                  aspectRatio = "aspect-[4/3]"
                } else if (project.id === "hulet-neteb-project") {
                  aspectRatio = "aspect-square"
                }

                return (
                  <div key={index} className={`${aspectRatio} relative overflow-hidden rounded-lg bg-neutral-100`}>
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      quality={80}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right side: Description panel */}
          <div className="hidden md:flex md:w-[35%] lg:w-[30%] p-6 flex-col border-l border-neutral-200 overflow-y-auto">
            <div className="space-y-6">
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
              </div>

              <div className="text-sm text-neutral-500 font-medium">{project.medium}</div>

              {project.role && (
                <div className="text-sm text-neutral-600 italic">
                  <span className="font-medium">Role: </span>
                  {project.role}
                </div>
              )}

              <p className="text-neutral-700 leading-relaxed">{project.detailedDescription || project.description}</p>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-xs text-neutral-400 pt-4 border-t border-neutral-200">
                {project.photoCount} photographs
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (project.id === "except-thise-time-nothing-returns-from-the-ashes") {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-[95vw] h-[96vh] flex flex-col md:flex-row overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
          >
            <X className="h-5 w-5 text-black" />
          </button>

          {/* Image section - responsive height on mobile */}
          <div className="w-full md:w-[65%] lg:w-[70%] h-[60vh] md:h-full p-6 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
              {project.images?.map((image, index) => (
                <div key={index} className="aspect-square relative overflow-hidden rounded-lg bg-neutral-100">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} ${index + 1}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={80}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Description section - responsive height on mobile */}
          <div className="w-full md:w-[35%] lg:w-[30%] h-[40vh] md:h-full p-6 flex flex-col border-t md:border-t-0 md:border-l border-neutral-200 overflow-y-auto">
            <div className="space-y-6">
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
              </div>

              <div className="text-sm text-neutral-500 font-medium">{project.medium}</div>

              {project.role && (
                <div className="text-sm text-neutral-600 italic">
                  <span className="font-medium">Role: </span>
                  {project.role}
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
        </div>
      </div>
    )
  }

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
      if (
        project.id !== "yal-exhibition" &&
        project.id !== "sheret-project" &&
        project.id !== "hulet-neteb-installation" &&
        project.id !== "hulet-neteb-project"
      ) {
        slides.push({
          type: "grid",
          images: project.images || [],
          title: project.title,
          gridLayout:
            project.id === "except-thise-time-nothing-returns-from-the-ashes"
              ? "4x4"
              : project.id === "decoding-legends-installation"
                ? "3x3"
                : "3x3",
        })
      }
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
        let slideDescription = ""

        if (project.id === "bet-bota") {
          const betBotaSlides = [
            {
              title: "Fire",
              description:
                "Dominated by deep reds, the living room radiates energy and emotion. At its center stands a burnt couch, a symbol of resilience and transformation, referencing both the fire’s destructive force and the way television consumes our attention. A framed photograph of the same couch burning underscores the theme of media as fire—consuming, reshaping, yet binding communal life.",
            },
            {
              title: "Water",
              description:
                "The bathroom set, inspired by water, is a calm, introspective space in soothing blue tones. At its center is an empty blue bathtub, symbolizing transformation",
            },
            {
              title: "Earth",
              description:
                "The bedroom set, inspired by the grounding element of earth, transforms into a surreal, upside-down dreamscape in rich brown tones. Viewed from above, this flipped design plays with perception, capturing the surreal essence of dreams and inviting viewers to see the space in a whole new way.",
            },
            {
              title: "Air",
              description:
                "The corridor/ air-inspired set, bathed in vibrant yellow, symbolizes the fluidity and adaptability of Ethiopian spaces. At its center, five traditional Berchuma chairs, lightweight and portable by design, are suspended within a 2m x 2m cube. This framing highlights the dynamic nature of the Berchuma, a chair without a fixed place, effortlessly moved to fit any space.",
            },
            {
              title: "The Merger",
              description:
                "At the core sits the dining space, tying the elements together. A circular white table anchors the room, surrounded by four chairs upholstered in red, yellow, blue, and brown—each facing outward toward its corresponding set. Above hangs a fabric sack filled with everyday household items, exposing rather than concealing the typical Ethiopian habit of storage and hoarding. Here, the question arises: what do the things we keep say about us? This installation transforms the dining area into both a connector and a reflective node, the heart of the home and the exhibition.",
            },
            {
              title: "Portal",
              description:
                "A lone door marks the transition—both threshold and symbolic portal—leading visitors into the second section.",
            },
            {
              title: "Monochrome Memories",
              description:
                "Evoking the black-and-white portraits of Addis Ababa’s photo studios, this set immerses visitors in shades of grey. At its center hangs a vintage grey raincoat, splattered with red, yellow, and green paint. Behind it, three mirrors reflect an artwork painted on its back—revealing only in reflection the unspoken weight of patriotism, identity, and struggle carried by a generation shaped by the 1970s. The dripping flag colors embody the fluid and fragile nature of belonging.",
            },
            {
              title: "Monochrome Memories",
              description:
                "Evoking the black-and-white portraits of Addis Ababa’s photo studios, this set immerses visitors in shades of grey. At its center hangs a vintage grey raincoat, splattered with red, yellow, and green paint. Behind it, three mirrors reflect an artwork painted on its back—revealing only in reflection the unspoken weight of patriotism, identity, and struggle carried by a generation shaped by the 1970s. The dripping flag colors embody the fluid and fragile nature of belonging.",
            },
            {
              title: "Nostalgia",
              description:
                "A stand-alone wall becomes an archive of the 1990s. One side is plastered with old newspapers; the other covered in postcards and posters. A mat on the floor and a horizontal storage box—once used by the artist’s grandmother as she fled her hometown searching for her missing husband—ground the installation in lived experience. This set represents the compact, resourceful lifestyle of a bachelor studio, where memory and survival coexist in the objects that fill small spaces.",
            },
            {
              title: "Gathering",
              description:
                "Between these two sets, 25 meticulously selected and reupholstered chairs line the hall. They serve as both sculptural dividers and functional seating for conversations and seminars during the exhibition’s opening, reinforcing the show’s theme of space as both divider and unifier.",
            },
          ]

          if (i < betBotaSlides.length) {
            slideTitle = betBotaSlides[i].title
            slideDescription = betBotaSlides[i].description
          }
        } else if (project.id === "msfts-ethiopia-skate-photos") {
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
          description: slideDescription, // Adding description property to slides
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

            // </CHANGE> Fixed variable name from photosPerSlide to photosInThisSlide
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
            const slideImages = project.images.slice(imageIndex, imageIndex + photosPerSlide)

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

  if (
    project.id === "yal-exhibition" ||
    project.id === "sheret-project" ||
    project.id === "hulet-neteb-installation" ||
    project.id === "hulet-neteb-project"
  ) {
    return null // Already handled above
  }

  const currentSlide = slides[currentSlideIndex]

  const nextSlide = () => {
    const newIndex = (currentSlideIndex + 1) % slides.length
    setCurrentSlideIndex(newIndex)
    if (newIndex + 1 < slides.length) {
      preloadImage(slides[newIndex + 1]?.images?.[0] || "")
    }
  }

  const prevSlide = () => {
    const newIndex = (currentSlideIndex - 1 + slides.length) % slides.length
    setCurrentSlideIndex(newIndex)
    if (newIndex > 0) {
      preloadImage(slides[newIndex - 1]?.images?.[0] || "")
    }
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
    "decoding-legends-installation",
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
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div
          className={`bg-white rounded-lg shadow-2xl ${modalWidth} ${modalHeight} flex flex-col md:flex-row overflow-hidden relative`}
        >
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
                className="absolute left-4 top-1/2 md:top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
              >
                <ChevronLeft className="h-6 w-6 text-black" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 md:top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
              >
                <ChevronRight className="h-6 w-6 text-black" />
              </button>
            </>
          )}

          <div
            className={`${isGridProject || isHorizontalProject || isVideoProject || isBentoProject ? "w-full" : "w-full md:w-[70%]"} relative ${project.id === "bet-bota" ? "h-[60vh] md:h-full overflow-y-auto" : "overflow-hidden"} bg-neutral-50 flex items-center justify-center ${project.id === "skins-east-ethiopia" ? "h-[100vh] md:h-full" : project.id === "bet-bota" ? "" : ""}`}
          >
            {currentSlide?.type === "grid" ? (
              <div className="w-full h-full p-6 overflow-y-auto">
                <div
                  className={`grid gap-4 ${
                    currentSlide.gridLayout === "4x4"
                      ? "grid-cols-4 auto-rows-fr"
                      : currentSlide.gridLayout === "3x9"
                        ? "grid-cols-3 grid-rows-9 auto-rows-fr"
                        : currentSlide.gridLayout === "2x2"
                          ? "grid-cols-2 auto-rows-fr"
                          : "grid-cols-3 auto-rows-fr"
                  }`}
                >
                  {currentSlide.images.map((image, index) => {
                    let aspectRatio = "aspect-square"

                    if (project.id === "skins-north-ethiopia") {
                      aspectRatio = "aspect-[4/5]"
                    } else if (project.id === "hulet-neteb-project") {
                      aspectRatio = "aspect-square"
                    } else if (project.id === "yal-exhibition") {
                      aspectRatio = "aspect-[4/3]"
                    } else if (project.id === "hulet-neteb-installation") {
                      aspectRatio = "aspect-[4/3]"
                    } else if (project.id === "sheret-project") {
                      aspectRatio = "aspect-[9/16]"
                    } else if (project.id === "decoding-legends-installation") {
                      aspectRatio = [0, 1, 5, 6].includes(index) ? "aspect-[4/3]" : "aspect-[4/5]"
                    }

                    return (
                      <div
                        key={index}
                        className={`${aspectRatio} relative overflow-hidden rounded-lg bg-neutral-100 flex items-center justify-center`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${currentSlide.title} ${index + 1}`}
                          fill
                          className="object-cover"
                          loading={index < 3 ? "eager" : "lazy"}
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          quality={80}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : currentSlide?.type === "custom-grid" ? (
              <div className="w-full h-full p-6 overflow-y-auto">
                <div
                  className={`grid gap-4 ${
                    currentSlide.gridType === "1x4-portrait"
                      ? "grid-cols-4 auto-rows-max"
                      : currentSlide.gridType === "1x3-portrait"
                        ? "grid-cols-3 auto-rows-max"
                        : currentSlide.gridType === "3x3-mixed"
                          ? "grid-cols-3 auto-rows-max"
                          : currentSlide.gridType === "4-column-five-images"
                            ? "grid-cols-4 auto-rows-max"
                            : "grid-cols-4 auto-rows-max"
                  }`}
                  style={{ maxHeight: "100%", minHeight: "100%" }}
                >
                  {currentSlide.images.map((image, index) => {
                    let aspectRatio = "aspect-square"

                    if (currentSlide.gridType === "1x4-portrait") {
                      aspectRatio = "aspect-[9/16]"
                    } else if (currentSlide.gridType === "1x3-portrait") {
                      aspectRatio = "aspect-[9/16]"
                    } else if (currentSlide.gridType === "3x3-mixed") {
                      aspectRatio =
                        [0, 1, 5, 6].includes(index) || index % 7 === 0 ? "aspect-[4/3]" : "aspect-[4/5]"
                    } else if (currentSlide.gridType === "4-column-five-images") {
                      aspectRatio = "aspect-[9/16]"
                    }

                    return (
                      <div
                        key={index}
                        className={`${aspectRatio} relative overflow-hidden rounded-lg bg-neutral-100 flex items-center justify-center`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${currentSlide.title} ${index + 1}`}
                          fill
                          className="object-cover"
                          loading={index < 3 ? "eager" : "lazy"}
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          quality={80}
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
                      className="h-full aspect-[4/5] relative overflow-hidden rounded-lg bg-neutral-100 flex items-center justify-center"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${currentSlide.title} ${index + 1}`}
                        fill
                        className="object-cover"
                        loading={index < 2 ? "eager" : "lazy"}
                        sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 40vw"
                        quality={80}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : currentSlide?.type === "video" ? (
              <div className="w-full h-full flex items-center justify-center p-8">
                <div
                  className={`w-full max-w-6xl max-h-full aspect-video bg-neutral-900 rounded-lg flex items-center justify-center`}
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
                        <div className="text-sm text-white/70">1920 × 1080</div>
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
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919-.058 1.265-.069 1.645-.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.60
                        L17.163 12c0-3.403-2.759-6.162-6.163-6.162-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.163-2.759 6.163-6.162zm0-2.163c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                      />
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
                        <path
                          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919-.058 1.265-.069 1.645-.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.60
                          L17.163 12c0-3.403-2.759-6.162-6.163-6.162-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.163-2.759 6.163-6.162zm0-2.163c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        />
                      </svg>
                      <span>Follow Us</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : currentSlide?.type === "photos" ? (
              <div className="w-full h-full p-6 flex flex-col items-center justify-center">
                {project.id === "bet-bota" && currentSlide.images && currentSlide.images.length === 2 ? (
                  <div className="w-full h-full flex gap-4">
                    {/* Left image: 3:4 aspect ratio (portrait) */}
                    <div className="flex-1 flex flex-col">
                      <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-neutral-100">
                        <Image
                          src={currentSlide.images[0] || "/placeholder.svg"}
                          alt={`${currentSlide.title} - Left`}
                          fill
                          className="object-cover"
                          loading="eager"
                          quality={85}
                          sizes="50vw"
                        />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="aspect-[4/3] relative overflow-hidden rounded-lg bg-neutral-100">
                        <Image
                          src={currentSlide.images[1] || "/placeholder.svg"}
                          alt={`${currentSlide.title} - Right`}
                          fill
                          className="object-cover"
                          loading="eager"
                          quality={85}
                          sizes="50vw"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`relative ${project.id === "skins-east-ethiopia" ? "w-full max-w-4xl aspect-square" : "w-full h-full"} overflow-hidden rounded-lg bg-neutral-100`}
                  >
                    <Image
                      src={currentSlide.images?.[0] || "/placeholder.svg"}
                      alt={currentSlide.title}
                      fill
                      className={project.id === "skins-east-ethiopia" ? "object-contain" : "object-cover"}
                      loading="eager"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {(isGridProject || isHorizontalProject || isVideoProject || isBentoProject) && (
            <div className="hidden md:flex md:w-[30%] lg:w-[25%] p-6 flex-col border-l border-neutral-200 overflow-y-auto">
              <div className="space-y-6">
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
                </div>

                <div className="text-sm text-neutral-500 font-medium">{project.medium}</div>

                {project.role && (
                  <div className="text-sm text-neutral-600 italic">
                    <span className="font-medium">Role: </span>
                    {project.role}
                  </div>
                )}

                {project.id === "bet-bota" && currentSlide?.description ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-black">{currentSlide.title}</h3>
                    <p className="text-neutral-700 leading-relaxed">{currentSlide.description}</p>
                  </div>
                ) : (
                  <>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                  </>
                )}
              </div>
            </div>
          )}

          {!(isGridProject || isHorizontalProject || isVideoProject || isBentoProject) && (
            <div className="hidden md:flex md:w-[30%] lg:w-[30%] p-6 flex-col border-l border-neutral-200 overflow-y-auto">
              <div className="space-y-6">
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
                </div>

                <div className="text-sm text-neutral-500 font-medium">{project.medium}</div>

                {project.role && (
                  <div className="text-sm text-neutral-600 italic">
                    <span className="font-medium">Role: </span>
                    {project.role}
                  </div>
                )}

                <p className="text-neutral-700 leading-relaxed">{project.detailedDescription || project.description}</p>

                {currentSlide?.title && (
                  <div className="space-y-3 pt-4 border-t border-neutral-200">
                    <h3 className="text-lg font-medium text-black">{currentSlide.title}</h3>
                    {currentSlide?.description && (
                      <p className="text-neutral-700 leading-relaxed">{currentSlide.description}</p>
                    )}
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
          )}

          <div className="md:hidden w-full p-6 border-t border-neutral-200 overflow-y-auto">
            <div className="space-y-6">
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
              </div>

              <div className="text-sm text-neutral-500 font-medium">{project.medium}</div>

              {project.role && (
                <div className="text-sm text-neutral-600 italic">
                  <span className="font-medium">Role: </span>
                  {project.role}
                </div>
              )}

              <p className="text-neutral-700 leading-relaxed">{project.detailedDescription || project.description}</p>

              {currentSlide?.title && (
                <div className="space-y-3 pt-4 border-t border-neutral-200">
                  <h3 className="text-lg font-medium text-black">{currentSlide.title}</h3>
                  {currentSlide?.description && (
                    <p className="text-neutral-700 leading-relaxed">{currentSlide.description}</p>
                  )}
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
        </div>
      </div>
    </>
  )
}
