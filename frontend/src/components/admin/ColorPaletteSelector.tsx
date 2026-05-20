"use client"

import { useState } from "react"
import { COLOR_PALETTE } from "@/data/colorPalette"

interface ColorPaletteSelectorProps {
  selected: string[]
  onChange: (colors: string[]) => void
  disabled?: boolean
}

function isLight(hex: string) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
  return (r*299+g*587+b*114)/1000 > 180
}

// Build group map
const GROUPS = Array.from(new Set(COLOR_PALETTE.map(c => c.group)))
const BY_GROUP: Record<string, typeof COLOR_PALETTE> = {}
for (const g of GROUPS) BY_GROUP[g] = COLOR_PALETTE.filter(c => c.group === g)

export default function ColorPaletteSelector({ selected, onChange, disabled }: ColorPaletteSelectorProps) {
  const [activeGroup, setActiveGroup] = useState<string>("All")
  const [hoveredHex, setHoveredHex]   = useState<string | null>(null)

  function toggle(hex: string) {
    if (disabled) return
    onChange(selected.includes(hex) ? selected.filter(h => h !== hex) : [...selected, hex])
  }

  const displayColors = activeGroup === "All" ? COLOR_PALETTE : (BY_GROUP[activeGroup] ?? [])

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-brand-charcoal">
          {selected.length} colour{selected.length !== 1 ? "s" : ""} selected
        </span>
        {selected.length > 0 && (
          <button type="button" onClick={() => !disabled && onChange([])}
            className="text-[10px] text-red-500 hover:text-red-700 font-bold transition-colors">
            Clear all ✕
          </button>
        )}
      </div>

      {/* Selected preview */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 p-2 bg-white border border-brand-accent/30">
          {selected.map(hex => {
            const name = COLOR_PALETTE.find(c => c.hex === hex)?.name ?? hex
            return (
              <button key={hex} type="button" onClick={() => toggle(hex)} title={`Remove ${name}`}
                className="w-6 h-6 ring-2 ring-brand-accent ring-offset-1 hover:opacity-70 transition-opacity relative group"
                style={{ backgroundColor: hex }}>
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[9px] px-1.5 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-20">
                  {name}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Group tabs */}
      <div className="flex flex-wrap gap-1">
        <button type="button" onClick={() => setActiveGroup("All")}
          className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide transition-colors ${activeGroup === "All" ? "bg-brand-navy text-white" : "bg-brand-light-gray text-brand-ash hover:text-brand-charcoal"}`}>
          All ({COLOR_PALETTE.length})
        </button>
        {GROUPS.map(g => (
          <button key={g} type="button" onClick={() => setActiveGroup(g)}
            className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide transition-colors ${activeGroup === g ? "bg-brand-navy text-white" : "bg-brand-light-gray text-brand-ash hover:text-brand-charcoal"}`}>
            {g} ({BY_GROUP[g].length})
          </button>
        ))}
      </div>

      {/* Palette grid */}
      <div className="flex flex-wrap gap-1.5 p-3 border border-brand-border bg-white max-h-64 overflow-y-auto">
        {displayColors.map((swatch) => {
          const sel = selected.includes(swatch.hex)
          const light = isLight(swatch.hex)
          return (
            <div key={swatch.hex} className="relative group">
              <button
                type="button"
                onClick={() => toggle(swatch.hex)}
                onMouseEnter={() => setHoveredHex(swatch.hex)}
                onMouseLeave={() => setHoveredHex(null)}
                disabled={disabled}
                title={swatch.name}
                className={`w-7 h-7 transition-all duration-150 disabled:cursor-not-allowed ${light ? "border border-brand-border" : ""} ${sel ? "ring-2 ring-brand-accent ring-offset-1 scale-110" : "hover:scale-110 hover:ring-2 hover:ring-gray-400 hover:ring-offset-1"}`}
                style={{ backgroundColor: swatch.hex }}
              >
                {sel && (
                  <span className="flex items-center justify-center w-full h-full text-[10px] font-black"
                    style={{ color: light ? "#333" : "#fff" }}>✓</span>
                )}
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[9px] px-1.5 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 rounded-sm">
                {swatch.name}
              </span>
            </div>
          )
        })}
      </div>

      {hoveredHex && (
        <p className="text-[10px] text-brand-ash">
          {COLOR_PALETTE.find(c => c.hex === hoveredHex)?.name} — {hoveredHex}
        </p>
      )}
    </div>
  )
}
