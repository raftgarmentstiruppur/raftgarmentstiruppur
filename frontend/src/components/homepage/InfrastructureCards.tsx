"use client"

import Link from "next/link"
import {
  Layers, Grid3x3, Droplets, Scissors, Printer, Star, Workflow, CheckCircle, Package
} from "lucide-react"
import type { Division } from "@/types"
import SectionHeader from "@/components/shared/SectionHeader"
import { useContentValue } from "@/context/ContentContext"

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

interface InfrastructureCardsProps {
  divisions: Division[]
}

function DivisionCard({ div }: { div: Division }) {
  const name     = useContentValue(`division-${div.number}-name`,        div.name)
  const capacity = useContentValue(`division-${div.number}-capacity`,    div.capacity)
  const desc     = useContentValue(`division-${div.number}-description`, div.description)
  return (
    <Link
      href={`/infrastructure#${div.name.toLowerCase()}`}
      className="group bg-white p-6 hover:bg-black transition-colors duration-300 overflow-hidden relative"
    >
      <span className="absolute -top-3 -right-1 text-7xl font-black text-black/5 group-hover:text-white/5 leading-none select-none transition-colors">
        {div.number}
      </span>
      <div className="flex items-start gap-3 mb-3">
        <div className="text-brand-accent shrink-0">
          {iconMap[div.icon ?? ""] ?? null}
        </div>
        <div>
          <h3 className="font-black text-black group-hover:text-white uppercase tracking-tight text-sm transition-colors">{name}</h3>
          <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">{capacity}</span>
        </div>
      </div>
      <p className="text-sm text-brand-slate group-hover:text-white/60 leading-relaxed transition-colors">{desc}</p>
    </Link>
  )
}

export default function InfrastructureCards({ divisions }: InfrastructureCardsProps) {
  return (
    <section className="py-section bg-brand-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeader
          overline="Our Infrastructure"
          title="Fiber to Fashion Under One Roof"
          subtitle="Precision at every stage — Italian CAD/CAM cutting, German Jacquard looms, and AQL-certified finishing under one roof."
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border">
          {divisions.map((div) => <DivisionCard key={div.number} div={div} />)}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/infrastructure"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black border-b-2 border-black hover:border-brand-accent hover:text-brand-accent transition-colors pb-0.5"
          >
            Explore Full Infrastructure →
          </Link>
        </div>
      </div>
    </section>
  )
}
