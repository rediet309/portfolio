import "./globals.css"
import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "Rediet Haddis - Visual Artist",
  description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
  metadataBase: new URL("https://rediethaddis.com"),
  icons: {
    icon: "/images/logo.ico",
    apple: "/apple-touch-icon.jpg",
  },
  openGraph: {
    title: "Rediet Haddis - Visual Artist",
    description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
    url: "https://rediethaddis.com",
    siteName: "Rediet Haddis",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero-96ive1lfPUu6pHpk0eP37IosDsNk6U.jpg",
        width: 1200,
        height: 844,
        alt: "Rediet Haddis - Visual Artist",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rediet Haddis - Visual Artist",
    description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero-96ive1lfPUu6pHpk0eP37IosDsNk6U.jpg"],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-serif antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
