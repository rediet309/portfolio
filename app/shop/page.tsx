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
    { id: "posters", label: "Posters, Stickers" },
  ]

  const items = [
    // Textile Art
    /*{
      id: 1,
      title: "sKINs: Dire Dawa Textile Installation",
      category: "textile-art",
      price: "Email for Price",
      image: "/images/01_front.webp?height=600&width=480&text=Dire+Dawa+Installation",
      hoverImage: "/images/01_front.webp?height=600&width=480&text=Installation+Detail",
      available: true,
      isEmailPrice: true,
      description:
        "A large-scale textile installation exploring cultural narratives through traditional and contemporary techniques. This immersive piece transforms space through layered textile elements.",
    }, */

    // Clothing Items
    {
      id: 2,
      title: "Cargo Jacket",
      category: "clothing",
      price: "$230",
      image: "/images/1.webp",
      hoverImage: "/images/1.webp",
      available: true,
      linkedPhotos: "Kins of Abay.1/back panels",
      description:
        "Military-inspired cargo jacket featuring interchangeable back panels. Each panel tells a different cultural story, allowing for personal expression and narrative customization.",
    },
    {
      id: 3,
      title: "Haori Jacket",
      category: "clothing",
      price: "$290",
      image: "/images/Swapable.webp",
      hoverImage: "/images/Swapable.webp",
      available: true,
      linkedPhotos: "Kins of Abay.1/back panels + changeable swapping panels",
      description:
        "Traditional Japanese-inspired kimono with Ethiopian textile influences. Features removable and swappable panels for endless styling possibilities.",
    },
    {
      id: 4,
      title: "Cargo Pants",
      category: "clothing",
      price: "$110",
      image: "/images/a3-9.webp",
      hoverImage: "/images/a3-9.webp",
      available: true,
      linkedPhotos: "changeable swapping panels",
      description:
        "Utility-focused cargo pants with modular panel system. Mix and match panels to create unique looks while maintaining functionality.",
    },
    {
      id: 5,
      title: "Skins",
      category: "clothing",
      price: "$70",
      image: "/images/red-skins-all_01.webp",
      hoverImage: "/images/red-skins-all_01.webp",
      available: true,
      description:
        "Versatile collection including tops, durags, neck gaiters, and sleeve/leg extensions. Each piece designed for layering and personal expression.",
      subcategory: "",
    },
    {
      id: 6,
      title: "Sheret Shirt",
      category: "clothing",
      price: "$70",
      image: "/images/Sheret 09.webp",
      hoverImage: "/images/Sheret 09.webp",
      available: true,
      description:
        "Innovative reversible clothing line featuring short sleeve shirts, full suits, and coats. Each piece offers two distinct looks in one garment.",
      subcategory: "",
    },
    /*{
      id: 7,
      title: "Angel Eyes",
      category: "clothing",
      price: "Currently Sold Out",
      image: "/images/coming-soon.jpg?height=600&width=480&text=Angel+Eyes",
      hoverImage: "/images/coming-soon.jpg",
      available: false,
      description:
        "Artisanal jackets and vests featuring hand-painted designs and intricate embroidery. Each piece is unique and tells its own visual story.",
      subcategory: "Hand painted/embroidered jackets and vests",
    },*/
    {
      id: 8,
      title: "Hulet Neteb Jackets",
      category: "clothing",
      price: "Currently Sold Out",
      image: "/images/01_ The four elements-a.jpg",
      hoverImage: "/images/01_ The four elements-a.jpg",
      available: false,
      description:
        "Limited capsule collection of structured jackets combining traditional Ethiopian motifs with contemporary tailoring techniques.",
      subcategory: "",
    },

    // Posters, Postcards, Stickers
    {
      id: 9,
      title: "Ethiopia Posters and Postcards",
      category: "posters",
      price: "Coming Soon",
      image: "/images/posters.webp",
      hoverImage: "/images/coming-soon.jpg",
      available: false,
      description:
        "Beautiful collection of posters and postcards celebrating Ethiopian culture, landscapes, and traditions. Perfect for home decoration or sharing with friends.",
    },
    {
      id: 10,
      title: "Red Sticker Set",
      category: "posters",
      price: "Coming Soon",
      image: "/images/stickers.webp",
      hoverImage: "/images/coming-soon.jpg",
      available: false,
      description:
        "Curated set of red-themed stickers featuring cultural symbols, patterns, and artistic elements. High-quality vinyl stickers perfect for personalizing your belongings.",
    },
  ]

  const filteredItems = selectedCategory === "all" ? items : items.filter((item) => item.category === selectedCategory)

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation currentPath="/shop" />

      {/* Shop Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 px-4 sm:px-8 md:px-12 lg:px-20 relative overflow-hidden pb-4">
        <OrganicPattern className="absolute bottom-0 left-0 w-96 h-96 text-amber-200" opacity={0.08} />
        <div className="w-full">
          <div className="text-center mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-stardom leading-none text-foreground mb-0">
              Red Suk
            </h1>
            <div className="w-20 h-px bg-border mx-auto mb-8"></div>
          </div>
        </div>
      </section>

      {/* Filter Section - Responsive Layout */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-20 pb-6 sm:pb-8">
        <div className="w-full">
          {/* Mobile: Horizontal scrollable */}
          <div className="flex justify-start sm:justify-end mb-0 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <div className="flex items-center gap-2 sm:gap-2 bg-muted p-1 rounded-full min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 sm:px-5 md:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background"
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
      <section className="pb-20 sm:pb-24 md:pb-32 px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={`/shop/${item.id}`}
                className="group"
                onClick={() => {
                  document.body.style.opacity = "0.8"
                  document.body.style.transition = "opacity 0.2s ease-out"
                  setTimeout(() => {
                    window.scrollTo(0, 0)
                    document.body.style.opacity = "1"
                  }, 100)
                }}
              >
                <div className="space-y-4">
                  <div className="aspect-[4/5] bg-neutral-100 rounded-sm overflow-hidden relative">
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2 py-1 text-xs font-medium bg-white/90 text-black rounded-full">
                        {item.category === "textile-art" && "Textile Art"}
                        {item.category === "clothing" && "Clothing"}
                        {item.category === "posters" && "Paper Goods"}
                      </span>
                    </div>

                    {/* Email Price Badge */}
                    {item.isEmailPrice && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                          Email for Price
                        </span>
                      </div>
                    )}

                    {/* Main Image */}
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={480}
                      height={600}
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="w-full h-full object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      quality={80}
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
                    <h3 className="text-lg font-medium text-black">{item.title}</h3>

                    <p className="text-lg font-medium text-black">{item.price}</p>

                    {item.subcategory && <p className="text-sm text-neutral-600 line-clamp-2">{item.subcategory}</p>}
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
