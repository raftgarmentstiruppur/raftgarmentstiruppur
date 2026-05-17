import CTAButton from "@/components/shared/CTAButton"
import type { StatItem } from "@/types"

interface SustainabilityBannerProps {
  headline: string
  stats: StatItem[]
  ctaLabel: string
  ctaHref: string
}

export default function SustainabilityBanner({
  headline,
  stats,
  ctaLabel,
  ctaHref,
}: SustainabilityBannerProps) {
  return (
    <section className="py-section bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-4">
              Sustainability
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none max-w-xl">
              {headline}
            </h2>
          </div>
          <CTAButton label={ctaLabel} href={ctaHref} variant="outline-light" arrow />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-black py-10 px-6 text-center">
              <div className="text-4xl font-black text-white">{stat.value}</div>
              <div className="mt-2 text-[10px] text-white/40 uppercase tracking-widest font-bold">{stat.label}</div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-white/40 max-w-md">
          Powered by renewable energy — solar and wind — not the grid. Our commitment to the planet is woven into every garment.
        </p>
      </div>
    </section>
  )
}
