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
        "inline-flex items-center gap-2 font-bold uppercase tracking-wider transition-all duration-200",
        size === "sm" && "text-xs px-4 py-2",
        size === "md" && "text-xs px-6 py-3",
        size === "lg" && "text-sm px-8 py-4",
        variant === "primary" &&
          "bg-black text-white hover:bg-brand-charcoal",
        variant === "secondary" &&
          "bg-white text-black hover:bg-brand-light-gray border border-white",
        variant === "outline" &&
          "border-2 border-black text-black hover:bg-black hover:text-white",
        variant === "outline-light" &&
          "border-2 border-white text-white hover:bg-white hover:text-black",
        variant === "ghost" &&
          "text-black underline underline-offset-4 hover:text-brand-slate",
        className
      )}
    >
      {label}
      {arrow && <ArrowRight className="w-4 h-4" />}
    </Link>
  )
}
