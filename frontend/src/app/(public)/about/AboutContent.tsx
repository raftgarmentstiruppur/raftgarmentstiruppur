"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import SectionHeader from "@/components/shared/SectionHeader"
import CTAButton from "@/components/shared/CTAButton"
import ContentText from "@/components/shared/ContentText"
import FloatingElements from "@/components/shared/FloatingElements"
import MagneticButton from "@/components/shared/MagneticButton"
import { leadership } from "@/data/leadership"

const UNSPLASH_GARMENT = "/images/about-story.png"

const milestones = [
  { key: "milestone-1", year: "1971", event: "Raft Garments was founded in Tirupur, India's knitwear capital, with a clear vision of crafting premium knitted garments and building lasting relationships with domestic buyers." },
  { key: "milestone-2", year: "2017", event: "Second-generation leadership begins as Mr. Siva Subramaniam takes the helm, bringing fresh direction and driving the company's growth across men's, women's, and kids' innerwear for global export markets." },
  { key: "milestone-3", year: "2020", event: "A dedicated cutting section was commissioned with state-of-the-art machinery, significantly strengthening production capacity and export capabilities to buyers across USA, Europe, and Middle East Asia." },
  { key: "milestone-4", year: "2022", event: "Expanded into a purpose-built 1 lakh square feet manufacturing facility at Netaji Apparel Park, Tirupur — housing integrated divisions for knitting, fabric inspection, cutting, elastic weaving, sewing, and finishing." },
]

const teamKeys = ["team-1"]

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const fadeUp  = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 18 } } }

export default function AboutContent() {
  return (
    <>
      {/* ── Story section — split: solid dark left + full image right ── */}
      <section id="story" className="flex flex-col lg:flex-row" style={{ minHeight: "clamp(600px, 85vh, 900px)" }}>

        {/* ── LEFT: solid dark panel with all text ── */}
        <div className="relative lg:w-[52%] bg-brand-dark flex flex-col justify-center px-8 sm:px-14 lg:px-16 py-16 lg:py-20">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>

            {/* Overline */}
            <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.28em] text-brand-accent flex items-center gap-3 mb-6">
              <span className="w-8 h-0.5 bg-brand-accent" />
              Our Heritage
            </motion.p>

            {/* Title */}
            <motion.h2
              variants={fadeUp}
              className="font-semibold font-sans text-white leading-[0.96] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 6rem)" }}
            >
              A Legacy Built in Tirupur
            </motion.h2>

            <motion.div variants={fadeUp} className="w-16 h-1 bg-brand-accent mb-8" />

            {/* Bullets */}
            <motion.ul variants={fadeUp} className="space-y-5 mb-10">
              {[
                { k: "about-story-1", fallback: "Established in Tirupur — India's knitwear capital — Raft Garments has evolved from a focused innerwear manufacturer into a fully integrated, vertically controlled production enterprise." },
                { k: "about-story-2", fallback: "Under second-generation leadership, the company operates a modern, purpose-built manufacturing facility at Netaji Apparel Park, Tirupur — housing dedicated divisions for knitting, fabric inspection, cutting, elastic weaving, sewing, and finishing and packing." },
                { k: "about-story-3", fallback: "Our product range spans premium innerwear and outerwear — crafted in cotton, bamboo, viscose, Tencel, nylon, and recycled polyester. Every garment is backed by an extensive portfolio of global certifications." },
              ].map((item) => (
                <li key={item.k} className="flex items-start gap-4">
                  <span className="mt-2.5 w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                  <ContentText contentKey={item.k} fallback={item.fallback} as="span" className="text-lg text-white leading-relaxed text-justify" />
                </li>
              ))}
            </motion.ul>

            {/* CTA */}
            <motion.div variants={fadeUp} className="mb-12">
              <MagneticButton>
                <CTAButton label="Our infrastructure" href="/infrastructure" variant="primary" size="lg" arrow />
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-px"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { value: "50+",  label: "Years of legacy" },
              { value: "10+",  label: "Certifications" },
              { value: "6",    label: "Divisions" },
              { value: "100%", label: "In-house" },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="border border-white/10 px-4 py-5 text-center hover:border-brand-accent/40 transition-colors duration-300"
              >
                <div className="text-2xl font-black text-brand-accent leading-none mb-1">{s.value}</div>
                <div className="text-[11px] font-bold text-white uppercase tracking-widest leading-tight">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: full image, no overlay ── */}
        <motion.div
          className="relative lg:w-[48%] min-h-[380px] lg:min-h-0 overflow-hidden"
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <Image
            src={UNSPLASH_GARMENT}
            alt="Raft Garments Heritage — Factory Building"
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 48vw"
            priority
          />
          {/* Subtle left-edge blend only */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/30 via-transparent to-transparent pointer-events-none" />
        </motion.div>

      </section>

      {/* ── Mission & Vision ── */}
      <section id="mission" className="py-section bg-brand-dark border-y border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 70, damping: 18 }}
            className="mb-12"
          >
            <SectionHeader overline="Purpose & Direction" title="Why we exist" light />
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 gap-px"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              { overline: "Our Mission", title: "Craft. Sustain. Deliver.", body: "To craft knitwear that delivers style, comfort, and sustainability. We aspire to be a leader in responsible fashion by creating garments that are inclusive, environmentally conscious, and meticulously crafted." },
              { overline: "Our Vision",  title: "Lead. Innovate. Grow.",    body: "To lead the global apparel landscape by setting new benchmarks in quality, innovation, and sustainability — shaping a greener, eco-conscious, and fashionable future with long-term value-driven partnerships." },
            ].map((card) => (
              <motion.div
                key={card.overline}
                variants={fadeUp}
                className="relative bg-brand-navy/60 hover:bg-brand-navy border border-white/[0.08] hover:border-brand-accent/50 p-12 overflow-hidden group transition-colors duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-brand-accent mb-5 flex items-center gap-2">
                  <span className="w-5 h-0.5 bg-brand-accent inline-block" />{card.overline}
                </p>
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-5 leading-none">{card.title}</h3>
                <div className="w-10 h-1 bg-brand-accent mb-6" />
                <p className="text-xl text-white leading-relaxed text-justify">{card.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section id="values" className="py-section bg-brand-dark overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 70, damping: 18 }}
            className="mb-14"
          >
            <SectionHeader overline="Core Values" title="What we stand for" light />
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/[0.06]"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              { number: "01", title: "Quality",        body: "Delivering products that surpass known standards, ensuring customer satisfaction at every stage." },
              { number: "02", title: "Innovation",     body: "Promoting creativity and experimentation to stay ahead of the curve in an ever-evolving textile industry." },
              { number: "03", title: "Sustainability", body: "Prioritizing sustainability, reducing our environmental footprint, and promoting responsible supply chain practices." },
              { number: "04", title: "Customer focus", body: "Customers are always at the forefront — we understand their needs and deliver tailor-made solutions." },
              { number: "05", title: "Integrity",      body: "Transparency, accountability, and trust with all stakeholders and within our community." },
            ].map((v) => (
              <motion.div
                key={v.number}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show:   { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 70, damping: 18 } },
                }}
                className="group relative bg-brand-navy/60 hover:bg-brand-navy p-8 lg:p-10 flex flex-col gap-5 overflow-hidden transition-colors duration-400 cursor-default"
              >
                {/* Accent top bar — slides in on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />

                {/* Giant faint number watermark */}
                <span aria-hidden className="absolute -bottom-4 -right-2 text-[7rem] font-black leading-none select-none pointer-events-none text-white/[0.04] group-hover:text-brand-accent/[0.07] transition-colors duration-500">
                  {v.number}
                </span>

                {/* Number badge */}
                <div className="w-10 h-10 border border-brand-accent/30 group-hover:border-brand-accent group-hover:bg-brand-accent flex items-center justify-center transition-all duration-300">
                  <span className="text-xs font-black text-brand-accent group-hover:text-white transition-colors duration-300 tabular-nums">
                    {v.number}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <div className="w-6 h-0.5 bg-brand-accent mb-3 origin-left scale-x-100" />
                  <h4 className="text-lg font-black text-white uppercase tracking-wide leading-tight group-hover:text-brand-accent transition-colors duration-300">
                    {v.title}
                  </h4>
                </div>

                {/* Body */}
                <p className="text-base text-white leading-relaxed relative z-10">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section id="leadership" className="bg-brand-dark overflow-hidden">
        {leadership.map((member, i) => {
          const k = teamKeys[i]
          const initials = member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
          return (
            <motion.div
              key={member.name}
              className="flex flex-col lg:flex-row min-h-[520px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              {/* ── Left panel — identity ── */}
              <div className="relative lg:w-[42%] bg-brand-navy flex flex-col overflow-hidden">

                {/* Photo area — swap src to /images/md-siva.jpg when photo is ready */}
                <div className="relative w-full aspect-[3/4] bg-brand-dark overflow-hidden">
                  {/* Placeholder gradient shown until real photo is added */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-charcoal to-brand-dark flex items-center justify-center">
                    <span className="text-[8rem] font-black text-white/10 leading-none select-none">{initials}</span>
                  </div>
                  {/* Accent bar at bottom of photo */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-accent" />
                </div>

                {/* Name + role strip */}
                <div className="px-8 py-8 flex flex-col gap-2 bg-brand-navy">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-accent flex items-center gap-2">
                    <span className="w-5 h-0.5 bg-brand-accent" />
                    Managing Director
                  </p>
                  <ContentText
                    contentKey={`${k}-name`}
                    fallback={member.name}
                    as="h2"
                    className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight"
                  />
                  <div className="w-10 h-0.5 bg-brand-accent mt-2" />
                </div>
              </div>

              {/* ── Right panel — detail ── */}
              <div className="relative lg:w-[58%] flex flex-col justify-center px-10 sm:px-14 lg:px-16 py-14 lg:py-20 border-l border-white/10">
                {/* Section title */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring" as const, stiffness: 70, damping: 18, delay: 0.15 }}
                >
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white italic mb-8 leading-snug max-w-lg">
                    "The Vision Behind the Craft"
                  </h3>

                  <ContentText
                    contentKey={`${k}-bio`}
                    fallback={member.bio}
                    as="p"
                    className="text-xl text-white leading-relaxed text-justify mb-10 max-w-xl"
                  />

                  {/* Key highlights */}
                  <ul className="space-y-3">
                    {[
                      "Second-generation family business — founded 1971 in Tirupur",
                      "Leading exports to USA, Europe, Middle East Asia, and global markets",
                      "Committed to certified, sustainable, and ethical manufacturing",
                    ].map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-2 w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                        <span className="text-lg text-white leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </section>

      {/* ── Milestones ── */}
      <section id="milestones" className="py-section bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 70, damping: 18 }}
            className="mb-16"
          >
            <SectionHeader overline="Our Journey" title="50+ years of growth" light />
          </motion.div>

          <div className="space-y-0">
            {milestones.map((m, idx) => (
              <motion.div
                key={m.key}
                className="group grid grid-cols-[100px_1px_1fr] sm:grid-cols-[140px_1px_1fr] gap-x-8 items-stretch"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.07, type: "spring" as const, stiffness: 70, damping: 18 }}
              >
                {/* Year */}
                <div className="flex items-start justify-end pt-7 pb-8">
                  <ContentText
                    contentKey={`${m.key}-year`}
                    fallback={m.year}
                    as="span"
                    className="text-2xl sm:text-3xl font-black text-brand-accent tabular-nums group-hover:scale-110 inline-block transition-transform duration-300"
                  />
                </div>

                {/* Timeline spine + dot */}
                <div className="flex flex-col items-center">
                  <div className={`w-px flex-1 ${idx === 0 ? "bg-transparent" : "bg-brand-accent/20"}`} />
                  <div className="w-3 h-3 rounded-full border-2 border-brand-accent bg-brand-dark group-hover:bg-brand-accent transition-colors duration-300 shrink-0 my-1" />
                  <div className={`w-px flex-1 ${idx === milestones.length - 1 ? "bg-transparent" : "bg-brand-accent/20"}`} />
                </div>

                {/* Event text */}
                <div className="py-7 pl-2 border-b border-white/[0.06] group-hover:border-brand-accent/20 transition-colors duration-300">
                  <ContentText
                    contentKey={`${m.key}-event`}
                    fallback={m.event}
                    as="p"
                    className="text-lg text-white leading-relaxed text-justify"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative py-24 bg-brand-navy overflow-hidden text-center border-t border-brand-accent/20">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ background: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
        <FloatingElements variant="dark" count={4} />
        <div className="relative z-10 container mx-auto px-4 max-w-2xl">
          <ContentText contentKey="about-cta-title" fallback="Ready to work together?" as="h2" className="text-display-md font-black text-white uppercase tracking-tight leading-none mb-6" />
          <ContentText contentKey="about-cta-subtitle" fallback="Join the global brands that trust Raft Garments for quality, reliability, and scale." as="p" className="text-2xl text-white mb-10 leading-relaxed" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton><CTAButton label="Contact us" href="/contact" variant="primary" size="lg" arrow /></MagneticButton>
            <MagneticButton><CTAButton label="Browse products" href="/products" variant="outline-light" size="lg" /></MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}
