"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Package, Tag, Globe, BookOpen, ArrowRight } from "lucide-react"
import type { CTACard } from "@/types"

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-7 h-7" />,
  Tag:     <Tag className="w-7 h-7" />,
  Globe:   <Globe className="w-7 h-7" />,
  BookOpen:<BookOpen className="w-7 h-7" />,
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

interface FourColumnCTAProps {
  cards: CTACard[]
  heading?: string
}

export default function FourColumnCTA({ cards, heading }: FourColumnCTAProps) {
  return (
    <section className="py-section bg-brand-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {heading && (
          <h2 className="text-center text-3xl md:text-4xl font-black text-black uppercase tracking-tight mb-12">
            {heading}
          </h2>
        )}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {cards.map((card) => (
            <motion.div key={card.title} variants={cardVariant}>
              <div className="bg-white p-8 flex flex-col gap-4 hover:bg-black group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-light-gray group-hover:bg-brand-accent/20 transition-colors duration-300 text-black group-hover:text-brand-accent">
                  {iconMap[card.icon] ?? null}
                </div>
                <h3 className="text-base font-black text-black group-hover:text-white uppercase tracking-tight transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-sm text-brand-slate group-hover:text-white/60 leading-relaxed flex-1 transition-colors duration-300">
                  {card.description}
                </p>
                <Link
                  href={card.ctaHref}
                  className="group/link inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-black group-hover:text-brand-accent transition-colors duration-300"
                >
                  {card.ctaLabel}
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
