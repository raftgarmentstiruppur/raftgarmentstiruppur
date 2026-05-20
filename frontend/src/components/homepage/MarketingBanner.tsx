"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import CTAButton from "@/components/shared/CTAButton"
import MagneticButton from "@/components/shared/MagneticButton"
import { useContentValue } from "@/context/ContentContext"

const FALLBACK_IMG = "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&auto=format&fit=crop"

interface MarketingBannerProps {
  eyebrow: string
  headline: string
  description: string
  ctaLabel: string
  ctaHref: string
}

export default function MarketingBanner({ eyebrow, headline, description, ctaLabel, ctaHref }: MarketingBannerProps) {
  const cmsHeadline = useContentValue("marketing-banner-headline", headline)
  const cmsBody     = useContentValue("marketing-banner-body",     description)
  const bgImage     = useContentValue("marketing-banner-image",    FALLBACK_IMG)

  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section ref={ref} className="relative overflow-hidden bg-brand-dark min-h-[480px] md:min-h-[520px] flex items-center">

      {/* ── Background image with subtle parallax ── */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 w-full h-[116%] -top-[8%] pointer-events-none">
        <Image src={bgImage} alt="" fill unoptimized className="object-cover opacity-30" />
      </motion.div>
      {/* Darkening overlay — ensures text readability regardless of image */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/40 pointer-events-none" />

      {/* Left accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }}
        style={{ transformOrigin: "top" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full container mx-auto px-8 sm:px-12 lg:px-16 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring" as const, stiffness: 65, damping: 18 }}
          >
            <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-accent mb-6 flex items-center gap-3">
              <span className="w-6 h-0.5 bg-brand-accent" />
              {eyebrow}
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[0.9] mb-5">
              {cmsHeadline}
            </h2>
            <div className="w-12 h-1 bg-brand-accent" />
          </motion.div>

          {/* Right — body + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring" as const, stiffness: 65, damping: 18, delay: 0.12 }}
            className="flex flex-col gap-7"
          >
            <p className="text-xl text-white/85 leading-relaxed text-justify">{cmsBody}</p>
            <MagneticButton>
              <CTAButton label={ctaLabel} href={ctaHref} variant="outline-light" size="lg" arrow />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
