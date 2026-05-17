import CTAButton from "@/components/shared/CTAButton"

interface MarketingBannerProps {
  eyebrow: string
  headline: string
  description: string
  ctaLabel: string
  ctaHref: string
}

export default function MarketingBanner({
  eyebrow,
  headline,
  description,
  ctaLabel,
  ctaHref,
}: MarketingBannerProps) {
  return (
    <section className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:max-w-xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-4">
            {eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white uppercase">
            {headline}
          </h2>
          <p className="mt-4 text-white/50 leading-relaxed">{description}</p>
        </div>
        <CTAButton
          label={ctaLabel}
          href={ctaHref}
          variant="outline-light"
          size="lg"
          arrow
          className="shrink-0"
        />
      </div>
    </section>
  )
}
