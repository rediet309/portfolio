"use client"

import { useState, useEffect, use } from "react"
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

export default function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // unwrap the params promise
  const { id } = use(params)

  const [quantity, setQuantity] = useState(1)
  const [selectedPanel, setSelectedPanel] = useState<number>(1)
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0)
  const [selectedModalPanel, setSelectedModalPanel] = useState<Panel | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string>("charcoal")
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string>("")
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const { state, dispatch } = useCart()


  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getItemData = (id: number) => {
    const items = {
      1: {
        id: 1,
        title: "sKINs: Dire Dawa Textile Installation",
        category: "textile-art",
        price: "Email for Price",
        image: "/images/01_front.webp",
        description:
          "A large-scale textile installation exploring cultural narratives through traditional and contemporary techniques. This immersive piece transforms space through layered textile elements, weaving together stories of heritage, migration, and identity. The installation features hand-woven textiles, natural dyes, and traditional Ethiopian patterns that create a dialogue between past and present.",
        available: true,
        isEmailPrice: false,
        videoUrl: null,
        panelCount: 0,
        hasGallery: true,
        galleryImages: [
          "/images/01_front.webp",
          "/images/02_left.webp",
          "/images/03_back.webp",
          "/images/04_right.webp",
        ],
        imageDescriptions: [
          {
            title: "Front Side",
            content: [
              "Suspended tent structure incapsulating the sKins film screening within/, hand dyed and embroidered textile mixed with traditional garment fabrics of Dire Dawa, 2025",
            ],
          },
          {
            title: "Left Side",
            content: [
              "Hand printed yellow floral textile with cutouts, and embroidery mixed with traditional garment fabrics of Dire Dawa, 2025.",
            ],
          },
          {
            title: "Back Side",
            content: [
              "Black tea dyed textile with hand embroidery, Image of artists’ mother form 80's, henna paste hand painted decorative art, 2025.",
            ],
          },
          {
            title: "Right side",
            content: [
              "Black textile, silver string textile knotted, love letter of the artists’ parents from the 80's encapsulated, 2025",
            ],
          },
        ],
        detailedDescription:
          "This monumental textile installation draws inspiration from the ancient trading city of Dire Dawa, a crossroads of cultures and commerce in Ethiopia. The piece incorporates traditional weaving techniques passed down through generations, using locally sourced materials and natural dyes. Each section of the installation represents different aspects of the city's rich cultural tapestry - from the bustling markets to the quiet residential quarters where families have lived for centuries. The work invites viewers to walk through and experience the textures, colors, and stories embedded in each carefully crafted textile panel.",
      },
      2: {
        id: 2,
        title: "Cargo Jacket",
        category: "clothing",
        price: "$230",
        image: "/images/1.webp",
        description:
          "Cargo jacket featuring interchangeable back panels. Each panel tells a different cultural story, allowing for personal expression and narrative customization. The jacket combines utilitarian design with artistic storytelling, creating a versatile piece that adapts to your personal narrative.",
        available: true,
        isEmailPrice: false,
        videoUrl: "https://drive.google.com/file/d/1234567890abcdef/preview",
        panelCount: 20,
      },
      3: {
        id: 3,
        title: "Haori Jacket",
        category: "clothing",
        price: "$290 ",
        image: "/images/Swapable.webp",
        description:
          "Traditional Japanese-inspired kimono with Ethiopian textile influences. Features removable and swappable panels for endless styling possibilities. This fusion piece bridges cultures through textile art, offering a unique blend of Eastern and African design philosophies.",
        available: true,
        isEmailPrice: false,
        videoUrl: "https://drive.google.com/file/d/1234567890abcdef/preview",
        panelCount: 20,
      },
      4: {
        id: 4,
        title: "Cargo Pants",
        category: "clothing",
        price: "$110",
        image: "/images/a3-9.webp",
        description:
          "Utility-focused cargo pants with modular panel system. These versatile pants feature interchangeable panels that allow you to customize your look while maintaining maximum functionality. Each panel represents different cultural narratives and can be easily swapped to create unique combinations that reflect your personal style and story.",
        available: true,
        isEmailPrice: false,
        videoUrl: "https://drive.google.com/file/d/1234567890abcdef/preview",
        panelCount: 10,
      },
      5: {
        id: 5,
        title: "sKINs Pack",
        category: "clothing",
        price: "$70",
        image: "/images/red-skins-all_01.webp",
        description:
          "Versatile collection including tops, durags, neck gaiters, and sleeve/leg extensions. Each piece designed for layering and personal expression. The collection celebrates the concept of 'second skin' - garments that become extensions of your identity and cultural expression.",
        available: true,
        isEmailPrice: false,
        videoUrl: null,
        panelCount: 0,
        hasVariants: true,
      },
      6: {
        id: 6,
        title: "Sheret Shirts",
        category: "clothing",
        price: "$70",
        image: "/images/Sheret 09.webp",
        description:
          "Innovative reversible clothing line featuring short sleeve shirts, full suits, and coats. Each piece offers two distinct looks in one garment.",
        available: true,
        isEmailPrice: false,
        videoUrl: "https://drive.google.com/file/d/1234567890abcdef/preview",
        panelCount: 0,
        hasColorOptions: true,
      },
      7: {
        id: 7,
        title: "Angel Eyes",
        category: "clothing",
        price: "Sold Out",
        image: "/placeholder.svg",
        description:
          "Artisanal jackets and vests featuring hand-painted designs and intricate embroidery. Each piece is unique and tells its own visual story. The Angel Eyes collection represents the intersection of fashion and fine art, with each garment serving as a wearable canvas for cultural expression.",
        available: false,
        isEmailPrice: false,
        videoUrl: null,
        panelCount: 0,
        isUnique: true,
      },
      8: {
        id: 8,
        title: "Hulet Neteb Jackets",
        category: "clothing",
        price: "Sold Out",
        image: "/images/01_ The four elements-a.jpg",
        description:
          "Limited capsule collection of structured jackets combining traditional Ethiopian motifs with contemporary tailoring techniques. 'Hulet Neteb' translates to 'two breaths' - representing the balance between heritage and innovation in each carefully crafted piece.",
        available: false,
        isEmailPrice: false,
        videoUrl: null,
        panelCount: 0,
        isLimited: true,
      },
      9: {
        id: 9,
        title: "Ethiopia Posters and Postcards",
        category: "posters",
        price: "Coming Soon",
        image: "/images/coming-soon.jpg",
        description:
          "Beautiful collection of posters and postcards celebrating Ethiopian culture, landscapes, and traditions. Perfect for home decoration or sharing with friends. Each piece captures the essence of Ethiopia's rich cultural heritage through contemporary artistic interpretation.",
        available: false,
        isEmailPrice: false,
        videoUrl: null,
        panelCount: 0,
        hasVariants: true,
      },
      10: {
        id: 10,
        title: "Red Sticker Set",
        category: "posters",
        price: "$Coming Soon",
        image: "/images/coming-soon.jpg",
        description:
          "Curated set of red-themed stickers featuring cultural symbols, patterns, and artistic elements. High-quality vinyl stickers perfect for personalizing your belongings. Each sticker in the set represents different aspects of Ethiopian culture and contemporary design.",
        available: false,
        isEmailPrice: false,
        videoUrl: null,
        panelCount: 0,
      },
    }
    return items[id as keyof typeof items] || items[4] // Default to cargo pants
  }

  const item = getItemData(Number.parseInt(id))

  useEffect(() => {
    setSelectedGalleryImage(item.image)
  }, [item.image])

  const colorOptions = [
    {
      id: "sage",
      name: "Sage Green",
      hex: "#253B3A",
      image: "/images/Sheret 01.webp",
    },
    {
      id: "Yellow Gold",
      name: "Yellow Gold",
      hex: "#F8DF8E",
      image: "/images/Sheret 05.webp",
    },
    {
      id: "terracotta",
      name: "Terracotta Earth",
      hex: "#B85450",
      image: "/images/Sheret 11.webp",
    },
  ]

  const panels: Panel[] = Array.from({ length: item.panelCount }, (_, i) => {
    const panelNumber = i + 1
    let imageUrl = ""
    const panelDescription = "hand embroidered one of a kind back panel."
    const detailedDescription = ""

    const unavailablePanelsHaori = [1, 2, 3, 4, 8, 9, 10, 11, 12, 14, 15]
    const unavailablePanelsCargo = [1, 2, 3, 4, 8, 9, 10, 11, 12, 14, 15]
    const unavailablePanelsPants = [1, 2, 3, 4, 8, 9, 10]

    let isUnavailable = false
    if (item.id === 3) {
      isUnavailable = unavailablePanelsHaori.includes(panelNumber)
    } else if (item.id === 2) {
      isUnavailable = unavailablePanelsCargo.includes(panelNumber)
    } else if (item.id === 4) {
      isUnavailable = unavailablePanelsPants.includes(panelNumber)
    }

    if (item.id === 2) {
      const cargoJacketImages = [
        "/images/01.webp",
        "/images/02.webp",
        "/images/03.webp",
        "/images/04.webp",
        "/images/05.webp",
        "/images/06.webp",
        "/images/07.webp",
        "/images/08.webp",
        "/images/09.webp",
        "/images/10.webp",
        "/images/11.webp",
        "/images/12.webp",
        "/images/13.webp",
        "/images/14.webp",
        "/images/15.webp",
        "/images/16.webp",
        "/images/17.webp",
        "/images/18.webp",
        "/images/19.webp",
        "/images/20.webp",
      ]
      imageUrl = cargoJacketImages[i] || cargoJacketImages[0]
    } else if (item.id === 3) {
      const haoriKimonoImages = [
        "/images/01.webp",
        "/images/02.webp",
        "/images/03.webp",
        "/images/04.webp",
        "/images/05.webp",
        "/images/06.webp",
        "/images/07.webp",
        "/images/08.webp",
        "/images/09.webp",
        "/images/10.webp",
        "/images/11.webp",
        "/images/12.webp",
        "/images/13.webp",
        "/images/14.webp",
        "/images/15.webp",
        "/images/16.webp",
        "/images/17.webp",
        "/images/18.webp",
        "/images/19.webp",
        "/images/20.webp",
      ]
      imageUrl = haoriKimonoImages[i] || haoriKimonoImages[0]
    } else if (item.id === 4) {
      const cargoPantsImages = [
        "/images/01.webp",
        "/images/02.webp",
        "/images/03.webp",
        "/images/04.webp",
        "/images/05.webp",
        "/images/06.webp",
        "/images/07.webp",
        "/images/08.webp",
        "/images/09.webp",
        "/images/10.webp",
      ]
      imageUrl = cargoPantsImages[i] || cargoPantsImages[0]
    } else {
      imageUrl = `/placeholder.svg?height=1600&width=900&query=panel design ${panelNumber}`
    }

    return {
      id: panelNumber,
      name: `Panel ${panelNumber}`,
      image: imageUrl,
      description: panelDescription,
      detailedDescription,
      available: !isUnavailable,
      price: `$${(Math.random() * 30 + 15).toFixed(0)}`,
      material: ["Canvas", "Cotton Twill", "Ripstop", "Denim"][Math.floor(Math.random() * 4)],
      dimensions: '8" x 12"',
      origin: ["Addis Ababa, Ethiopia", "Adama, Ethiopia", "Mekele, Ethiopia", "Afar, Ethiopia"][
        Math.floor(Math.random() * 4)
      ],
      culturalSignificance: [
        "Represents strength and endurance in daily life",
        "Symbolizes community support and unity",
        "Depicts stories of urban resilience",
        "Celebrates functional beauty in design",
      ][Math.floor(Math.random() * 4)],
      artisan: ["Rediet Haddis", "Rediet", "Red", "Red Haddis"][Math.floor(Math.random() * 4)],
      stock: 10,
    }
  }).filter((panel) => panel.available) // Only include available panels

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
    if (item.hasColorOptions) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: item.id,
          title: item.title,
          price: item.price,
          image: colorOptions.find((color) => color.id === selectedColor)?.image || item.image,
          category: item.category,
          selectedColor,
          quantity,
        },
      })
    } else if (currentPanel && quantity <= maxQuantity) {
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
    } else {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          category: item.category,
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

  const currentColorOption = colorOptions.find((color) => color.id === selectedColor)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="w-full z-50 bg-white border-b border-neutral-200">
        <div className="w-full px-12 lg:px-20 flex justify-between items-center py-0">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <Image src="/images/logo.webp" alt="Rediet Haddis" width={800} height={300} className="h-16 w-auto" priority quality={85} />
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
        {item.hasGallery ? (
          <div className="grid grid-cols-12 gap-3">
            {/* Left Side - Gallery Images */}
            <div className="col-span-12 lg:col-span-1 space-y-3">
              <div className="flex flex-row lg:flex-col gap-3">
                {item.galleryImages?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedGalleryImage(image)
                      setSelectedImageIndex(index)
                    }}
                    className={`cursor-pointer transition-all duration-200 rounded-sm overflow-hidden ${
                      selectedGalleryImage === image ? "ring-2 ring-black" : ""
                    }`}
                    style={{ width: "5rem", height: "6.25rem" }}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${item.title} detail ${index + 1}`}
                      width={80}
                      height={100}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      quality={75}
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Center - Main Image */}
            <div className="col-span-12 lg:col-span-4 space-y-6 w-full max-w-[31.25rem]">
              <div className="bg-neutral-100 rounded-sm overflow-hidden w-full max-w-[31.25rem] mx-auto aspect-[9/16] h-[60vh] relative">
                <Image
                  src={selectedGalleryImage || item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                  quality={85}
                  priority
                />
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="col-span-12 lg:col-span-7">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-100 w-auto">
                {/* Left Column - Product Info */}
                <div className="space-y-6">
                  {/* Product Info */}
                  <div>
                    <h1 className="text-3xl font-light leading-tight mb-2 text-black">{item.title}</h1>
                    <p className="font-medium text-black text-xl mb-4">{item.price}</p>
                    <p className="text-sm leading-relaxed text-neutral-600 mb-6 text-justify">{item.description}</p>
                  </div>

                  {/* Quantity and Add to Cart */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Quantity</label>
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
                    </div>

                    <Button
                      onClick={addToCart}
                      disabled={!item.available}
                      className="w-full h-12 text-sm rounded-full bg-black text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>

                {/* Right Column - About This Textile Installation */}
                <div className="p-6 rounded-lg bg-neutral-50">
                  <div>
                    <h4 className="text-lg font-medium text-black mb-4">About This Textile Installation</h4>
                    <div className="space-y-4 text-sm text-neutral-600 transition-opacity duration-300">
                      {item.imageDescriptions && item.imageDescriptions[selectedImageIndex] ? (
                        <>
                          <h5 className="text-base font-medium text-black">
                            {item.imageDescriptions[selectedImageIndex].title}
                          </h5>
                          {item.imageDescriptions[selectedImageIndex].content.map((paragraph, idx) => (
                            <p key={idx} className="leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </>
                      ) : (
                        <>
                          <p>
                            This textile installation represents a contemporary interpretation of traditional Ethiopian
                            weaving techniques, specifically drawing from the rich textile heritage of Dire Dawa.
                          </p>
                          <p className="leading-relaxed">
                            The piece explores themes of cultural identity, migration, and the intersection of
                            traditional craftsmanship with modern artistic expression.
                          </p>
                          <p>
                            Each element has been carefully considered to create a dialogue between past and present,
                            honoring ancestral knowledge while pushing creative boundaries.
                          </p>
                        </>
                      )}
                  </div>
                </div>
              </div>

              {/* Panels Grid - 5 columns spanning full width */}
              {item.panelCount > 0 && (
                <div className="mt-8 -mx-8 px-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-black">Available Panels</h3>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={prevPanels}
                        disabled={currentPanelIndex === 0}
                        className="p-2 rounded border border-neutral-300 text-black hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-neutral-600 px-3 min-w-fit">
                        {Math.floor(currentPanelIndex / 5) + 1} / {Math.ceil(panels.length / 5)}
                      </span>
                      <button
                        onClick={nextPanels}
                        disabled={currentPanelIndex >= panels.length - 5}
                        className="p-2 rounded border border-neutral-300 text-black hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-3">
                    {panels.slice(currentPanelIndex, currentPanelIndex + 5).map((panel) => (
                      <div
                        key={panel.id}
                        onClick={() => panel.available && openPanelModal(panel)}
                        className="group cursor-pointer"
                      >
                        <div
                          className={`bg-neutral-100 rounded overflow-hidden mb-2 relative ${!panel.available ? "opacity-50" : "hover:opacity-80 transition-opacity"}`}
                          style={{ aspectRatio: "9/16" }}
                        >
                          <Image
                            src={panel.image || "/placeholder.svg"}
                            alt={panel.name}
                            width={100}
                            height={160}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            quality={75}
                            sizes="120px"
                          />
                          {!panel.available && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
                              <span className="text-white text-xs font-medium">Sold Out</span>
                            </div>
                          )}
                        </div>
                        <p className={`text-xs font-medium text-center truncate ${!panel.available ? "text-neutral-400" : "text-black"}`}>
                          {panel.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-8">
            {/* Left Side - Image and Panels */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-neutral-100 rounded-sm overflow-hidden w-full max-w-[31.25rem] mx-auto aspect-[3/4] h-[80vh] flex items-center justify-center px-0 relative">
                <Image
                  src={
                    item.hasColorOptions && currentColorOption
                      ? currentColorOption.image
                      : item.image || "/placeholder.svg"
                  }
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 500px"
                  quality={85}
                  priority
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

                  {item.hasColorOptions && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-lg font-semibold text-black mb-4">Choose Your Color</label>
                        <div className="flex gap-4">
                          {colorOptions.map((color) => (
                            <button
                              key={color.id}
                              onClick={() => setSelectedColor(color.id)}
                              className={`group relative w-16 h-16 rounded-xl border-3 transition-all duration-300 shadow-lg ${
                                selectedColor === color.id ? "border-black scale-105 shadow-2xl" : "border-neutral-200"
                              }`}
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            >
                              {selectedColor === color.id && (
                                <div className="absolute inset-2 rounded-lg border-2 border-white opacity-90"></div>
                              )}
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {selectedColor === color.id && (
                                  <div className="w-full h-full bg-green-500 rounded-full scale-75"></div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="mt-4 p-3 bg-neutral-50 rounded-lg border">
                          <p className="text-sm font-medium text-neutral-800">
                            Selected Color:{" "}
                            <span className="text-black">{colorOptions.find((c) => c.id === selectedColor)?.name}</span>
                          </p>
                          <p className="text-xs text-neutral-600 mt-1">
                            Each piece is handcrafted with premium materials in this exclusive colorway
                          </p>
                        </div>
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

                      {/* Add to Cart */}
                      <Button
                        onClick={addToCart}
                        disabled={!item.available || quantity > maxQuantity}
                        className="w-full h-12 text-sm rounded-full bg-black text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  )}

                  {/* Controls - Only show for items with panels */}
                  {item.panelCount > 0 && (
                    <div className="space-y-4">
                      {/* Panel Selection and Quantity */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">
                            Panel (1-{item.panelCount})
                          </label>
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
                                  disabled={!panel.available}
                                >
                                  {panel.name}
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
                        disabled={!item.available || quantity > maxQuantity || !currentPanel?.available}
                        className="w-full h-12 text-sm rounded-full bg-black text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {currentPanel && !currentPanel.available ? "Sold Out" : "Add to Cart"}
                      </Button>
                    </div>
                  )}

                  {!item.hasColorOptions && item.panelCount === 0 && !item.isEmailPrice && (
                    <div className="space-y-4">
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

                      {/* Add to Cart */}
                      <Button
                        onClick={addToCart}
                        disabled={!item.available || quantity > maxQuantity}
                        className="w-full h-12 text-sm rounded-full bg-black text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  )}

                  {/* Email for Price Button - Only for items with email pricing */}
                  {item.isEmailPrice && (
                    <Button
                      onClick={() =>
                        (window.location.href = "mailto:info@rediethaddis.com?subject=Inquiry about " + item.title)
                      }
                      className="w-full h-12 text-sm rounded-full bg-black text-white hover:bg-neutral-800"
                    >
                      Email for Price
                    </Button>
                  )}
                </div>

                {/* Right Column - About Interchangeable Panels */}
                <div className="p-6 rounded-lg bg-neutral-50">
                  <h4 className="text-lg font-medium text-black mb-4">
                    {item.id === 2
                      ? "About Interchangeable Back Panels"
                      : item.id === 3
                        ? "About Removable and Swappable Panels"
                        : item.id === 4
                          ? "About Interchangeable Panels"
                          : item.id === 5
                            ? "About sKINs Collection"
                            : item.id === 6
                              ? "About Reversible Design"
                              : item.id === 7
                                ? "About Angel Eyes Collection"
                                : item.id === 8
                                  ? "About Hulet Neteb Jackets"
                                  : item.id === 9
                                    ? "About Ethiopia Posters and Postcards"
                                    : "Product Details"}
                  </h4>
                  <div className="space-y-4">
                    {item.id === 2 ? (
                      <>
                        <p className="text-sm leading-relaxed text-neutral-600">
                          These cargo jackets feature a revolutionary modular back panel system that combines utility
                          with personal expression. Each panel is designed with functional pockets and cultural
                          storytelling elements, allowing you to customize both the aesthetic and practical aspects of
                          your jacket.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">20 unique back panels available</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Durable attachment system</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Functional cargo pockets</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Cultural narratives in each design</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Weather-resistant materials</span>
                          </div>
                        </div>
                      </>
                    ) : item.id === 3 ? (
                      <>
                        <p className="text-sm leading-relaxed text-neutral-600">
                          The Haori Kimono represents a unique fusion of traditional Japanese design with Ethiopian
                          textile influences. Features removable and swappable panels for endless styling possibilities.
                          This piece bridges cultures through textile art, offering a unique blend of Eastern and
                          African design philosophies.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Removable and swappable panels</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Two distinct looks in one garment</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Premium fabric construction</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Available in 3 colorways</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Sustainable design philosophy</span>
                          </div>
                        </div>
                      </>
                    ) : item.id === 4 ? (
                      <>
                        <p className="text-sm leading-relaxed text-neutral-600">
                          This cargo pants feature a revolutionary modular panel system that combines utility with
                          personal expression. Each panel is designed with functional pockets and cultural storytelling
                          elements, allowing you to customize both the aesthetic and practical aspects of your pants.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">10 unique panels available</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Durable attachment system</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Functional cargo pockets</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Cultural narratives in each design</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Weather-resistant materials</span>
                          </div>
                        </div>
                      </>
                    ) : item.id === 5 ? (
                      <>
                        <p className="text-sm leading-relaxed text-neutral-600">
                          The sKINs Collection celebrates the concept of 'second skin' - garments that become extensions
                          of your identity and cultural expression. Versatile collection including tops, durags, neck
                          gaiters, and sleeve/leg extensions. Each piece designed for layering and personal expression.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">
                              Versatile collection of tops, durags, neck gaiters, and sleeve/leg extensions
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Designed for layering</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Available in multiple variants</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Celebrates the concept of 'second skin'</span>
                          </div>
                        </div>
                      </>
                    ) : item.id === 6 ? (
                      <>
                        <p className="text-sm leading-relaxed text-neutral-600">
                          The Sheret Project represents innovation in reversible fashion design. Each garment offers two
                          completely different aesthetics in one piece, allowing for versatile styling and extended
                          wardrobe possibilities. Available in three carefully curated colorways.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Fully reversible construction</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Two distinct looks in one garment</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Premium fabric construction</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Available in 3 colorways</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Sustainable design philosophy</span>
                          </div>
                        </div>
                      </>
                    ) : item.id === 7 ? (
                      <>
                        <p className="text-sm leading-relaxed text-neutral-600">
                          The Angel Eyes collection represents the intersection of fashion and fine art, with each
                          garment serving as a wearable canvas for cultural expression. Artisanal jackets and vests
                          featuring hand-painted designs and intricate embroidery. Each piece is unique and tells its
                          own visual story.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Artisanal hand-painted designs</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Intricate embroidery</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Each piece is unique</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">
                              Celebrates the intersection of fashion and fine art
                            </span>
                          </div>
                        </div>
                      </>
                    ) : item.id === 8 ? (
                      <>
                        <p className="text-sm leading-relaxed text-neutral-600">
                          The Hulet Neteb Jackets collection combines traditional Ethiopian motifs with contemporary
                          tailoring techniques. 'Hulet Neteb' translates to 'two breaths' - representing the balance
                          between heritage and innovation in each carefully crafted piece.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Combines traditional Ethiopian motifs</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Contemporary tailoring techniques</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">'Hulet Neteb' translates to 'two breaths'</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Limited capsule collection</span>
                          </div>
                        </div>
                      </>
                    ) : item.id === 9 ? (
                      <>
                        <p className="text-sm leading-relaxed text-neutral-600">
                          The Ethiopia Posters and Postcards collection celebrates Ethiopian culture, landscapes, and
                          traditions. Perfect for home decoration or sharing with friends. Each piece captures the
                          essence of Ethiopia's rich cultural heritage through contemporary artistic interpretation.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">
                              Celebrates Ethiopian culture, landscapes, and traditions
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">
                              Perfect for home decoration or sharing with friends
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Available in multiple variants</span>
                          </div>
                        </div>
                      </>
                    ) : item.id === 10 ? (
                      <>
                        <p className="text-sm leading-relaxed text-neutral-600">
                          The Red Sticker Set features high-quality vinyl stickers with cultural symbols, patterns, and
                          artistic elements. Perfect for personalizing your belongings. Each sticker represents
                          different aspects of Ethiopian culture and contemporary design.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">High-quality vinyl stickers</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Cultural symbols, patterns, and artistic elements</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-neutral-600">Perfect for personalizing your belongings</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed text-neutral-600">
                          Each piece is carefully crafted with attention to detail and cultural significance. The design
                          process involves traditional techniques combined with contemporary aesthetics to create
                          unique, meaningful garments.
                        </p>
                      </>
                    )}

                    {/* Play Button - Only show for items with video */}
                    {item.videoUrl && (
                      <button
                        onClick={() => setIsVideoModalOpen(true)}
                        className="bg-black text-white px-6 py-2 rounded hover:bg-neutral-800 transition-colors self-start flex items-center gap-2 mt-4"
                      >
                        <Play className="h-4 w-4" />
                        <span>Play</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Panels Grid - 5 columns spanning full width */}
              {item.panelCount > 0 && (
                <div className="mt-8 -mx-8 px-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-black">Available Panels</h3>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={prevPanels}
                        disabled={currentPanelIndex === 0}
                        className="p-2 rounded border border-neutral-300 text-black hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-neutral-600 px-3 min-w-fit">
                        {panels.length > 0 ? `${Math.floor(currentPanelIndex / 5) + 1} / ${Math.ceil(panels.length / 5)}` : "0 / 0"}
                      </span>
                      <button
                        onClick={nextPanels}
                        disabled={currentPanelIndex >= panels.length - 5}
                        className="p-2 rounded border border-neutral-300 text-black hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-3">
                    {panels.slice(currentPanelIndex, currentPanelIndex + 5).map((panel) => (
                      <div
                        key={panel.id}
                        onClick={() => panel.available && openPanelModal(panel)}
                        className="group cursor-pointer"
                      >
                        <div
                          className={`bg-neutral-100 rounded overflow-hidden mb-2 relative ${!panel.available ? "opacity-50" : "hover:opacity-80 transition-opacity"}`}
                          style={{ aspectRatio: "9/16" }}
                        >
                          <Image
                            src={panel.image || "/placeholder.svg"}
                            alt={panel.name}
                            width={100}
                            height={160}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            quality={75}
                            sizes="120px"
                          />
                          {!panel.available && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
                              <span className="text-white text-xs font-medium">Sold Out</span>
                            </div>
                          )}
                        </div>
                        <p className={`text-xs font-medium text-center truncate ${!panel.available ? "text-neutral-400" : "text-black"}`}>
                          {panel.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}



        {item.hasGallery && (
          <div className="mt-16">
            <div className="p-8 rounded-lg bg-neutral-50">
              <h3 className="text-xl font-medium mb-6 text-black">Installation Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div>
                  <p className="font-medium text-black mb-1">Dimensions</p>
                  <p className="text-neutral-600">12' x 8' x 3' (variable configuration)</p>
                </div>
                <div>
                  <p className="font-medium text-black mb-1">Materials</p>
                  <p className="text-neutral-600">Hand-woven cotton, natural dyes, traditional Ethiopian textiles</p>
                </div>
                <div>
                  <p className="font-medium text-black mb-1">Installation Requirements</p>
                  <p className="text-neutral-600">Professional installation recommended, ceiling mounting required</p>
                </div>
                <div>
                  <p className="font-medium text-black mb-1">Origin</p>
                  <p className="text-neutral-600">Created in Dire Dawa, Ethiopia</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section - Craftsmanship Details */}
        {!item.hasGallery && (
          <div className="mt-16">
            <div className="p-8 rounded-lg bg-neutral-50">
              <h3 className="text-xl font-medium mb-6 text-black">Craftsmanship Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                {item.id === 2 ? (
                  <>
                    <div>
                      <p className="font-medium text-black mb-1">Construction</p>
                      <p className="text-neutral-600">Reinforced stitching with modular back panel system</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Materials</p>
                      <p className="text-neutral-600">Heavy-duty cotton canvas with utility webbing</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Care Instructions</p>
                      <p className="text-neutral-600">Machine wash cold, air dry recommended</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Origin</p>
                      <p className="text-neutral-600">Handcrafted in Addis Ababa, Ethiopia</p>
                    </div>
                  </>
                ) : item.id === 3 ? (
                  <>
                    <div>
                      <p className="font-medium text-black mb-1">Construction</p>
                      <p className="text-neutral-600">Double-sided construction with reversible seaming</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Materials</p>
                      <p className="text-neutral-600">Premium cotton blend with natural dyes</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Care Instructions</p>
                      <p className="text-neutral-600">Machine wash gentle, hang dry recommended</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Origin</p>
                      <p className="text-neutral-600">Handcrafted in Addis Ababa, Ethiopia</p>
                    </div>
                  </>
                ) : item.id === 4 ? (
                  <>
                    <div>
                      <p className="font-medium text-black mb-1">Construction</p>
                      <p className="text-neutral-600">Reinforced stitching with modular panel system</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Materials</p>
                      <p className="text-neutral-600">Heavy-duty cotton canvas with utility webbing</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Care Instructions</p>
                      <p className="text-neutral-600">Machine wash cold, air dry recommended</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Origin</p>
                      <p className="text-neutral-600">Handcrafted in Addis Ababa, Ethiopia</p>
                    </div>
                  </>
                ) : item.id === 5 ? (
                  <>
                    <div>
                      <p className="font-medium text-black mb-1">Construction</p>
                      <p className="text-neutral-600">Hand-sewn with traditional techniques</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Materials</p>
                      <p className="text-neutral-600">Premium natural fibers</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Care Instructions</p>
                      <p className="text-neutral-600">Follow care label instructions</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Origin</p>
                      <p className="text-neutral-600">Handcrafted in Ethiopia</p>
                    </div>
                  </>
                ) : item.id === 6 ? (
                  <>
                    <div>
                      <p className="font-medium text-black mb-1">Construction</p>
                      <p className="text-neutral-600">Double-sided construction with reversible seaming</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Materials</p>
                      <p className="text-neutral-600">Premium cotton blend with natural dyes</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Care Instructions</p>
                      <p className="text-neutral-600">Machine wash gentle, hang dry recommended</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Origin</p>
                      <p className="text-neutral-600">Handcrafted in Addis Ababa, Ethiopia</p>
                    </div>
                  </>
                ) : item.id === 7 ? (
                  <>
                    <div>
                      <p className="font-medium text-black mb-1">Construction</p>
                      <p className="text-neutral-600">Hand-sewn with traditional techniques</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Materials</p>
                      <p className="text-neutral-600">Premium natural fibers</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Care Instructions</p>
                      <p className="text-neutral-600">Follow care label instructions</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Origin</p>
                      <p className="text-neutral-600">Handcrafted in Ethiopia</p>
                    </div>
                  </>
                ) : item.id === 8 ? (
                  <>
                    <div>
                      <p className="font-medium text-black mb-1">Construction</p>
                      <p className="text-neutral-600">Structured jackets with traditional motifs</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Materials</p>
                      <p className="text-neutral-600">Premium fabrics with traditional Ethiopian patterns</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Care Instructions</p>
                      <p className="text-neutral-600">Dry clean only</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Origin</p>
                      <p className="text-neutral-600">Handcrafted in Ethiopia</p>
                    </div>
                  </>
                ) : item.id === 9 ? (
                  <>
                    <div>
                      <p className="font-medium text-black mb-1">Printing</p>
                      <p className="text-neutral-600">High-quality archival inks</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Paper Stock</p>
                      <p className="text-neutral-600">Premium matte finish</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Packaging</p>
                      <p className="text-neutral-600">Shipped in protective tube</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Origin</p>
                      <p className="text-neutral-600">Designed and printed in Ethiopia</p>
                    </div>
                  </>
                ) : item.id === 10 ? (
                  <>
                    <div>
                      <p className="font-medium text-black mb-1">Material</p>
                      <p className="text-neutral-600">Durable vinyl</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Adhesive</p>
                      <p className="text-neutral-600">Strong and weather-resistant</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Finish</p>
                      <p className="text-neutral-600">Glossy</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Origin</p>
                      <p className="text-neutral-600">Designed and printed in Ethiopia</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="font-medium text-black mb-1">Construction</p>
                      <p className="text-neutral-600">Hand-sewn with traditional techniques</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Materials</p>
                      <p className="text-neutral-600">Premium natural fibers</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Care Instructions</p>
                      <p className="text-neutral-600">Follow care label instructions</p>
                    </div>
                    <div>
                      <p className="font-medium text-black mb-1">Origin</p>
                      <p className="text-neutral-600">Handcrafted in Ethiopia</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Panel Modal */}
      <PanelModal panel={selectedModalPanel} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="bg-white border-neutral-200 rounded-md p-6 w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-black">Product Video</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsVideoModalOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <iframe
            width="100%"
            height="500"
            src={item.videoUrl}
            title="Product Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </div>
  )
}
