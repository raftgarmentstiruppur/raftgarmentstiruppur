import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface CTAButtonProps {
  label: string
  href: string
  variant?: "primary" | "secondary" | "outline" | "outline-light" | "ghost" | "accent"
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
        "inline-flex items-center gap-2.5 font-heading font-700 uppercase tracking-widest transition-all duration-200 border-2",
        size === "sm" && "text-xs px-5 py-2.5",
        size === "md" && "text-sm px-7 py-3",
        size === "lg" && "text-sm px-9 py-4",
        variant === "primary" &&
          "bg-brand-navy text-white border-brand-navy hover:bg-white hover:text-brand-navy",
        variant === "accent" &&
          "bg-brand-accent text-white border-brand-accent hover:bg-white hover:text-brand-accent",
        variant === "secondary" &&
          "bg-white text-brand-navy border-brand-navy hover:bg-brand-navy hover:text-white",
        variant === "outline" &&
          "bg-transparent text-brand-navy border-brand-navy hover:bg-brand-navy hover:text-white",
        variant === "outline-light" &&
          "bg-transparent text-white border-white hover:bg-white hover:text-brand-navy",
        variant === "ghost" &&
          "border-transparent text-brand-navy hover:border-brand-navy",
        className
      )}
    >
      {label}
      {arrow && <ArrowRight className="w-4 h-4" />}
    </Link>
  )
}
