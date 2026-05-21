"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import CTAButton from "@/components/shared/CTAButton"
import MagneticButton from "@/components/shared/MagneticButton"

interface HeroSectionProps {
  headline: string
  subheadline: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  bgImage?: string
}

export default function HeroSection({ headline, ctaPrimary, ctaSecondary }: HeroSectionProps) {
  return (
    <section className="relative h-screen overflow-hidden" style={{ background: "linear-gradient(135deg, #06194A 0%, #0B2D6E 50%, #0E3A8C 100%)" }}>

      {/* Video */}
      <video
        autoPlay muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] md:h-[45%] bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 sm:pb-10 md:pb-14">
        <div className="px-5 sm:px-8 md:px-12 lg:px-16">
          <motion.h1
            className="text-white mb-4 md:mb-5"
            style={{
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
              fontWeight: 900,
              fontSize: "clamp(2rem, 6vw, 5.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              wordBreak: "break-word",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            {headline}
          </motion.h1>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45 }}
          >
            <MagneticButton>
              <CTAButton label={ctaPrimary.label} href={ctaPrimary.href} variant="primary" size="lg" arrow />
            </MagneticButton>
            <MagneticButton>
              <CTAButton label={ctaSecondary.label} href={ctaSecondary.href} variant="outline-light" size="lg" />
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 right-10 z-10 hidden lg:flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" as const }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
        <span className="text-[8px] font-bold uppercase tracking-widest text-white/30 [writing-mode:vertical-rl] mt-1">Scroll</span>
      </motion.div>
    </section>
  )
}
