import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import StatCard from "@/components/shared/StatCard"
import CTAButton from "@/components/shared/CTAButton"
import AnimateIn from "@/components/shared/AnimateIn"
import { divisions } from "@/data/infrastructure"
import { CheckCircle2,
  Layers, Grid3x3, Droplets, Scissors, Printer, Star, Workflow, CheckCircle, Package
} from "lucide-react"

export const metadata: Metadata = {
  title: "Infrastructure",
  description: "9 integrated manufacturing divisions under one roof — from spinning to packaging. 18 facilities in Tirupur, India.",
}

const iconMap: Record<string, React.ReactNode> = {
  Layers:      <Layers className="w-8 h-8" />,
  Grid3x3:     <Grid3x3 className="w-8 h-8" />,
  Droplets:    <Droplets className="w-8 h-8" />,
  Scissors:    <Scissors className="w-8 h-8" />,
  Printer:     <Printer className="w-8 h-8" />,
  Star:        <Star className="w-8 h-8" />,
  Workflow:    <Workflow className="w-8 h-8" />,
  CheckCircle: <CheckCircle className="w-8 h-8" />,
  Package:     <Package className="w-8 h-8" />,
}

const processSteps = ["Fiber", "Spinning", "Knitting", "Dyeing", "Cutting", "Sewing", "Printing", "Finishing", "Shipping"]

export default function InfrastructurePage() {
  return (
    <>
      <PageHero
        title="Infrastructure that powers quality."
        subtitle="CAD/CAM automation, 9 integrated divisions, 18 facilities — every step in-house, every standard exceeded."
        breadcrumb={[{ label: "Infrastructure", href: "/infrastructure" }]}
        number="03"
      />

      {/* Key metrics band */}
      <section className="py-10 bg-brand-surface border-b border-brand-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "18",   label: "Facilities", sub: "Integrated campus" },
              { value: "100K", label: "Pieces/Day",  sub: "Sewing capacity" },
              { value: "9",    label: "Divisions",   sub: "End-to-end" },
              { value: "14+",  label: "Certs",       sub: "Active certifications" },
            ].map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 0.08} direction="none">
                <div className="bg-white border border-brand-border rounded-xl p-5 text-center">
                  <div className="text-3xl md:text-4xl font-black font-heading text-brand-navy">{stat.value}</div>
                  <div className="text-sm font-semibold text-brand-charcoal mt-1">{stat.label}</div>
                  <div className="text-xs text-brand-ash mt-0.5">{stat.sub}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process flow */}
      <section className="py-10 bg-white border-b border-brand-border overflow-x-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center gap-0 min-w-max mx-auto w-fit">
            {processSteps.map((step, i) => (
              <AnimateIn key={step} delay={i * 0.06} direction="none">
                <div className="flex items-center">
                  <div className="text-center px-4">
                    <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center text-xs font-bold mx-auto font-heading">
                      {i + 1}
                    </div>
                    <p className="mt-2 text-xs font-medium text-brand-slate">{step}</p>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-8 h-px bg-brand-accent" />
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Division detail sections */}
      <section className="py-section bg-brand-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <AnimateIn>
            <SectionHeader
              overline="Our Divisions"
              title="Integrated at Every Stage"
              subtitle="Full vertical integration means we control quality, cost, and lead times across all 9 divisions."
              className="mb-20"
            />
          </AnimateIn>

          <div className="space-y-24">
            {divisions.map((div, i) => {
              const isReversed = i % 2 === 1

              const imagePlaceholder = (
                <div className="aspect-[4/3] bg-white rounded-2xl flex items-center justify-center border border-brand-border overflow-hidden group hover:border-brand-accent transition-colors duration-300 shadow-sm">
                  <div className="text-center transition-transform duration-300 group-hover:scale-110">
                    <div className="text-brand-accent mx-auto w-fit mb-3">
                      {iconMap[div.icon ?? ""] ?? null}
                    </div>
                    <p className="text-sm text-brand-ash font-medium">{div.name} facility</p>
                    <p className="text-xs text-brand-ash/60 mt-1">Photo coming soon</p>
                  </div>
                </div>
              )

              const content = (
                <div className="relative">
                  <span className="absolute -top-6 -left-2 text-[8rem] font-black text-brand-navy/5 leading-none select-none pointer-events-none font-heading">
                    {div.number}
                  </span>
                  <div className="relative">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-accent mb-3">
                      Division {div.number}
                    </p>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-brand-accent">
                        {iconMap[div.icon ?? ""] ?? null}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black font-heading text-brand-navy">{div.name}</h2>
                    </div>
                    <div className="inline-block bg-brand-accent/10 text-brand-accent text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                      {div.capacity}
                    </div>
                    {div.bullets ? (
                      <ul className="space-y-3">
                        {div.bullets.map((bullet, bi) => (
                          <li key={bi} className="flex items-start gap-3 text-brand-slate leading-relaxed">
                            <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-brand-slate leading-relaxed">{div.description}</p>
                    )}
                  </div>
                </div>
              )

              return (
                <AnimateIn key={div.number} delay={0.1} direction={isReversed ? "right" : "left"}>
                  <div
                    id={div.name.toLowerCase()}
                    className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
                  >
                    {isReversed ? (
                      <>
                        {content}
                        {imagePlaceholder}
                      </>
                    ) : (
                      <>
                        {imagePlaceholder}
                        {content}
                      </>
                    )}
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Capacity summary */}
      <section className="py-section bg-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <AnimateIn>
            <SectionHeader
              overline="Combined Capacity"
              title="Built for Scale"
              light
              className="mb-12"
            />
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "60+",  label: "Tons Yarn/Day",       accent: "border-t-2 border-t-brand-accent/40" },
              { value: "50+",  label: "Tons Fabric Dyed/Day", accent: "border-t-2 border-t-brand-accent/60" },
              { value: "4M+",  label: "Units Cut/Month",      accent: "border-t-2 border-t-brand-accent/80" },
              { value: "100K", label: "Garments Sewn/Day",    accent: "border-t-2 border-t-brand-accent" },
            ].map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 0.1}>
                <StatCard value={stat.value} label={stat.label} variant="dark" className={stat.accent} animate />
              </AnimateIn>
            ))}
          </div>
          <AnimateIn delay={0.4}>
            <div className="text-center mt-12">
              <CTAButton label="Request a Tour" href="/contact" variant="outline-light" size="lg" arrow />
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
