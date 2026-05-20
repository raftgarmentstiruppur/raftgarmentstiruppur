import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Crumb { label: string; href: string }

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumb?: Crumb[]
  number?: string
  align?: "left" | "center"
  className?: string
}

export default function PageHero({ title, subtitle, breadcrumb, number, align = "left", className }: PageHeroProps) {
  return (
    <section className={cn("bg-brand-navy text-white pt-28 pb-16 overflow-hidden relative", className)}>
      {/* Huge faint background text */}
      <span className="absolute -bottom-6 left-0 text-[12rem] md:text-[18rem] font-display leading-none text-white/[0.03] uppercase select-none pointer-events-none whitespace-nowrap">
        {number ?? title.split(" ")[0]}
      </span>

      <div className={cn("relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl", align === "center" && "text-center")}>
        {/* breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1.5 text-[10px] text-white/40 mb-6 uppercase tracking-[0.25em] font-heading font-700">
            <Link href="/" className="hover:text-brand-accent transition-colors">Home</Link>
            {breadcrumb.map((c) => (
              <span key={c.href} className="flex items-center gap-1.5">
                <ChevronRight className="w-2.5 h-2.5" />
                <Link href={c.href} className="hover:text-brand-accent transition-colors">{c.label}</Link>
              </span>
            ))}
          </nav>
        )}

        {/* section number rule */}
        <div className="flex items-center gap-5 mb-6">
          <div className="h-px w-12 bg-brand-accent" />
          <span className="text-[10px] font-heading font-700 tracking-[0.3em] uppercase text-white/40">
            {number ?? "00"}
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-display uppercase leading-[0.9] tracking-tight text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-base md:text-lg text-white/55 max-w-2xl leading-relaxed font-sans">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
