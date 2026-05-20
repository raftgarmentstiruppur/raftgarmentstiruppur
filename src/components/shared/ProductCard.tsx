import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { ProductCategory } from "@/types"

interface ProductCardProps extends ProductCategory { className?: string }

export default function ProductCard({ title, description, image, href, badge, className }: ProductCardProps) {
  return (
    <Link href={href} className={cn("group block overflow-hidden border-2 border-brand-navy bg-white hover:bg-brand-navy transition-colors duration-300", className)}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image} alt={title} fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-navy/60 group-hover:bg-brand-navy/40 transition-colors duration-300" />
        {badge && (
          <div className="absolute top-4 left-4 bg-brand-accent text-white text-[10px] font-heading font-700 px-3 py-1 uppercase tracking-widest">
            {badge}
          </div>
        )}
      </div>
      <div className="p-6 border-t-2 border-brand-navy group-hover:border-white transition-colors duration-300">
        <h3 className="text-2xl font-heading font-800 uppercase tracking-tight text-brand-navy group-hover:text-white transition-colors duration-300">{title}</h3>
        <p className="mt-2 text-sm text-brand-slate group-hover:text-white/60 leading-relaxed transition-colors duration-300 line-clamp-2">{description}</p>
        <span className="inline-flex items-center gap-2 mt-4 text-[10px] font-heading font-700 uppercase tracking-[0.25em] text-brand-accent group-hover:gap-3 transition-all duration-200">
          Explore →
        </span>
      </div>
    </Link>
  )
}
