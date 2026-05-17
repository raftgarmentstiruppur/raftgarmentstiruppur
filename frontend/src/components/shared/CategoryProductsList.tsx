"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  slug: string
  subcategory?: string | null
  description?: string | null
  fabric?: string | null
  sizes?: string | null
  priceRange?: string | null
  badge?: string | null
  images: string[]
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

function ProductItem({
  product,
  categoryPath,
}: {
  product: Product
  categoryPath: string
}) {
  const [activeIdx, setActiveIdx] = useState(0)
  const imgs = product.images

  useEffect(() => {
    if (imgs.length <= 1) return
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % imgs.length), 1200)
    return () => clearInterval(id)
  }, [imgs.length])

  return (
    <Link
      href={`/products/detail?category=${categoryPath}&slug=${product.slug}`}
      className="flex gap-4 p-4 border border-brand-border bg-white hover:border-brand-accent hover:shadow-sm transition-all group"
    >
      {/* Image with auto-scroll */}
      <div className="relative w-28 h-28 shrink-0 overflow-hidden bg-brand-light-gray">
        {imgs.length > 0 ? (
          imgs.map((url, idx) => (
            <div
              key={url}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: idx === activeIdx ? 1 : 0 }}
            >
              <Image src={url} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-ash text-xs">
            No Image
          </div>
        )}
        {product.badge && (
          <span className="absolute top-1 left-1 z-10 bg-brand-accent text-white text-[9px] font-bold uppercase px-1.5 py-0.5">
            {product.badge}
          </span>
        )}
        {imgs.length > 1 && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5 z-10">
            {imgs.map((_, idx) => (
              <span
                key={idx}
                className="w-1 h-1 rounded-full transition-colors duration-300"
                style={{ background: idx === activeIdx ? "#fff" : "rgba(255,255,255,0.45)" }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        {product.subcategory && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-0.5">
            {product.subcategory}
          </p>
        )}
        <h3 className="text-sm font-bold text-brand-navy leading-tight group-hover:text-brand-accent transition-colors line-clamp-1">
          {product.name}
        </h3>

        <div className="mt-2 space-y-1">
          {product.fabric && (
            <div className="flex gap-2 text-xs">
              <span className="text-brand-ash font-semibold uppercase tracking-wide w-14 shrink-0">Fabric</span>
              <span className="text-brand-charcoal truncate">{product.fabric}</span>
            </div>
          )}
          {product.sizes && (
            <div className="flex gap-2 text-xs">
              <span className="text-brand-ash font-semibold uppercase tracking-wide w-14 shrink-0">Sizes</span>
              <span className="text-brand-charcoal truncate">{product.sizes}</span>
            </div>
          )}
          {product.priceRange && (
            <div className="flex gap-2 text-xs">
              <span className="text-brand-ash font-semibold uppercase tracking-wide w-14 shrink-0">Price</span>
              <span className="text-brand-accent font-semibold">{product.priceRange}</span>
            </div>
          )}
        </div>

        <p className="mt-2 text-xs text-brand-ash group-hover:text-brand-accent transition-colors">
          View Details &rarr;
        </p>
      </div>
    </Link>
  )
}

export default function CategoryProductsList({
  category,
  categoryPath,
  fallback,
}: {
  category: string
  categoryPath: string
  fallback: React.ReactNode
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/catalog?category=${category}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setProducts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [category])

  // Show fallback while loading or when no products
  if (loading || products.length === 0) return <>{fallback}</>

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} categoryPath={categoryPath} />
      ))}
    </div>
  )
}
