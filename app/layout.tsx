import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"
import "./globals.css" // Imported globals.css file

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rediethaddis.com"),
  generator: "v0.dev",
  title: "Rediet Haddis - Visual Artist",
  description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
  icons: {
    icon: "/images/logo.ico",
  },
  openGraph: {
    title: "Rediet Haddis - Visual Artist",
    description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
    url: "/",
    siteName: "Rediet Haddis",
    images: [
      {
        url: "/Screenshot 2025-10-02 012037.png",
        width: 1200,
        height: 630,
        alt: "Rediet Haddis - Visual Artist Portfolio",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rediet Haddis - Visual Artist",
    description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
    images: ["/Screenshot 2025-10-02 012037.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
