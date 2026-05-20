"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Crumb { label: string; href: string }

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
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "flex flex-col lg:flex-row border-b-4 border-brand-accent",
        className
      )}
      style={{ paddingTop: 0 }}
    >
      {/* ── LEFT: image panel ── */}
      <div className="relative w-full min-h-[55vw] sm:min-h-[45vw] lg:w-[42%] lg:min-h-0 lg:self-stretch overflow-hidden bg-brand-dark">
        {bgImage ? (
          <>
            <Image
              src={bgImage}
              alt={title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-brand-dark/40" />
          </>
        ) : (
          <>
            {/* Gradient texture when no image */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal via-brand-navy to-brand-dark" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{ background: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
            />
            {/* Big decorative number */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-[12rem] font-black text-white/[0.04] leading-none">
                {title.charAt(0)}
              </span>
            </div>
          </>
        )}
      </div>

      {/* ── RIGHT: text content ── */}
      <div className="w-full lg:w-[58%] bg-brand-dark flex flex-col justify-center px-8 sm:px-12 lg:px-16 pt-20 lg:pt-24 pb-12 lg:pb-16">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.nav
            className="flex items-center gap-1.5 text-xs text-white/45 uppercase tracking-widest font-bold mb-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <span className="w-5 h-px bg-brand-accent mr-1 inline-block" />
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3" />
                <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
              </span>
            ))}
          </motion.nav>
        )}

        {/* Title */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            className="font-black text-white leading-[0.92] tracking-tight"
            style={{
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
              fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
            }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.76, 0, 0.24, 1] as const }}
          >
            {title}
          </motion.h1>
        </div>

        {/* Accent bar */}
        <motion.div
          className="h-1 w-12 bg-brand-accent mb-5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.7, ease: [0.76, 0, 0.24, 1] as const }}
          style={{ transformOrigin: "left" }}
        />

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed text-justify"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.45 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
