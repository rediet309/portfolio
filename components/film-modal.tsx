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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-[95vw] h-[90vh] flex overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
        >
          <X className="h-5 w-5 text-black" />
        </button>

        {/* Video Section - 70% width */}
        <div className="w-[70%] relative bg-black flex items-center justify-center">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : project.videoUrl === "private" ? (
            <div className="text-center text-white space-y-4">
              <div className="text-6xl opacity-50">🔒</div>
              <div className="text-xl font-medium">Private Content</div>
              <div className="text-sm opacity-75">This video is not publicly accessible</div>
            </div>
          ) : (
            <div className="text-center text-white space-y-4">
              <div className="text-6xl opacity-50">📹</div>
              <div className="text-xl font-medium">Video Unavailable</div>
              <div className="text-sm opacity-75">Unable to load video content</div>
            </div>
          )}
        </div>

        {/* Content Section - 30% width */}
        <div className="w-[30%] p-8 flex flex-col bg-white">
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6">
              {/* Title */}
              <h2 className="text-3xl font-stardom text-black leading-tight">{project.title}</h2>

              {/* Metadata */}
              <div className="space-y-3 text-sm">
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

                <div className="flex justify-between">
                  <span className="text-neutral-500">Medium</span>
                  <span className="text-black font-medium">{project.medium}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-black">About</h3>
                <p className="text-neutral-700 leading-relaxed">{project.detailedDescription || project.description}</p>
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-black">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
