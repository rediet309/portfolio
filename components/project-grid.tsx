"use client"

import { useState } from "react"
import { Play, Palette, Briefcase, Calendar, Clock, User, Ruler } from "lucide-react"
import Image from "next/image"

interface Project {
  id: string
  title: string
  year: string
  category: "films" | "textile" | "commissions"
  medium: string
  dimensions?: string
  duration?: string
  client?: string
  image: string
  description: string
  featured?: boolean
  tags?: string[]
}

interface ProjectGridProps {
  projects: Project[]
  isDark: boolean
  isLoading: boolean
  onProjectClick?: (project: Project) => void
}

export function ProjectGrid({ projects, isDark, isLoading, onProjectClick }: ProjectGridProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const getCategoryIcon = (category: Project["category"]) => {
    switch (category) {
      case "films":
        return <Play className="h-4 w-4" />
      case "textile":
        return <Palette className="h-4 w-4" />
      case "commissions":
        return <Briefcase className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: Project["category"]) => {
    switch (category) {
      case "films":
        return "text-red-500"
      case "textile":
        return "text-amber-500"
      case "commissions":
        return "text-emerald-500"
    }
  }

  const getCategoryBg = (category: Project["category"]) => {
    switch (category) {
      case "films":
        return "bg-red-500/10 border-red-500/20"
      case "textile":
        return "bg-amber-500/10 border-amber-500/20"
      case "commissions":
        return "bg-emerald-500/10 border-emerald-500/20"
    }
  }

  return (
    <div
      className={`${isLoading ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"} transition-all duration-1000 delay-900`}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`group relative bg-neutral-50 dark:bg-neutral-800/50 rounded-sm overflow-hidden border ${isDark ? "border-neutral-800" : "border-neutral-200"} cursor-pointer`}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => onProjectClick?.(project)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-medium">Featured</div>
              </div>
            )}

            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden relative">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                quality={85}
                decoding="async"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />

              {/* Category Badge */}
              <div
                className={`absolute top-4 left-4 flex items-center space-x-2 px-3 py-1 rounded-full border backdrop-blur-sm ${getCategoryBg(project.category)}`}
              >
                <span className={getCategoryColor(project.category)}>{getCategoryIcon(project.category)}</span>
                <span className={`text-xs font-medium capitalize ${getCategoryColor(project.category)}`}>
                  {project.category}
                </span>
              </div>

              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-black/60 opacity-0 flex items-center justify-center`}>
                <div className="text-center space-y-3 transform translate-y-4 transition-transform duration-500">
                  <div className="text-white text-sm font-medium">View Project</div>
                  <div className="w-8 h-px bg-white/50 mx-auto" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className={`font-stardom text-xl font-light leading-tight ${isDark ? "text-white" : "text-black"}`}>
                  {project.title}
                </h3>

                <div className="flex items-center space-x-4 text-sm">
                  <div className={`flex items-center space-x-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                    <Calendar className="h-3 w-3" />
                    <span>{project.year}</span>
                  </div>

                  {project.duration && (
                    <div className={`flex items-center space-x-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                      <Clock className="h-3 w-3" />
                      <span>{project.duration}</span>
                    </div>
                  )}

                  {project.dimensions && (
                    <div className={`flex items-center space-x-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                      <Ruler className="h-3 w-3" />
                      <span>{project.dimensions}</span>
                    </div>
                  )}

                  {project.client && (
                    <div className={`flex items-center space-x-1 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                      <User className="h-3 w-3" />
                      <span>{project.client}</span>
                    </div>
                  )}
                </div>

                <p className={`text-xs ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>{project.medium}</p>
              </div>

              <p className={`text-sm leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-600"} line-clamp-3`}>
                {project.description}
              </p>

              {/* Tags */}
              {project.tags && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 text-xs rounded-full ${isDark ? "bg-neutral-700 text-neutral-300" : "bg-neutral-200 text-neutral-600"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
