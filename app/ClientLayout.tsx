"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <html lang="en">
        <head>
          <title>Rediet Haddis - Visual Artist</title>
          <meta
            name="description"
            content="Multidisciplinary visual artist exploring memory, trade, and material culture"
          />
          <meta name="generator" content="v0.dev" />
        </head>
        <body className={`${inter.className} min-h-screen bg-white`}>
          <div className="min-h-screen bg-white" />
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <head>
        <title>Rediet Haddis - Visual Artist</title>
        <meta
          name="description"
          content="Multidisciplinary visual artist exploring memory, trade, and material culture"
        />
        <meta name="generator" content="v0.dev" />
      </head>
      <body className={`${inter.className} min-h-screen bg-white text-black`}>
        <CartProvider>
          <main>{children}</main>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}
