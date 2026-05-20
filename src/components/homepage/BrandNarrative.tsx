"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import CountUp from "@/components/shared/CountUp"
import type { StatItem } from "@/types"

interface BrandNarrativeProps {
  eyebrow: string; statement: string; body: string
  ctaLabel: string; ctaHref: string
  stat1: StatItem; stat2: StatItem; stat3: StatItem
}

const ease = [0.22, 0.61, 0.36, 1] as const

export default function BrandNarrative({ eyebrow, statement, body, ctaLabel, ctaHref, stat1, stat2, stat3 }: BrandNarrativeProps) {
  const stats = [stat1, stat2, stat3]
  return (
    <section className="bg-brand-navy text-white border-t-2 border-brand-navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Top label row */}
        <div className="border-b border-white/10 py-5 flex items-center gap-5">
          <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-white/30">04</span>
          <div className="h-px w-10 bg-white/20" />
          <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">{eyebrow}</span>
        </div>

        <div className="py-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase leading-[0.92] text-white mb-8">
              {statement}
            </h2>
            <Link href={ctaHref} className="inline-flex items-center gap-2.5 text-xs font-heading font-700 uppercase tracking-widest text-white border-b-2 border-white/30 hover:border-brand-accent hover:text-brand-accent pb-1 transition-all duration-200">
              {ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            className="space-y-6"
          >
            <p className="text-base text-white/60 leading-relaxed">{body}</p>
            <div className="grid grid-cols-3 border-2 border-white/20 divide-x-2 divide-white/20">
              {stats.map((s) => (
                <div key={s.label} className="text-center py-7 px-3">
                  <div className="text-3xl md:text-4xl font-display text-white"><CountUp value={s.value} /></div>
                  <div className="text-[9px] font-heading font-700 uppercase tracking-[0.2em] text-white/40 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
