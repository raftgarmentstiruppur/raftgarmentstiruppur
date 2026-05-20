"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"

const UNSPLASH_KNITTING = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&auto=format&fit=crop"

interface NewsletterSignupProps {
  headline: string
  description: string
  placeholder: string
  buttonLabel: string
}

export default function NewsletterSignup({ headline, description, placeholder, buttonLabel }: NewsletterSignupProps) {
  const [email, setEmail]         = useState("")
  const [submitted, setSubmitted] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section ref={sectionRef} className="relative bg-brand-dark overflow-hidden">
      {/* Parallax background image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
      >
        <Image src={UNSPLASH_KNITTING} alt="" fill unoptimized className="object-cover opacity-20" />
      </motion.div>
      <div className="absolute inset-0 bg-brand-dark/80 pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-accent to-transparent" />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-[380px]">

        {/* Left — headline */}
        <div className="lg:w-[55%] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-14 border-b lg:border-b-0 lg:border-r border-white/10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 65, damping: 18 }}
          >
            <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-accent mb-5 flex items-center gap-3">
              <span className="w-6 h-0.5 bg-brand-accent" />
              Stay Connected
            </p>
            <div className="overflow-hidden">
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.92]"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] as const }}
              >
                {headline}
              </motion.h2>
            </div>
            <motion.div
              className="w-12 h-1 bg-brand-accent mt-5"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.76, 0, 0.24, 1] as const }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        </div>

        {/* Right — form */}
        <div className="lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-14">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 65, damping: 18, delay: 0.15 }}
          >
            <p className="text-white/85 leading-relaxed mb-8 text-lg text-justify">{description}</p>

            {submitted ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-brand-accent font-black uppercase tracking-widest text-sm flex items-center gap-3"
              >
                <span className="w-5 h-5 bg-brand-accent flex items-center justify-center text-white text-xs">✓</span>
                Thank you — we&apos;ll be in touch soon.
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  required
                  autoComplete="email"
                  name="email"
                  suppressHydrationWarning
                  className="flex-1 bg-white/[0.06] border border-white/20 text-white placeholder:text-white/50 px-5 py-4 text-sm outline-none focus:border-brand-accent transition-all duration-300 min-w-0"
                />
                <button
                  type="submit"
                  className="group relative overflow-hidden bg-brand-accent text-white font-black px-6 py-4 text-xs uppercase tracking-widest shrink-0 flex items-center gap-2"
                  suppressHydrationWarning
                >
                  <span className="absolute inset-0 bg-brand-accent-hover -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                  <span className="relative z-10">{buttonLabel}</span>
                  <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
