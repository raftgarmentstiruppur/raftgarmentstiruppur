"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Package, Tag, Globe, BookOpen, ArrowUpRight } from "lucide-react"
import type { CTACard } from "@/types"
import MagneticButton from "@/components/shared/MagneticButton"

const iconMap: Record<string, React.ReactNode> = {
  Package:  <Package className="w-6 h-6" />,
  Tag:      <Tag className="w-6 h-6" />,
  Globe:    <Globe className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
}

const CARD_IMAGES: Record<string, string> = {
  Package:  "/images/cta/wholesale.png",
  Tag:      "/images/cta/private-label.png",
  Globe:    "/images/cta/global.png",
  BookOpen: "/images/cta/catalog.png",
}

const stagger    = { hidden: {}, show: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } } }
const cardVariant = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show:   { clipPath: "inset(0 0 0% 0)", opacity: 1, transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as const } },
}
const headingVar = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 75, damping: 18 } } }

interface FourColumnCTAProps {
  cards: CTACard[]
  heading?: string
}

export default function FourColumnCTA({ cards, heading }: FourColumnCTAProps) {
  return (
    <section className="relative py-16 bg-brand-dark overflow-hidden">
      {/* Dot-grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {heading && (
          <motion.div
            className="flex items-center gap-6 mb-14"
            variants={headingVar}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="w-8 h-0.5 bg-brand-accent" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-accent">{heading}</span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px sm:gap-0.5 lg:gap-px"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {cards.map((card) => (
            <motion.div key={card.title} variants={cardVariant}>
              <MagneticButton strength={0.15} className="w-full">
                <Link
                  href={card.ctaHref}
                  className="group bg-brand-navy/50 hover:bg-brand-navy border border-white/[0.08] hover:border-brand-accent/50 transition-all duration-400 overflow-hidden relative flex flex-col w-full"
                >
                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)]" />

                  {/* Top image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={CARD_IMAGES[card.icon] ?? CARD_IMAGES.Package}
                      alt={card.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col gap-4 flex-1">
                    {/* Icon */}
                    <div className="w-12 h-12 border border-white/20 bg-white/10 group-hover:bg-brand-accent group-hover:border-brand-accent flex items-center justify-center transition-all duration-300">
                      <div className="text-white">
                        {iconMap[card.icon] ?? null}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-black text-white group-hover:text-brand-accent uppercase tracking-tight leading-tight mb-3 transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-base text-white/65 group-hover:text-white/85 leading-relaxed transition-colors duration-300 text-justify">
                        {card.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
                      <span className="text-[11px] font-black uppercase tracking-widest text-brand-accent">
                        {card.ctaLabel}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              </MagneticButton>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
