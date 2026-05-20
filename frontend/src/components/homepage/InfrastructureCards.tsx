"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Layers, Grid3x3, Droplets, Scissors, Printer, Star, Workflow, CheckCircle, Package, ScanSearch } from "lucide-react"
import type { Division } from "@/types"
import { useContentValue } from "@/context/ContentContext"
import CTAButton from "@/components/shared/CTAButton"
import DivisionImageSlider from "@/components/shared/DivisionImageSlider"

const iconMap: Record<string, React.ReactNode> = {
  Layers:      <Layers      className="w-5 h-5" />,
  Grid3x3:     <Grid3x3     className="w-5 h-5" />,
  Droplets:    <Droplets    className="w-5 h-5" />,
  Scissors:    <Scissors    className="w-5 h-5" />,
  ScanSearch:  <ScanSearch  className="w-5 h-5" />,
  Printer:     <Printer     className="w-5 h-5" />,
  Star:        <Star        className="w-5 h-5" />,
  Workflow:    <Workflow    className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  Package:     <Package     className="w-5 h-5" />,
}

const FALLBACK: Record<string, string> = {
  "01": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
  "02": "https://images.unsplash.com/photo-1558618047-3c8aad16d69f?w=800&auto=format&fit=crop",
  "03": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&auto=format&fit=crop",
  "04": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop",
  "05": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop",
  "06": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop",
}

// 3 bullets per division — shown in place of the long paragraph
const BULLETS: Record<string, string[]> = {
  "01": ["Cotton, bamboo, Tencel & recycled polyester", "Full control over fabric weight and texture", "Zero outsourcing — quality at source"],
  "02": ["100% roll-by-roll 4-Point inspection", "Defects logged before reaching the cutting floor", "Eliminates propagation — quality secured early"],
  "03": ["Italian CAD/CAM auto-cutting systems", "Pinpoint accuracy — minimal waste", "Handles innerwear and outerwear simultaneously"],
  "04": ["Jacquard & solid looms with German technology", "Heat-setting for shrink-controlled elastic", "Substantial daily output across all categories"],
  "05": ["Specialised arrays for innerwear & outerwear", "Skilled operators — seamless construction", "Complex custom production end-to-end"],
  "06": ["Final inspection to AQL 1.5 standards", "Steam pressing & retail-ready packaging", "Barcodes, hang-tags & compliance docs included"],
}

// Zoom-out card entrance
const cardVariant = {
  hidden: { opacity: 0, scale: 1.12, y: 16 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

function DivisionCard({ div }: { div: Division }) {
  const name     = useContentValue(`division-${div.number}-name`,     div.name)
  const capacity = useContentValue(`division-${div.number}-capacity`, div.capacity)
  const bullets  = BULLETS[div.number] ?? []

  return (
    <motion.div variants={cardVariant} className="overflow-hidden">
      <Link
        href={`/infrastructure#${div.name.toLowerCase()}`}
        className="group bg-brand-navy hover:bg-brand-dark border border-white/[0.08] hover:border-brand-accent/40 transition-all duration-500 overflow-hidden relative flex flex-col h-full block"
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-brand-dark/60 to-transparent" />
          </div>

          <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[0.97]">
            <DivisionImageSlider
              divisionNumber={div.number}
              alt={name}
              icon={iconMap[div.icon ?? ""]}
              fallbackImage={FALLBACK[div.number]}
              compact
              objectPosition="center bottom"
            />
          </div>

          <span className="absolute bottom-2 right-3 text-[5rem] font-black text-white/10 leading-none select-none pointer-events-none z-20">
            {div.number}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4 flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 bg-white/10 group-hover:bg-brand-accent flex items-center justify-center text-white transition-all duration-300">
              {iconMap[div.icon ?? ""] ?? null}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent border border-brand-accent/30 px-2 py-1">
              {capacity}
            </span>
          </div>

          <h3 className="font-black text-white group-hover:text-brand-accent text-base uppercase tracking-tight transition-colors duration-300">
            {name}
          </h3>

          {/* 3 bullet points */}
          <ul className="space-y-2 flex-1">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-base text-white/85 group-hover:text-white leading-snug transition-colors duration-300">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.div>
  )
}

interface InfrastructureCardsProps { divisions: Division[] }

export default function InfrastructureCards({ divisions }: InfrastructureCardsProps) {
  return (
    <section className="py-16 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 70, damping: 18 }}
          >
            <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-accent mb-4 flex items-center gap-3">
              <span className="w-6 h-0.5 bg-brand-accent" />
              Our Infrastructure
            </p>
            <h2 className="text-display-md font-black text-white uppercase tracking-tight leading-none">
              Fiber to Fashion<br />Under One Roof.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <CTAButton label="Full Infrastructure" href="/infrastructure" variant="outline-light" size="md" arrow />
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {divisions.map((div) => (
            <DivisionCard key={div.number} div={div} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
