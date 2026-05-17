"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { quoteSchema, type QuoteInput } from "@/lib/validations"
import { cn } from "@/lib/utils"

const productOptions = [
  "Babies Wear",
  "Kids Wear",
  "Mens Wear",
  "Womens Wear & Nightwear",
  "Mixed / Multiple Categories",
]
const inquiryTypes = [
  "Wholesale Order",
  "Private Label",
  "Sampling",
  "Distributor Program",
  "General Inquiry",
  "Other",
]

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({ resolver: zodResolver(quoteSchema) })

  async function onSubmit(data: QuoteInput) {
    setServerError("")
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const json = await res.json()
      setServerError(json.error ?? "Submission failed. Please try again.")
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="border border-brand-border p-8 text-center">
        <p className="font-bold text-black text-lg uppercase tracking-tight">Thank you for your message!</p>
        <p className="text-brand-slate mt-2 text-sm">
          Our team will respond within 1–2 business days. Check your email for a confirmation.
        </p>
      </div>
    )
  }

  const cls = (hasError: boolean) =>
    cn(
      "w-full border px-4 py-2.5 text-sm outline-none transition-colors",
      hasError
        ? "border-red-400 focus:border-red-500"
        : "border-brand-border focus:border-brand-accent"
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="on">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1">
            Company Name *
          </label>
          <input
            autoComplete="organization"
            placeholder="Your company"
            {...register("company")}
            className={cls(!!errors.company)}
          />
          {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1">
            Contact Name *
          </label>
          <input
            autoComplete="name"
            placeholder="Your name"
            {...register("name")}
            className={cls(!!errors.name)}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1">
            Email *
          </label>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            {...register("email")}
            className={cls(!!errors.email)}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1">
            Phone
          </label>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
            {...register("phone")}
            className={cls(false)}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1">
          Country *
        </label>
        <input
          autoComplete="country-name"
          placeholder="Your country"
          {...register("country")}
          className={cls(!!errors.country)}
        />
        {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1">
            Product Category *
          </label>
          <select
            autoComplete="off"
            {...register("product")}
            className={cn(cls(!!errors.product), "bg-white")}
          >
            <option value="">Select category</option>
            {productOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.product && <p className="mt-1 text-xs text-red-600">{errors.product.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1">
            Inquiry Type *
          </label>
          <select
            autoComplete="off"
            {...register("inquiryType")}
            className={cn(cls(!!errors.inquiryType), "bg-white")}
          >
            <option value="">Select type</option>
            {inquiryTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.inquiryType && <p className="mt-1 text-xs text-red-600">{errors.inquiryType.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1">
          Message *
        </label>
        <textarea
          rows={5}
          autoComplete="off"
          placeholder="Tell us about your requirements, quantities, timelines..."
          {...register("message")}
          className={cn(cls(!!errors.message), "resize-none")}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white font-bold py-3 text-xs uppercase tracking-widest hover:bg-brand-charcoal transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  )
}
