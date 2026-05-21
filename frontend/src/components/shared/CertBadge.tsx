"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Certification } from "@/types"
import { useContentValue } from "@/context/ContentContext"

const categoryAccent: Record<string, string> = {
  Quality:            "border-blue-400 bg-blue-400/10",
  Safety:             "border-orange-400 bg-orange-400/10",
  Social:             "border-purple-400 bg-purple-400/10",
  Sustainability:     "border-teal-400 bg-teal-400/10",
  Recycled:           "border-cyan-400 bg-cyan-400/10",
  "Brand Compliance": "border-amber-400 bg-amber-400/10",
  "Brand License":    "border-amber-400 bg-amber-400/10",
  Security:           "border-red-400 bg-red-400/10",
  Organic:            "border-lime-400 bg-lime-400/10",
}

const categoryText: Record<string, string> = {
  Quality:            "text-blue-400",
  Safety:             "text-orange-400",
  Social:             "text-purple-400",
  Sustainability:     "text-teal-400",
  Recycled:           "text-cyan-400",
  "Brand Compliance": "text-amber-400",
  "Brand License":    "text-amber-400",
  Security:           "text-red-400",
  Organic:            "text-lime-400",
}

interface CertBadgeProps extends Certification {
  className?: string
  index?: number
}

export default function CertBadge({ id, name, category, description, className, index = 0 }: CertBadgeProps) {
  const displayName = useContentValue(`cert-${id}-name`,        name)
  const displayDesc = useContentValue(`cert-${id}-description`, description)
  const accent      = categoryAccent[category] ?? "border-white/20 bg-white/5"
  const textColor   = categoryText[category]   ?? "text-white/60"

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 70, damping: 18, delay: index * 0.06 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "group relative bg-brand-navy/60 hover:bg-brand-navy border-t-2 border border-white/[0.08] hover:border-white/20 p-6 flex flex-col gap-4 h-full transition-colors duration-300 cursor-default",
        accent,
        className
      )}
    >
      {/* Top accent line animates on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />

      {/* Category badge */}
      <span className={cn("text-xs font-black uppercase tracking-widest", textColor)}>
        {category}
      </span>

      {/* Name */}
      <h3 className="text-xl font-black text-white leading-tight group-hover:text-brand-accent transition-colors duration-300">
        {displayName}
      </h3>

      {/* Divider */}
      <div className="w-8 h-0.5 bg-brand-accent/50 group-hover:bg-brand-accent group-hover:w-12 transition-all duration-300" />

      {/* Description */}
      <p className="text-base text-white/70 group-hover:text-white/90 leading-relaxed transition-colors duration-300 flex-1 text-justify">
        {displayDesc}
      </p>
    </motion.div>
  )
}
