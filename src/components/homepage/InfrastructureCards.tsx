"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Layers, Grid3x3, Droplets, Scissors, Printer, Star, Workflow, CheckCircle, Package } from "lucide-react"
import type { Division } from "@/types"

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-5 h-5" />, Grid3x3: <Grid3x3 className="w-5 h-5" />,
  Droplets: <Droplets className="w-5 h-5" />, Scissors: <Scissors className="w-5 h-5" />,
  Printer: <Printer className="w-5 h-5" />, Star: <Star className="w-5 h-5" />,
  Workflow: <Workflow className="w-5 h-5" />, CheckCircle: <CheckCircle className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
}

const ease = [0.22, 0.61, 0.36, 1] as const

export default function InfrastructureCards({ divisions }: { divisions: Division[] }) {
  return (
    <section className="border-t-2 border-brand-navy">
      <div className="border-b-2 border-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">06</span>
            <div className="h-px w-10 bg-brand-navy" />
            <p className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">Our Infrastructure</p>
          </div>
          <h2 className="hidden md:block text-2xl font-display uppercase text-brand-navy">Fiber to Fashion. Under One Roof.</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y-2 divide-brand-navy border-b-2 border-brand-navy">
        {divisions.map((div, i) => (
          <motion.div key={div.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05, ease }}
            className={i % 3 !== 2 ? "sm:border-r-2 sm:border-brand-navy" : ""}
          >
            <Link href={`/infrastructure#${div.name.toLowerCase()}`}
              className="group p-7 flex flex-col h-full hover:bg-brand-navy transition-colors duration-300 relative overflow-hidden"
            >
              <span className="absolute top-3 right-4 text-5xl font-display text-brand-navy/5 group-hover:text-white/5 leading-none select-none transition-colors duration-300">{div.number}</span>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-brand-accent">{iconMap[div.icon ?? ""]}</div>
                <div>
                  <h3 className="text-sm font-heading font-800 uppercase tracking-tight text-brand-navy group-hover:text-white transition-colors duration-300">{div.name}</h3>
                  <span className="text-[10px] font-heading font-700 uppercase tracking-widest text-brand-accent">{div.capacity}</span>
                </div>
              </div>
              <p className="text-sm text-brand-slate group-hover:text-white/55 leading-relaxed transition-colors duration-300 line-clamp-3">{div.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 flex items-center justify-between">
        <span className="text-xs text-brand-ash font-sans">9 divisions — fully integrated</span>
        <Link href="/infrastructure" className="text-xs font-heading font-700 uppercase tracking-[0.2em] text-brand-navy border-b-2 border-brand-navy hover:text-brand-accent hover:border-brand-accent transition-colors pb-0.5">
          Full Infrastructure →
        </Link>
      </div>
    </section>
  )
}
