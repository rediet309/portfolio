import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ClientLayout from "./ClientLayout"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rediethaddis.com"),
  generator: "v0.dev",
  title: "Rachel Haddis - Visual Artist",
  description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
  icons: {
    icon: "/images/logo.ico",
  },
  openGraph: {
    title: "Rediet Haddis - Visual Artist",
    description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
    url: "https://rediethaddis.com",
    siteName: "Rediet Haddis",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://rediethaddis.com"}/Screenshot 2025-10-02 012037.jpg`,
        width: 1200,
        height: 630,
        alt: "Rediet Haddis - Visual Artist Portfolio",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rediet Haddis - Visual Artist",
    description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || "https://rediethaddis.com"}/Screenshot 2025-10-02 012037.jpg`],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white text-black`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
