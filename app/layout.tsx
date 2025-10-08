import "./globals.css"
import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "Rediet Haddis - Visual Artist",
  description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
  metadataBase: new URL("https://rediethaddis.com"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.jpg",
  },
  openGraph: {
    title: "Rediet Haddis - Visual Artist",
    description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
    url: "https://rediethaddis.com",
    siteName: "Rediet Haddis",
    images: [
      {
        url: "/images/thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Rediet Haddis - Visual Artist Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rediet Haddis - Visual Artist",
    description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
    images: ["/images/thumbnail.jpg"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
