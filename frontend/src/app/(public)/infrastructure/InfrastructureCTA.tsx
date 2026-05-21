"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import CTAButton from "@/components/shared/CTAButton"
import MagneticButton from "@/components/shared/MagneticButton"
import FloatingElements from "@/components/shared/FloatingElements"

const UNSPLASH_FACTORY = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&auto=format&fit=crop"

const stats = [
  { value: "AQL", label: "Quality standard" },
  { value: "100%",    label: "In-house control" },
  { value: "6",       label: "Integrated divisions" },
  { value: "50+",     label: "Years manufacturing" },
]

export default function InfrastructureCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

  return (
    <section ref={sectionRef} className="relative py-24 bg-brand-dark overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none"
      >
        <Image src={UNSPLASH_FACTORY} alt="" fill unoptimized className="object-cover opacity-20" />
      </motion.div>
      <div className="absolute inset-0 bg-brand-dark/80 pointer-events-none" />
      <FloatingElements variant="dark" count={4} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-px mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="glass-card py-10 px-8 text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring" as const, stiffness: 80, damping: 18 }}
            >
              <div className="text-5xl font-black text-brand-accent mb-2">{s.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/50">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready to visit?
          </motion.p>
          <div className="overflow-hidden mb-8">
            <motion.h2
              className="text-display-lg font-black text-white uppercase leading-none"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] as const }}
            >
              See it in person.
            </motion.h2>
          </div>
          <MagneticButton>
            <CTAButton label="Request a factory tour" href="/contact" variant="primary" size="lg" arrow />
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
