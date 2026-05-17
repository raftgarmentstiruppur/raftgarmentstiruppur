"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

const productCache = new Map<string, string[]>()

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function CategoryCardSlider({
  categoryId,
  fallbackImage,
  alt,
}: {
  categoryId: string
  fallbackImage: string
  alt: string
}) {
  const [images, setImages] = useState<string[]>([])
  const [activeIdx, setActiveIdx] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (productCache.has(categoryId)) {
      setImages(productCache.get(categoryId)!)
      setLoaded(true)
      return
    }
    fetch(`${API}/catalog?category=${categoryId}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((products: { images: string[] }[]) => {
        const all = shuffle(products.flatMap((p) => p.images).filter(Boolean))
        const result = all.length > 0 ? all : [fallbackImage]
        productCache.set(categoryId, result)
        setImages(result)
        setLoaded(true)
      })
      .catch(() => {
        setImages([fallbackImage])
        setLoaded(true)
      })
  }, [categoryId, fallbackImage])

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % images.length), 3500)
    return () => clearInterval(id)
  }, [images.length])

  if (!loaded) {
    return (
      <Image
        src={fallbackImage}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        priority
      />
    )
  }

  return (
    <>
      {images.map((url, idx) => (
        <div
          key={`${categoryId}-${idx}`}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: idx === activeIdx ? 1 : 0 }}
        >
          <Image
            src={url}
            alt={`${alt} ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover transition-transform duration-[5000ms] ease-in-out ${
              idx === activeIdx ? "scale-105" : "scale-100"
            }`}
          />
        </div>
      ))}
    </>
  )
}
