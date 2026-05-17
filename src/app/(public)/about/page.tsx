import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import StatCard from "@/components/shared/StatCard"
import CTAButton from "@/components/shared/CTAButton"
import AnimateIn from "@/components/shared/AnimateIn"
import { leadership } from "@/data/leadership"

export const metadata: Metadata = {
  title: "About Us",
  description: "Raft-Garments — established 1993, India's leading fully vertical clothing manufacturer. Our story, leadership, and milestones.",
}

const milestones = [
  { year: "1993", event: "Founded in Tirupur with a single knitting unit and a vision for vertical integration." },
  { year: "2000", event: "Expanded into yarn spinning — bringing fiber processing in-house for the first time." },
  { year: "2005", event: "Launched export operations to European markets. First major brand partnership." },
  { year: "2010", event: "Commissioned in-house dyeing and printing facilities. 10,000 pieces/day milestone." },
  { year: "2015", event: "Achieved ISO 9001 and GOTS certifications. Began Disney and Lego approvals process." },
  { year: "2019", event: "Received Government of Tamil Nadu Green Award. Commissioned 13 MW windmill." },
  { year: "2023", event: "Opened 18th facility. 100,000 pieces/day total capacity. 40+ export countries." },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Established 1993. Built to Last."
        subtitle="Thirty years of vertical integration, quality craftsmanship, and a relentless commitment to our customers."
        breadcrumb={[{ label: "About Us", href: "/about" }]}
      />

      {/* Story */}
      <section id="story" className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimateIn direction="left">
              <SectionHeader
                overline="Our Story"
                title="From One Unit to a Full Campus"
                align="left"
              />
              <div className="mt-6 space-y-4 text-brand-slate leading-relaxed">
                <p>
                  In 1993, Raft-Garments began as a single knitting unit in Tirupur — a city that would come to define India's garment export identity. From that first machine, our founder KM Subramanian had one belief: if you control your process, you control your quality.
                </p>
                <p>
                  Over three decades, that belief shaped every investment we made — our own spinning mills, our own dyeing vats, our own embroidery heads. Today, we operate 18 state-of-the-art facilities across a single integrated campus, producing 100,000 garments every day for brands across 40+ countries.
                </p>
                <p>
                  We don't just manufacture garments. We grow them — from fiber to fashion, under one roof, with one standard of quality.
                </p>
              </div>
              <div className="mt-8">
                <CTAButton label="Our Infrastructure" href="/infrastructure" variant="primary" arrow />
              </div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <StatCard value="1993" label="Founded" variant="dark" className="col-span-2" animate />
                <StatCard value="18" label="Facilities" animate />
                <StatCard value="30+" label="Years" animate />
                <StatCard value="100K" label="Pieces/Day" animate />
                <StatCard value="40+" label="Countries" animate />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <AnimateIn>
            <SectionHeader
              overline="Leadership"
              title="The Team Behind the Craft"
              subtitle="Three generations of vision, driving one mission — to make the world's best garments."
              className="mb-12"
            />
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-6">
            {leadership.map((member, i) => (
              <AnimateIn key={member.name} delay={i * 0.1}>
                <div className="bg-white p-8 border border-brand-border h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-navy to-brand-accent/30 ring-2 ring-brand-accent/20 flex items-center justify-center mb-6">
                    <span className="text-2xl font-black text-brand-accent">
                      {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <h3 className="font-bold text-brand-navy text-lg">{member.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mt-1 mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-brand-slate leading-relaxed">{member.bio}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section id="milestones" className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <AnimateIn>
            <SectionHeader
              overline="Our Journey"
              title="Three Decades of Growth"
              className="mb-16"
            />
          </AnimateIn>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-brand-border" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <AnimateIn key={m.year} delay={i * 0.08} direction="left">
                  <div className="flex gap-8 items-start">
                    <div className="w-32 shrink-0 text-right">
                      <span className="text-sm font-black text-brand-accent">{m.year}</span>
                    </div>
                    <div className="relative">
                      <div
                        className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full border-2 border-brand-accent bg-white"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        <span className="absolute inset-0 rounded-full bg-brand-accent/30 animate-ping" style={{ animationDelay: `${i * 0.3}s` }} />
                      </div>
                      <p className="text-sm text-brand-slate leading-relaxed pl-4">{m.event}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-navy text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10 container mx-auto px-4 max-w-2xl">
          <AnimateIn>
            <h2 className="text-3xl font-bold">Ready to Work Together?</h2>
            <p className="mt-4 text-white/60">
              Join the global brands that trust Raft-Garments for quality, reliability, and scale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <CTAButton label="Contact Us" href="/contact" variant="primary" size="lg" arrow />
              <CTAButton label="Browse Products" href="/products" variant="outline-light" size="lg" />
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
