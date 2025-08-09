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
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)

    setIsDark(shouldBeDark)

    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

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
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
                  
                  if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                  }
                })();
              `,
            }}
          />
        </head>
        <body className={`${inter.className} min-h-screen transition-colors duration-300`}>
          <div className="min-h-screen bg-white dark:bg-neutral-900" />
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
      <body
        className={`${inter.className} min-h-screen transition-colors duration-300 bg-white dark:bg-neutral-900 text-black dark:text-white`}
      >
        <CartProvider>
          <main>{children}</main>
          <Footer isDark={isDark} />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}
