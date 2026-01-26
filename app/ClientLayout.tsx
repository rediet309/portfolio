"use client"

import type React from "react"
import { CartProvider } from "@/lib/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"
import { Footer } from "@/components/footer"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <main>{children}</main>
      <Footer />
      <CartSidebar />
    </CartProvider>
  )
}
