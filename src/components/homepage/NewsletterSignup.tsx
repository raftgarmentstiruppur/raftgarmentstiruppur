"use client"
import { useState } from "react"

export default function NewsletterSignup({ headline, description, placeholder, buttonLabel }: { headline: string; description: string; placeholder: string; buttonLabel: string }) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="bg-brand-off-white border-t-2 border-brand-navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-5 mb-5">
              <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">09</span>
              <div className="h-px w-10 bg-brand-navy" />
              <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">Stay Connected</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display uppercase leading-[0.92] text-brand-navy">{headline}</h2>
            <p className="mt-3 text-brand-slate text-sm leading-relaxed">{description}</p>
          </div>
          <div>
            {submitted ? (
              <p className="text-brand-accent font-heading font-700 uppercase tracking-widest text-sm">Thank you — we&apos;ll be in touch.</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true) }} className="flex border-2 border-brand-navy">
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder} required autoComplete="email" name="email"
                  className="flex-1 bg-white px-5 py-4 text-sm text-brand-navy placeholder:text-brand-ash outline-none font-sans"
                />
                <button type="submit" className="bg-brand-navy text-white font-heading font-700 px-8 py-4 text-xs uppercase tracking-widest hover:bg-brand-accent transition-colors shrink-0">
                  {buttonLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
