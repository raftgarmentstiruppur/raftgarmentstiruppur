"use client"

import { motion } from "framer-motion"

const processSteps = [
  { no: "01", label: "Knitting" },
  { no: "02", label: "Inspection" },
  { no: "03", label: "Cutting" },
  { no: "04", label: "Weaving" },
  { no: "05", label: "Sewing" },
  { no: "06", label: "Packing" },
  { no: "07", label: "Shipping" },
]

export default function InfrastructureProcessStrip() {
  return (
    <section className="bg-brand-dark py-6 overflow-x-auto border-b border-white/10">
      <div className="flex items-center justify-center min-w-max mx-auto px-8 gap-0">
        {processSteps.map((step, i) => (
          <div key={step.no} className="flex items-center">
            <motion.div
              className="flex flex-col items-center px-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring" as const, stiffness: 80, damping: 18 }}
            >
              <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1">{step.no}</span>
              <span className="text-xs font-semibold text-white whitespace-nowrap tracking-wide">{step.label}</span>
            </motion.div>
            {i < processSteps.length - 1 && (
              <motion.div
                className="w-10 h-px bg-brand-accent/40"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: [0.76, 0, 0.24, 1] as const }}
                style={{ transformOrigin: "left" }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
