"use client"

import { X, Calendar, Award, Users, ExternalLink } from 'lucide-react'
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  year: number
  category: string
  medium: string
  description: string
  image: string
  featured: boolean
  awards: string[]
  visitors: string
  tags: string[]
}

interface ProjectModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
  isDark: boolean
}

export function ProjectModal({ project, isOpen, onClose, isDark }: ProjectModalProps) {
  if (!isOpen) return null

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Films":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      case "Textile":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
      case "Commissions":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300"
      default:
        return "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300"
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg ${isDark ? "bg-neutral-900" : "bg-white"} shadow-2xl`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full ${isDark ? "bg-neutral-800 text-white hover:bg-neutral-700" : "bg-white text-black hover:bg-neutral-100"} shadow-lg transition-colors`}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Project Image */}
        <div className="aspect-[16/9] overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Project Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className={`text-3xl font-stardom ${isDark ? "text-white" : "text-black"} mb-2`}>
                  {project.title}
                </h2>
                <p className={`text-lg font-times ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                  {project.medium}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {project.featured && (
                  <Badge className="bg-black/80 text-white font-times">
                    Featured
                  </Badge>
                )}
                <Badge className={`${getCategoryColor(project.category)} font-times`}>
                  {project.category}
                </Badge>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm">
              <div className={`flex items-center space-x-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                <Calendar className="h-4 w-4" />
                <span className="font-times">{project.year}</span>
              </div>
              <div className={`flex items-center space-x-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                <Users className="h-4 w-4" />
                <span className="font-times">{project.visitors} visitors</span>
              </div>
              {project.awards.length > 0 && (
                <div className={`flex items-center space-x-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                  <Award className="h-4 w-4" />
                  <span className="font-times">{project.awards.length} award{project.awards.length !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className={`text-lg font-stardom ${isDark ? "text-white" : "text-black"} mb-3`}>
              About This Project
            </h3>
            <p className={`text-base font-times leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
              {project.description}
            </p>
          </div>

          {/* Awards */}
          {project.awards.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-lg font-stardom ${isDark ? "text-white" : "text-black"} mb-3`}>
                Awards & Recognition
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.awards.map((award) => (
                  <Badge
                    key={award}
                    className={`${isDark ? "bg-neutral-800 text-neutral-200" : "bg-neutral-100 text-neutral-800"} font-times`}
                  >
                    {award}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mb-8">
            <h3 className={`text-lg font-stardom ${isDark ? "text-white" : "text-black"} mb-3`}>
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={`font-times ${isDark ? "border-neutral-600 text-neutral-400" : "border-neutral-300 text-neutral-600"}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button
              className={`font-times ${isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"}`}
            >
              View Full Gallery
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className={`font-times ${isDark ? "border-neutral-600 text-neutral-300 hover:bg-neutral-800" : "border-neutral-300 text-neutral-700 hover:bg-neutral-50"}`}
            >
              Share Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
