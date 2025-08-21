"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ProjectModal } from "./project-modal"

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

interface ProjectTimelineProps {
  projects: Project[]
  isDark: boolean
}

export function ProjectTimeline({ projects, isDark }: ProjectTimelineProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Group projects by year
  const projectsByYear = projects.reduce(
    (acc, project) => {
      if (!acc[project.year]) {
        acc[project.year] = []
      }
      acc[project.year].push(project)
      return acc
    },
    {} as Record<number, Project[]>,
  )

  // Sort years in descending order
  const sortedYears = Object.keys(projectsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Films":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      case "Installation":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
      case "In Studio":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "Commissioned":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300"
      default:
        return "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300"
    }
  }

  const getCategoryPath = (category: string) => {
    switch (category) {
      case "Films":
        return "/projects/films"
      case "Installation":
        return "/projects/installation"
      case "In Studio":
        return "/projects/in-studio"
      case "Commissioned":
        return "/projects/commissions"
      default:
        return "/projects"
    }
  }

  return (
    <>
      <div className="w-full px-12 lg:px-0">
        {sortedYears.map((year, yearIndex) => (
          <div key={year} className="mb-24">
            {/* Year Header */}
            <div className="flex items-center mb-8">
              <div className={`font-stardom text-xl ${isDark ? "text-white" : "text-black"} mr-6`}>{year}</div>
              <div className={`flex-1 h-px ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`}></div>
              <div className={`ml-6 font-times text-xs ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                {projectsByYear[year].length} Project{projectsByYear[year].length !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Projects Grid - Compact 4-column layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {projectsByYear[year].map((project, projectIndex) => (
                <Link
                  key={project.id}
                  href={getCategoryPath(project.category)}
                  className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 block ${
                    yearIndex === 0 ? "animate-in slide-in-from-bottom-4" : ""
                  }`}
                  style={{
                    animationDelay: `${projectIndex * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div
                    className={`rounded-lg overflow-hidden ${isDark ? "bg-neutral-800" : "bg-white"} shadow-lg hover:shadow-xl transition-shadow duration-300`}
                  >
                    {/* Project Image - Reduced aspect ratio */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={320}
                        height={240}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={`${getCategoryColor(project.category)} font-times text-xs`}>
                          {project.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Project Info - Reduced padding */}
                    <div className="p-4">
                      <h3
                        className={`text-lg font-stardom ${isDark ? "text-white" : "text-black"} mb-2 group-hover:text-opacity-80 transition-colors`}
                      >
                        {project.title}
                      </h3>
                      <p className={`text-sm font-times ${isDark ? "text-neutral-400" : "text-neutral-600"} mb-2`}>
                        {project.medium}
                      </p>
                      <p
                        className={`text-sm font-times ${isDark ? "text-neutral-300" : "text-neutral-700"} mb-3 line-clamp-2`}
                      >
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className={`text-xs font-times ${isDark ? "border-neutral-600 text-neutral-400" : "border-neutral-300 text-neutral-600"}`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal - Removed since we're using navigation */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          isDark={isDark}
        />
      )}
    </>
  )
}
