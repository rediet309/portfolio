"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { CartProvider } from "@/lib/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"
import { Footer } from "@/components/footer"

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
    return <div className="min-h-screen bg-white" />
  }

  return (
    <CartProvider>
      <main>{children}</main>
      <Footer />
      <CartSidebar />
    </CartProvider>
  )
}
