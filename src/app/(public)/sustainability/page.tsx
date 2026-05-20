import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import CTAButton from "@/components/shared/CTAButton"
import AnimateIn from "@/components/shared/AnimateIn"
import CountUp from "@/components/shared/CountUp"
import { sustainabilityData } from "@/data/sustainability"

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Raft-Garments is committed to net zero by 2027.",
}

const commitments = [
  "100% renewable energy across all 18 facilities by 2027",
  "Zero liquid discharge dyeing process with water recycling",
  "In-house corrugated packaging from recycled materials",
  "BCI (Better Cotton Initiative) sourcing for all conventional cotton",
  "GOTS-certified organic cotton available for all product lines",
  "Worker welfare programs: health clinics, education support, safe housing",
  "Annual third-party social audits via SEDEX and WRAP",
]

export default function SustainabilityPage() {
  return (
    <>
      <PageHero title="Net Zero by 2027." subtitle="Powered by the sun and wind — not the grid. India's most energy-independent garment campus." breadcrumb={[{ label: "Sustainability", href: "/sustainability" }]} number="04" />

      {/* Stats */}
      <section className="bg-brand-accent border-t-2 border-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="border-b border-white/20 py-5 flex items-center gap-5">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-white/40">01</span>
            <div className="h-px w-10 bg-white/20" />
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-white/70">Green Energy</span>
          </div>
          <div className="py-14 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-display uppercase leading-[0.9] text-white">{sustainabilityData.headline}</h2>
              <p className="mt-4 text-white/60 leading-relaxed">{sustainabilityData.subheadline}</p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/20">
              {sustainabilityData.stats.map((stat, i) => (
                <AnimateIn key={stat.label} delay={i * 0.1}>
                  <div className="bg-brand-accent py-8 px-5 text-center">
                    <div className="text-3xl font-display text-white"><CountUp value={stat.value} /></div>
                    <div className="text-[9px] font-heading font-700 uppercase tracking-[0.2em] text-white/55 mt-1">{stat.label}</div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="border-t-2 border-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
          <div className="flex items-center gap-5 mb-10">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">02</span>
            <div className="h-px w-10 bg-brand-navy" />
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">Recognition</span>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-brand-navy max-w-3xl">
            {sustainabilityData.awards.map((award, i) => (
              <AnimateIn key={award.title} delay={i * 0.1}>
                <div className="bg-white p-7 group hover:bg-brand-navy transition-colors duration-300">
                  <div className="w-1 h-8 bg-brand-accent mb-4" />
                  <p className="font-heading font-800 uppercase text-brand-navy group-hover:text-white transition-colors duration-300">{award.title}</p>
                  <p className="text-sm text-brand-slate group-hover:text-white/50 mt-1 transition-colors duration-300">{award.year}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="bg-brand-off-white border-t-2 border-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-16">
          <div className="flex items-center gap-5 mb-10">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">03</span>
            <div className="h-px w-10 bg-brand-navy" />
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">Our Commitments</span>
          </div>
          <div className="border-2 border-brand-navy divide-y-2 divide-brand-navy">
            {commitments.map((c, i) => (
              <AnimateIn key={i} delay={i * 0.05}>
                <div className="flex items-start gap-5 p-5 group hover:bg-brand-navy transition-colors duration-300">
                  <span className="text-[10px] font-display text-brand-accent shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-brand-charcoal group-hover:text-white/80 leading-relaxed transition-colors duration-300">{c}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTAButton label="Download Sustainability Report" href="/resources#sustainability" variant="primary" arrow />
          </div>
        </div>
      </section>
    </>
  )
}
