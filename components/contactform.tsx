//components/contactform.tsx
"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Send, CheckCircle, XCircle } from "lucide-react"
import emailjs from "@emailjs/browser"
import { EnhancedButton } from "@/components/ui/enhancedbutton"

type FormStatus = "idle" | "submitting" | "success" | "error"

export function ContactForm() {
    const form = useRef<HTMLFormElement>(null)
    const resetTimerRef = useRef<number | null>(null)

    const [formStatus, setFormStatus] = useState<FormStatus>("idle")
    const [formError, setFormError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        branch: "",
        subject: "",
        message: "",
    })

    const emptyForm = () => ({
        name: "",
        email: "",
        phone: "",
        company: "",
        branch: "",
        subject: "",
        message: "",
    })

    const scheduleReset = (ms = 5000) => {
        if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current)
        resetTimerRef.current = window.setTimeout(() => {
            setFormStatus("idle")
            setFormData(emptyForm())
            setFormError(null)
        }, ms) as unknown as number
    }

    useEffect(() => {
        return () => {
            if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current)
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!form.current || formStatus === "submitting") return
        setFormStatus("submitting")
        setFormError(null)

        // TODO: move these to env vars and pass via next public env
        const serviceID = "service_p7uk29z"
        const templateID = "template_76b9r1e"
        const publicKey = "L58xMleRPsfxyqJqT"

        try {
            const formDataObj = new FormData(form.current)
            const formattedMessage =
                `Details:\n` +
                `Name: ${formDataObj.get("name")}\n` +
                `Email Address: ${formDataObj.get("email")}\n` +
                `Phone: ${formDataObj.get("phone") || "-"}\n` +
                `Company: ${formDataObj.get("company") || "-"}\n` +
                `Branch: ${formDataObj.get("branch") || "-"}\n` +
                `Subject: ${formDataObj.get("subject") || "-"}\n\n` +
                `Message: ${formDataObj.get("message")}`

            await emailjs.send(
                serviceID,
                templateID,
                {
                    to_name: "Parker Express Shipping LLC",
                    from_name: `${formDataObj.get("name")}`,
                    reply_to: `${formDataObj.get("email")}`,
                    message: formattedMessage,
                },
                publicKey
            )

            setFormStatus("success")
            setFormData(emptyForm())
            scheduleReset(10000) // back to form after 10s
        } catch (err) {
            console.error("Email send failed:", err)
            setFormStatus("error")
            setFormError("Email not sent. Please try again.")
            scheduleReset(10000) // back to form after 10s
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const isSubmitting = formStatus === "submitting"

    return (
        <section className="" aria-live="polite">
            <div className="">
                <Card className="border-black transform transition-all duration-300 shadow-lg hover:shadow-xl">
                    <CardContent className="px-8 py-2">
                        <div className="mb-8">
                            <h2 className="text-3xl text-center font-serif font-bold text-primary mb-4">
                                Send Us a Message
                            </h2>
                            <p className="mt-2 text-center text-muted-foreground">
                                Fill out the form and our team will reply within one business day.
                            </p>
                        </div>

                        {/* FORM (idle/submitting) */}
                        {(formStatus === "idle" || formStatus === "submitting") && (
                            <form ref={form} key="form" onSubmit={handleSubmit} className=" block text-sm font-medium text-foreground mb-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                                    <div className="mb-6">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 focus-ring"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 focus-ring"
                                            placeholder="enter your email address"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                                    <div className="mb-6">
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 focus-ring"
                                            placeholder="enter your phone number"
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 focus-ring"
                                            placeholder="enter your company name"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="branch" className="block text-sm font-medium text-foreground mb-2">
                                        Branch
                                    </label>
                                    <select
                                        id="branch"
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 focus-ring bg-white"
                                    >
                                        <option value="">Select a branch (optional)</option>
                                        <optgroup label="OMAN">
                                            <option value="Oman – Sohar">PARKER EXPRESS SHIPPING AND DEVELOPMENT SPC, Sohar, Oman</option>
                                        </optgroup>
                                        <optgroup label="INDIA">
                                            <option value="India – Mangalore">PAREX SHIPPING INDIA PVT, Mangalore</option>
                                            <option value="India – Gandhidham">PAREX INDIA PVT BR., Gandhidham, Kutch</option>
                                        </optgroup>
                                        <optgroup label="UAE">
                                            <option value="UAE – Ras Al Khaimah (RAKEZ)">Ras Al Khaimah – RAKEZ Amenity Center</option>
                                            <option value="UAE – Head Office (Julphar Towers)">Head Office – Julphar Towers, RAK</option>
                                            <option value="UAE – Sharjah (HFZE)">Sharjah – Hamriyah Free Zone (HFZE)</option>
                                            <option value="UAE – Al Hamra Free Zone">Al Hamra Industrial Free Zone, RAK</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 focus-ring"
                                        placeholder="enter the subject"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200 focus-ring"
                                        placeholder="Tell us about your project requirements, specifications, or any questions you have..."
                                    />
                                </div>

                                <EnhancedButton
                                    type="submit"
                                    size="lg"
                                    loading={isSubmitting}
                                    glowEffect
                                    disabled={isSubmitting}
                                    className="w-full bg-purple-900 hover:bg-purple-600 text-white font-medium py-4 text-lg group"
                                >
                                    <Send className="mr-2 h-5 w-5" />
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </EnhancedButton>

                                {formError && (
                                    <p className="text-sm text-red-600 text-center" role="alert">
                                        {formError}
                                    </p>
                                )}
                            </form>
                        )}

                        {/* SUCCESS SCREEN */}
                        {formStatus === "success" && (
                            <div className="text-center">
                                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                                    Message Sent Successfully!
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Thank you for contacting us. Our team will get back to you within 24 hours.
                                </p>
                                <div className="animate-pulse text-gray-500 font-medium">Redirecting to form...</div>
                            </div>
                        )}

                        {/* ERROR SCREEN */}
                        {formStatus === "error" && (
                            <div className="text-center">
                                <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                                    <XCircle className="h-8 w-8 text-red-600 mx-auto" />
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                                    Message Not Sent!
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    There was an error sending your message. Please try again later.
                                </p>
                                <div className="animate-pulse text-gray-500 font-medium">Redirecting to form...</div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}