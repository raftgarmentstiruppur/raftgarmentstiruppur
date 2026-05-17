"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useContent } from "@/context/ContentContext"

export default function DivisionImageSlider({
  divisionNumber,
  alt,
}: {
  divisionNumber: string
  alt: string
}) {
  const { content } = useContent()
  const [activeIdx, setActiveIdx] = useState(0)

  // Collect uploaded images for this division (up to 5 slots)
  const images = Array.from({ length: 5 }, (_, i) => {
    const url = content[`division-${divisionNumber}-image-${i + 1}`]?.trim()
    return url && url !== " " ? url : null
  }).filter(Boolean) as string[]

  // Also support the old single-image key as fallback
  const legacyImage = content[`division-${divisionNumber}-image`]?.trim()
  if (images.length === 0 && legacyImage && legacyImage !== " ") images.push(legacyImage)

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % images.length), 3000)
    return () => clearInterval(id)
  }, [images.length])

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/3] border border-brand-border bg-brand-light-gray flex items-center justify-center">
        <span className="text-brand-ash text-sm">{alt}</span>
      </div>
    )
  }

  return (
    <div className="relative aspect-[4/3] border border-brand-border overflow-hidden bg-brand-light-gray">
      {images.map((url, idx) => (
        <div
          key={url}
          className="absolute inset-0 transition-opacity duration-500 ease-in-out"
          style={{ opacity: idx === activeIdx ? 1 : 0 }}
        >
          <Image src={url} alt={`${alt} ${idx + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
              style={{ background: idx === activeIdx ? "#fff" : "rgba(255,255,255,0.45)" }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
