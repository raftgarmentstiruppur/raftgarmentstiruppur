import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { ProductCategory } from "@/types"

export default function ProductCategoryCards({ categories }: { categories: ProductCategory[] }) {
  return (
    <section className="border-t-2 border-brand-navy">
      <div className="border-b-2 border-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-7 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">03</span>
            <div className="h-px w-10 bg-brand-navy" />
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">Products</span>
          </div>
          <h2 className="hidden md:block text-2xl font-display uppercase text-brand-navy">Our Categories</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b-2 border-brand-navy divide-y-2 sm:divide-y-0 divide-x-0 sm:divide-x-2 divide-brand-navy">
        {categories.map((cat) => (
          <Link key={cat.id} href={cat.href} className="group relative overflow-hidden aspect-[3/4] block">
            <Image
              src={cat.image} alt={cat.title} fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent" />
            {cat.badge && (
              <div className="absolute top-4 left-4 bg-brand-accent text-white text-[9px] font-heading font-700 px-2.5 py-1 uppercase tracking-widest">{cat.badge}</div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-xl font-display uppercase text-white leading-tight">{cat.title}</h3>
              <p className="mt-1.5 text-xs text-white/60 leading-relaxed line-clamp-2 font-sans">{cat.description}</p>
              <span className="inline-flex items-center gap-1.5 mt-3 text-[9px] font-heading font-700 uppercase tracking-widest text-brand-accent group-hover:gap-3 transition-all duration-200">
                Shop <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
