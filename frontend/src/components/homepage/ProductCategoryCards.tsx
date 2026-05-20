"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import type { ProductCategory } from "@/types"
import { useContent } from "@/context/ContentContext"
import CategoryCardSlider from "@/components/shared/CategoryCardSlider"

interface ProductCategoryCardsProps {
  categories: ProductCategory[]
}

export default function ProductCategoryCards({ categories }: ProductCategoryCardsProps) {
  const { content } = useContent()

  const resolved = categories.map((cat) => ({
    ...cat,
    image:       content[`product-${cat.id}`]?.trim()             || cat.image,
    title:       content[`product-${cat.id}-title`]?.trim()       || cat.title,
    description: content[`product-${cat.id}-description`]?.trim() || cat.description,
    badge:       content[`product-${cat.id}-badge`]?.trim()       || cat.badge,
  }))

  // Bella Canvas: 2×2 portrait grid — every tile equal
  const tiles = resolved.slice(0, 4)

  return (
    <section className="bg-black">
      <div className="grid grid-cols-2 gap-[2px] bg-black">
        {tiles.map((cat, i) => (
          <CategoryTile key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </section>
  )
}

function CategoryTile({ category, index }: { category: ProductCategory; index: number }) {
  // Alternate Ken Burns direction per tile so they feel independent
  const kbClass = index % 2 === 0 ? "animate-kb-a" : "animate-kb-b"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link href={category.href} className="group relative overflow-hidden block bg-brand-navy">
        {/* Portrait aspect — same as Bella Canvas */}
        <div className="relative aspect-[4/5] overflow-hidden">

          {/* Ken Burns animated image layer */}
          <div className={`absolute inset-0 ${kbClass} group-hover:[animation-play-state:paused]`}>
            <CategoryCardSlider
              categoryId={category.id}
              fallbackImage={category.image}
              alt={category.title}
            />
          </div>

          {/* Bottom gradient — only bottom third, lets top image breathe */}
          <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />

          {/* Hover overlay — very subtle tint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 z-10 transition-colors duration-500 pointer-events-none" />

          {/* Badge */}
          {category.badge && (
            <div className="absolute top-4 left-4 z-20 bg-brand-accent text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-widest">
              {category.badge}
            </div>
          )}

          {/* Text — bottom of tile */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-20">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold font-sans text-white tracking-tight leading-none">
              {category.title}
            </h3>
            {/* CTA — slides up on hover */}
            <div className="flex items-center gap-2 mt-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-[10px] font-bold text-white/75 uppercase tracking-[0.2em]">Shop Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/75" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
