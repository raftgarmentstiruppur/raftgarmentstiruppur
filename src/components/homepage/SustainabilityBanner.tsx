"use client"
import { motion } from "framer-motion"
import CTAButton from "@/components/shared/CTAButton"
import CountUp from "@/components/shared/CountUp"
import type { StatItem } from "@/types"

interface SustainabilityBannerProps {
  headline: string
  stats: StatItem[]
  ctaLabel: string
  ctaHref: string
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function SustainabilityBanner({
  headline,
  stats,
  ctaLabel,
  ctaHref,
}: SustainabilityBannerProps) {
  return (
    <section className="py-section bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-4">
              Sustainability
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none max-w-xl">
              {headline}
            </h2>
          </div>
          <div className="shrink-0">
            <CTAButton
              label={ctaLabel}
              href={ctaHref}
              variant="secondary"
              arrow
            />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="bg-black py-10 px-6 text-center">
              <div className="text-4xl font-black text-white">
                <CountUp value={stat.value} />
              </div>
              <div className="mt-2 text-[10px] text-white/40 uppercase tracking-widest font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-8 text-sm text-white/40 max-w-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Powered by renewable energy — solar and wind — not the grid. Our commitment to the planet is woven into every garment.
        </motion.p>
      </div>
    </section>
  )
}
