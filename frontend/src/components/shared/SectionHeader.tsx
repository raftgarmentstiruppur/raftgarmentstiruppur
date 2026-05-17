"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  overline?: string
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  light?: boolean
  className?: string
}

export default function SectionHeader({
  overline,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn(
        "space-y-3",
        align === "center" && "text-center",
        align === "left" && "text-left",
        align === "right" && "text-right",
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {overline && (
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
          {overline}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl font-black tracking-tight leading-tight",
          light ? "text-white" : "text-black"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-base leading-relaxed max-w-2xl",
            align === "center" && "mx-auto",
            light ? "text-white/60" : "text-brand-slate"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
