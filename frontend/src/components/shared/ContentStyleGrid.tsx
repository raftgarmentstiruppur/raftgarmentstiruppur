"use client"

import Image from "next/image"
import Link from "next/link"
import { useContent } from "@/context/ContentContext"

interface ContentStyleGridProps {
  productKey: string
  defaultStyles: string[]
}

export default function ContentStyleGrid({ productKey, defaultStyles }: ContentStyleGridProps) {
  const { content } = useContent()

  const rawStyles = content[`${productKey}-styles`]
  const styles = rawStyles
    ? rawStyles.split(",").map((s) => s.trim()).filter(Boolean)
    : defaultStyles

  return (
    <>
      {styles.map((style, i) => {
        const imgKey = `${productKey}-gallery-${i + 1}`
        const img    = content[imgKey]?.trim()
        const href   = `/contact?product=${encodeURIComponent(style)}`

        return img ? (
          <Link key={i} href={href} className="relative group overflow-hidden border border-brand-border aspect-square bg-brand-light-gray">
            <Image
              src={img}
              alt={style}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-end">
              <p className="text-white text-sm font-semibold p-3 leading-tight">{style}</p>
            </div>
          </Link>
        ) : (
          <Link
            key={i}
            href={href}
            className="bg-white border border-brand-border p-4 text-center text-sm font-medium text-brand-charcoal flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-colors"
          >
            {style}
          </Link>
        )
      })}
    </>
  )
}
