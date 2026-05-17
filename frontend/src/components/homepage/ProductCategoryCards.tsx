"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { ProductCategory } from "@/types"
import { useContent } from "@/context/ContentContext"
import CategoryCardSlider from "@/components/shared/CategoryCardSlider"

interface ProductCategoryCardsProps {
  categories: ProductCategory[]
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, scale: 0.97 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
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

  const [first, second, ...rest] = resolved

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {[first, second].filter(Boolean).map((cat) => (
            <motion.div key={cat.id} variants={item}>
              <CategoryTile category={cat} tall />
            </motion.div>
          ))}
        </motion.div>
        {rest.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {rest.map((cat) => (
              <motion.div key={cat.id} variants={item}>
                <CategoryTile category={cat} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

function CategoryTile({
  category,
  tall = false,
}: {
  category: ProductCategory
  tall?: boolean
}) {
  return (
    <Link
      href={category.href}
      className="group relative overflow-hidden block bg-brand-charcoal"
    >
      <div className={`relative overflow-hidden ${tall ? "aspect-[4/3]" : "aspect-[5/3]"}`}>
        <CategoryCardSlider
          categoryId={category.id}
          fallbackImage={category.image}
          alt={category.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90" />
        {category.badge && (
          <div className="absolute top-4 left-4 z-20 bg-brand-accent text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest">
            {category.badge}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">{category.title}</h3>
          <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-sm line-clamp-2">
            {category.description}
          </p>
          <span className="inline-flex items-center gap-2 mt-4 text-[10px] font-bold uppercase tracking-widest text-white border-b border-white/40 pb-0.5 group-hover:border-brand-accent group-hover:text-brand-accent transition-all duration-200">
            Shop All →
          </span>
        </div>
      </div>
    </Link>
  )
}
