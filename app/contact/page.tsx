"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { OrganicPattern } from "@/components/organic-pattern"
import { Navigation } from "@/components/navigation"

export default function ContactPage() {
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
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "aabb04ff-ba9b-4ba6-b363-195862d42ed2",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "rediethaddis@gmail.com",
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        console.log("[v0] Form submitted successfully")
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        // Show success message
        alert("Message sent successfully! I'll get back to you soon.")
      } else {
        console.log("[v0] Form submission failed:", result)
        alert("There was an error sending your message. Please try again.")
      }
    } catch (error) {
      console.log("[v0] Error submitting form:", error)
      alert("There was an error sending your message. Please try again.")
    }
  }

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  if (!mounted) {
    return <div className="min-h-screen bg-white" />
  }

  return (
    <div className="min-h-screen bg-white text-black transition-colors duration-300">
      {/* Navigation */}
      <Navigation currentPath="/contact" />

      {/* Contact Hero Section */}
      <section className="pt-32 px-6 lg:px-12 relative overflow-hidden pb-4">
        <OrganicPattern className="absolute top-20 right-0 w-96 h-96 text-amber-200" opacity={0.08} />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 text-black">Contact</h1>
            <div className="w-20 h-px bg-neutral-300 mx-auto mb-8"></div>
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
                <h2 className="text-3xl font-light leading-tight mb-6 text-black">Send a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-black">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-sm border bg-white border-neutral-300 text-black placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors font-serif"
                      style={{ fontFamily: "Times New Roman, serif" }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-black">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-sm border bg-white border-neutral-300 text-black placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors font-serif"
                      style={{ fontFamily: "Times New Roman, serif" }}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 text-black">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-sm border bg-white border-neutral-300 text-black placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors font-serif"
                    style={{ fontFamily: "Times New Roman, serif" }}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-black">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-sm border bg-white border-neutral-300 text-black placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors resize-vertical font-serif"
                    style={{ fontFamily: "Times New Roman, serif" }}
                    placeholder="Tell me more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-6 text-lg rounded-full bg-black text-white hover:bg-neutral-800 transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-light leading-tight mb-6 text-black">Get in Touch</h2>
                
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-neutral-100">
                    <Mail className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-black">Email</h3>
                    <a
                      href="mailto:hello@rediethaddis.com"
                      className="font-serif text-neutral-600 hover:text-black transition-colors"
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      rediethaddis@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-neutral-100">
                    <MapPin className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-black">Based in</h3>
                    <p className="font-serif text-neutral-600" style={{ fontFamily: "Times New Roman, serif" }}>
                      Addis Ababa, Ethiopia
                    </p>
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
