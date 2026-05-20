"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import CTAButton from "@/components/shared/CTAButton"
import FloatingElements from "@/components/shared/FloatingElements"
import MagneticButton from "@/components/shared/MagneticButton"
import type { StatItem } from "@/types"

const UNSPLASH_ECO = "https://images.unsplash.com/photo-1487088678257-3a541e6e3922?w=1920&auto=format&fit=crop"

const fadeUp  = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 18, mass: 0.8 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
const statVar = { hidden: { opacity: 0, scale: 0.9, y: 20 }, show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 16 } } }

interface SustainabilityBannerProps {
  headline: string
  stats: StatItem[]
  ctaLabel: string
  ctaHref: string
}

export default function SustainabilityBanner({ headline, stats, ctaLabel, ctaHref }: SustainabilityBannerProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

  return (
    <section ref={sectionRef} className="relative bg-brand-dark py-16 md:py-20 overflow-hidden">
      {/* Parallax background image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none"
      >
        <Image
          src={UNSPLASH_ECO}
          alt=""
          fill
          unoptimized
          className="object-cover opacity-25"
        />
      </motion.div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-dark/80 pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-accent/0 via-brand-accent to-brand-accent/0" />

      {/* Massive watermark */}
      <span aria-hidden className="absolute inset-0 flex items-center justify-center text-[22vw] font-black text-white/[0.025] leading-none select-none pointer-events-none uppercase tracking-tight overflow-hidden">
        SUSTAINABLE
      </span>

      {/* Floating elements */}
      <FloatingElements variant="dark" count={5} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Header row */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-10"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div>
            <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.25em] text-brand-accent mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-brand-accent" />
              Sustainability
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                variants={fadeUp}
                className="text-display-lg font-black text-white uppercase tracking-tight"
              >
                {headline}
              </motion.h2>
            </div>
          </div>
          <motion.div variants={fadeUp} className="shrink-0">
            <MagneticButton>
              <CTAButton label={ctaLabel} href={ctaHref} variant="outline-light" size="lg" arrow />
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Stats grid — glass cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={statVar}
              className="group glass-card py-12 px-8 text-center cursor-default"
            >
              <div className="text-5xl md:text-7xl font-black text-brand-accent mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-xs font-black text-white/70 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.ul
          className="mt-10 space-y-3 max-w-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {[
            "Powered by 100% renewable energy — solar and wind, not the grid",
            "Sustainability certifications renewed annually across all operations",
            "Every garment carries our commitment to a greener planet",
          ].map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-2 w-2 h-2 rounded-full bg-brand-accent shrink-0" />
              <span className="text-base text-white/80 leading-relaxed text-justify">{point}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
