"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Phone, Mail, MapPin, Copy, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Navigation } from "@/components/navigation"

export default function CheckoutPage() {
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)
  const { state } = useCart()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const shouldBeDark = savedTheme === "dark"
    setIsDark(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
    if (newTheme) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const copyToClipboard = (text: string, accountType: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAccount(accountType)
      setTimeout(() => setCopiedAccount(null), 2000)
    })
  }

  const getSubtotal = () => {
    return state.items.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("$", "").replace(",", ""))
      return total + price * item.quantity
    }, 0)
  }

  const shipping = 25
  const tax = getSubtotal() * 0.08
  const total = getSubtotal() + shipping + tax

  const bankAccounts = [
    {
      name: "Telebirr",
      account: "+251-911-234567",
      type: "Mobile Money",
      icon: "📱",
    },
    {
      name: "Commercial Bank of Ethiopia (CBE)",
      account: "1000123456789",
      type: "Bank Account",
      icon: "🏦",
    },
    {
      name: "Bank of Abyssinia (BOA)",
      account: "0987654321012",
      type: "Bank Account",
      icon: "🏦",
    },
    {
      name: "Dashen Bank",
      account: "1122334455667",
      type: "Bank Account",
      icon: "🏦",
    },
  ]

  if (isLoading) {
    return <div className="min-h-screen bg-white" />
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-neutral-900" : "bg-white"}`}>
      {/* Navigation */}
      <Navigation currentPath="/checkout" isDark={isDark} toggleTheme={toggleTheme} />

      {/* Back Button */}
      <div className="pt-32 pb-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/shop"
            className={`inline-flex items-center gap-2 ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Payment Information Content */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1
              className={`text-4xl md:text-5xl font-light leading-tight mb-4 ${isDark ? "text-white" : "text-black"}`}
            >
              Payment Information
            </h1>
            <p className={`text-lg ${isDark ? "text-neutral-300" : "text-neutral-600"} mb-4`}>
              Complete your order by transferring to one of our bank accounts
            </p>
            <div className={`w-20 h-px ${isDark ? "bg-neutral-700" : "bg-neutral-300"} mx-auto`}></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Payment Instructions */}
            <div className="space-y-8">
              {/* Bank Accounts */}
              <div className="space-y-6">
                <h2 className={`text-2xl font-medium ${isDark ? "text-white" : "text-black"} mb-6`}>
                  Bank Account Details
                </h2>

                {bankAccounts.map((bank, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border ${
                      isDark ? "border-neutral-700 bg-neutral-800/50" : "border-neutral-200 bg-neutral-50"
                    } transition-all duration-200 hover:shadow-md`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{bank.icon}</span>
                        <div>
                          <h3 className={`font-medium ${isDark ? "text-white" : "text-black"}`}>{bank.name}</h3>
                          <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>{bank.type}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(bank.account, bank.name)}
                        variant="outline"
                        size="sm"
                        className={`${
                          isDark ? "border-neutral-600 hover:bg-neutral-700" : "border-neutral-300 hover:bg-neutral-100"
                        }`}
                      >
                        {copiedAccount === bank.name ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div
                      className={`font-mono text-lg p-3 rounded ${
                        isDark ? "bg-neutral-700 text-white" : "bg-white text-black"
                      } border ${isDark ? "border-neutral-600" : "border-neutral-200"}`}
                    >
                      {bank.account}
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Instructions */}
              <div
                className={`p-6 rounded-lg border ${
                  isDark ? "border-yellow-800 bg-yellow-900/20" : "border-yellow-300 bg-yellow-50"
                }`}
              >
                <h3 className={`font-medium mb-4 ${isDark ? "text-yellow-200" : "text-yellow-800"}`}>
                  📋 Payment Instructions
                </h3>
                <ol className={`space-y-2 text-sm ${isDark ? "text-yellow-100" : "text-yellow-700"}`}>
                  <li>1. Transfer the total amount to any of the above bank accounts</li>
                  <li>2. Take a screenshot of your transfer receipt</li>
                  <li>3. Send the screenshot via WhatsApp, Telegram, or Email</li>
                  <li>4. Include your order details in the message</li>
                  <li>5. We'll confirm your payment and process your order within 24 hours</li>
                </ol>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className={`text-2xl font-medium ${isDark ? "text-white" : "text-black"}`}>Contact Information</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-lg border ${
                      isDark ? "border-neutral-700 bg-neutral-800/50" : "border-neutral-200 bg-neutral-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className={`h-5 w-5 ${isDark ? "text-neutral-400" : "text-neutral-600"}`} />
                      <span className={`font-medium ${isDark ? "text-white" : "text-black"}`}>Phone</span>
                    </div>
                    <p className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>+251-911-123456</p>
                    <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>WhatsApp Available</p>
                  </div>

                  <div
                    className={`p-4 rounded-lg border ${
                      isDark ? "border-neutral-700 bg-neutral-800/50" : "border-neutral-200 bg-neutral-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className={`h-5 w-5 ${isDark ? "text-neutral-400" : "text-neutral-600"}`} />
                      <span className={`font-medium ${isDark ? "text-white" : "text-black"}`}>Email</span>
                    </div>
                    <p className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>orders@rediethaddis.com</p>
                    <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>24/7 Support</p>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-lg border ${
                    isDark ? "border-neutral-700 bg-neutral-800/50" : "border-neutral-200 bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className={`h-5 w-5 ${isDark ? "text-neutral-400" : "text-neutral-600"}`} />
                    <span className={`font-medium ${isDark ? "text-white" : "text-black"}`}>Location</span>
                  </div>
                  <p className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>Addis Ababa, Ethiopia</p>
                  <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                    Local pickup available
                  </p>
                </div>
              </div>

              {/* Important Note */}
              <div
                className={`p-6 rounded-lg border ${
                  isDark ? "border-red-800 bg-red-900/20" : "border-red-300 bg-red-50"
                }`}
              >
                <h3 className={`font-medium mb-3 ${isDark ? "text-red-200" : "text-red-800"}`}>⚠️ Important Note</h3>
                <p className={`text-sm ${isDark ? "text-red-100" : "text-red-700"}`}>
                  Please ensure you send a screenshot of your transfer receipt to complete your order. Orders without
                  payment confirmation will not be processed. For any questions or issues, contact us immediately using
                  the information provided above.
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div
                className={`p-8 rounded-lg border ${isDark ? "border-neutral-800 bg-neutral-800/50" : "border-neutral-200 bg-neutral-50"}`}
              >
                <h2 className={`text-xl font-medium mb-6 ${isDark ? "text-white" : "text-black"}`}>Order Summary</h2>

                <div className="space-y-6 mb-8">
                  {state.items.map((item, index) => (
                    <div key={`${item.id}-${item.selectedPanel}-${index}`} className="flex gap-4">
                      <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium text-sm ${isDark ? "text-white" : "text-black"}`}>{item.title}</h3>
                        <p className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"} mb-1`}>
                          {item.category}
                        </p>
                        {item.selectedPanel && (
                          <p className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"} mb-1`}>
                            Panel: {item.selectedPanel}
                          </p>
                        )}
                        <div className="flex justify-between items-center">
                          <span className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                            Qty: {item.quantity}
                          </span>
                          <span className={`text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-neutral-300 dark:border-neutral-700">
                  <div className="flex justify-between">
                    <span className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>Subtotal</span>
                    <span className={`${isDark ? "text-white" : "text-black"}`}>${getSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>Shipping</span>
                    <span className={`${isDark ? "text-white" : "text-black"}`}>${shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>Tax</span>
                    <span className={`${isDark ? "text-white" : "text-black"}`}>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-neutral-300 dark:border-neutral-700">
                    <span className={`text-lg font-medium ${isDark ? "text-white" : "text-black"}`}>Total</span>
                    <span className={`text-lg font-medium ${isDark ? "text-white" : "text-black"}`}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Transfer Amount Highlight */}
                <div
                  className={`mt-6 p-4 rounded-lg border-2 ${
                    isDark ? "border-green-700 bg-green-900/20" : "border-green-300 bg-green-50"
                  }`}
                >
                  <div className="text-center">
                    <p className={`text-sm font-medium ${isDark ? "text-green-200" : "text-green-800"} mb-1`}>
                      Transfer This Amount
                    </p>
                    <p className={`text-2xl font-bold ${isDark ? "text-green-100" : "text-green-700"}`}>
                      ${total.toFixed(2)} USD
                    </p>
                    <p className={`text-xs ${isDark ? "text-green-300" : "text-green-600"} mt-1`}>
                      (Equivalent in ETB based on current exchange rate)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  )
}
