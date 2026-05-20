import CTAButton from "@/components/shared/CTAButton"

interface MarketingBannerProps {
  eyebrow: string; headline: string; description: string; ctaLabel: string; ctaHref: string
}

export default function MarketingBanner({ eyebrow, headline, description, ctaLabel, ctaHref }: MarketingBannerProps) {
  return (
    <section className="border-t-2 border-brand-navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-14 md:py-20">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <p className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent mb-5">{eyebrow}</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display uppercase leading-[0.9] text-brand-navy">{headline}</h2>
            <p className="mt-5 text-brand-slate max-w-xl leading-relaxed">{description}</p>
          </div>
          <CTAButton label={ctaLabel} href={ctaHref} variant="primary" size="lg" arrow className="shrink-0 self-end" />
        </div>
      </div>
    </section>
  )
}
