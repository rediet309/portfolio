"use client"

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { X, CheckCircle, XCircle, MapPin, User, Palette, Ruler, Package, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

interface GalleryItem {
  id: number
  name: string
  image: string
  description?: string
  detailedDescription?: string
  available?: boolean
  price?: string
  material?: string
  dimensions?: string
  origin?: string
  culturalSignificance?: string
  artisan?: string
}

interface PanelModalProps {
  items: GalleryItem[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
  onSelect?: (id: number) => void
  showDetails?: boolean
}

export function PanelModal({
  items,
  initialIndex = 0,
  isOpen,
  onClose,
  onSelect,
  showDetails = true,
}: PanelModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
    }
  }, [isOpen, initialIndex])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1))
  }, [items.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0))
  }, [items.length])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, goToPrevious, goToNext])

  if (!items.length) return null

  const panel = items[currentIndex]
  if (!panel) return null

  const handleNavigate = (index: number) => {
    setCurrentIndex(index)
    onSelect?.(items[index].id)
  }

  const hasDetails = showDetails && panel.description

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl w-[95vw] max-h-[90vh] p-0 gap-0 bg-background border-border overflow-hidden"
        aria-describedby={panel.description ? "panel-description" : undefined}
      >
        <DialogTitle className="sr-only">{panel.name}</DialogTitle>
        {panel.description && (
          <DialogDescription id="panel-description" className="sr-only">
            {panel.description}
          </DialogDescription>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/90 backdrop-blur-md hover:bg-background transition-all duration-200 shadow-lg border border-border/50"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-y-auto h-full">
          <div className="flex flex-col items-center justify-start p-6 md:p-8 lg:p-12 space-y-6">
            <div className="w-full max-w-2xl space-y-4">
              {/* Main image with side navigation */}
              <div className="relative w-full">
                {items.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 p-2 rounded-full bg-background/90 backdrop-blur-md hover:bg-background transition-all shadow-lg border border-border/50"
                      aria-label="Previous panel"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 p-2 rounded-full bg-background/90 backdrop-blur-md hover:bg-background transition-all shadow-lg border border-border/50"
                      aria-label="Next panel"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                <div className="relative w-full min-h-[300px] max-h-[65vh] bg-muted/20 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl ring-1 ring-border/50 flex items-center justify-center p-4">
                  <Image
                    src={panel.image || "/placeholder.svg"}
                    alt={panel.name}
                    width={800}
                    height={800}
                    className="max-w-full max-h-[60vh] w-auto h-auto object-contain"
                    sizes="(max-width: 768px) 95vw, 672px"
                    priority
                  />
                </div>

                {items.length > 1 && (
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    {currentIndex + 1} of {items.length}
                  </p>
                )}
              </div>

              {/* Thumbnail strip */}
              {items.length > 1 && (
                <div
                  className={`flex gap-3 overflow-x-auto pb-2 scrollbar-thin w-full ${!showDetails ? "justify-center" : ""}`}
                >
                  {items.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(index)}
                      className={`shrink-0 relative rounded-lg overflow-hidden transition-all bg-muted/30 ${
                        !showDetails ? "w-32 h-20" : "w-16 h-16"
                      } ${
                        currentIndex === index
                          ? "ring-2 ring-primary shadow-md"
                          : "ring-1 ring-border hover:ring-primary/50 opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`View ${item.name}`}
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes={!showDetails ? "128px" : "64px"}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {hasDetails ? (
              <div className="w-full max-w-2xl space-y-6 text-center">
                <div className="space-y-3">
                  <div className="flex flex-col items-center gap-3">
                    <h2 className="text-2xl md:text-3xl font-stardom text-foreground leading-tight">{panel.name}</h2>
                    {panel.available !== undefined && (
                      <Badge variant={panel.available ? "default" : "destructive"} className="shrink-0">
                        {panel.available ? "Available" : "Sold Out"}
                      </Badge>
                    )}
                  </div>
                  {panel.price && <div className="text-3xl font-semibold text-foreground">{panel.price}</div>}
                </div>

                {panel.available !== undefined && (
                  <div
                    className={`flex items-start gap-3 p-4 rounded-lg text-left ${
                      panel.available
                        ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900"
                        : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900"
                    }`}
                  >
                    {panel.available ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <p className="font-medium text-sm">
                        {panel.available ? "In Stock & Ready to Ship" : "Currently Unavailable"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {panel.available ? "Ships within 2-3 business days" : "Expected back in stock in 2-4 weeks"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Description</h3>
                  <p className="text-foreground leading-relaxed text-center">{panel.description}</p>
                  {panel.detailedDescription && (
                    <p className="text-sm text-muted-foreground leading-relaxed text-center">
                      {panel.detailedDescription}
                    </p>
                  )}
                </div>

                {panel.material && (
                  <div className="space-y-3 pt-4 border-t border-border">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Specifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 text-left">
                        <Palette className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-muted-foreground">Material</p>
                          <p className="text-sm text-foreground">{panel.material}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 text-left">
                        <Ruler className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-muted-foreground">Dimensions</p>
                          <p className="text-sm text-foreground">{panel.dimensions}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 text-left">
                        <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-muted-foreground">Origin</p>
                          <p className="text-sm text-foreground">{panel.origin}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 text-left">
                        <User className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-muted-foreground">Artisan</p>
                          <p className="text-sm text-foreground">{panel.artisan}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {panel.culturalSignificance && (
                  <div className="space-y-3 pt-4 border-t border-border">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Cultural Significance
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-center">
                      {panel.culturalSignificance}
                    </p>
                  </div>
                )}

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center justify-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Care Instructions
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground text-left max-w-md mx-auto">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Hand wash in cold water with mild detergent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Lay flat to dry away from direct sunlight</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Iron on low heat if needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Store in a cool, dry place</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-center gap-4 pt-4 border-t border-border text-xs text-muted-foreground">
                  <span>Panel #{panel.id.toString().padStart(3, "0")}</span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Handcrafted • Limited Edition
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-lg font-medium text-foreground">{panel.name}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
