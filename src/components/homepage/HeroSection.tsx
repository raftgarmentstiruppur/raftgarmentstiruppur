"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import CountUp from "@/components/shared/CountUp"
import { ArrowRight } from "lucide-react"

interface HeroSectionProps {
  headline: string
  subheadline: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
}

const stats = [
  { value: "30+", label: "Years" },
  { value: "100K", label: "Pieces / Day" },
  { value: "40+", label: "Countries" },
  { value: "18", label: "Facilities" },
]

const ease = [0.22, 0.61, 0.36, 1] as const

export default function HeroSection({ headline, subheadline, ctaPrimary, ctaSecondary }: HeroSectionProps) {
  const words = headline.split(" ")

  return (
    <section className="relative min-h-screen bg-white flex flex-col justify-between pt-16 overflow-hidden">

      {/* Full-bleed video behind text */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-[0.08]">
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Top bar */}
      <div className="relative z-10 border-b-2 border-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between py-3">
            <motion.span
              className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
            >
              Est. 1993 — Tirupur, India
            </motion.span>
            <motion.span
              className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}
            >
              01 / Home
            </motion.span>
          </div>
        </div>
      </div>

      {/* Main headline */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full py-12">
          <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-end">

            {/* Left — display headline */}
            <div>
              <motion.h1
                className="font-display uppercase leading-[0.88] tracking-tight text-brand-navy"
                style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
              >
                {words.map((word, i) => (
                  <span key={i} className={i % 3 === 1 ? "text-brand-accent" : ""}>{word}{" "}</span>
                ))}
              </motion.h1>

              <motion.div
                className="flex flex-col sm:flex-row items-start gap-3 mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55, ease }}
              >
                <Link href={ctaPrimary.href} className="inline-flex items-center gap-2.5 bg-brand-navy text-white border-2 border-brand-navy font-heading font-700 text-xs uppercase tracking-widest px-8 py-4 hover:bg-white hover:text-brand-navy transition-all duration-200">
                  {ctaPrimary.label} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href={ctaSecondary.href} className="inline-flex items-center gap-2.5 bg-transparent text-brand-navy border-2 border-brand-navy font-heading font-700 text-xs uppercase tracking-widest px-8 py-4 hover:bg-brand-navy hover:text-white transition-all duration-200">
                  {ctaSecondary.label}
                </Link>
              </motion.div>
            </div>

            {/* Right — subheading + vertical rule */}
            <motion.div
              className="lg:border-l-2 lg:border-brand-navy lg:pl-8 pb-2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease }}
            >
              <p className="text-sm font-heading font-700 uppercase tracking-[0.2em] text-brand-ash mb-4">About</p>
              <p className="text-base text-brand-slate leading-relaxed font-sans">{subheadline}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats bar — full width, bottom */}
      <motion.div
        className="relative z-10 border-t-2 border-brand-navy"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7, ease }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-brand-navy">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center py-6 px-4 bg-white hover:bg-brand-navy group transition-colors duration-300 cursor-default">
              <div className="text-3xl md:text-4xl font-display text-brand-navy group-hover:text-white leading-none transition-colors duration-300">
                <CountUp value={stat.value} />
              </div>
              <div className="text-[9px] font-heading font-700 uppercase tracking-[0.25em] text-brand-ash group-hover:text-white/60 mt-1.5 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
