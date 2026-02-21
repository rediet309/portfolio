"use client"

import { Instagram, Mail, Youtube, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-8 lg:px-16 font-normal">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex flex-col items-center space-y-6">
          <p className="text-sm font-times text-neutral-600 text-center">
            © 2024 Rediet Haddis. All rights reserved - Multidisciplinary Visual Artist
          </p>

          {/* Social media icons centered with unique hover colors */}
          <div className="flex items-center space-x-6">
            <a
              href="https://www.instagram.com/p/DNpahTlsxNk/"
              className="p-2 rounded-full transition-colors text-neutral-600 hover:text-red-500"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/rediethaddis"
              className="p-2 rounded-full transition-colors text-neutral-600 hover:text-cyan-500"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/@rediethaddis"
              className="p-2 rounded-full transition-colors text-neutral-600 hover:text-blue-500"
              aria-label="Linkedin"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com/@rediethaddis"
              className="p-2 rounded-full transition-colors text-neutral-600 hover:text-red-500"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="mailto:rediethaddis@gmail.com"
              className="p-2 rounded-full transition-colors text-neutral-600 hover:text-green-500"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="text-center">
            <p className="text-xs text-neutral-500 mb-1">
              powered and developed by{" "}
              <a
                href="https://vbeni.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-neutral-800 transition-colors underline"
              >
                vbeni
              </a>
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  )
}
