"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Layers, Grid3x3, Droplets, Scissors, Printer, Star, Workflow, CheckCircle, Package
} from "lucide-react"
import type { Division } from "@/types"
import SectionHeader from "@/components/shared/SectionHeader"

const iconMap: Record<string, React.ReactNode> = {
  Layers:      <Layers className="w-5 h-5" />,
  Grid3x3:     <Grid3x3 className="w-5 h-5" />,
  Droplets:    <Droplets className="w-5 h-5" />,
  Scissors:    <Scissors className="w-5 h-5" />,
  Printer:     <Printer className="w-5 h-5" />,
  Star:        <Star className="w-5 h-5" />,
  Workflow:    <Workflow className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  Package:     <Package className="w-5 h-5" />,
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

interface InfrastructureCardsProps {
  divisions: Division[]
}

export default function InfrastructureCards({ divisions }: InfrastructureCardsProps) {
  return (
    <section className="py-section bg-brand-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeader
          overline="Our Infrastructure"
          title="Fiber to Fashion Under One Roof"
          subtitle="18 facilities, 9 integrated divisions — every step from raw fiber to export-ready garment."
          className="mb-12"
        />
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {divisions.map((div) => (
            <motion.div key={div.number} variants={cardVariant}>
              <Link
                href={`/infrastructure#${div.name.toLowerCase()}`}
                className="group bg-white p-6 hover:bg-black transition-colors duration-500 overflow-hidden relative flex flex-col h-full"
              >
                <span className="absolute -top-3 -right-1 text-7xl font-black text-black/5 group-hover:text-white/5 leading-none select-none transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-1">
                  {div.number}
                </span>
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-brand-accent shrink-0">
                    {iconMap[div.icon ?? ""] ?? null}
                  </div>
                  <div>
                    <h3 className="font-black text-black group-hover:text-white uppercase tracking-tight text-sm transition-colors duration-500">{div.name}</h3>
                    <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">{div.capacity}</span>
                  </div>
                </div>
                <p className="text-sm text-brand-slate group-hover:text-white/60 leading-relaxed transition-colors duration-500">{div.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-10">
          <Link
            href="/infrastructure"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black border-b-2 border-black hover:border-brand-accent hover:text-brand-accent transition-colors pb-0.5"
          >
            Explore Full Infrastructure →
          </Link>
        </div>
      </div>
    </section>
  )
}
