import Link from "next/link"
import { cn } from "@/lib/utils"
import type { ProductCategory } from "@/types"
import CategoryCardSlider from "./CategoryCardSlider"

interface ProductCardProps extends ProductCategory {
  className?: string
}

export default function ProductCard({
  id,
  title,
  description,
  image,
  href,
  badge,
  className,
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative overflow-hidden block bg-brand-charcoal",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <CategoryCardSlider categoryId={id} fallbackImage={image} alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
        {badge && (
          <div className="absolute top-4 left-4 z-20 bg-brand-accent text-white text-xs font-semibold px-3 py-1">
            {badge}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="mt-1 text-sm text-white/80 leading-relaxed line-clamp-2">
            {description}
          </p>
          <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold uppercase tracking-widest text-brand-accent group-hover:gap-2 transition-all">
            Shop All →
          </span>
        </div>
      </div>
    </Link>
  )
}
