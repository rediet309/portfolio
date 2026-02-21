"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"

interface VerticalImageModalProps {
  images: string[]
  title: string
  isOpen: boolean
  onClose: () => void
}

export function VerticalImageModal({ images, title, isOpen, onClose }: VerticalImageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden relative">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-white">
          <h2 className="text-2xl font-stardom text-black">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
            <X className="h-5 w-5 text-black" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-neutral-50">
          <div className="space-y-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="w-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative w-full h-96 bg-neutral-100">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    quality={80}
                  />
                </div>
                <div className="p-4 bg-white">
                  <p className="text-sm text-neutral-600 font-medium">
                    Image {index + 1} of {images.length}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-neutral-200 bg-white">
          <p className="text-center text-sm text-neutral-500">
            {images.length} {images.length === 1 ? "image" : "images"} total
          </p>
        </div>
      </div>
    </div>
  )
}
