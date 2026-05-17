"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  slug: string
  subcategory?: string | null
  badge?: string | null
  images: string[]
  fabric?: string | null
  priceRange?: string | null
}

function ProductCard({ product, href }: { product: Product; href: string }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const imgs = product.images

  useEffect(() => {
    if (imgs.length <= 1) return
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % imgs.length)
    }, 3500)
    return () => clearInterval(id)
  }, [imgs.length])

  return (
    <Link
      href={href}
      className="group border border-brand-border bg-white overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square overflow-hidden bg-brand-light-gray">
        {imgs.length > 0 ? (
          imgs.map((url, idx) => (
            <div
              key={url}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: idx === activeIdx ? 1 : 0 }}
            >
              <Image
                src={url}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-ash text-xs">
            No Image
          </div>
        )}

        {product.badge && (
          <span className="absolute top-2 left-2 z-10 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
            {product.badge}
          </span>
        )}

        {imgs.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
            {imgs.map((_, idx) => (
              <span
                key={idx}
                className="w-1 h-1 rounded-full transition-colors duration-300"
                style={{ background: idx === activeIdx ? "#fff" : "rgba(255,255,255,0.4)" }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-brand-charcoal text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>
        {product.fabric && (
          <p className="text-xs text-brand-slate mt-1 truncate">{product.fabric}</p>
        )}
        {product.priceRange && (
          <p className="text-xs font-medium text-brand-accent mt-2">{product.priceRange}</p>
        )}
        <p className="text-xs text-brand-accent font-semibold mt-2">Get a Quote &rarr;</p>
      </div>
    </Link>
  )
}

export default function ProductCatalogSection({
  category,
  categoryPath,
}: {
  category: string
  categoryPath: string
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"
    fetch(`${apiUrl}/catalog?category=${category}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        setProducts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [category])

  if (loading || products.length === 0) return null

  // Group by subcategory, preserve insertion order
  const grouped: { label: string; items: Product[] }[] = []
  const seen = new Set<string>()
  for (const p of products) {
    const key = p.subcategory ?? ""
    if (!seen.has(key)) {
      seen.add(key)
      grouped.push({ label: key, items: [] })
    }
    grouped.find((g) => g.label === key)!.items.push(p)
  }

  return (
    <>
      {grouped.map((group, idx) => (
        <section
          key={group.label || "ungrouped"}
          className={`py-section ${idx % 2 === 0 ? "bg-white" : "bg-brand-light-gray"}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {group.label && (
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-1">
                  {category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
                <h2 className="text-2xl font-black text-brand-navy">{group.label}</h2>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {group.items.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
