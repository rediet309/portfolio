"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Phone, Mail, MapPin, Copy, CheckCircle, Send, User, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    message: "",
    paymentMethod: "", // added payment method field
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [currentStep, setCurrentStep] = useState<"shipping" | "payment">("shipping")
  const { state } = useCart()

  useEffect(() => {
    setIsLoading(false)
  }, [])

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

  const shipping = 0 // Will be calculated based on country
  const total = getSubtotal() + shipping

  const bankAccounts = [
    {
      name: "WISE",
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
  ]

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const orderSummary = state.items
        .map(
          (item) =>
            `${item.title} (${item.category}) - Qty: ${item.quantity} - ${item.price}${item.selectedPanel ? ` - Panel: ${item.selectedPanel}` : ""}`,
        )
        .join("\n")

      const paymentMethodInfo = formData.paymentMethod ? `\nPAYMENT METHOD:\n${formData.paymentMethod}` : ""

      const formDataToSend = new FormData()
      formDataToSend.append("access_key", "aabb04ff-ba9b-4ba6-b363-195862d42ed2")
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("subject", `New Order - Shipping Quote Needed - Total: $${total.toFixed(2)}`)
      formDataToSend.append("from_name", "Red Suk Order System")
      formDataToSend.append("replyto", formData.email)
      formDataToSend.append("redirect", "https://web3forms.com/success")
      formDataToSend.append("botcheck", "")
      formDataToSend.append(
        "message",
        `NEW ORDER REQUIRING SHIPPING QUOTE

CUSTOMER INFORMATION:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

SHIPPING ADDRESS:
Address: ${formData.address}
City: ${formData.city}
Country: ${formData.country}

ORDER DETAILS:
${formData.message}

--- ORDER SUMMARY ---
${orderSummary}

Subtotal: $${getSubtotal().toLocaleString()}
Shipping: TO BE CALCULATED BASED ON COUNTRY
Total (before shipping): $${total.toFixed(2)}${paymentMethodInfo}

NEXT STEPS:
1. Calculate shipping cost for ${formData.country}
2. Send total cost to customer
3. Customer will then proceed with payment via ${formData.paymentMethod || "their preferred method"}

This is an automated order request from Red Suk online store.`,
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
        setFormData({ name: "", email: "", phone: "", address: "", city: "", country: "", message: "", paymentMethod: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.address && formData.city && formData.country && formData.paymentMethod) { // Added paymentMethod to the condition
      setCurrentStep("payment")
    }
  }

  if (isLoading) {
    return <div className="min-h-screen bg-white" />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="w-full z-50 bg-white border-b border-neutral-200">
        <div className="w-full px-12 lg:px-20 flex justify-between items-center py-0">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <Image src="/images/logo.webp" alt="Rediet Haddis" width={800} height={300} className="h-16 w-auto" priority quality={85} />
          </Link>
        </div>
      </nav>

      {/* Back Button */}
      <div className="pt-32 pb-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="pb-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-8">
            <div
              className={`flex items-center space-x-2 ${currentStep === "shipping" ? "text-blue-600" : "text-green-600"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "shipping" ? "bg-blue-600 text-white" : "bg-green-600 text-white"}`}
              >
                {currentStep === "payment" ? "✓" : "1"}
              </div>
              <span className="font-medium">Shipping Information</span>
            </div>
            <div className={`w-16 h-px ${currentStep === "payment" ? "bg-blue-600" : "bg-neutral-300"}`}></div>
            <div
              className={`flex items-center space-x-2 ${currentStep === "payment" ? "text-blue-600" : "text-neutral-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "payment" ? "bg-blue-600 text-white" : "bg-neutral-300 text-neutral-600"}`}
              >
                2
              </div>
              <span className="font-medium">Order Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {currentStep === "shipping" ? (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-light leading-tight mb-4 text-black">Shipping Information</h1>
                <p className="text-lg text-neutral-600 mb-4">
                  Please provide your shipping details so we can calculate delivery costs
                </p>
                <div className="w-20 h-px bg-neutral-300 mx-auto"></div>
              </div>

              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="p-8 rounded-lg border border-neutral-200 bg-neutral-50">
                    <div className="flex items-center gap-3 mb-6">
                      <User className="h-6 w-6 text-blue-600" />
                      <h2 className="text-xl font-medium text-black">Personal Information</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1-234-567-8900"
                      />
                    </div>
                  </div>

                  <div className="p-8 rounded-lg border border-neutral-200 bg-neutral-50">
                    <div className="flex items-center gap-3 mb-6">
                      <Globe className="h-6 w-6 text-blue-600" />
                      <h2 className="text-xl font-medium text-black">Shipping Address</h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="123 Main Street, Apt 4B"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-2">
                            Country *
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Country</option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Brunei">Brunei</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cabo Verde">Cabo Verde</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czechia (Czech Republic)">Czechia (Czech Republic)</option>
                            <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Eswatini (fmr. Swaziland)">Eswatini (fmr. Swaziland)</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Greece">Greece</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Holy See">Holy See</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Laos">Laos</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libya">Libya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia">Micronesia</option>
                            <option value="Moldova">Moldova</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar (formerly Burma)">Myanmar (formerly Burma)</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="North Korea">North Korea</option>
                            <option value="North Macedonia">North Macedonia</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Palestine State">Palestine State</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Romania">Romania</option>
                            <option value="Russia">Russia</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Korea">South Korea</option>
                            <option value="South Sudan">South Sudan</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syria">Syria</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-Leste">Timor-Leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg border border-blue-300 bg-blue-50">
                      <h3 className="font-medium mb-3 text-blue-800">📦 Delivery Information</h3>
                      <p className="text-sm text-blue-700">
                        Delivery costs vary by country. After you submit this form, we'll calculate the exact shipping
                        cost for your location and email you the total amount including delivery charges.
                      </p>
                    </div>

                    <div className="p-8 rounded-lg border border-neutral-200 bg-neutral-50">
                      <div className="flex items-center gap-3 mb-6">
                        <Globe className="h-6 w-6 text-blue-600" />
                        <h2 className="text-xl font-medium text-black">Payment Method</h2>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="wise"
                            name="paymentMethod"
                            value="Wise"
                            checked={formData.paymentMethod === "Wise"}
                            onChange={handleInputChange}
                            required
                            className="w-4 h-4 text-blue-600 border-neutral-300 focus:ring-blue-500"
                          />
                          <label htmlFor="wise" className="ml-3 text-sm text-neutral-700 cursor-pointer">
                            Wise (+251-911-234567)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="telebirr"
                            name="paymentMethod"
                            value="Telebirr"
                            checked={formData.paymentMethod === "Telebirr"}
                            onChange={handleInputChange}
                            required
                            className="w-4 h-4 text-blue-600 border-neutral-300 focus:ring-blue-500"
                          />
                          <label htmlFor="telebirr" className="ml-3 text-sm text-neutral-700 cursor-pointer">
                            Telebirr
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="bank"
                            name="paymentMethod"
                            value="International Bank Transfer (Commercial Bank of Ethiopia)"
                            checked={formData.paymentMethod === "International Bank Transfer (Commercial Bank of Ethiopia)"}
                            onChange={handleInputChange}
                            required
                            className="w-4 h-4 text-blue-600 border-neutral-300 focus:ring-blue-500"
                          />
                          <label htmlFor="bank" className="ml-3 text-sm text-neutral-700 cursor-pointer">
                            International Bank Transfer (CBE)
                          </label>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={!formData.paymentMethod}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Order Confirmation
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-light leading-tight mb-4 text-black">Order Confirmation</h1>
                <p className="text-lg text-neutral-600 mb-4">
                  Submit your order details and we'll email you the total cost including delivery
                </p>
                <div className="w-20 h-px bg-neutral-300 mx-auto"></div>
              </div>

              <div className="grid lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div className="p-6 rounded-lg border border-green-300 bg-green-50">
                    <h3 className="font-medium mb-4 text-green-800">✅ Shipping Information Confirmed</h3>
                    <div className="text-sm text-green-700 space-y-1">
                      <p>
                        <strong>Name:</strong> {formData.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {formData.email}
                      </p>
                      {formData.phone && (
                        <p>
                          <strong>Phone:</strong> {formData.phone}
                        </p>
                      )}
                      <p>
                        <strong>Address:</strong> {formData.address}
                      </p>
                      <p>
                        <strong>City:</strong> {formData.city}
                      </p>
                      <p>
                        <strong>Country:</strong> {formData.country}
                      </p>
                      <p>
                        <strong>Payment Method:</strong> {formData.paymentMethod}
                      </p>
                    </div>
                    <Button
                      onClick={() => setCurrentStep("shipping")}
                      variant="outline"
                      size="sm"
                      className="mt-3 border-green-600 text-green-700 hover:bg-green-100"
                    >
                      Edit Shipping Info
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-2xl font-medium text-black">Submit Order for Quote</h2>
                    <div className="p-6 rounded-lg border border-blue-300 bg-blue-50">
                      <h3 className="font-medium mb-4 text-blue-800">📧 Get Your Total Cost</h3>
                      <p className="text-sm text-blue-700 mb-6">
                        Submit your order and we'll email you the total cost including delivery charges for{" "}
                        {formData.country}. You can then proceed with payment using our bank details.
                      </p>

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-3">
                            Preferred Payment Method *
                          </label>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="wise"
                                name="paymentMethod"
                                value="Wise"
                                checked={formData.paymentMethod === "Wise"}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 border-neutral-300 focus:ring-blue-500"
                              />
                              <label htmlFor="wise" className="ml-3 text-sm text-blue-800 cursor-pointer">
                                Wise (+251-911-234567)
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="telebirr"
                                name="paymentMethod"
                                value="Telebirr"
                                checked={formData.paymentMethod === "Telebirr"}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 border-neutral-300 focus:ring-blue-500"
                              />
                              <label htmlFor="telebirr" className="ml-3 text-sm text-blue-800 cursor-pointer">
                                Telebirr
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="bank"
                                name="paymentMethod"
                                value="International Bank Transfer (Commercial Bank of Ethiopia)"
                                checked={formData.paymentMethod === "International Bank Transfer (Commercial Bank of Ethiopia)"}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 border-neutral-300 focus:ring-blue-500"
                              />
                              <label htmlFor="bank" className="ml-3 text-sm text-blue-800 cursor-pointer">
                                International Bank Transfer (Card)
                              </label>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-blue-800 mb-1">
                            Additional Notes (Optional)
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Any special instructions or questions about your order..."
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting || !formData.paymentMethod} // disabled until payment method is selected
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Submitting Order...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Submit Order for Quote
                            </>
                          )}
                        </Button>

                        {submitStatus === "success" && (
                          <div className="p-4 rounded-md bg-green-100 border border-green-300">
                            <p className="text-sm text-green-700">
                              ✅ Order submitted successfully! We'll email you the total cost including delivery charges
                              within 24 hours.
                            </p>
                          </div>
                        )}

                        {submitStatus === "error" && (
                          <div className="p-4 rounded-md bg-red-100 border border-red-300">
                            <p className="text-sm text-red-700">
                              ❌ Failed to submit order. Please try again or contact us directly.
                            </p>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>


                  

                  

                  
                </div> 
                <div className="space-y-6">
                  <div className="p-8 rounded-lg border border-neutral-200 bg-neutral-50">
                    <h2 className="text-xl font-medium mb-6 text-black">Order Summary</h2>

                    <div className="space-y-6 mb-8">
                      {state.items.map((item, index) => (
                        <div key={`${item.id}-${item.selectedPanel}-${index}`} className="flex gap-4">
                          <div className="w-16 h-16 bg-neutral-100 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              quality={75}
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm text-black">{item.title}</h3>
                            <p className="text-xs text-neutral-500 mb-1">{item.category}</p>
                            {item.selectedPanel && (
                              <p className="text-xs text-neutral-500 mb-1">Panel: {item.selectedPanel}</p>
                            )}
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-neutral-500">Qty: {item.quantity}</span>
                              <span className="text-sm font-medium text-black">{item.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 pt-6 border-t border-neutral-300">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Subtotal</span>
                        <span className="text-black">${getSubtotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Shipping to {formData.country}</span>
                        <span className="text-black">To be calculated</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-neutral-300">
                        <span className="text-lg font-medium text-black">Total (before shipping)</span>
                        <span className="text-lg font-medium text-black">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-lg border-2 border-yellow-300 bg-yellow-50">
                      <div className="text-center">
                        <p className="text-sm font-medium text-yellow-800 mb-1">Awaiting Final Quote</p>
                        <p className="text-lg font-bold text-yellow-700">Subtotal: ${total.toFixed(2)} USD</p>
                        <p className="text-xs text-yellow-600 mt-1">+ Shipping cost for {formData.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
