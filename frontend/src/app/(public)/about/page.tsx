import type { Metadata } from "next"
import ContentPageHero from "@/components/shared/ContentPageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import StatCard from "@/components/shared/StatCard"
import CTAButton from "@/components/shared/CTAButton"
import ContentText from "@/components/shared/ContentText"
import { leadership } from "@/data/leadership"

export const metadata: Metadata = {
  title: "About Us",
  description: "Raft Garments — 40+ years of knitwear manufacturing excellence from Tirupur, India. Premium innerwear and outerwear, second-generation leadership, serving Europe, USA, and India.",
}

const milestones = [
  { key: "milestone-1", year: "1985", event: "Founded in Tirupur — India's Knitwear Capital — with a focus on premium knitted garments for domestic and export markets." },
  { key: "milestone-2", year: "1995", event: "First international export orders to European markets, establishing a foundation of quality and reliability with overseas brands." },
  { key: "milestone-3", year: "2000", event: "Second-generation leadership. Mr. Siva Subramaniam joins and spearheads expansion into men's, women's, and kids' innerwear." },
  { key: "milestone-4", year: "2008", event: "Invested in Italian CAD/CAM auto-cutting technology and German Jacquard elastic looms — raising precision and output capacity." },
  { key: "milestone-5", year: "2015", event: "Achieved ISO 9001:2015, WRAP, and Oeko-Tex Standard 100 certifications. Walt Disney and Walmart compliance approvals secured." },
  { key: "milestone-6", year: "2018", event: "BCI, SMETA/Sedex, Higg Index, and Global Recycled Standard certifications completed. CTPAT accreditation for secure exports." },
  { key: "milestone-7", year: "2022", event: "Commissioned Unit 2 at Netaji Apparel Park, Tirupur — 350 machines, 800 employees, 80,000 garments per day." },
]

const teamKeys = ["team-1"]

export default function AboutPage() {
  return (
    <>
      <ContentPageHero
        titleKey="page-about-title"
        subtitleKey="page-about-subtitle"
        defaultTitle="40+ Years of Knitwear Excellence."
        defaultSubtitle="Taking India's finest knitwear to the world — crafting quality, pioneering sustainability, shaping fashion."
        breadcrumb={[{ label: "About Us", href: "/about" }]}
      />

      <section id="story" className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader overline="Our Story" title="A Legacy Built in Tirupur" align="left" />
              <div className="mt-6 space-y-4">
                <ContentText
                  contentKey="about-story-1"
                  fallback="Raft Garments was born in Tirupur — India's Knitwear Capital — over 40 years ago, with a singular focus on quality innerwear. From the beginning, the business was built on the belief that great manufacturing and responsible practices go hand in hand."
                  as="p" className="text-brand-slate leading-relaxed"
                />
                <ContentText
                  contentKey="about-story-2"
                  fallback="Today, under second-generation leadership, Raft Garments operates a modern integrated facility at Netaji Apparel Park, Tirupur — 350 machines, 800 employees, and the capacity to produce 80,000 garments every day. Our products reach brands in Europe, the USA, and India."
                  as="p" className="text-brand-slate leading-relaxed"
                />
                <ContentText
                  contentKey="about-story-3"
                  fallback="We craft premium innerwear and outerwear — from men's, women's, and kids' underwear to seamless bonded underwear, shapewear, swimwear, and versatile casual outerwear — using cotton, bamboo, viscose, Tencel, nylon, and recycled polyester. Every garment is backed by 10+ global certifications."
                  as="p" className="text-brand-slate leading-relaxed"
                />
              </div>
              <div className="mt-8">
                <CTAButton label="Our Infrastructure" href="/infrastructure" variant="primary" arrow />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard value="40+" label="Years of Legacy" variant="dark" className="col-span-2" />
              <StatCard value="800"  label="Employees" />
              <StatCard value="350"  label="Machines" />
              <StatCard value="80K"  label="Garments/Day" />
              <StatCard value="10+"  label="Certifications" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-section bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            <div className="bg-black p-12">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-4">Our Mission</p>
              <h3 className="text-2xl font-bold text-white mb-4">Craft. Sustain. Deliver.</h3>
              <p className="text-white/60 leading-relaxed">
                To craft knitwear that delivers style, comfort, and sustainability. We aspire to be a leader in responsible fashion by creating garments that are inclusive, environmentally conscious, and meticulously crafted — transforming ideas into tangible products that make people look and feel good.
              </p>
            </div>
            <div className="bg-black p-12">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-4">Our Vision</p>
              <h3 className="text-2xl font-bold text-white mb-4">Lead. Innovate. Grow.</h3>
              <p className="text-white/60 leading-relaxed">
                To lead the global apparel landscape by setting new benchmarks in quality, innovation, and sustainability — shaping a greener, eco-conscious, and fashionable future. We aspire to build long-term, value-driven relationships with brands that share our commitment to quality, integrity, and continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="values" className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader overline="Core Values" title="What We Stand For" className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { number: "01", title: "Quality", body: "We are dedicated to delivering products that surpass known standards, ensuring customer satisfaction and loyalty at every stage." },
              { number: "02", title: "Innovation", body: "We promote a culture of creativity and experimentation to stay ahead of the curve in an ever-evolving textile industry." },
              { number: "03", title: "Sustainability", body: "We prioritize sustainability in our operations, reducing our environmental footprint and promoting responsible practices throughout our supply chain." },
              { number: "04", title: "Customer Focus", body: "Our customers are always at the forefront — we understand their needs and deliver tailor-made solutions that matter." },
              { number: "05", title: "Integrity", body: "Integrity guides everything we do — transparency, accountability, and trust with our stakeholders and within our community." },
            ].map((v) => (
              <div key={v.number} className="bg-white p-6 border border-brand-border">
                <span className="text-4xl font-black text-brand-navy/10 leading-none block -mb-2">{v.number}</span>
                <h4 className="font-bold text-brand-navy text-sm uppercase tracking-widest mt-4 mb-3">{v.title}</h4>
                <p className="text-xs text-brand-slate leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="leadership" className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            overline="Leadership"
            title="The Vision Behind the Craft"
            subtitle="Second-generation leadership carrying 40+ years of knitwear heritage into global markets."
            className="mb-12"
          />
          <div className="max-w-xl mx-auto">
            {leadership.map((member, i) => {
              const k = teamKeys[i]
              return (
                <div key={member.name} className="bg-white p-8 border border-brand-border">
                  <div className="w-16 h-16 bg-brand-navy flex items-center justify-center mb-6">
                    <span className="text-2xl font-black text-brand-accent">
                      {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <ContentText contentKey={`${k}-name`} fallback={member.name} as="h3" className="font-bold text-brand-navy text-lg" />
                  <ContentText contentKey={`${k}-role`} fallback={member.role} as="p" className="text-xs font-semibold uppercase tracking-widest text-brand-accent mt-1 mb-4" />
                  <ContentText contentKey={`${k}-bio`}  fallback={member.bio}  as="p" className="text-sm text-brand-slate leading-relaxed" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="milestones" className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <SectionHeader overline="Our Journey" title="40+ Years of Growth" className="mb-16" />
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-brand-border" />
            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.key} className="flex gap-8 items-start">
                  <div className="w-32 shrink-0 text-right">
                    <ContentText contentKey={`${m.key}-year`} fallback={m.year} as="span" className="text-sm font-black text-brand-accent" />
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full border-2 border-brand-accent bg-white" />
                    <ContentText contentKey={`${m.key}-event`} fallback={m.event} as="p" className="text-sm text-brand-slate leading-relaxed pl-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-navy text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <ContentText contentKey="about-cta-title"    fallback="Ready to Work Together?" as="h2" className="text-3xl font-bold" />
          <ContentText contentKey="about-cta-subtitle" fallback="Join the global brands that trust Raft Garments for quality, reliability, and scale." as="p" className="mt-4 text-white/60" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <CTAButton label="Contact Us"      href="/contact"  variant="primary"      size="lg" arrow />
            <CTAButton label="Browse Products" href="/products" variant="outline-light" size="lg" />
          </div>
        </div>
      </section>
    </>
  )
}

