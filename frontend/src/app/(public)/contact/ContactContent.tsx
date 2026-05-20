"use client"

import { motion } from "framer-motion"
import SectionHeader from "@/components/shared/SectionHeader"
import ContactForm from "@/components/contact/ContactForm"
import Image from "next/image"
import FloatingElements from "@/components/shared/FloatingElements"
import { siteConfig } from "@/data/siteConfig"
import { leadership } from "@/data/leadership"
import { MapPin, Phone, Mail } from "lucide-react"

const UNSPLASH_FACTORY = "/images/contact-panel.png"


const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const fadeUp  = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 18 } } }

export default function ContactContent() {
  return (
    <>
      {/* ── 50/50 split: image + form ── */}
      <section className="flex flex-col lg:flex-row">

        {/* Left — full-height image panel */}
        <div className="relative lg:w-[55%] overflow-hidden" style={{ minHeight: "clamp(320px, 40vw, 500px)" }}>
          <Image
            src={UNSPLASH_FACTORY}
            alt="40+ Years of Manufacturing Excellence — Raft Garments"
            fill
            unoptimized
            priority
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right — form + info */}
        <div className="relative lg:w-[45%] bg-white px-8 sm:px-12 lg:px-16 py-20 overflow-hidden">
          <FloatingElements variant="light" count={3} />

          <motion.div
            className="relative z-10 space-y-12"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Form */}
            <motion.div variants={fadeUp}>
              <SectionHeader overline="Get in Touch" title="Send Us a Message" align="left" className="mb-8" />
              <ContactForm />
            </motion.div>

            {/* Contact info */}
            <motion.div variants={fadeUp} className="space-y-6 pt-8 border-t border-brand-border">
              <SectionHeader overline="Our Details" title="Find Us" align="left" className="mb-0" />

              <div className="space-y-5">
                {[
                  { Icon: MapPin, label: "Address", text: `${siteConfig.address.line1}\n${siteConfig.address.line2}` },
                  { Icon: Phone,  label: "Phone",             text: siteConfig.phone },
                  { Icon: Mail,   label: "Email",             text: `${siteConfig.email}\n${siteConfig.email2}` },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    className="flex gap-4 group"
                  >
                    <item.Icon className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-ash mb-1">{item.label}</p>
                      {item.text.split("\n").map((line, i) => (
                        <p key={i} className="text-base text-brand-charcoal leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Key contacts — horizontal strip */}
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-4">Key Contacts</p>
              <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
                {leadership.map((member) => (
                  <div key={member.name} className="flex items-center gap-3 p-4 border border-brand-border bg-brand-light-gray shrink-0 min-w-[200px]">
                    <div className="w-10 h-10 bg-brand-navy flex items-center justify-center shrink-0">
                      <span className="text-sm font-black text-brand-accent">
                        {member.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-base text-brand-navy">{member.name}</p>
                      <p className="text-sm text-brand-ash">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </>
  )
}
