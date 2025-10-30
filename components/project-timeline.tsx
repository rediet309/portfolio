"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { FilmModal } from "./film-modal"
import { InstallationModal } from "./installation-modal"

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
  detailedDescription?: string
  videoUrl?: string
  duration?: string
  location?: string
  client?: string
  materials?: string[]
  dimensions?: string
  photoCount?: number
  slidesLayout?: number[]
  images?: string[]
  imageDescriptions?: string[]
  instagramUrl?: string
  position?: string
  status?: string
  type?: "film" | "photo"
}

interface ProjectTimelineProps {
  projects: Project[]
  isDark: boolean
}

function ProjectTimeline({ projects, isDark }: ProjectTimelineProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedFilmProject, setSelectedFilmProject] = useState<Project | null>(null)
  const [selectedInstallationProject, setSelectedInstallationProject] = useState<Project | null>(null)
  const [selectedStudioProject, setSelectedStudioProject] = useState<Project | null>(null)
  const [selectedCommissionedProject, setSelectedCommissionedProject] = useState<Project | null>(null)
  const [selectedArchiveProject, setSelectedArchiveProject] = useState<Project | null>(null)
  const [isFilmModalOpen, setIsFilmModalOpen] = useState(false)
  const [isInstallationModalOpen, setIsInstallationModalOpen] = useState(false)
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false)
  const [isCommissionedModalOpen, setIsCommissionedModalOpen] = useState(false)
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false)

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
      case "Archive":
        return "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300"
      default:
        return "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300"
    }
  }

  const handleProjectClick = (project: Project, e: React.MouseEvent) => {
    e.preventDefault()

    if (project.category === "Films") {
      const filmProject = {
        id: project.id,
        title: project.title,
        year: project.year.toString(),
        category: project.category,
        medium: project.medium,
        description: project.description,
        detailedDescription: project.detailedDescription,
        image: project.image,
        videoUrl: project.videoUrl,
        duration: project.duration,
        tags: project.tags,
      }
      setSelectedFilmProject(filmProject)
      setIsFilmModalOpen(true)
    } else if (project.category === "Installation") {
      const installationProject = {
        id: project.id,
        title: project.title,
        year: project.year.toString(),
        category: project.category,
        medium: project.medium,
        description: project.description,
        detailedDescription: project.detailedDescription,
        image: project.image,
        materials: project.materials,
        dimensions: project.dimensions,
        tags: project.tags,
        photoCount: project.photoCount,
        slidesLayout: project.slidesLayout,
        images: project.images,
        imageDescriptions: project.imageDescriptions,
        videoUrl: project.videoUrl,
        location: project.location,
        visitors: project.visitors ? Number.parseInt(project.visitors.replace(/,/g, "")) : undefined,
        position: project.position,
        instagramUrl: project.instagramUrl,
      }
      setSelectedInstallationProject(installationProject)
      setIsInstallationModalOpen(true)
    } else if (project.category === "In Studio") {
      const studioProject = {
        id: project.id,
        title: project.title,
        year: project.year.toString(),
        category: project.category,
        medium: project.medium,
        description: project.description,
        detailedDescription: project.detailedDescription,
        image: project.image,
        tags: project.tags,
        photoCount: project.photoCount,
        images: project.images,
        videoUrl: project.videoUrl,
        client: project.client,
        position: project.position,
      }
      setSelectedStudioProject(studioProject)
      setIsStudioModalOpen(true)
    } else if (project.category === "Commissioned") {
      const commissionedProject = {
        id: project.id,
        title: project.title,
        year: project.year.toString(),
        category: project.category,
        medium: project.medium,
        description: project.description,
        detailedDescription: project.detailedDescription,
        image: project.image,
        videoUrl: project.videoUrl,
        duration: project.duration,
        client: project.client,
        position: project.position,
        tags: project.tags,
        photoCount: project.photoCount,
        images: project.images,
        type: project.type,
      }
      if (project.type === "film") {
        setSelectedFilmProject(commissionedProject)
        setIsFilmModalOpen(true)
      } else {
        setSelectedCommissionedProject(commissionedProject)
        setIsCommissionedModalOpen(true)
      }
    } else if (project.category === "Archive") {
      const archiveProject = {
        id: project.id,
        title: project.title,
        year: project.year.toString(),
        category: project.category,
        medium: project.medium,
        description: project.description,
        detailedDescription: project.detailedDescription,
        image: project.image,
        location: project.location,
        status: project.status,
        tags: project.tags,
        photoCount: project.photoCount,
        slidesLayout: project.slidesLayout,
        images: project.images,
        instagramUrl: project.instagramUrl,
      }
      setSelectedArchiveProject(archiveProject)
      setIsArchiveModalOpen(true)
    } else {
      const defaultProject = {
        id: project.id,
        title: project.title,
        year: project.year.toString(),
        category: project.category,
        medium: project.medium,
        description: project.description,
        detailedDescription: project.detailedDescription,
        image: project.image,
        tags: project.tags,
        photoCount: project.photoCount,
        images: project.images,
      }
      setSelectedInstallationProject(defaultProject)
      setIsInstallationModalOpen(true)
    }
  }

  const closeFilmModal = () => {
    setIsFilmModalOpen(false)
    setSelectedFilmProject(null)
  }

  const closeInstallationModal = () => {
    setIsInstallationModalOpen(false)
    setSelectedInstallationProject(null)
  }

  const closeStudioModal = () => {
    setIsStudioModalOpen(false)
    setSelectedStudioProject(null)
  }

  const closeCommissionedModal = () => {
    setIsCommissionedModalOpen(false)
    setSelectedCommissionedProject(null)
  }

  const closeArchiveModal = () => {
    setIsArchiveModalOpen(false)
    setSelectedArchiveProject(null)
  }

  return (
    <>
      <div className="w-full px-12 lg:px-0">
        {sortedYears.map((year, yearIndex) => (
          <div key={year} className="mb-24">
            <div className="flex items-center mb-8">
              <div className={`font-stardom text-xl ${isDark ? "text-white" : "text-black"} mr-6`}>{year}</div>
              <div className={`flex-1 h-px ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`}></div>
              <div className={`ml-6 font-times text-xs ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                {projectsByYear[year].length} Project{projectsByYear[year].length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  onClick={(e) => handleProjectClick(project, e)}
                >
                  <div
                    className={`rounded-lg overflow-hidden ${isDark ? "bg-neutral-800" : "bg-white"} shadow-lg hover:shadow-xl transition-shadow duration-300`}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={320}
                        height={240}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading={projectIndex < 4 ? "eager" : "lazy"}
                        quality={85}
                        decoding="async"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={`${getCategoryColor(project.category)} font-times text-xs`}>
                          {project.category}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="text-center space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          {project.category === "Films" ? (
                            <>
                              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                              </div>
                              <div className="text-white text-sm font-medium">Watch Film</div>
                            </>
                          ) : project.category === "Installation" ? (
                            <>
                              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <svg
                                  className="w-8 h-8 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                  />
                                </svg>
                              </div>
                              <div className="text-white text-sm font-medium">View Installation</div>
                            </>
                          ) : project.category === "In Studio" ? (
                            <>
                              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <svg
                                  className="w-8 h-8 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </div>
                              <div className="text-white text-sm font-medium">View Studio Work</div>
                            </>
                          ) : project.category === "Commissioned" ? (
                            <>
                              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                {project.type === "film" ? (
                                  <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                                ) : (
                                  <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8"
                                    />
                                  </svg>
                                )}
                              </div>
                              <div className="text-white text-sm font-medium">
                                {project.type === "film" ? "Watch Film" : "View Commission"}
                              </div>
                            </>
                          ) : project.category === "Archive" ? (
                            <>
                              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <svg
                                  className="w-8 h-8 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </div>
                              <div className="text-white text-sm font-medium">View Archive</div>
                            </>
                          ) : (
                            <>
                              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <svg
                                  className="w-8 h-8 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </div>
                              <div className="text-white text-sm font-medium">View Project</div>
                            </>
                          )}
                          <div className="w-8 h-px bg-white/50 mx-auto" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3
                        className={`text-lg font-stardom ${isDark ? "text-white" : "text-black"} mb-2 group-hover:text-opacity-80 transition-colors`}
                      >
                        {project.title}
                      </h3>
                      <p className={`text-sm font-times ${isDark ? "text-neutral-400" : "text-neutral-600"} mb-2`}>
                        {project.medium}
                      </p>
                      {project.position && (
                        <p
                          className={`text-sm font-times italic ${isDark ? "text-neutral-500" : "text-neutral-500"} mb-2`}
                        >
                          {project.position}
                        </p>
                      )}

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
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedFilmProject && (
        <FilmModal project={selectedFilmProject} isOpen={isFilmModalOpen} onClose={closeFilmModal} />
      )}

      {selectedInstallationProject && (
        <InstallationModal
          project={selectedInstallationProject}
          isOpen={isInstallationModalOpen}
          onClose={closeInstallationModal}
        />
      )}

      {selectedStudioProject && (
        <InstallationModal project={selectedStudioProject} isOpen={isStudioModalOpen} onClose={closeStudioModal} />
      )}

      {selectedCommissionedProject && (
        <InstallationModal
          project={selectedCommissionedProject}
          isOpen={isCommissionedModalOpen}
          onClose={closeCommissionedModal}
        />
      )}

      {selectedArchiveProject && (
        <InstallationModal project={selectedArchiveProject} isOpen={isArchiveModalOpen} onClose={closeArchiveModal} />
      )}
    </>
  )
}

export default ProjectTimeline
export { ProjectTimeline }
