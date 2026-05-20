"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

function hq(url: string) {
  if (!url.includes("res.cloudinary.com")) return url
  return url.replace("/upload/", "/upload/q_auto,f_auto,w_1400/")
}

// Module-level cache — shared across all sliders (one fetch per page load)
let _cached: Record<string, string> | null = null
let _promise: Promise<Record<string, string>> | null = null

function fetchContent(): Promise<Record<string, string>> {
  if (_cached) return Promise.resolve(_cached)
  if (_promise) return _promise
  _promise = fetch(`${API}/content`, { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : {}))
    .then((data) => { _cached = data; return data })
    .catch(() => { _promise = null; return {} })
  return _promise
}

// Call this after any admin delete so the next navigation re-fetches fresh data
export function invalidateDivisionImageCache() {
  _cached  = null
  _promise = null
}

interface Props {
  divisionNumber: string
  alt: string
  icon?: React.ReactNode
  fallbackImage?: string
  compact?: boolean
  objectPosition?: string  // e.g. "center top", "center center"
}

export default function DivisionImageSlider({ divisionNumber, alt, icon, fallbackImage, compact = false, objectPosition = "center center" }: Props) {
  const [images,    setImages]    = useState<string[]>([])
  const [loading,   setLoading]   = useState(true)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    fetchContent().then((data) => {
      // numbered slots first
      const urls = Array.from({ length: 5 }, (_, i) =>
        data[`division-${divisionNumber}-image-${i + 1}`]?.trim() || ""
      ).filter(Boolean)

      // legacy single-key fallback
      if (urls.length === 0) {
        const leg = data[`division-${divisionNumber}-image`]?.trim()
        if (leg) urls.push(leg)
      }

      setImages(urls.map(hq))
      setLoading(false)
    })
  }, [divisionNumber])

  // Auto-advance
  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % images.length), 3200)
    return () => clearInterval(id)
  }, [images.length])

  if (loading) {
    return (
      <div className="w-full h-full min-h-[380px] bg-brand-navy animate-pulse flex items-center justify-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Loading…</span>
      </div>
    )
  }

  const display = images.length > 0 ? images : fallbackImage ? [fallbackImage] : []

  if (display.length === 0) {
    return (
      <div className="w-full h-full min-h-[380px] bg-brand-navy flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border border-white/20 flex items-center justify-center text-white/30">
          {icon ?? <span className="text-3xl font-black text-white/20">{divisionNumber}</span>}
        </div>
        <span className="text-xs font-black uppercase tracking-[0.2em] text-white/30">{alt}</span>
        <p className="text-[10px] text-white/20 uppercase tracking-widest">Upload via Admin → Content</p>
      </div>
    )
  }

  return (
    <div className={`relative w-full overflow-hidden bg-brand-dark ${compact ? "h-full" : "h-full min-h-[380px]"}`}>
      {display.map((url, idx) => (
        <div
          key={url}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: idx === activeIdx ? 1 : 0 }}
        >
          <Image
            src={url}
            alt={`${alt} ${idx + 1}`}
            fill
            unoptimized
            className="object-cover"
            style={{ objectPosition }}
            priority={idx === 0}
          />
        </div>
      ))}

      {display.length > 1 && (
        <div className={`absolute left-0 right-0 flex justify-center z-10 ${compact ? "bottom-2 gap-1" : "bottom-4 gap-2"}`}>
          {display.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Image ${idx + 1}`}
              className="transition-all duration-300"
              style={{
                width:        compact ? (idx === activeIdx ? 14 : 5) : 8,
                height:       compact ? 3 : 8,
                borderRadius: compact ? 2 : "50%",
                background:   idx === activeIdx ? "#43A047" : "rgba(255,255,255,0.45)",
                transform:    !compact && idx === activeIdx ? "scale(1.35)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}

    </div>
  )
}
