"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

export default function CategoryImageGrid({
  category,
  alt,
}: {
  category: string
  alt: string
}) {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    fetch(`${API}/catalog?category=${category}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((products: { images: string[] }[]) => {
        // Collect first image from each product, up to 4
        const imgs: string[] = []
        for (const p of products) {
          if (p.images?.[0]) imgs.push(p.images[0])
          if (imgs.length >= 4) break
        }
        setImages(imgs)
      })
      .catch(() => {})
  }, [category])

  // No products yet — show the plain placeholder
  if (images.length === 0) {
    return (
      <div className="relative aspect-square border border-brand-border bg-brand-light-gray flex items-center justify-center overflow-hidden">
        <span className="text-brand-ash text-sm">{alt}</span>
      </div>
    )
  }

  // 1 image — full square
  if (images.length === 1) {
    return (
      <div className="relative aspect-square border border-brand-border overflow-hidden">
        <Image src={images[0]} alt={alt} fill className="object-cover" priority />
      </div>
    )
  }

  // 2 images — side by side
  if (images.length === 2) {
    return (
      <div className="aspect-square border border-brand-border overflow-hidden grid grid-cols-2 gap-0.5 bg-brand-border">
        {images.map((url, i) => (
          <div key={i} className="relative overflow-hidden">
            <Image src={url} alt={`${alt} ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    )
  }

  // 3 images — one big left, two stacked right
  if (images.length === 3) {
    return (
      <div className="aspect-square border border-brand-border overflow-hidden grid grid-cols-2 gap-0.5 bg-brand-border">
        <div className="relative row-span-2 overflow-hidden">
          <Image src={images[0]} alt={`${alt} 1`} fill className="object-cover" priority />
        </div>
        <div className="relative overflow-hidden">
          <Image src={images[1]} alt={`${alt} 2`} fill className="object-cover" />
        </div>
        <div className="relative overflow-hidden">
          <Image src={images[2]} alt={`${alt} 3`} fill className="object-cover" />
        </div>
      </div>
    )
  }

  // 4 images — 2×2 grid
  return (
    <div className="aspect-square border border-brand-border overflow-hidden grid grid-cols-2 grid-rows-2 gap-0.5 bg-brand-border">
      {images.map((url, i) => (
        <div key={i} className="relative overflow-hidden">
          <Image src={url} alt={`${alt} ${i + 1}`} fill className="object-cover" />
        </div>
      ))}
    </div>
  )
}
