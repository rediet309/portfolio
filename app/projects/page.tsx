"use client"

import { useState, Suspense } from "react"
import { Navigation } from "@/components/navigation"
import ProjectTimeline from "@/components/project-timeline"
import { allProjectsData } from "@/lib/all-projects-data"

export default function AllProjectsPage() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects" />

      <div className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
        {/* Header */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mb-12 sm:mb-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-stardom text-black mb-4 sm:mb-6 pt-4 sm:pt-7 leading-tight">
              All Projects
            </h1>
          </div>
        </div>

        {/* Projects Timeline */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <Suspense fallback={null}>
            <ProjectTimeline projects={allProjectsData} isDark={isDark} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
