import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  overline?: string
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  light?: boolean
  number?: string
  className?: string
}

export default function SectionHeader({
  overline,
  title,
  subtitle,
  align = "center",
  light = false,
  number,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-4", align === "center" && "text-center", align === "left" && "text-left", className)}>
      {/* Section number + rule */}
      {number && (
        <div className={cn(
          "flex items-center gap-4",
          align === "center" && "justify-center",
          align === "right" && "flex-row-reverse"
        )}>
          <span className={cn("text-xs font-heading font-700 tracking-[0.3em] uppercase", light ? "text-white/40" : "text-brand-ash")}>
            {number}
          </span>
          <div className={cn("h-px flex-1 max-w-16", light ? "bg-white/20" : "bg-brand-border")} />
        </div>
      )}

      {overline && (
        <p className={cn(
          "text-[11px] font-heading font-700 uppercase tracking-[0.3em]",
          light ? "text-brand-accent" : "text-brand-accent"
        )}>
          {overline}
        </p>
      )}

      <h2 className={cn(
        "text-4xl md:text-5xl lg:text-6xl font-heading font-800 uppercase tracking-tight leading-[0.95]",
        light ? "text-white" : "text-brand-navy"
      )}>
        {title}
      </h2>

      {subtitle && (
        <p className={cn(
          "text-base leading-relaxed max-w-2xl font-sans font-normal",
          align === "center" && "mx-auto",
          light ? "text-white/60" : "text-brand-slate"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
