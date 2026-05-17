"use client"

import { useState } from "react"

interface NewsletterSignupProps {
  headline: string
  description: string
  placeholder: string
  buttonLabel: string
}

export default function NewsletterSignup({
  headline,
  description,
  placeholder,
  buttonLabel,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="py-section bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-4">
          Stay Connected
        </p>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{headline}</h2>
        <p className="mt-3 text-white/50 text-sm leading-relaxed">{description}</p>

        {submitted ? (
          <p className="mt-8 text-brand-accent font-bold uppercase tracking-wide text-sm">
            Thank you — we&apos;ll be in touch soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-0"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              autoComplete="email"
              name="email"
              className="flex-1 bg-white/5 border border-white/20 text-white placeholder:text-white/30 px-5 py-4 text-sm outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="bg-brand-accent text-white font-bold px-8 py-4 text-xs uppercase tracking-widest hover:bg-brand-accent-hover transition-colors shrink-0"
            >
              {buttonLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
