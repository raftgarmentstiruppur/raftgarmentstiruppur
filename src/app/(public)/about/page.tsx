import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import StatCard from "@/components/shared/StatCard"
import CTAButton from "@/components/shared/CTAButton"
import AnimateIn from "@/components/shared/AnimateIn"
import { leadership } from "@/data/leadership"
import { Target, Eye, Users, Leaf, Award, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description: "Raft-Garments — established 1993, India's leading fully vertical clothing manufacturer.",
}

const milestones = [
  { year: "1993", event: "Founded in Tirupur with a single knitting unit and a vision for vertical integration." },
  { year: "2000", event: "Expanded into yarn spinning — bringing fiber processing in-house for the first time." },
  { year: "2005", event: "Launched export operations to European markets. First major brand partnership." },
  { year: "2010", event: "Commissioned in-house dyeing and printing. 10,000 pieces/day milestone reached." },
  { year: "2015", event: "Achieved ISO 9001 and GOTS certifications. Disney and Lego approvals completed." },
  { year: "2019", event: "Received Government of Tamil Nadu Green Award. Commissioned 13 MW windmill." },
  { year: "2023", event: "Opened 18th facility. 100,000 pieces/day capacity. Active in 40+ export countries." },
]

const values = [
  { icon: <Award className="w-5 h-5" />, title: "Uncompromising Quality", description: "AQL 2.5 final audit on every order. Quality is not a feature — it's the baseline." },
  { icon: <Leaf className="w-5 h-5" />, title: "Sustainable by Design", description: "GOTS-certified, wind-powered, zero-liquid discharge. Green is built into our process." },
  { icon: <Users className="w-5 h-5" />, title: "People First", description: "WRAP-certified, fair wages, safe workplaces — our team is our foundation." },
  { icon: <Zap className="w-5 h-5" />, title: "Innovation Always", description: "CAD/CAM automation, digital printing, and R&D investment that keeps us ahead." },
]

export default function AboutPage() {
  return (
    <>
      <PageHero title="A legacy built in Tirupur." subtitle="Three decades of craft, quality, and relentless vertical integration." breadcrumb={[{ label: "About", href: "/about" }]} number="01" />

      {/* Heritage */}
      <section className="border-t-2 border-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
          <div className="flex items-center gap-5 mb-10">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">01</span>
            <div className="h-px w-10 bg-brand-navy" />
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">Our Heritage</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <AnimateIn direction="left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase leading-[0.9] text-brand-navy mb-8">
                From One Unit<br />to a Full Campus
              </h2>
              <div className="space-y-4 text-brand-slate leading-relaxed">
                <p>In 1993, Raft-Garments began as a single knitting unit in Tirupur with one belief: if you control your process, you control your quality. That conviction shaped every investment over thirty years.</p>
                <p>Today we operate 18 state-of-the-art facilities on a single integrated campus, producing 100,000 garments every day for brands across 40+ countries — from fiber to fashion, under one roof.</p>
              </div>
              <div className="mt-8">
                <CTAButton label="Our Infrastructure" href="/infrastructure" variant="primary" arrow />
              </div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.1}>
              <div className="grid grid-cols-2 gap-px bg-brand-navy">
                <StatCard value="1993" label="Founded" variant="dark" className="col-span-2" animate />
                <StatCard value="18" label="Facilities" variant="dark" animate />
                <StatCard value="30+" label="Years" variant="dark" animate />
                <StatCard value="100K" label="Pieces/Day" variant="dark" animate />
                <StatCard value="40+" label="Countries" variant="dark" animate />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-brand-off-white border-t-2 border-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
          <div className="flex items-center gap-5 mb-10">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">02</span>
            <div className="h-px w-10 bg-brand-navy" />
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">Purpose</span>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-brand-navy">
            <AnimateIn direction="left" delay={0.1}>
              <div className="bg-brand-navy text-white p-10 h-full">
                <div className="text-brand-accent mb-5"><Target className="w-7 h-7" /></div>
                <h3 className="text-2xl font-display uppercase text-white mb-5">Our Mission</h3>
                <p className="text-white/60 leading-relaxed">To be India's most trusted garment manufacturing partner — delivering world-class quality at scale, with complete transparency and a sustainable footprint future generations can be proud of.</p>
              </div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.15}>
              <div className="bg-white border-l-0 p-10 h-full">
                <div className="text-brand-accent mb-5"><Eye className="w-7 h-7" /></div>
                <h3 className="text-2xl font-display uppercase text-brand-navy mb-5">Our Vision</h3>
                <p className="text-brand-slate leading-relaxed">A world where every garment tells a story of craftsmanship, care, and conscience. We are building the factory of the future — automated, sustainable, powered by people who take pride in every stitch.</p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="border-t-2 border-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
          <div className="flex items-center gap-5 mb-10">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">03</span>
            <div className="h-px w-10 bg-brand-navy" />
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">What Drives Us</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-2 border-brand-navy divide-y-2 divide-x-0 sm:divide-x-2 sm:divide-y-0 divide-brand-navy">
            {values.map((val, i) => (
              <AnimateIn key={val.title} delay={i * 0.08}>
                <div className="p-7 group hover:bg-brand-navy transition-colors duration-300 h-full">
                  <div className="text-brand-accent mb-5">{val.icon}</div>
                  <h3 className="font-heading font-800 uppercase text-brand-navy group-hover:text-white transition-colors duration-300 mb-2">{val.title}</h3>
                  <p className="text-sm text-brand-slate group-hover:text-white/55 leading-relaxed transition-colors duration-300">{val.description}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-brand-off-white border-t-2 border-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
          <div className="flex items-center gap-5 mb-10">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">04</span>
            <div className="h-px w-10 bg-brand-navy" />
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">Leadership</span>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-brand-navy">
            {leadership.map((member, i) => (
              <AnimateIn key={member.name} delay={i * 0.1}>
                <div className="bg-white p-8 group hover:bg-brand-navy transition-colors duration-300 h-full">
                  <div className="w-12 h-12 bg-brand-navy group-hover:bg-white border-2 border-brand-navy flex items-center justify-center mb-5 transition-colors duration-300">
                    <span className="text-lg font-display text-white group-hover:text-brand-navy transition-colors duration-300">
                      {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <h3 className="font-heading font-800 uppercase text-brand-navy group-hover:text-white transition-colors duration-300">{member.name}</h3>
                  <p className="text-[10px] font-heading font-700 uppercase tracking-widest text-brand-accent mt-1 mb-4">{member.role}</p>
                  <p className="text-sm text-brand-slate group-hover:text-white/55 leading-relaxed transition-colors duration-300">{member.bio}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="border-t-2 border-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-16">
          <div className="flex items-center gap-5 mb-14">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">05</span>
            <div className="h-px w-10 bg-brand-navy" />
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">Our Journey</span>
            <h2 className="text-2xl font-display uppercase text-brand-navy ml-2">Three Decades of Growth</h2>
          </div>
          {milestones.map((m, i) => (
            <AnimateIn key={m.year} delay={i * 0.07} direction="left">
              <div className="grid grid-cols-[80px_2px_1fr] gap-0 items-start mb-0">
                <div className="text-right pr-5 pt-1">
                  <span className="text-sm font-display text-brand-accent">{m.year}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 bg-brand-accent shrink-0 mt-1.5" />
                  {i < milestones.length - 1 && <div className="w-px flex-1 bg-brand-border min-h-[3rem]" />}
                </div>
                <div className="pl-5 pb-10">
                  <p className="text-sm text-brand-slate leading-relaxed">{m.event}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy border-t-2 border-brand-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-display uppercase leading-[0.9] text-white">Ready to Work<br />Together?</h2>
            <p className="mt-4 text-white/50 max-w-md leading-relaxed">Join the global brands that trust Raft-Garments for quality, reliability, and scale.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <CTAButton label="Contact Us" href="/contact" variant="accent" size="lg" arrow />
            <CTAButton label="Browse Products" href="/products" variant="outline-light" size="lg" />
          </div>
        </div>
      </section>
    </>
  )
}
