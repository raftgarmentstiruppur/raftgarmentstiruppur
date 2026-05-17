"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
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

function CountUp({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    if (!inView) return
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""))
    if (isNaN(numeric)) { setDisplay(value); return }
    const prefix = value.match(/^[^0-9]*/)?.[0] ?? ""
    const sfx = value.match(/[^0-9.]+$/)?.[0] ?? suffix
    const duration = 1400
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * numeric * 10) / 10
      setDisplay(`${prefix}${current % 1 === 0 ? current.toFixed(0) : current}${sfx}`)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value, suffix])

  return <span ref={ref}>{display}</span>
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function BrandNarrative({
  eyebrow, statement, body, ctaLabel, ctaHref, stat1, stat2, stat3,
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
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.p variants={fadeUp} className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-6">
            {eyebrow}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight text-black leading-tight uppercase">
            {statement}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-base md:text-lg text-brand-slate leading-relaxed">
            {body}
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 mt-8 text-xs font-bold uppercase tracking-widest text-black border-b-2 border-black hover:border-brand-accent hover:text-brand-accent transition-colors duration-200 pb-0.5"
            >
              {ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-16 grid grid-cols-3 divide-x divide-brand-border border border-brand-border"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="text-center py-10 px-4">
              <div className="text-5xl font-black text-black">
                <CountUp value={stat.value} />
              </div>
              <div className="mt-2 text-xs text-brand-slate font-semibold uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
