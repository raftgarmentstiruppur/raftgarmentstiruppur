"use client"
import { motion } from "framer-motion"
import { Layers, Wind, Leaf, Zap, Globe, Award } from "lucide-react"

const cards = [
  { icon: <Layers className="w-6 h-6" />, title: "Premium Innerwear", description: "Soft-touch fabrics engineered for all-day comfort across babies, kids, and adults.", num: "01" },
  { icon: <Wind className="w-6 h-6" />, title: "Performance Outerwear", description: "Moisture-wicking, stretch-flex constructions for activewear and sportswear brands.", num: "02" },
  { icon: <Leaf className="w-6 h-6" />, title: "Sustainable Materials", description: "GOTS-certified organic cotton, recycled polyester, and low-impact dyes as standard.", num: "03" },
  { icon: <Zap className="w-6 h-6" />, title: "High-Volume Capacity", description: "100,000 garments sewn per day across 18 facilities — scale without compromise.", num: "04" },
  { icon: <Globe className="w-6 h-6" />, title: "Global Export Ready", description: "FOB, CIF, DDP — serving 40+ countries with full customs documentation support.", num: "05" },
  { icon: <Award className="w-6 h-6" />, title: "14+ Certifications", description: "ISO 9001, GOTS, WRAP, Oeko-Tex, Disney Approved — quality you can document.", num: "06" },
]

const ease = [0.22, 0.61, 0.36, 1] as const

export default function BentoGrid() {
  return (
    <section className="bg-white border-t-2 border-brand-navy">
      {/* Section header row */}
      <div className="border-b-2 border-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">02</span>
            <div className="h-px w-10 bg-brand-navy" />
            <p className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">What We Do</p>
          </div>
          <h2 className="hidden md:block text-2xl md:text-3xl font-display uppercase text-brand-navy">Everything Under One Roof</h2>
        </div>
      </div>

      {/* Card grid with thick borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y-2 divide-x-0 sm:divide-x-2 divide-brand-navy">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            className="p-8 group hover:bg-brand-navy transition-colors duration-300 cursor-default"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07, ease }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="text-brand-accent group-hover:text-brand-accent">{card.icon}</div>
              <span className="text-[10px] font-heading font-700 tracking-[0.3em] text-brand-ash/50 group-hover:text-white/30 transition-colors">{card.num}</span>
            </div>
            <h3 className="text-lg font-heading font-800 uppercase tracking-tight text-brand-navy group-hover:text-white transition-colors duration-300 mb-3">{card.title}</h3>
            <p className="text-sm text-brand-slate group-hover:text-white/60 leading-relaxed transition-colors duration-300">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
