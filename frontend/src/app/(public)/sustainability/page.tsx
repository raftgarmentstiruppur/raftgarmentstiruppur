import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import CTAButton from "@/components/shared/CTAButton"
import { sustainabilityData } from "@/data/sustainability"

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Raft Garments is committed to sustainable innerwear manufacturing — BCI cotton, Global Recycled Standard, Oeko-Tex, WRAP, and SMETA certified.",
}

const commitments = [
  "BCI (Better Cotton Initiative) certified sourcing — supporting responsible cotton farming and farmer livelihoods",
  "Global Recycled Standard certified — verified recycled content in polyester and other synthetic fabrics",
  "Oeko-Tex Standard 100 — every component tested and certified free from harmful substances",
  "WRAP certified manufacturing — fair wages, safe working conditions, and legal compliance across all operations",
  "SMETA / Sedex audited — independent ethical trade audits covering labor rights, health, safety, and environment",
  "Higg Index assessed — measuring and continuously improving our environmental and social performance",
  "Sustainable fabric options: organic cotton, bamboo, Tencel, viscose, and recycled polyester available across product lines",
  "AQL 1.5–2.5 quality inspection standard — inline and final inspection to minimize waste and rework",
]

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        title="Responsible by Design."
        subtitle="Sustainable fabrics, ethical labor, and certified practices — woven into every garment we make."
        breadcrumb={[{ label: "Sustainability", href: "/sustainability" }]}
      />

      {/* Sustainability stats */}
      <section className="py-section bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            overline="Our Approach"
            title={sustainabilityData.headline}
            subtitle={sustainabilityData.subheadline}
            light
            className="mb-12"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {sustainabilityData.stats.map((stat) => (
              <div key={stat.label} className="bg-black py-10 px-4 text-center">
                <div className="text-4xl font-black text-white">{stat.value}</div>
                <div className="mt-2 text-xs text-white/40 uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-white/50 max-w-2xl mx-auto leading-relaxed">
            {sustainabilityData.body}
          </p>
        </div>
      </section>

      {/* Awards */}
      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            overline="Recognition"
            title="Independently Verified"
            subtitle="Our sustainability commitments are not just claims — they are audited, certified, and renewed annually."
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {sustainabilityData.awards.map((award) => (
              <div
                key={award.title}
                className="border-l-4 border-brand-accent pl-6 py-4 bg-brand-light-gray"
              >
                <p className="font-bold text-brand-navy">{award.title}</p>
                <p className="text-sm text-brand-slate mt-1">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <SectionHeader
            overline="Our Commitments"
            title="How We Practice Responsibility"
            className="mb-12"
          />
          <ul className="space-y-4">
            {commitments.map((c, i) => (
              <li key={i} className="flex items-start gap-4 bg-white p-5 border border-brand-border">
                <div className="w-6 h-6 bg-black flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-brand-charcoal">{c}</p>
              </li>
            ))}
          </ul>
          <div className="text-center mt-12">
            <CTAButton label="Download Sustainability Report" href="/resources#sustainability" variant="primary" arrow />
          </div>
        </div>
      </section>
    </>
  )
}

