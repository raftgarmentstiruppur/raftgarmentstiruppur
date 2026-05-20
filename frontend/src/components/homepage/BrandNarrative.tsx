"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { StatItem } from "@/types"
import CTAButton from "@/components/shared/CTAButton"
import FloatingElements from "@/components/shared/FloatingElements"
import MagneticButton from "@/components/shared/MagneticButton"
import { useContentValue } from "@/context/ContentContext"

const FALLBACK_IMG = "/images/brand-narrative.png"

interface BrandNarrativeProps {
  eyebrow: string
  statement: string
  body: string
  ctaLabel: string
  ctaHref: string
  stat1: StatItem
  stat2: StatItem
  stat3: StatItem
  stat4?: StatItem
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }
const fadeUp  = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 18, mass: 0.8 } },
}

export default function BrandNarrative({ eyebrow, statement, body, ctaLabel, ctaHref, stat1, stat2, stat3, stat4 }: BrandNarrativeProps) {
  const narrativeImage = useContentValue("brand-narrative-image", FALLBACK_IMG)
  const statItems = [stat1, stat2, stat3, ...(stat4 ? [stat4] : [])]

  return (
    <section className="flex flex-col lg:flex-row">

      {/* ── Left 55% — image panel, self-contained height ── */}
      <motion.div
        className="relative lg:w-[55%] overflow-hidden bg-brand-navy"
        style={{ minHeight: "clamp(480px, 65vw, 800px)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        {/* Image — contain so no content is cropped */}
        <Image
          src={narrativeImage}
          alt="Raft Garments Factory"
          fill
          unoptimized
          className="object-contain object-center"
          sizes="(max-width: 768px) 100vw, 55vw"
        />

        {/* Decorative number stamp */}
        <div className="absolute bottom-8 left-8 z-10">
          <span className="text-[7rem] font-black text-white/[0.07] leading-none select-none">40+</span>
        </div>
      </motion.div>

      {/* ── Right 45% — dark text + stats ── */}
      <div className="relative lg:w-[45%] bg-brand-dark flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 overflow-hidden">
        <FloatingElements variant="dark" count={3} />

        <div className="relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.25em] text-brand-accent mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-brand-accent" />
              {eyebrow}
            </motion.p>

            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold font-sans text-white tracking-tight leading-[0.96] mb-5">
              {statement}
            </motion.h2>

            <motion.div variants={fadeUp} className="w-12 h-1 bg-brand-accent mb-7" />

            <motion.p variants={fadeUp} className="text-lg text-white/80 leading-relaxed mb-10 max-w-sm text-justify">
              {body}
            </motion.p>

            <motion.div variants={fadeUp}>
              <MagneticButton>
                <CTAButton label={ctaLabel} href={ctaHref} variant="outline-light" size="lg" arrow />
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-10"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {statItems.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="border-t border-white/10 py-4 flex flex-col gap-1"
              >
                <span className="text-4xl md:text-5xl font-black text-brand-accent leading-none">
                  {stat.value}
                </span>
                <span className="text-xs font-black text-white/60 uppercase tracking-widest leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
