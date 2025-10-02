import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavBar from "../components/nav-bar"
import ThemeProvider from "../components/theme-provider"
import ThemeToggle from "../components/theme-toggle"
import ScrollToTop from "../components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rediet Haddis - Visual Artist",
  description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
  generator: "vbeni",
  icons: {
    icon: "/images/logo.ico",
    shortcut: "/images/logo.ico",
    apple: "/images/logo-apple.png",
  },
  openGraph: {
    title: "Rediet Haddis - Visual Artist",
    description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
    url: "https://rediethaddis.com",
    siteName: "Rediet Haddis - Visual Artist",
    images: [
      {
        url: "/1234.png",
        width: 1200,
        height: 630,
        alt: "Rediet Haddis - Visual Artist",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rediet Haddis - Visual Artist",
    description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
    images: ["/1234.png"],
    creator: "@abenidemiss300@gmail.com",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ScrollToTop />
          <div className="relative min-h-screen bg-gradient-to-b from-background to-background/80 transition-all duration-500">
            <NavBar />
            <div className="absolute top-6 right-6 z-50">
              <ThemeToggle />
            </div>
            <div className="noise-overlay" />
            <main className="relative">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
