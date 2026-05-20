"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { COLOR_PALETTE } from "@/data/colorPalette"
import { useContentValue } from "@/context/ContentContext"

interface ColorSwatchDisplayProps {
  contentKey: string
  defaultColors?: string[]
  label?: string
}

export default function ColorSwatchDisplay({
  contentKey,
  defaultColors = [],
  label = "Available Colours",
}: ColorSwatchDisplayProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const raw = useContentValue(contentKey, JSON.stringify(defaultColors))
  let colors: string[] = defaultColors
  try { colors = JSON.parse(raw) } catch { colors = defaultColors }

  if (!colors.length) return null

  const selectedSwatch = colors.find((h) => h === selected)
  const selectedName   = COLOR_PALETTE.find((c) => c.hex === selected)?.name

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-black uppercase tracking-widest text-brand-navy">
          {label}
          <span className="ml-2 text-brand-accent font-black">{colors.length}+</span>
        </p>
        {selected && (
          <motion.span
            key={selected}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs font-semibold text-brand-charcoal flex items-center gap-1.5"
          >
            <span className="w-3 h-3 rounded-full border border-brand-border inline-block" style={{ backgroundColor: selected }} />
            {selectedName ?? selected}
          </motion.span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {colors.map((hex, i) => {
          const name    = COLOR_PALETTE.find((c) => c.hex === hex)?.name ?? hex
          const isLight = isLightColor(hex)
          const isActive = selected === hex

          return (
            <motion.button
              key={hex}
              type="button"
              title={name}
              onClick={() => setSelected(isActive ? null : hex)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02, type: "spring", stiffness: 200, damping: 18 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-7 h-7 transition-all duration-150 group ${
                isLight ? "border border-brand-border" : ""
              } ${isActive ? "ring-2 ring-brand-accent ring-offset-2 scale-110" : ""}`}
              style={{ backgroundColor: hex }}
            >
              {isActive && (
                <span
                  className="flex items-center justify-center w-full h-full text-[10px] font-black"
                  style={{ color: isLight ? "#333" : "#fff" }}
                >
                  ✓
                </span>
              )}
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[9px] px-2 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 rounded-sm">
                {name}
              </span>
            </motion.button>
          )
        })}
      </div>

      {!selected && (
        <p className="text-xs text-brand-ash">Click a colour to see its name</p>
      )}
    </div>
  )
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 180
}
