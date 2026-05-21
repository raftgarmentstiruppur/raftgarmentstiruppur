"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { COLOR_PALETTE } from "@/data/colorPalette"

interface Product {
  id: string
  category: string
  name: string
  slug: string
  subcategory?: string | null
  description?: string | null
  fabric?: string | null
  sizes?: string | null
  priceRange?: string | null
  badge?: string | null
  ageRange?: string | null
  dyes?: string | null
  closures?: string | null
  seams?: string | null
  prints?: string | null
  embellishments?: string | null
  weights?: string | null
  colors?: string | null
  printMethods?: string | null
  finishes?: string | null
  certifications?: string | null
  moq?: string | null
  leadTime?: string | null
  images: string[]
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

function ProductRow({
  product,
  categoryPath,
  reverse,
  bg,
}: {
  product: Product
  categoryPath: string
  reverse: boolean
  bg: string
}) {
  const [activeIdx, setActiveIdx] = useState(0)
  const imgs = product.images

  useEffect(() => {
    if (imgs.length <= 1) return
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % imgs.length), 1200)
    return () => clearInterval(id)
  }, [imgs.length])

  const imagePanel = (
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
        <div className="w-full h-full flex items-center justify-center text-brand-ash text-sm">
          No image
        </div>
      )}

      {product.badge && (
        <span className="absolute top-4 left-4 z-10 bg-brand-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1">
          {product.badge}
        </span>
      )}

      {imgs.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
          {imgs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
              style={{ background: idx === activeIdx ? "#fff" : "rgba(255,255,255,0.4)" }}
            />
          ))}
        </div>
      )}
    </div>
  )

  const cat = product.category ?? ""
  const isKids   = cat === "kids-innerwear"
  const isMens   = cat === "mens-innerwear"
  const isWomens = cat === "womens-innerwear"

  const specs: { label: string; value: string | null | undefined }[] = [
    { label: "Age Range",                                            value: product.ageRange },
    { label: "Fabric",                                               value: product.fabric },
    { label: "Sizes",                                                value: product.sizes },
    { label: isWomens ? "Cup Sizes" : "Waistband",                  value: product.closures },
    { label: isKids ? "Seam Finish" : isMens ? "Leg Length" : "Details & Trim", value: isKids ? product.seams : isMens ? product.dyes : product.seams },
    { label: "Embellishments / Trim",                                value: product.embellishments },
    { label: "Fabric Weight",                                        value: product.weights },
    // Colors handled separately as swatches — skip from plain text specs

    { label: "Finishes",                                             value: product.finishes },
    { label: "Certifications",                                       value: product.certifications },
    { label: "MOQ",                                                  value: product.moq },
    { label: "Lead Time",                                            value: product.leadTime },
    { label: "Price Range",                                          value: product.priceRange },
  ].filter((s): s is { label: string; value: string } => Boolean(s.value))

  const detailsPanel = (
    <div className="flex flex-col justify-center py-8 lg:py-0">
      {product.subcategory && (
        <p className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-3">
          {product.subcategory}
        </p>
      )}
      <h2 className="text-3xl font-black text-brand-navy leading-tight">{product.name}</h2>

      {product.description && (
        <p className="mt-4 text-base text-brand-slate leading-relaxed text-justify">{product.description}</p>
      )}

      {/* Colour swatches */}
      {product.colors && (() => {
        let hexArr: string[] = []
        try { hexArr = JSON.parse(product.colors) } catch { /* not JSON, skip */ }
        if (!hexArr.length) return null
        return (
          <div className="mt-5 space-y-2">
            <p className="text-xs font-black uppercase tracking-widest text-brand-ash flex items-center gap-2">
              Available colours
              <span className="text-brand-accent font-black">{hexArr.length}+</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {hexArr.map((hex) => {
                const name    = COLOR_PALETTE.find(c => c.hex === hex)?.name ?? hex
                const isLight = (() => {
                  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
                  return (r*299+g*587+b*114)/1000 > 180
                })()
                return (
                  <div key={hex} className="relative group cursor-default">
                    <div
                      title={name}
                      className={`w-7 h-7 transition-transform duration-150 hover:scale-125 ${isLight ? "border border-brand-border" : ""}`}
                      style={{ backgroundColor: hex }}
                    />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[9px] px-2 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 rounded-sm">
                      {name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })()}

      {specs.length > 0 && (
        <div className="mt-6 border border-brand-border divide-y divide-brand-border">
          {specs.map((s) => (
            <div key={s.label} className="grid grid-cols-2 py-3 px-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-ash">
                {s.label}
              </span>
              <span className="text-base text-brand-charcoal">{s.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href={`/contact?product=${encodeURIComponent(product.name)}`}
          className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white px-6 py-3 text-sm font-bold uppercase tracking-wide hover:bg-brand-accent/90 transition-colors"
        >
          Get a quote →
        </Link>
      </div>
    </div>
  )

  return (
    <section className={`py-section ${bg}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}>
          <div className={reverse ? "lg:[direction:ltr]" : ""}>{imagePanel}</div>
          <div className={reverse ? "lg:[direction:ltr]" : ""}>{detailsPanel}</div>
        </div>
      </div>
    </section>
  )
}

export default function ProductsAlternatingSection({
  category,
  categoryPath,
}: {
  category: string
  categoryPath: string
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

  if (loading || products.length === 0) return null

  const bgs = ["bg-white", "bg-brand-light-gray"]

  return (
    <>
      {products.map((product, idx) => (
        <ProductRow
          key={product.id}
          product={product}
          categoryPath={categoryPath}
          reverse={idx % 2 !== 0}
          bg={bgs[idx % 2]}
        />
      ))}
    </>
  )
}
