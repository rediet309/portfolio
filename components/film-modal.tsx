"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface FilmProject {
  id: string
  title: string
  year: string
  category: string
  medium: string
  description: string
  detailedDescription?: string
  image: string
  videoUrl?: string
  duration?: string
  tags: string[]
}

interface FilmModalProps {
  project: FilmProject | null
  isOpen: boolean
  onClose: () => void
}

export function FilmModal({ project, isOpen, onClose }: FilmModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
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

  const getEmbedUrl = (url: string) => {
    if (url === "private") return null

    // YouTube URL conversion
    if (url.includes("youtu.be") || url.includes("youtube.com")) {
      const videoId = url.includes("youtu.be")
        ? url.split("youtu.be/")[1]?.split("?")[0]
        : url.split("v=")[1]?.split("&")[0]

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
      }
    }

    // Google Drive URL conversion
    if (url.includes("drive.google.com")) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`
      }
    }

    return url
  }

  const embedUrl = project.videoUrl ? getEmbedUrl(project.videoUrl) : null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full h-full sm:w-[95vw] sm:h-[95vh] sm:max-w-7xl flex flex-col lg:flex-row overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg touch-manipulation"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
        </button>

        <div className="w-full lg:w-[70%] h-[40vh] sm:h-[50vh] lg:h-full relative bg-black flex items-center justify-center">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : project.videoUrl === "private" ? (
            <div className="text-center text-white space-y-2 sm:space-y-4 px-4">
              <div className="text-4xl sm:text-6xl opacity-50">🔒</div>
              <div className="text-lg sm:text-xl font-medium">Private Content</div>
              <div className="text-xs sm:text-sm opacity-75">This video is not publicly accessible</div>
            </div>
          ) : (
            <div className="text-center text-white space-y-2 sm:space-y-4 px-4">
              <div className="text-4xl sm:text-6xl opacity-50">📹</div>
              <div className="text-lg sm:text-xl font-medium">Video Unavailable</div>
              <div className="text-xs sm:text-sm opacity-75">Unable to load video content</div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-[30%] flex-1 lg:flex-none p-4 sm:p-6 lg:p-8 flex flex-col bg-white overflow-y-auto">
          <div className="space-y-4 sm:space-y-6">
            {/* Title */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-stardom text-black leading-tight pr-8">
              {project.title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Year</span>
                <span className="text-black font-medium">{project.year}</span>
              </div>

              {project.duration && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Duration</span>
                  <span className="text-black font-medium">{project.duration}</span>
                </div>
              )}

              <div className="flex justify-between col-span-2 sm:col-span-1">
                <span className="text-neutral-500">Medium</span>
                <span className="text-black font-medium text-right sm:text-left">{project.medium}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-medium text-black">Position</h3>
              <p className="text-neutral-700 leading-relaxed text-sm">{project.position}</p>
            </div>

            {project.detailedDescription && (
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium text-black">Description</h3>
                <p className="text-neutral-700 leading-relaxed text-sm">{project.detailedDescription}</p>
              </div>
            )}

            {project.tags && project.tags.length > 0 && (
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-base sm:text-lg font-medium text-black">Tags</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full touch-manipulation"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="h-4 sm:h-0" />
          </div>
        </div>
      </div>
    </div>
  )
}
