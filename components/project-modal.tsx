"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Calendar, Clock, User, Ruler, Eye } from "lucide-react"

interface Project {
  id: string
  title: string
  year: string | number
  category: "films" | "textile" | "commissions" | "Films" | "Textile" | "Commissions"
  medium: string
  dimensions?: string
  duration?: string
  client?: string
  image: string
  description: string
  featured?: boolean
  tags?: string[]
  awards?: string[]
  visitors?: string
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  relatedProjects?: Project[]
}

export function ProjectModal({ project, isOpen, onClose, relatedProjects = [] }: ProjectModalProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setCurrentCardIndex(0)
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

  const projectCards = [
    {
      ...project,
      title: project.title,
      description: project.description,
      image: project.image,
      subtitle: "Main View",
    },
    {
      ...project,
      title: `${project.title} - Detail`,
      description: `Detailed exploration of ${project.title.toLowerCase()}, examining the intricate elements and artistic techniques employed in this compelling work.`,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center",
      subtitle: "Detail View",
    },
    {
      ...project,
      title: `${project.title} - Process`,
      description: `Behind-the-scenes documentation of the creative process, showcasing the development and methodology behind ${project.title.toLowerCase()}.`,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop&crop=center",
      subtitle: "Process View",
    },
    {
      ...project,
      title: `${project.title} - Context`,
      description: `Contextual analysis and cultural significance of ${project.title.toLowerCase()}, exploring its place within contemporary artistic discourse.`,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
      subtitle: "Context View",
    },
  ]

  const currentCard = projectCards[currentCardIndex]

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % projectCards.length)
  }

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + projectCards.length) % projectCards.length)
  }

  const goToCard = (index: number) => {
    setCurrentCardIndex(index)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-[90vw] h-[95vh] flex overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
        >
          <X className="h-5 w-5 text-black" />
        </button>

        {/* Card Counter */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-black shadow-lg">
          {currentCardIndex + 1} / {projectCards.length}
        </div>

        {/* Dot Indicators */}

        {/* Previous Button */}
        <button
          onClick={prevCard}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
        >
          <ChevronLeft className="h-6 w-6 text-black" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextCard}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
        >
          <ChevronRight className="h-6 w-6 text-black" />
        </button>

        {/* Image Section - 60% width */}
        <div className="w-[60%] relative overflow-hidden" style={{ aspectRatio: "2718/2682" }}>
          <Image
            src={currentCard.image || "/placeholder.svg"}
            alt={currentCard.title}
            fill
            className="object-cover"
            sizes="60vw"
            loading="lazy"
            quality={80}
          />
        </div>

        {/* Content Section - 40% width */}
        <div className="w-[40%] p-8 flex flex-col">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6">
              {/* Subtitle */}
              <div className="text-sm text-neutral-500 font-medium">{currentCard.subtitle}</div>

              {/* Title */}
              <h2 className="text-3xl font-stardom text-black leading-tight">{currentCard.title}</h2>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-neutral-600">
                  <Calendar className="h-4 w-4" />
                  <span>{currentCard.year}</span>
                </div>

                {currentCard.duration && (
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <Clock className="h-4 w-4" />
                    <span>{currentCard.duration}</span>
                  </div>
                )}

                {currentCard.dimensions && (
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <Ruler className="h-4 w-4" />
                    <span>{currentCard.dimensions}</span>
                  </div>
                )}

                {currentCard.client && (
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <User className="h-4 w-4" />
                    <span>{currentCard.client}</span>
                  </div>
                )}

                {currentCard.visitors && (
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <Eye className="h-4 w-4" />
                    <span>{currentCard.visitors}</span>
                  </div>
                )}
              </div>

              {/* Medium */}
              <div className="text-sm text-neutral-500 font-medium">{currentCard.medium}</div>

              {/* Description */}
              <p className="text-neutral-700 leading-relaxed">{currentCard.description}</p>
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="mt-6 pt-4 border-t border-neutral-200">
            <div className="flex justify-center space-x-2">
              {projectCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToCard(index)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    index === currentCardIndex
                      ? "bg-black text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
