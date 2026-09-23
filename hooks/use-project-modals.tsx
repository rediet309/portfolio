"use client"

import { useCallback, useState } from "react"
import { FilmModal } from "@/components/film-modal"
import { InstallationModal } from "@/components/installation-modal"
import { allProjectsData } from "@/lib/all-projects-data"
import {
  findProjectById,
  getProjectModalPayload,
  type FilmModalPayload,
  type InstallationModalPayload,
  type TimelineProject,
} from "@/lib/project-modal-payload"

export function useProjectModals(projects: TimelineProject[] = allProjectsData) {
  const [filmProject, setFilmProject] = useState<FilmModalPayload | null>(null)
  const [isFilmOpen, setIsFilmOpen] = useState(false)
  const [installationProject, setInstallationProject] = useState<InstallationModalPayload | null>(null)
  const [isInstallationOpen, setIsInstallationOpen] = useState(false)
  const [installationLeadingFilm, setInstallationLeadingFilm] = useState<FilmModalPayload | null>(null)

  const openProjectById = useCallback(
    (id: string) => {
      const project = findProjectById(projects, id)
      if (!project) return
      const payload = getProjectModalPayload(project)
      if (payload.kind === "film") {
        setInstallationLeadingFilm(null)
        setFilmProject(payload.project)
        setIsFilmOpen(true)
      } else {
        setInstallationLeadingFilm(null)
        setInstallationProject(payload.project)
        setIsInstallationOpen(true)
      }
    },
    [projects],
  )

  const closeFilmModal = useCallback(() => {
    setIsFilmOpen(false)
    setFilmProject(null)
  }, [])

  const closeInstallationModal = useCallback(() => {
    setIsInstallationOpen(false)
    setInstallationProject(null)
    setInstallationLeadingFilm(null)
  }, [])

  const openSkinsDireDawa = useCallback(() => {
    const film = findProjectById(projects, "skins-dire-dawa")
    const installation = findProjectById(projects, "skins-east-ethiopia")
    if (!film || !installation) return
    const filmPayload = getProjectModalPayload(film)
    const installPayload = getProjectModalPayload(installation)
    if (filmPayload.kind !== "film" || installPayload.kind !== "installation") return
    setInstallationLeadingFilm(filmPayload.project)
    setInstallationProject(installPayload.project)
    setIsInstallationOpen(true)
  }, [projects])

  const ProjectModals = (
    <>
      {filmProject && <FilmModal project={filmProject} isOpen={isFilmOpen} onClose={closeFilmModal} />}
      {installationProject && (
        <InstallationModal
          project={installationProject}
          isOpen={isInstallationOpen}
          onClose={closeInstallationModal}
          leadingFilm={installationLeadingFilm}
        />
      )}
    </>
  )

  return {
    openProjectById,
    openSkinsDireDawa,
    ProjectModals,
  }
}
