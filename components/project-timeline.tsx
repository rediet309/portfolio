"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Award, Users } from "lucide-react"
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
      case "Textile":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
      case "Commissions":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300"
      default:
        return "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300"
    }
  }

  return (
    <>
      <div className="w-full px-12 lg:px-0">
        {sortedYears.map((year, yearIndex) => (
          <div key={year} className="mb-20">
            {/* Year Header */}
            <div className="flex items-center mb-12">
              <div className={`font-stardom text-4xl ${isDark ? "text-white" : "text-black"} mr-8`}>{year}</div>
              <div className={`flex-1 h-px ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`}></div>
              <div className={`ml-8 text-sm font-times ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                {projectsByYear[year].length} Project{projectsByYear[year].length !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsByYear[year].map((project, projectIndex) => (
                <div
                  key={project.id}
                  className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                    yearIndex === 0 ? "animate-in slide-in-from-bottom-4" : ""
                  }`}
                  style={{
                    animationDelay: `${projectIndex * 100}ms`,
                    animationFillMode: "both",
                  }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div
                    className={`rounded-lg overflow-hidden ${isDark ? "bg-neutral-800" : "bg-white"} shadow-lg hover:shadow-xl transition-shadow duration-300`}
                  >
                    {/* Project Image */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={480}
                        height={360}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {project.featured && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-black/80 text-white font-times">Featured</Badge>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <Badge className={`${getCategoryColor(project.category)} font-times`}>{project.category}</Badge>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3
                        className={`text-xl font-stardom ${isDark ? "text-white" : "text-black"} mb-2 group-hover:text-opacity-80 transition-colors`}
                      >
                        {project.title}
                      </h3>
                      <p className={`text-sm font-times ${isDark ? "text-neutral-400" : "text-neutral-600"} mb-3`}>
                        {project.medium}
                      </p>
                      <p
                        className={`text-sm font-times ${isDark ? "text-neutral-300" : "text-neutral-700"} mb-4 line-clamp-2`}
                      >
                        {project.description}
                      </p>

                      {/* Project Stats */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`flex items-center space-x-1 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
                          >
                            <Calendar className="h-3 w-3" />
                            <span className="font-times">{project.year}</span>
                          </div>
                          {project.awards.length > 0 && (
                            <div
                              className={`flex items-center space-x-1 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
                            >
                              <Award className="h-3 w-3" />
                              <span className="font-times">{project.awards.length}</span>
                            </div>
                          )}
                          <div
                            className={`flex items-center space-x-1 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
                          >
                            <Users className="h-3 w-3" />
                            <span className="font-times">{project.visitors}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
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
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal */}
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
