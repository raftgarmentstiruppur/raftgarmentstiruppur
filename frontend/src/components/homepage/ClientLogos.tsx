"use client"

import type { Client } from "@/types"
import { motion } from "framer-motion"

interface ClientLogosProps {
  clients: Client[]
  heading?: string
}

export default function ClientLogos({ clients, heading }: ClientLogosProps) {
  const row1 = clients.slice(0, Math.ceil(clients.length / 2))
  const row2 = clients.slice(Math.ceil(clients.length / 2))

  const marquee1 = [...row1, ...row1, ...row1]
  const marquee2 = [...row2, ...row2, ...row2]

  return (
    <section className="bg-brand-dark overflow-hidden border-t border-white/10">

      {/* ── Header ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 70, damping: 18 }}
        >
          <div className="w-8 h-0.5 bg-brand-accent" />
          <span className="text-sm font-black uppercase tracking-[0.25em] text-brand-accent">
            {heading ?? "Trusted by leading global brands"}
          </span>
        </motion.div>
        <motion.p
          className="text-xs text-white/50 uppercase tracking-widest font-bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          USA · Europe · Middle East Asia
        </motion.p>
      </div>

      {/* ── Marquee rows ── */}
      <div className="border-y border-white/10 overflow-hidden">
        {/* Row 1 — left */}
        <div className="py-3 border-b border-white/[0.06]">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {marquee1.map((c, i) => (
              <BrandPill key={`r1-${i}`} name={c.name} accent={i % 5 === 2} />
            ))}
          </div>
        </div>
        {/* Row 2 — right */}
        <div className="py-3">
          <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
            {marquee2.map((c, i) => (
              <BrandPill key={`r2-${i}`} name={c.name} accent={i % 5 === 1} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Brand name grid — tight, visible ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 border border-white/10"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {clients.map((client, idx) => (
            <motion.div
              key={client.name}
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3, delay: idx * 0.04 } } }}
              className={`
                group flex items-center justify-center h-14 px-3
                bg-white/[0.03] hover:bg-white/[0.08]
                border-r border-b border-white/[0.08]
                hover:border-brand-accent/40
                transition-all duration-300
              `}
            >
              <span className="text-xs sm:text-sm font-black uppercase text-white/70 group-hover:text-white tracking-wide text-center leading-tight transition-colors duration-300">
                {client.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-center mt-4 text-xs font-bold text-white/35 uppercase tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          And many more across USA, Europe, and Middle East Asia
        </motion.p>
      </div>

    </section>
  )
}

function BrandPill({ name, accent = false }: { name: string; accent?: boolean }) {
  return (
    <div className="flex items-center shrink-0 px-6 border-r border-white/10">
      <span className={`font-black uppercase tracking-wider whitespace-nowrap text-sm ${accent ? "text-brand-accent" : "text-white/55"}`}>
        {name}
      </span>
      <span className="ml-6 w-1 h-1 rounded-full bg-white/20 shrink-0" />
    </div>
  )
}
