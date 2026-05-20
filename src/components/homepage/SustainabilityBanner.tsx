"use client"
import { motion } from "framer-motion"
import CTAButton from "@/components/shared/CTAButton"
import CountUp from "@/components/shared/CountUp"
import type { StatItem } from "@/types"

const ease = [0.22, 0.61, 0.36, 1] as const

export default function SustainabilityBanner({ headline, stats, ctaLabel, ctaHref }: { headline: string; stats: StatItem[]; ctaLabel: string; ctaHref: string }) {
  return (
    <section className="bg-brand-accent border-t-2 border-brand-navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="border-b border-white/20 py-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-white/50">07</span>
            <div className="h-px w-10 bg-white/30" />
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-white/70">Sustainability</span>
          </div>
          <CTAButton label={ctaLabel} href={ctaHref} variant="outline-light" />
        </div>

        <div className="py-14 grid md:grid-cols-2 gap-12 items-center">
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-display uppercase leading-[0.9] text-white"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            {headline}
          </motion.h2>

          <div className="grid grid-cols-2 gap-px bg-white/20">
            {stats.map((stat, i) => (
              <motion.div key={stat.label}
                className="bg-brand-accent py-8 px-6 text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.1, ease }}
              >
                <div className="text-3xl md:text-4xl font-display text-white"><CountUp value={stat.value} /></div>
                <div className="text-[9px] font-heading font-700 uppercase tracking-[0.2em] text-white/60 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
