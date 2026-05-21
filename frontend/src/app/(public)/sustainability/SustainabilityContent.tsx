"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import SectionHeader from "@/components/shared/SectionHeader"
import CTAButton from "@/components/shared/CTAButton"
import FloatingElements from "@/components/shared/FloatingElements"
import MagneticButton from "@/components/shared/MagneticButton"
import { sustainabilityData } from "@/data/sustainability"

const UNSPLASH_ECO = "https://images.unsplash.com/photo-1487088678257-3a541e6e3922?w=1920&auto=format&fit=crop"

const commitments = [
  "BCI (Better Cotton Initiative) certified sourcing — supporting responsible cotton farming and farmer livelihoods.",
  "Oeko-Tex Standard 100 — every component tested and certified free from harmful substances.",
  "WRAP certified manufacturing — fair wages, safe working conditions, and legal compliance across all operations.",
  "SMETA/Sedex audited — independent ethical trade audits covering labor rights, health, safety, and environment.",
  "Higg Index assessed — measuring and continuously improving our environmental and social performance.",
  "Sustainable fabric options: organic cotton, bamboo, Tencel, viscose, and recycled polyester available across product lines.",
  "AQL quality inspection standard — inline and final inspection to minimize waste and rework.",
]

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const fadeUp  = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 18 } } }

export default function SustainabilityContent() {
  return (
    <>
      {/* ── Stats section — full-bleed image BG ── */}
      <section className="relative py-section overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Image src={UNSPLASH_ECO} alt="" fill unoptimized className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-brand-dark/85" />
        </div>
        <FloatingElements variant="dark" count={5} />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeUp}>
              <SectionHeader overline="Our approach" title={sustainabilityData.headline} subtitle={sustainabilityData.subheadline} className="mb-12" light />
            </motion.div>

            {/* Glass stat cards */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-px mb-10"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            >
              {sustainabilityData.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 80, damping: 16 } } }}
                  className="group glass-card py-12 px-4 text-center cursor-default"
                >
                  <div className="text-5xl md:text-7xl font-black text-brand-accent mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-black text-white/50 uppercase tracking-widest group-hover:text-white/80 transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.p variants={fadeUp} className="text-lg text-justify text-white/75 max-w-2xl mx-auto leading-relaxed">
              {sustainabilityData.body}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Awards ── */}
      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader overline="Recognition" title="Independently verified" subtitle="Our sustainability commitments are not just claims — they are audited, certified, and renewed annually." className="mb-12" />
          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {sustainabilityData.awards.map((award, i) => (
              <motion.div
                key={award.title}
                variants={fadeUp}
                transition={{ delay: i * 0.05 }}
                className="border-l-4 border-brand-accent pl-6 py-4 bg-brand-light-gray hover:bg-white hover:shadow-sm transition-all duration-300"
              >
                <p className="text-base font-bold text-brand-navy">{award.title}</p>
                <p className="text-base text-brand-slate mt-1">{award.year}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Commitments ── */}
      <section className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <SectionHeader overline="Our commitments" title="How we practice responsibility" className="mb-12" />
          <motion.ul
            className="space-y-4"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {commitments.map((c, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex items-start gap-4 bg-white p-5 border border-brand-border hover:border-brand-accent/40 transition-colors duration-300 group"
              >
                <div className="w-8 h-8 bg-brand-accent group-hover:bg-brand-accent-hover flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-base text-brand-charcoal leading-relaxed text-justify">{c}</p>
              </motion.li>
            ))}
          </motion.ul>
          <div className="text-center mt-12">
            <MagneticButton>
              <CTAButton label="Download sustainability report" href="/resources#sustainability" variant="primary" arrow />
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}
