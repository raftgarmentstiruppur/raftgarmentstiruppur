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

export default function StatCard({
  value,
  label,
  description,
  variant = "light",
  className,
  animate = false,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "text-center p-6",
        variant === "light" && "bg-white",
        variant === "dark" && "bg-brand-navy text-white",
        variant === "accent" && "bg-brand-accent text-white",
        className
      )}
    >
      <div
        className={cn(
          "text-4xl md:text-5xl font-black tracking-tight",
          variant === "light" && "text-brand-navy",
          (variant === "dark" || variant === "accent") && "text-white"
        )}
      >
        {animate ? <CountUp value={value} /> : value}
      </div>
      <div
        className={cn(
          "mt-1 text-sm font-semibold uppercase tracking-wider",
          variant === "light" && "text-brand-slate",
          variant === "dark" && "text-white/70",
          variant === "accent" && "text-white/80"
        )}
      >
        {label}
      </div>
      {description && (
        <p
          className={cn(
            "mt-2 text-xs",
            variant === "light" && "text-brand-ash",
            variant === "dark" && "text-white/50"
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
