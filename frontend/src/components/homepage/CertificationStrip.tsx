"use client"

import { motion } from "framer-motion"
import type { Certification } from "@/types"

interface CertificationStripProps {
  certs: Certification[]
}

export default function CertificationStrip({ certs }: CertificationStripProps) {
  const doubled = [...certs, ...certs]

  return (
    <div className="relative bg-brand-navy py-4 overflow-hidden">
      {/* Top/bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group flex gap-0 w-max animate-marquee hover:[animation-play-state:paused]"
      >
        {doubled.map((cert, i) => (
          <div key={`${cert.id}-${i}`} className="flex items-center gap-0 shrink-0">
            <div className="flex items-center gap-3 px-8 py-1 border-r border-brand-accent/20 hover:bg-white/5 transition-colors duration-200 cursor-default">
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full shrink-0" />
              <span className="text-[13px] font-black text-white/80 whitespace-nowrap uppercase tracking-[0.2em] hover:text-brand-accent transition-colors duration-200">
                {cert.name}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
