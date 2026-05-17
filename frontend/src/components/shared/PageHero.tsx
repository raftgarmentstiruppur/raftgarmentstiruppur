import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Crumb {
  label: string
  href: string
}

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumb?: Crumb[]
  bgImage?: string
  align?: "left" | "center"
  className?: string
}

export default function PageHero({
  title,
  subtitle,
  breadcrumb,
  bgImage,
  align = "left",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex items-end min-h-[42vh] pt-[7.5rem] pb-14 overflow-hidden",
        className
      )}
    >
      {bgImage ? (
        <>
          <Image
            src={bgImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </>
      ) : (
        <div className="absolute inset-0 bg-black" />
      )}

      <div
        className={cn(
          "relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl",
          align === "center" && "text-center"
        )}
      >
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-5 uppercase tracking-widest font-semibold">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3" />
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-base md:text-lg text-white/60 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
