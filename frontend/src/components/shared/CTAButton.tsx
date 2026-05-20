"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface CTAButtonProps {
  label: string
  href: string
  variant?: "primary" | "secondary" | "outline" | "outline-light" | "ghost"
  size?: "sm" | "md" | "lg"
  arrow?: boolean
  className?: string
}

export default function CTAButton({
  label,
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2.5 font-bold uppercase tracking-widest overflow-hidden transition-colors duration-300",
        size === "sm" && "text-[11px] px-5 py-2.5",
        size === "md" && "text-xs px-7 py-3.5",
        size === "lg" && "text-xs px-9 py-4.5",
        variant === "primary" && "bg-brand-navy text-white",
        variant === "secondary" && "bg-white text-brand-navy border border-white",
        variant === "outline" && "border-2 border-brand-navy text-brand-navy",
        variant === "outline-light" && "border-2 border-white text-white",
        variant === "ghost" && "text-brand-navy",
        className
      )}
    >
      {/* Slide-fill layer */}
      {variant === "primary" && (
        <span className="absolute inset-0 bg-brand-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-[380ms] ease-[cubic-bezier(0.76,0,0.24,1)]" />
      )}
      {variant === "outline" && (
        <span className="absolute inset-0 bg-brand-navy -translate-x-full group-hover:translate-x-0 transition-transform duration-[380ms] ease-[cubic-bezier(0.76,0,0.24,1)]" />
      )}
      {variant === "outline-light" && (
        <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-[380ms] ease-[cubic-bezier(0.76,0,0.24,1)]" />
      )}

      <span className={cn(
        "relative z-10 transition-colors duration-300",
        variant === "outline" && "group-hover:text-white",
        variant === "outline-light" && "group-hover:text-brand-navy",
      )}>
        {label}
      </span>

      {arrow && (
        <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      )}
    </Link>
  )
}
