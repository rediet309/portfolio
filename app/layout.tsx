import type React from "react"
import ClientLayout from "./ClientLayout"

export const metadata = {
  generator: "vbeni",
  title: "Rediet Haddis - Visual Artist",
  description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
  icons: {
    icon: "/images/logo.ico",
    apple: "/images/logo.ico",
  },
  openGraph: {
    title: "Rediet Haddis - Visual Artist",
    description: "Multidisciplinary artist working across Film, installation, textile and clothing.",
    url: "https://rediethaddis.com",
    siteName: "Rediet Haddis - Visual Artist",
    images: [
      {
        url: "/Screenshot 2025-10-02 012037.png",
        width: 1200,
        height: 1200,
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

import "./globals.css"
