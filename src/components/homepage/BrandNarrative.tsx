"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import CountUp from "@/components/shared/CountUp"
import type { StatItem } from "@/types"

interface BrandNarrativeProps {
  eyebrow: string
  statement: string
  body: string
  ctaLabel: string
  ctaHref: string
  stat1: StatItem
  stat2: StatItem
  stat3: StatItem
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function BrandNarrative({
  eyebrow,
  statement,
  body,
  ctaLabel,
  ctaHref,
  stat1,
  stat2,
  stat3,
}: BrandNarrativeProps) {
  const stats = [stat1, stat2, stat3]

  return (
    <section className="py-section bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-6">
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-black to-brand-accent">
              {statement}
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-base md:text-lg text-brand-slate leading-relaxed">
            {body}
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-2 mt-8 text-xs font-bold uppercase tracking-widest text-black border-b-2 border-black hover:border-brand-accent hover:text-brand-accent transition-colors pb-0.5"
            >
              {ctaLabel}{" "}
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats row with count-up */}
        <motion.div
          className="mt-16 grid grid-cols-3 divide-x divide-brand-border border border-brand-border"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center py-10 px-4">
              <div className="text-5xl font-black text-black">
                <CountUp value={stat.value} />
              </div>
              <div className="mt-2 text-xs text-brand-slate font-semibold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
