import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import CTAButton from "@/components/shared/CTAButton"
import AnimateIn from "@/components/shared/AnimateIn"
import CountUp from "@/components/shared/CountUp"
import { sustainabilityData } from "@/data/sustainability"

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Raft-Garments is committed to net zero by 2027. 13 MW wind + 15 MW solar, IGBC Green Factory, 30M+ green energy units/year.",
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
      <PageHero
        title="Net Zero by 2027."
        subtitle="Powered by the sun and wind — not the grid. India's most energy-independent garment campus."
        breadcrumb={[{ label: "Sustainability", href: "/sustainability" }]}
      />

      {/* Green energy stats */}
      <section className="py-section bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <AnimateIn>
            <SectionHeader
              overline="Green Energy"
              title={sustainabilityData.headline}
              subtitle={sustainabilityData.subheadline}
              light
              className="mb-12"
            />
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {sustainabilityData.stats.map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 0.1}>
                <div className="bg-black py-10 px-4 text-center">
                  <div className="text-4xl font-black text-white">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="mt-2 text-xs text-white/40 uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn delay={0.4}>
            <p className="mt-8 text-center text-white/50 max-w-2xl mx-auto leading-relaxed">
              {sustainabilityData.body}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Awards */}
      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <AnimateIn>
            <SectionHeader
              overline="Recognition"
              title="Independently Verified"
              subtitle="Our green commitments are not just targets — they are certified achievements."
              className="mb-12"
            />
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {sustainabilityData.awards.map((award, i) => (
              <AnimateIn key={award.title} delay={i * 0.1}>
                <div className="border-l-4 border-brand-accent pl-6 py-4 bg-brand-light-gray hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                  <p className="font-bold text-brand-navy">{award.title}</p>
                  <p className="text-sm text-brand-slate mt-1">{award.year}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <AnimateIn>
            <SectionHeader
              overline="Our Commitments"
              title="A Roadmap to Zero"
              className="mb-12"
            />
          </AnimateIn>
          <ul className="space-y-4">
            {commitments.map((c, i) => (
              <AnimateIn key={i} delay={i * 0.07}>
                <li className="flex items-start gap-4 bg-white p-5 border border-brand-border hover:border-brand-accent hover:shadow-sm transition-all duration-300">
                  <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-brand-charcoal">{c}</p>
                </li>
              </AnimateIn>
            ))}
          </ul>
          <AnimateIn delay={0.3}>
            <div className="text-center mt-12">
              <CTAButton label="Download Sustainability Report" href="/resources#sustainability" variant="primary" arrow />
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
