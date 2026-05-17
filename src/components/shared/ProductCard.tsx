import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { ProductCategory } from "@/types"

interface ProductCardProps extends ProductCategory {
  className?: string
}

export default function ProductCard({
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
        "group relative overflow-hidden block bg-brand-light-gray",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {badge && (
          <div className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-semibold px-3 py-1">
            {badge}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="mt-1 text-sm text-white/80 leading-relaxed line-clamp-2">
            {description}
          </p>
          <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold uppercase tracking-widest text-brand-accent group-hover:gap-2 transition-all">
            Shop Now →
          </span>
        </div>
      </div>
    </Link>
  )
}
