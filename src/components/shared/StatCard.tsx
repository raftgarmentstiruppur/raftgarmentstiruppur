"use client"
import { cn } from "@/lib/utils"
import CountUp from "@/components/shared/CountUp"
import type { StatItem } from "@/types"

interface StatCardProps extends StatItem {
  description?: string
  variant?: "light" | "dark" | "accent"
  className?: string
  animate?: boolean
}

export default function StatCard({ value, label, description, variant = "light", className, animate = false }: StatCardProps) {
  return (
    <div className={cn(
      "p-6 border-2",
      variant === "light" && "bg-white border-brand-navy text-brand-navy",
      variant === "dark"  && "bg-brand-navy border-brand-navy text-white",
      variant === "accent" && "bg-brand-accent border-brand-accent text-white",
      className
    )}>
      <div className={cn(
        "text-5xl md:text-6xl font-display leading-none",
        variant === "light" && "text-brand-navy",
        (variant === "dark" || variant === "accent") && "text-white"
      )}>
        {animate ? <CountUp value={value} /> : value}
      </div>
      <div className={cn(
        "mt-2 text-xs font-heading font-700 uppercase tracking-[0.2em]",
        variant === "light" && "text-brand-slate",
        variant === "dark" && "text-white/60",
        variant === "accent" && "text-white/80"
      )}>
        {label}
      </div>
      {description && (
        <p className={cn("mt-1 text-xs", variant === "light" && "text-brand-ash", variant === "dark" && "text-white/40")}>
          {description}
        </p>
      )}
    </div>
  )
}
