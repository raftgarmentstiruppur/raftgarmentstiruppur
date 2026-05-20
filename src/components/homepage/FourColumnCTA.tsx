"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Package, Tag, Globe, BookOpen, ArrowRight } from "lucide-react"
import type { CTACard } from "@/types"

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-6 h-6" />, Tag: <Tag className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />, BookOpen: <BookOpen className="w-6 h-6" />,
}

const ease = [0.22, 0.61, 0.36, 1] as const

export default function FourColumnCTA({ cards, heading }: { cards: CTACard[]; heading?: string }) {
  return (
    <section className="bg-brand-off-white border-t-2 border-brand-navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
        {heading && (
          <div className="flex items-center gap-5 mb-10">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">05</span>
            <div className="h-px w-10 bg-brand-navy" />
            <h2 className="text-2xl md:text-3xl font-display uppercase text-brand-navy">{heading}</h2>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-2 border-brand-navy divide-y-2 divide-x-0 sm:divide-x-2 sm:divide-y-0 divide-brand-navy">
          {cards.map((card, i) => (
            <motion.div key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08, ease }}
            >
              <div className="p-7 flex flex-col h-full bg-white hover:bg-brand-navy group transition-all duration-300">
                <div className="text-brand-accent mb-5">{iconMap[card.icon]}</div>
                <h3 className="text-base font-heading font-800 uppercase tracking-tight text-brand-navy group-hover:text-white transition-colors duration-300 mb-3">{card.title}</h3>
                <p className="text-sm text-brand-slate group-hover:text-white/60 leading-relaxed flex-1 transition-colors duration-300 mb-6">{card.description}</p>
                <Link href={card.ctaHref} className="inline-flex items-center gap-1.5 text-[10px] font-heading font-700 uppercase tracking-widest text-brand-navy group-hover:text-brand-accent transition-colors duration-300">
                  {card.ctaLabel} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
