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
  align = "left",
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn(
        "space-y-4",
        align === "center" && "text-center",
        align === "left"   && "text-left",
        align === "right"  && "text-right",
        className
      )}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring" as const, stiffness: 70, damping: 18, mass: 0.8 }}
    >
      {overline && (
        <p className={cn(
          "text-xs font-black tracking-[0.25em] flex items-center gap-3",
          align === "center" && "justify-center",
          align === "right"  && "justify-end",
          light ? "text-brand-accent" : "text-brand-accent"
        )}>
          <span className="w-6 h-0.5 bg-brand-accent inline-block" />
          {overline}
        </p>
      )}
      <h2 className={cn(
        "text-4xl sm:text-5xl md:text-6xl font-semibold font-sans tracking-tight leading-[0.96]",
        light ? "text-white" : "text-brand-navy"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg md:text-xl leading-relaxed max-w-2xl text-justify",
          align === "center" && "mx-auto text-center",
          light ? "text-white/80" : "text-brand-slate"
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

