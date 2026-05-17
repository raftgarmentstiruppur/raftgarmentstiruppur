import Link from "next/link"
import { Package, Tag, Globe, BookOpen, ArrowRight } from "lucide-react"
import type { CTACard } from "@/types"

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-7 h-7" />,
  Tag:     <Tag className="w-7 h-7" />,
  Globe:   <Globe className="w-7 h-7" />,
  BookOpen:<BookOpen className="w-7 h-7" />,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white p-8 flex flex-col gap-4 hover:bg-black group transition-colors duration-300"
            >
              <div className="text-black group-hover:text-brand-accent transition-colors">
                {iconMap[card.icon] ?? null}
              </div>
              <h3 className="text-base font-black text-black group-hover:text-white uppercase tracking-tight transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-brand-slate group-hover:text-white/60 leading-relaxed flex-1 transition-colors">
                {card.description}
              </p>
              <Link
                href={card.ctaHref}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-black group-hover:text-brand-accent transition-colors"
              >
                {card.ctaLabel} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
