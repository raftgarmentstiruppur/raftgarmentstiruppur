import { cn } from "@/lib/utils"
import type { Certification } from "@/types"

const categoryColors: Record<string, string> = {
  Quality:       "bg-blue-50 text-blue-700 border-blue-200",
  Environment:   "bg-green-50 text-green-700 border-green-200",
  Safety:        "bg-orange-50 text-orange-700 border-orange-200",
  Social:        "bg-purple-50 text-purple-700 border-purple-200",
  Sustainability:"bg-teal-50 text-teal-700 border-teal-200",
  Organic:       "bg-lime-50 text-lime-700 border-lime-200",
  Recycled:      "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Brand License": "bg-amber-50 text-amber-700 border-amber-200",
}

interface CertBadgeProps extends Certification {
  className?: string
}

export default function CertBadge({
  name,
  category,
  description,
  className,
}: CertBadgeProps) {
  const colorClass = categoryColors[category] ?? "bg-brand-light-gray text-brand-charcoal border-brand-border"

  return (
    <div
      className={cn(
        "border rounded-sm p-4 flex flex-col gap-2 h-full",
        "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-brand-accent",
        colorClass,
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-bold text-sm leading-tight">{name}</span>
        <span className="text-xs opacity-70 whitespace-nowrap">{category}</span>
      </div>
      <p className="text-xs opacity-70 leading-relaxed">{description}</p>
    </div>
  )
}
