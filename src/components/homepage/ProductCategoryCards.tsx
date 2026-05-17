import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { ProductCategory } from "@/types"

interface ProductCategoryCardsProps {
  categories: ProductCategory[]
}

export default function ProductCategoryCards({ categories }: ProductCategoryCardsProps) {
  const [first, second, ...rest] = categories

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {[first, second].filter(Boolean).map((cat) => (
            <CategoryTile key={cat.id} category={cat} tall />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rest.map((cat) => (
            <CategoryTile key={cat.id} category={cat} />
          ))}
        </div>
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
      className="group relative overflow-hidden block bg-brand-light-gray"
    >
      <div className={`relative overflow-hidden ${tall ? "aspect-[4/3]" : "aspect-[5/3]"}`}>
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-700" />
        {category.badge && (
          <div className="absolute top-4 left-4 bg-brand-accent text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest translate-y-0 opacity-100 group-hover:bg-brand-accent-hover transition-colors duration-300">
            {category.badge}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-0 transition-transform duration-500">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">{category.title}</h3>
          <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-sm line-clamp-2 transition-opacity duration-300">
            {category.description}
          </p>
          <span className="inline-flex items-center gap-2 mt-4 text-[10px] font-bold uppercase tracking-widest text-white border-b border-white/40 pb-0.5 group-hover:border-white transition-colors duration-300">
            Shop All
            <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}
