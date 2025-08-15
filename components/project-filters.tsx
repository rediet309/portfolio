"use client"

interface ProjectFiltersProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  isDark: boolean
}

export function ProjectFilters({ activeFilter, onFilterChange, isDark }: ProjectFiltersProps) {
  const filters = ["All", "Films", "Textile", "Commissions"]

  return (
    
  )
}
