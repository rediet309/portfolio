"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, ArrowLeft, ChevronRight, ChevronLeft, Minus, Plus, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useCart } from "@/lib/cart-context"
import { PanelModal } from "@/components/panel-modal"

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
  stock: number
}

export default function ItemPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedPanel, setSelectedPanel] = useState<number>(1)
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0)
  const [selectedModalPanel, setSelectedModalPanel] = useState<Panel | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const { state, dispatch } = useCart()

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Mock item data - in a real app, this would come from an API
  const item = {
    id: Number.parseInt(params.id),
    title: "Ethereal Kimono",
    category: "kimono",
    price: "$280",
    image: "/placeholder.svg?height=780&width=439&text=Ethereal+Kimono",
    description:
      "A flowing kimono that transforms with interchangeable panels, each representing different cultural narratives and memories. This piece explores the intersection of traditional garment construction with contemporary storytelling through textile art.",
    available: true,
    videoUrl: "https://drive.google.com/file/d/1234567890abcdef/preview", // Google Drive video embed URL
  }

  // Enhanced panels data with fixed stock of 10 for all panels
  const panels: Panel[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Panel ${i + 1}`,
    image: `/placeholder.svg?height=1600&width=900&text=Panel+${i + 1}`,
    description: `Panel ${i + 1} represents a unique cultural narrative with intricate patterns.`,
    detailedDescription: `This exquisite panel showcases the masterful artistry of traditional textile work, featuring hand-woven patterns that tell stories of ancient trade routes and cultural exchange. Each thread is carefully selected and dyed using traditional methods passed down through generations. The intricate motifs represent elements of nature, spirituality, and human connection, creating a visual narrative that speaks to the universal human experience while honoring specific cultural traditions.`,
    available: true, // All panels are available
    price: `$${(Math.random() * 50 + 25).toFixed(0)}`,
    material: ["Silk", "Cotton", "Linen", "Hemp"][Math.floor(Math.random() * 4)],
    dimensions: '24" x 36"',
    origin: ["Addis Ababa, Ethiopia", "Adama, Ethiopia", "Mekele, Ethiopia", "Afar, Ethiopia"][
      Math.floor(Math.random() * 4)
    ],
    culturalSignificance: [
      "Represents the cycle of seasons and renewal",
      "Symbolizes protection and good fortune",
      "Depicts ancient trade route stories",
      "Celebrates harvest and abundance",
    ][Math.floor(Math.random() * 4)],
    artisan: ["Rediet Haddis", "Rediet", "Red", "Red Haddis"][Math.floor(Math.random() * 4)],
    stock: 10, // Fixed stock of 10 for all panels
  }))

  // Get current selected panel data
  const currentPanel = panels.find((panel) => panel.id === selectedPanel)
  const maxQuantity = 10 // Maximum quantity is always 10

  // Reset quantity when panel changes if it exceeds the max (which is always 10)
  useEffect(() => {
    if (quantity > maxQuantity) {
      setQuantity(maxQuantity)
    }
  }, [selectedPanel, quantity, maxQuantity])

  const addToCart = () => {
    if (currentPanel && quantity <= maxQuantity) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          category: item.category,
          selectedPanel,
          quantity,
        },
      })
    }
  }

  const handleQuantityIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1)
    }
  }

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const nextPanels = () => {
    const maxStartIndex = Math.max(0, panels.length - 5)
    setCurrentPanelIndex((prev) => Math.min(prev + 5, maxStartIndex))
  }

  const prevPanels = () => {
    setCurrentPanelIndex((prev) => Math.max(prev - 5, 0))
  }

  const openPanelModal = (panel: Panel) => {
    setSelectedModalPanel(panel)
    setIsModalOpen(true)
  }

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="w-full z-50 bg-white border-b border-neutral-200">
        <div className="w-full px-12 lg:px-20 flex justify-between items-center py-0">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <Image src="/images/logo.png" alt="Rediet Haddis" width={800} height={300} className="h-28 w-auto" />
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/shop"
              className="flex items-center space-x-2 text-sm text-neutral-600 hover:text-black"
              onClick={() => window.scrollTo(0, 0)}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Shop</span>
            </Link>

            <button
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="relative p-2 rounded-full text-neutral-600 hover:text-black"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center font-times bg-black text-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full px-12 lg:px-20 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Side - Image (Narrower) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Main Image - 9:16 Aspect Ratio */}
            <div
              className="bg-neutral-100 rounded-sm overflow-hidden mx-auto"
              style={{ width: "500px", height: "630px", maxHeight: "80vh" }}
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={500}
                height={630}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Product Details (Split into two columns) */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Product Info and Controls */}
              <div className="space-y-6">
                {/* Product Info */}
                <div>
                  <h1 className="text-3xl font-light leading-tight mb-2 text-black">{item.title}</h1>
                  <p className="font-medium text-black text-xl mb-3">{item.price}</p>
                  <p className="text-sm leading-relaxed text-neutral-600">{item.description}</p>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                  {/* Panel Selection and Quantity */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Panel (1-20)</label>
                      <Select
                        value={selectedPanel.toString()}
                        onValueChange={(value) => setSelectedPanel(Number.parseInt(value))}
                      >
                        <SelectTrigger className="w-full h-10 bg-white border-neutral-300 text-black">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-neutral-300">
                          {panels.map((panel) => (
                            <SelectItem
                              key={panel.id}
                              value={panel.id.toString()}
                              className="text-black hover:bg-neutral-100"
                            >
                              {panel.name} (10 available)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Quantity (10 available)</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleQuantityDecrease}
                          disabled={quantity <= 1}
                          className="w-10 h-10 rounded border border-neutral-300 text-black hover:bg-neutral-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-base font-medium text-black w-10 text-center">{quantity}</span>
                        <button
                          onClick={handleQuantityIncrease}
                          disabled={quantity >= maxQuantity}
                          className="w-10 h-10 rounded border border-neutral-300 text-black hover:bg-neutral-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      {quantity >= maxQuantity && (
                        <p className="text-xs text-amber-600 mt-1">Maximum quantity reached (10)</p>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <Button
                    onClick={addToCart}
                    disabled={!item.available || quantity > maxQuantity}
                    className="w-full h-12 text-sm rounded-full bg-black text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Right Column - About Interchangeable Panels */}
              <div className="p-6 rounded-lg bg-neutral-50">
                <h4 className="text-lg font-medium text-black mb-4">About Interchangeable Panels</h4>
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-neutral-600">
                    Each panel tells a unique story through traditional textile art. The panels can be easily swapped to
                    create different looks and meanings, making each kimono a personal narrative canvas.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="text-neutral-600">20 panels available</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="text-neutral-600">Easy attachment system</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="text-neutral-600">Handcrafted by skilled artisans</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="text-neutral-600">Cultural narratives in each design</span>
                    </div>
                  </div>
                  {/* Play Button */}
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="bg-black text-white px-6 py-2 rounded hover:bg-neutral-800 transition-colors self-start flex items-center gap-2 mt-4"
                  >
                    <Play className="h-4 w-4" />
                    <span>Play</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Panels Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-black">Available Panels</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={prevPanels}
                disabled={currentPanelIndex === 0}
                className="p-2 rounded border border-neutral-300 text-black hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-neutral-600 px-3">
                {Math.floor(currentPanelIndex / 5) + 1} / {Math.ceil(panels.length / 5)}
              </span>
              <button
                onClick={nextPanels}
                disabled={currentPanelIndex >= panels.length - 5}
                className="p-2 rounded border border-neutral-300 text-black hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {panels.slice(currentPanelIndex, currentPanelIndex + 5).map((panel) => (
              <div key={panel.id} onClick={() => openPanelModal(panel)} className="group cursor-pointer">
                <div className="bg-neutral-100 rounded overflow-hidden mb-2 relative" style={{ aspectRatio: "9/16" }}>
                  <Image
                    src={panel.image || "/placeholder.svg"}
                    alt={panel.name}
                    width={90}
                    height={160}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">10</div>
                </div>
                <p className="text-xs font-medium text-black group-hover:opacity-70 transition-opacity truncate text-center">
                  {panel.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Craftsmanship Details */}
        <div className="mt-16">
          <div className="p-8 rounded-lg bg-neutral-50">
            <h3 className="text-xl font-medium mb-6 text-black">Craftsmanship Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div>
                <p className="font-medium text-black mb-1">Construction</p>
                <p className="text-neutral-600">Hand-sewn with traditional Japanese techniques</p>
              </div>
              <div>
                <p className="font-medium text-black mb-1">Materials</p>
                <p className="text-neutral-600">Premium silk with cotton lining</p>
              </div>
              <div>
                <p className="font-medium text-black mb-1">Care Instructions</p>
                <p className="text-neutral-600">Dry clean only, store flat</p>
              </div>
              <div>
                <p className="font-medium text-black mb-1">Origin</p>
                <p className="text-neutral-600">Handcrafted in Kyoto, Japan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-md p-0 bg-black border-0">
          <div className="relative" style={{ aspectRatio: "9/16" }}>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <iframe
              src={item.videoUrl}
              className="w-full h-full rounded-lg"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Panel Change Demo Video"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Panel Modal */}
      {selectedModalPanel && (
        <PanelModal panel={selectedModalPanel} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
