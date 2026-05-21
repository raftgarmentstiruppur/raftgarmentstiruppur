"use client"

import { motion } from "framer-motion"
import { Layers, Grid3x3, Scissors, Workflow, Package, ScanSearch } from "lucide-react"
import type { Division } from "@/types"
import { useContentValue } from "@/context/ContentContext"
import DivisionImageSlider from "@/components/shared/DivisionImageSlider"

const iconMap: Record<string, React.ReactNode> = {
  Grid3x3:    <Grid3x3 className="w-6 h-6" />,
  ScanSearch: <ScanSearch className="w-6 h-6" />,
  Scissors:   <Scissors className="w-6 h-6" />,
  Layers:     <Layers className="w-6 h-6" />,
  Workflow:   <Workflow className="w-6 h-6" />,
  Package:    <Package className="w-6 h-6" />,
}

const BULLETS: Record<string, string[]> = {
  "01": [
    "Cotton, bamboo, viscose, Tencel, nylon, and recycled polyester blends",
    "Full control over fabric weight, texture, and structure from yarn stage",
    "Zero outsourcing — in-house knitting means zero compromise on quality",
  ],
  "02": [
    "100% roll-by-roll inspection using the international 4-point system",
    "Every defect identified, logged and resolved before cutting floor entry",
    "Eliminates defect propagation — quality secured at the absolute source",
  ],
  "03": [
    "Italian CAD/CAM auto-cutting integrated with precision spreader systems",
    "Pinpoint accuracy across every lay — minimal waste, maximum utilisation",
    "Handles high-volume innerwear and outerwear output simultaneously",
  ],
  "04": [
    "Jacquard and solid looms engineered on German narrow-fabric technology",
    "Heat-setting machine ensures shrink-controlled, dimensionally stable elastic",
    "Substantial daily output across all waistband and elastic categories",
  ],
  "05": [
    "Specialised machine arrays for both innerwear and outerwear construction",
    "Skilled operators deliver seamless construction and precision stitching",
    "Complex and custom production handled end-to-end — no third parties",
  ],
  "06": [
    "Final inspection conducted to AQL international quality standards",
    "Professional steam pressing, retail-ready folding and branded packaging",
    "Barcodes, hang-tags, size stickers and full compliance documentation",
  ],
}

// Fallback images shown when backend images haven't been uploaded yet
const FALLBACK_IMAGES: Record<string, string> = {
  "01": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop",
  "02": "https://images.unsplash.com/photo-1558618047-3c8aad16d69f?w=1200&auto=format&fit=crop",
  "03": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=1200&auto=format&fit=crop",
  "04": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&auto=format&fit=crop",
  "05": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop",
  "06": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&auto=format&fit=crop",
}

// ── Animation variants ─────────────────────────────────────────────────────

const E  = [0.76, 0, 0.24, 1]  as [number, number, number, number]
const E2 = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

// opacity+scale so images are always in the paint tree (clip-path hides them from Chromium)
const imgReveal      = { hidden: { opacity: 0, scale: 1.04 }, show: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: E } } }
const imgRevealLeft  = { hidden: { opacity: 0, scale: 1.04 }, show: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: E } } }
const fadeUp         = { hidden: { opacity: 0, y: 36 },             show: { opacity: 1, y: 0,             transition: { duration: 0.45, ease: E2 } } }
const stagger        = { hidden: {},                                 show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }
const bulletVariant  = { hidden: { opacity: 0, x: -20 },            show: { opacity: 1, x: 0,             transition: { duration: 0.4, ease: E2 } } }

// ── Single division section ──────────────────────────────────────────────

function DivisionSection({ div, index }: { div: Division; index: number }) {
  const name     = useContentValue(`division-${div.number}-name`,     div.name)
  const capacity = useContentValue(`division-${div.number}-capacity`, div.capacity)
  const bullets  = BULLETS[div.number] ?? []
  const isEven   = index % 2 === 0
  const imgClip  = isEven ? imgReveal : imgRevealLeft

  return (
    <section
      id={div.name.toLowerCase().replace(/[\s&]+/g, "-").replace(/-+/g, "-").replace(/-$/, "")}
      className={`relative overflow-hidden ${isEven ? "bg-white" : "bg-brand-light-gray"}`}
    >
      {/* Giant faint background number */}
      <span
        aria-hidden
        className="absolute select-none pointer-events-none font-black leading-none text-brand-navy/[0.04] text-[22rem] right-0 top-1/2 -translate-y-1/2 -translate-x-4"
        style={{ zIndex: 0 }}
      >
        {div.number}
      </span>

      <div className="relative z-10 grid lg:grid-cols-2 min-h-[70vh]">

        {/* Image column */}
        <motion.div
          className={`relative overflow-hidden min-h-[380px] lg:min-h-full ${!isEven ? "lg:order-2" : ""}`}
          variants={imgClip}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          <DivisionImageSlider
            divisionNumber={div.number}
            alt={name}
            icon={iconMap[div.icon ?? ""]}
            fallbackImage={FALLBACK_IMAGES[div.number]}
          />
        </motion.div>

        {/* Text column */}
        <motion.div
          className={`flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-24 ${!isEven ? "lg:order-1" : ""}`}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Division label */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <div className="w-10 h-0.5 bg-brand-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              Division {div.number}
            </span>
            <div className="text-brand-accent/50">{iconMap[div.icon ?? ""]}</div>
          </motion.div>

          {/* Division name */}
          <motion.h2
            variants={fadeUp}
            className="text-display-md font-black text-brand-navy uppercase tracking-tight leading-none mb-5"
          >
            {name}
          </motion.h2>

          {/* Capacity badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-brand-accent px-4 py-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full inline-block" />
              {capacity}
            </span>
          </motion.div>

          {/* Bullet points */}
          <motion.ul variants={stagger} className="space-y-4">
            {bullets.map((bullet, bi) => (
              <motion.li key={bi} variants={bulletVariant} className="flex items-start gap-4">
                <span className="shrink-0 w-6 h-6 mt-0.5 flex items-center justify-center bg-brand-navy text-white text-[10px] font-black">
                  {String(bi + 1).padStart(2, "0")}
                </span>
                <span className="text-lg md:text-xl text-brand-slate leading-relaxed text-justify">{bullet}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}

// ── Export ────────────────────────────────────────────────────────────────

export default function InfrastructureDivisions({ divisions }: { divisions: Division[] }) {
  return (
    <div>
      {divisions.map((div, i) => (
        <DivisionSection key={div.number} div={div} index={i} />
      ))}
    </div>
  )
}
