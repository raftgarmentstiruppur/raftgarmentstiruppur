"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import CertBadge from "@/components/shared/CertBadge"
import type { Certification } from "@/types"

const categories = ["All", "Quality", "Environment", "Safety", "Social", "Organic", "Sustainability", "Recycled", "Brand License"]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

interface CertificationsSectionProps {
  certifications: Certification[]
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? certifications : certifications.filter((c) => c.category === active)

  return (
    <>
      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={
              cat === active
                ? "px-3 py-1 text-xs font-bold border border-brand-accent bg-brand-accent text-white uppercase tracking-widest transition-all duration-200"
                : "px-3 py-1 text-xs font-medium border border-brand-border text-brand-slate bg-brand-light-gray uppercase tracking-widest hover:border-brand-accent hover:text-black transition-all duration-200"
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cert grid */}
      <motion.div
        key={active}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {filtered.map((cert) => (
          <motion.div key={cert.id} variants={cardVariant}>
            <CertBadge {...cert} />
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}
