"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import SectionHeader from "./SectionHeader"
import ProductCard from "./ProductCard"
import { productCategories } from "@/data/products"

interface Product {
  id: string
  name: string
  slug: string
  category: string
  subcategory?: string | null
  badge?: string | null
  fabric?: string | null
  sizes?: string | null
  priceRange?: string | null
  images: string[]
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

const FILTER_LABELS: Record<string, string> = {
  "New Arrival":  "New Arrivals",
  "Best Seller":  "Best Sellers",
  "Sustainable":  "Sustainable Styles",
  "Private Label":"Private Label",
}

const CATEGORY_PATHS: Record<string, string> = {
  "kids-innerwear":   "kids-innerwear",
  "mens-innerwear":   "mens-innerwear",
  "womens-innerwear": "womens-innerwear",
}

function FilteredView({ filter }: { filter: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/catalog`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Product[]) => {
        const filtered = data.filter(
          (p) => p.badge?.toLowerCase() === filter.toLowerCase()
        )
        setProducts(filtered)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [filter])

  const label = FILTER_LABELS[filter] ?? filter

  return (
    <section className="py-section bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between mb-10">
          <SectionHeader
            overline="Browse By"
            title={label}
            className="mb-0"
          />
          <Link
            href="/products"
            className="text-sm text-brand-slate hover:text-brand-charcoal underline shrink-0"
          >
            ← All Categories
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {Object.entries(FILTER_LABELS).map(([key, val]) => (
            <Link
              key={key}
              href={`/products?filter=${encodeURIComponent(key)}`}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wide border transition-colors ${
                filter === key
                  ? "bg-brand-accent text-white border-brand-accent"
                  : "border-brand-border text-brand-slate hover:border-brand-accent hover:text-brand-accent"
              }`}
            >
              {val}
            </Link>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-brand-slate text-sm">
            Loading…
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-brand-border">
            <p className="text-brand-slate text-sm">No products tagged as "{label}" yet.</p>
            <p className="text-xs text-brand-ash mt-2">
              Go to Admin → Products and set the Badge to <strong>{filter}</strong> on any product.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProductItem({ product }: { product: Product }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const imgs = product.images

  useEffect(() => {
    if (imgs.length <= 1) return
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % imgs.length), 1200)
    return () => clearInterval(id)
  }, [imgs.length])

  const categoryPath = CATEGORY_PATHS[product.category] ?? product.category

  return (
    <Link
      href={`/contact?product=${encodeURIComponent(product.name)}`}
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
              <Image src={url} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-ash text-xs">No Image</div>
        )}
        {product.badge && (
          <span className="absolute top-2 left-2 z-10 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
            {product.badge}
          </span>
        )}
        {imgs.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
            {imgs.map((_, idx) => (
              <span key={idx} className="w-1 h-1 rounded-full transition-colors duration-300"
                style={{ background: idx === activeIdx ? "#fff" : "rgba(255,255,255,0.4)" }} />
            ))}
          </div>
        )}
      </div>
      <div className="p-4">
        {product.subcategory && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-1">{product.subcategory}</p>
        )}
        <h3 className="font-semibold text-brand-charcoal text-sm leading-tight line-clamp-2">{product.name}</h3>
        <p className="text-xs text-brand-ash mt-1 capitalize">{product.category.replace(/-/g, " ")}</p>
        {product.fabric && <p className="text-xs text-brand-slate mt-1 truncate">{product.fabric}</p>}
        {product.priceRange && <p className="text-xs font-medium text-brand-accent mt-2">{product.priceRange}</p>}
        <p className="text-xs text-brand-accent font-semibold mt-2">Get a Quote &rarr;</p>
      </div>
    </Link>
  )
}

function Inner() {
  const params = useSearchParams()
  const filter = params.get("filter")

  if (!filter) {
    return (
      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            overline="Our Range"
            title="Explore our categories"
            subtitle="Each category is engineered with category-specific fabric constructions, safety standards, and finishing requirements."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productCategories.map((cat) => (
              <ProductCard key={cat.id} {...cat} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return <FilteredView filter={filter} />
}

export default function FilteredProducts() {
  return (
    <Suspense fallback={
      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader overline="Our Range" title="Explore our categories" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productCategories.map((cat) => <ProductCard key={cat.id} {...cat} />)}
          </div>
        </div>
      </section>
    }>
      <Inner />
    </Suspense>
  )
}
