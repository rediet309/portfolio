"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { X, CheckCircle, XCircle, MapPin, User, Palette, Ruler, Package } from "lucide-react"
import { useState } from "react"

interface Panel {
  id: number
  name: string
  image: string
  description: string
  detailedDescription: string
  available: boolean
  price: string
  material: string
  dimensions: string
  origin: string
  culturalSignificance: string
  artisan: string
}

interface PanelModalProps {
  panel: Panel | null
  isOpen: boolean
  onClose: () => void
}

export function PanelModal({ panel, isOpen, onClose }: PanelModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!panel) return null

  const detailImages = [
    panel.image,
    `/ceholder-svg-key-n4dlo.jpg`,
    `/ceholder-svg-key-q93x7.jpg`,
    `/ceholder-svg-key-1gx1m.jpg`,
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl w-[95vw] max-h-[90vh] p-0 gap-0 bg-background border-border overflow-hidden"
        aria-describedby="panel-description"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/90 backdrop-blur-md hover:bg-background transition-all duration-200 shadow-lg border border-border/50"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-y-auto h-full">
          <div className="flex flex-col items-center justify-start p-6 md:p-8 lg:p-12 space-y-8">
            <div className="w-full max-w-md space-y-4">
              <div className="relative w-full">
                {/* Blurred background layer */}
                <div className="absolute inset-0 -z-10 scale-105 blur-2xl opacity-30">
                  <Image
                    src={detailImages[selectedImage] || "/placeholder.svg"}
                    alt=""
                    fill
                    className="object-cover"
                    aria-hidden="true"
                  />
                </div>

                {/* Main image container with subtle backdrop blur */}
                <div className="relative w-full aspect-[9/16] bg-muted/20 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl ring-1 ring-border/50">
                  <Image
                    src={detailImages[selectedImage] || "/placeholder.svg"}
                    alt={`${panel.name} - View ${selectedImage + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 95vw, 448px"
                    priority
                  />
                </div>
              </div>

              {/* Thumbnail gallery - centered */}
              <div className="grid grid-cols-4 gap-3 w-full">
                {detailImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square relative rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? "ring-2 ring-primary shadow-md scale-105"
                        : "ring-1 ring-border hover:ring-primary/50 hover:scale-102"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${panel.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full max-w-2xl space-y-6 text-center">
              {/* Title and availability */}
              <div className="space-y-3">
                <div className="flex flex-col items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-stardom text-foreground leading-tight">{panel.name}</h2>
                  <Badge variant={panel.available ? "default" : "destructive"} className="shrink-0">
                    {panel.available ? "Available" : "Sold Out"}
                  </Badge>
                </div>
                <div className="text-3xl font-semibold text-foreground">{panel.price}</div>
              </div>

              {/* Availability status */}
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

              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Description</h3>
                <p className="text-foreground leading-relaxed text-center">{panel.description}</p>
                {panel.detailedDescription && (
                  <p className="text-sm text-muted-foreground leading-relaxed text-center">
                    {panel.detailedDescription}
                  </p>
                )}
              </div>

              {/* Specifications grid */}
              <div className="space-y-3 pt-4 border-t border-border">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Specifications</h3>
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

              {/* Cultural significance */}
              <div className="space-y-3 pt-4 border-t border-border">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Cultural Significance
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  {panel.culturalSignificance}
                </p>
              </div>

              {/* Care instructions */}
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

              {/* Footer */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-border text-xs text-muted-foreground">
                <span>Panel #{panel.id.toString().padStart(3, "0")}</span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Handcrafted • Limited Edition
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
