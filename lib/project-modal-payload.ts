export interface TimelineProject {
  id: string
  title: string
  year: number
  category: string
  medium: string
  description: string
  image: string
  featured?: boolean
  awards?: string[]
  visitors?: string
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

export type FilmModalPayload = {
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
  position?: string
}

export type InstallationModalPayload = {
  id: string
  title: string
  year: string
  category: string
  medium?: string
  description: string
  detailedDescription?: string
  image: string
  materials?: string[]
  dimensions?: string
  tags: string[]
  photoCount?: number
  slidesLayout?: number[]
  images?: string[]
  imageDescriptions?: string[]
  videoUrl?: string
  location?: string
  visitors?: number
  position?: string
  client?: string
  instagramUrl?: string
  status?: string
  type?: "film" | "photo"
}

export type ProjectModalPayload =
  | { kind: "film"; project: FilmModalPayload }
  | { kind: "installation"; project: InstallationModalPayload }

export function getProjectModalPayload(project: TimelineProject): ProjectModalPayload {
  if (project.category === "Films") {
    return {
      kind: "film",
      project: {
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
        position: project.position,
      },
    }
  }

  if (project.category === "Installation") {
    return {
      kind: "installation",
      project: {
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
      },
    }
  }

  if (project.category === "In Studio") {
    return {
      kind: "installation",
      project: {
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
      },
    }
  }

  if (project.category === "Commissioned") {
    const base = {
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
      return { kind: "film", project: base }
    }
    return { kind: "installation", project: base }
  }

  if (project.category === "Archive") {
    return {
      kind: "installation",
      project: {
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
      },
    }
  }

  return {
    kind: "installation",
    project: {
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
    },
  }
}

export function findProjectById(projects: TimelineProject[], id: string): TimelineProject | undefined {
  return projects.find((p) => p.id === id)
}
