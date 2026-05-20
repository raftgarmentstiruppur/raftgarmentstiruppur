"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, MessageCircle } from "lucide-react"
import { quoteSchema, type QuoteInput } from "@/lib/validations"
import { cn } from "@/lib/utils"

const WA_NUMBER = "919843166345"

const productOptions = [
  "Kids' Innerwear",
  "Men's Innerwear",
  "Women's Innerwear",
  "Outerwear",
  "Seamless / Bonded Underwear",
  "Shapewear / Swimwear",
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

function buildWhatsAppMessage(data: QuoteInput): string {
  return encodeURIComponent(
    `*New Enquiry — Raft Garments*\n\n` +
    `*Company:* ${data.company}\n` +
    `*Name:* ${data.name}\n` +
    `*Email:* ${data.email}\n` +
    `*Phone:* ${data.phone || "—"}\n` +
    `*Country:* ${data.country}\n` +
    `*Product Category:* ${data.product}\n` +
    `*Inquiry Type:* ${data.inquiryType}\n\n` +
    `*Message:*\n${data.message}`
  )
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({ resolver: zodResolver(quoteSchema) })

  function onSubmit(data: QuoteInput) {
    const msg = buildWhatsAppMessage(data)
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer")
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="border border-brand-border p-8 text-center space-y-4">
        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        <p className="font-bold text-brand-navy text-lg uppercase tracking-tight">WhatsApp Opened!</p>
        <p className="text-brand-slate text-sm leading-relaxed">
          Your enquiry has been prepared. Complete sending it on WhatsApp — our team will respond promptly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-brand-accent underline underline-offset-2 hover:text-brand-accent-hover"
        >
          Send another enquiry
        </button>
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1">
            Company Name *
          </label>
          <input
            suppressHydrationWarning
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
            suppressHydrationWarning
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
            suppressHydrationWarning
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
            suppressHydrationWarning
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
          suppressHydrationWarning
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
            suppressHydrationWarning
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
            suppressHydrationWarning
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
          suppressHydrationWarning
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
        suppressHydrationWarning
        disabled={isSubmitting}
        className="w-full bg-[#25D366] text-white font-bold py-3 text-xs uppercase tracking-widest hover:bg-[#1ebe5d] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {isSubmitting
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Preparing…</>
          : <><MessageCircle className="w-4 h-4" /> Send via WhatsApp</>
        }
      </button>
    </form>
  )
}
