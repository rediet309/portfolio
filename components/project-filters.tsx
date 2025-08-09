"use client"

interface ProjectFiltersProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  isDark: boolean
}

export function ProjectFilters({ activeFilter, onFilterChange, isDark }: ProjectFiltersProps) {
  const filters = ["All", "Films", "Textile", "Commissions"]

  return (
    <div className="flex justify-center">
      <div className={`inline-flex rounded-full p-1 ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-6 py-2 rounded-full text-sm font-times transition-all duration-300 ${
              activeFilter === filter
                ? `${isDark ? "bg-white text-black" : "bg-black text-white"} shadow-sm`
                : `${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"}`
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  )
}
