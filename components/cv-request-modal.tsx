"use client"

import React from "react"

import { useState } from "react"
import { X, Mail, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CVRequestModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CVRequestModal({ isOpen, onClose }: CVRequestModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("access_key", "aabb04ff-ba9b-4ba6-b363-195862d42ed2")
      formDataToSend.append("email", email)
      formDataToSend.append("subject", "CV Request from Rediet Haddis Website")
      formDataToSend.append("from_name", "CV Request - Rediet Haddis Portfolio")
      formDataToSend.append("replyto", email)
      formDataToSend.append("redirect", "https://web3forms.com/success")
      formDataToSend.append("botcheck", "")
      formDataToSend.append(
        "message",
        `New CV Request

Requested by: ${email}

This is an automated CV request from the Rediet Haddis portfolio website.
Please send the CV to the requestor at the email provided above.`
      )

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus("success")
        setEmail("")
        setTimeout(() => {
          onClose()
          setSubmitStatus("idle")
        }, 2000)
      } else {
        setSubmitStatus("error")
        setErrorMessage("Failed to send request. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-lg shadow-xl animate-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="p-8">
          {submitStatus === "success" ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Request Sent!</h3>
                <p className="text-gray-600 text-sm">
                  Thank you. Your CV request has been sent to rediethaddis@gmail.com. You'll receive the CV shortly at {email}.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Request CV</h2>
                <p className="text-gray-600 text-sm">
                  Enter your email address and we'll send the CV to you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={isSubmitting}
                  />
                </div>

                {submitStatus === "error" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Request CV"
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
