"use client"

import { Instagram, Mail, Youtube, Twitter, Linkedin} from "lucide-react"

interface FooterProps {
  isDark?: boolean
}

export function Footer({ isDark = false }: FooterProps) {
  return (
    <footer
      className={`py-12 px-6 lg:px-12 font-normal border-t-0 ${isDark ? "border-neutral-800" : "border-neutral-200"}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-6">
          <p className={`text-sm font-times ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            © 2024 Rediet Haddis. All rights reserved - Multidisciplinary Visual Artist
          </p>

          {/* Social media icons centered with unique hover colors */}
          <div className="flex items-center space-x-6">
            <a
              href="https://instagram.com/rediethaddis"
              className={`p-2 rounded-full transition-colors ${isDark ? "text-neutral-400 hover:text-red-500" : "text-neutral-600 hover:text-red-500"}`}
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/rediethaddis"
              className={`p-2 rounded-full transition-colors ${isDark ? "text-neutral-400 hover:text-cyan-500" : "text-neutral-600 hover:text-cyan-500"}`}
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/@rediethaddis"
              className={`p-2 rounded-full transition-colors ${isDark ? "text-neutral-400 hover:text-blue-500" : "text-neutral-600 hover:text-blue-500"}`}
              aria-label="Linkedin"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com/@rediethaddis"
              className={`p-2 rounded-full transition-colors ${isDark ? "text-neutral-400 hover:text-red-500" : "text-neutral-600 hover:text-red-500"}`}
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="mailto:hello@rediethaddis.com"
              className={`p-2 rounded-full transition-colors ${isDark ? "text-neutral-400 hover:text-green-500" : "text-neutral-600 hover:text-green-500"}`}
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
