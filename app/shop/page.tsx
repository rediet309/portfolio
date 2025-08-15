"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { OrganicPattern } from "@/components/organic-pattern"
import { Navigation } from "@/components/navigation"

export default function ShopPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { state, dispatch } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const categories = [
    { id: "all", label: "All" },
    { id: "textile-art", label: "Textile Art" },
    { id: "clothing", label: "Clothing" },
    { id: "posters", label: "Posters" },
    { id: "postcards", label: "Postcards" },
    { id: "stickers", label: "Stickers" },
  ]

  const items = [
    {
      id: 1,
      title: "Kins of Abay",
      category: "clothing",
      price: "$280",
      image:
        "https://images.unsplash.com/photo-1754634026426-4bc23801b618?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
      hoverImage:
        "https://images.unsplash.com/photo-1754460916460-94693498b3d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
      available: true,
      description:
        "A flowing kimono featuring interchangeable panels that tell stories of ancient traditions and modern interpretations. Each panel represents a different cultural narrative.",
    },
    {
      id: 2,
      title: "Skins",
      category: "clothing",
      price: "$180",
      image: "/placeholder.svg?height=600&width=480&text=Skins",
      hoverImage: "/placeholder.svg?height=600&width=480&text=Pants+Texture+Close+Up",
      available: true,
      description:
        "Contemporary pants with removable panel sections that showcase textile heritage. Mix and match panels to create your own cultural story.",
    },
    {
      id: 3,
      title: "Sheret Skins: Dire Dawa Textile Installation",
      category: "posters",
      price: "$25",
      image: "/placeholder.svg?height=600&width=480&text=Sheret+Skins+Dire+Dawa",
      hoverImage: "/placeholder.svg?height=600&width=480&text=Poster+Pattern+Detail",
      available: true,
      description:
        "A beautiful poster featuring textile patterns inspired by global cultural traditions. Perfect for adding artistic flair to any space.",
    },
    {
      id: 4,
      title: "Cargo Jacket",
      category: "postcards",
      price: "$15",
      image: "/placeholder.svg?height=600&width=480&text=Cargo+Jacket",
      hoverImage: "/placeholder.svg?height=600&width=480&text=Postcards+Collection+View",
      available: false,
      description:
        "A collection of postcards showcasing different textile patterns from around the world. Each card tells a unique cultural story.",
    },
    {
      id: 5,
      title: "Haori Kimono",
      category: "textile-art",
      price: "$120",
      image: "/placeholder.svg?height=600&width=480&text=Haori+Kimono",
      hoverImage: "/placeholder.svg?height=600&width=480&text=Art+Print+Framed+View",
      available: true,
      description:
        "An original textile art piece featuring hand-woven patterns that celebrate cultural heritage and contemporary artistic expression.",
    },
    {
      id: 6,
      title: "Cargo Pants",
      category: "stickers",
      price: "$8",
      image: "/placeholder.svg?height=600&width=480&text=Cargo+Pants",
      hoverImage: "/placeholder.svg?height=600&width=480&text=Stickers+Applied+View",
      available: true,
      description:
        "A collection of vinyl stickers featuring miniature textile patterns. Perfect for personalizing laptops, notebooks, and more.",
    },
    {
      id: 7,
      title: "Angel Eyes",
      category: "clothing",
      price: "$140",
      image: "/placeholder.svg?height=600&width=480&text=Angel+Eyes",
      hoverImage: "/placeholder.svg?height=600&width=480&text=Shirt+Worn+Model+View",
      available: true,
      description:
        "A thoughtfully designed shirt exploring material culture through interchangeable panels. Perfect for those who appreciate cultural depth in fashion.",
    },
    {
      id: 8,
      title: "Cultural Fusion Poster",
      category: "posters",
      price: "$30",
      image: "/placeholder.svg?height=600&width=480&text=Cultural+Fusion+Poster",
      hoverImage: "/placeholder.svg?height=600&width=480&text=Poster+Room+Display",
      available: true,
      description:
        "A large format poster celebrating the intersection of traditional and contemporary textile arts across different cultures.",
    },
  ]

  const filteredItems = selectedCategory === "all" ? items : items.filter((item) => item.category === selectedCategory)

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation currentPath="/shop" />

      {/* Shop Hero Section */}
      <section className="pt-32 px-12 lg:px-20 relative overflow-hidden pb-4">
        <OrganicPattern className="absolute bottom-0 left-0 w-96 h-96 text-amber-200" opacity={0.08} />
        <div className="w-full">
          <div className="text-center mb-0">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light leading-none text-black mb-0">Red Suk</h1>
            <div className="w-20 h-px bg-neutral-300 mx-auto mb-8"></div>
          </div>
        </div>
      </section>

      {/* Filter Section - Right Aligned */}
      <section className="px-12 lg:px-20 pb-8">
        <div className="w-full">
          <div className="flex justify-end mb-0">
            <div className="flex items-center space-x-2 bg-neutral-100 p-1 rounded-full">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-black text-white shadow-sm"
                      : "text-neutral-600 hover:text-black hover:bg-white"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shop Grid */}
      <section className="pb-32 px-12 lg:px-20">
        <div className="w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={`/shop/${item.id}`}
                className="group"
                onClick={() => {
                  // Ensure page loads from top when navigating to item
                  setTimeout(() => window.scrollTo(0, 0), 0)
                }}
              >
                <div className="space-y-4">
                  <div className="aspect-[4/5] bg-neutral-100 rounded-sm overflow-hidden relative">
                    {/* Main Image */}
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={480}
                      height={600}
                      className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                    />

                    {/* Hover Image */}
                    <Image
                      src={item.hoverImage || "/placeholder.svg"}
                      alt={`${item.title} - alternate view`}
                      width={480}
                      height={600}
                      className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                    />

                    {/* Sold Out Overlay (always visible when not available) */}
                    {!item.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                        <span
                          className="text-white text-lg font-medium font-serif"
                          style={{ fontFamily: "Times New Roman, serif" }}
                        >
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-black group-hover:opacity-70 transition-opacity">
                      {item.title}
                    </h3>

                    <p className="text-lg font-medium text-black">{item.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg font-serif text-neutral-600" style={{ fontFamily: "Times New Roman, serif" }}>
                No items found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
