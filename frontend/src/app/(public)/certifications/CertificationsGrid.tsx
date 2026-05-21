"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { certifications } from "@/data/certifications"
import CertBadge from "@/components/shared/CertBadge"
import CTAButton from "@/components/shared/CTAButton"

const CATEGORIES = ["All", "Quality", "Safety", "Social", "Sustainability", "Recycled", "Brand Compliance", "Security"]

export default function CertificationsGrid() {
  const [active, setActive] = useState("All")

  const filtered = active === "All"
    ? certifications
    : certifications.filter((c) => c.category === active)

  return (
    <>
      {/* ── Category filter ── */}
      <motion.div
        className="flex flex-wrap gap-3 mb-12 justify-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.2 }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 text-sm font-black uppercase tracking-widest border transition-all duration-300 ${
              active === cat
                ? "bg-brand-accent border-brand-accent text-white"
                : "border-white/20 text-white/60 hover:border-brand-accent hover:text-white bg-transparent"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* ── Cert grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/[0.06]"
        >
          {filtered.map((cert, i) => (
            <CertBadge key={cert.id} {...cert} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Download CTA ── */}
      <motion.div
        className="mt-16 bg-brand-navy border border-brand-accent/20 p-10 text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 70, damping: 18 }}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
        <p className="text-sm font-black uppercase tracking-[0.25em] text-brand-accent mb-4">Documents</p>
        <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
          Need certification letters?
        </h3>
        <p className="text-lg text-white/75 mb-8 max-w-xl mx-auto leading-relaxed">
          All certification documents are available for download, or request them directly by email.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton label="Download documents" href="/resources" variant="primary" size="lg" arrow />
          <CTAButton label="Email us" href="/contact" variant="outline-light" size="lg" />
        </div>
      </motion.div>
    </>
  )
}
