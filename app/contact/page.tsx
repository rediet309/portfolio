"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { OrganicPattern } from "@/components/organic-pattern"
import { Navigation } from "@/components/navigation"

interface ContactPageProps {
  isDark?: boolean
  toggleTheme?: () => void
}

export default function ContactPage({ isDark: propIsDark, toggleTheme: propToggleTheme }: ContactPageProps) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const { state, dispatch } = useCart()

  useEffect(() => {
    setMounted(true)

    if (propIsDark !== undefined) {
      setIsDark(propIsDark)
    } else {
      // Default to light mode, only use dark if explicitly set
      const savedTheme = localStorage.getItem("theme")
      const shouldBeDark = savedTheme === "dark"
      setIsDark(shouldBeDark)

      // Apply theme to document
      if (shouldBeDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [propIsDark])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    if (propToggleTheme) {
      propToggleTheme()
    } else {
      // Fallback for direct navigation
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
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  if (!mounted) {
    return <div className="min-h-screen bg-white" />
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-neutral-900 text-white" : "bg-white text-black"}`}
    >
      {/* Navigation */}
      <Navigation currentPath="/contact" isDark={isDark} toggleTheme={toggleTheme} />

      {/* Contact Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <OrganicPattern
          className={`absolute top-20 right-0 w-96 h-96 ${isDark ? "text-amber-900" : "text-amber-200"}`}
          opacity={0.08}
        />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1
              className={`text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 ${isDark ? "text-white" : "text-black"}`}
            >
              Contact
            </h1>
            <div className={`w-20 h-px ${isDark ? "bg-neutral-700" : "bg-neutral-300"} mx-auto mb-8`}></div>
            <p
              className={`text-xl leading-relaxed max-w-2xl mx-auto font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Let's discuss collaborations, exhibitions, or any questions about my work.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className={`text-3xl font-light leading-tight mb-6 ${isDark ? "text-white" : "text-black"}`}>
                  Send a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-sm border font-serif ${
                        isDark
                          ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                          : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                      } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-sm border font-serif ${
                        isDark
                          ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                          : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                      } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-sm border font-serif ${
                      isDark
                        ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                        : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                    } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                    style={{ fontFamily: "Times New Roman, serif" }}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-sm border font-serif ${
                      isDark
                        ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                        : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                    } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors resize-vertical`}
                    style={{ fontFamily: "Times New Roman, serif" }}
                    placeholder="Tell me more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  className={`w-full py-6 text-lg rounded-full ${
                    isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"
                  } transition-all duration-300`}
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className={`text-3xl font-light leading-tight mb-6 ${isDark ? "text-white" : "text-black"}`}>
                  Get in Touch
                </h2>
                <p
                  className={`text-lg leading-relaxed font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  I'm always interested in new collaborations, exhibition opportunities, and meaningful conversations
                  about art and culture.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                    <Mail className={`h-5 w-5 ${isDark ? "text-white" : "text-black"}`} />
                  </div>
                  <div>
                    <h3 className={`font-medium mb-1 ${isDark ? "text-white" : "text-black"}`}>Email</h3>
                    <a
                      href="mailto:hello@rediethaddis.com"
                      className={`font-serif ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      hello@rediethaddis.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                    <Phone className={`h-5 w-5 ${isDark ? "text-white" : "text-black"}`} />
                  </div>
                  <div>
                    <h3 className={`font-medium mb-1 ${isDark ? "text-white" : "text-black"}`}>Phone</h3>
                    <a
                      href="tel:+1234567890"
                      className={`font-serif ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      +1 (234) 567-8900
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                    <MapPin className={`h-5 w-5 ${isDark ? "text-white" : "text-black"}`} />
                  </div>
                  <div>
                    <h3 className={`font-medium mb-1 ${isDark ? "text-white" : "text-black"}`}>Studio</h3>
                    <p
                      className={`font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      Brooklyn, NY
                      <br />
                      London, UK
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h3 className={`font-medium mb-4 ${isDark ? "text-white" : "text-black"}`}>Studio Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span
                      className={`font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      Monday - Friday
                    </span>
                    <span
                      className={`font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={`font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      Saturday
                    </span>
                    <span
                      className={`font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={`font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      Sunday
                    </span>
                    <span
                      className={`font-serif ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      By appointment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
