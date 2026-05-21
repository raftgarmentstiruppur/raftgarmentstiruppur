"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import type { FAQ } from "@/types"
import { useContentValue } from "@/context/ContentContext"

const UNSPLASH_FACTORY = "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&auto=format&fit=crop"

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false)
  const question = useContentValue(`${faq.id}-question`, faq.question)
  const answer   = useContentValue(`${faq.id}-answer`,   faq.answer)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring" as const, stiffness: 70, damping: 18, delay: index * 0.05 }}
      className="border-b border-white/10"
    >
      <button
        onClick={() => setOpen(!open)}
        className="group w-full flex items-center justify-between gap-6 py-5 text-left"
        suppressHydrationWarning
      >
        <div className="flex items-center gap-4 flex-1">
          <span className="text-sm font-black text-brand-accent tabular-nums w-6 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-base md:text-lg font-black text-white uppercase tracking-tight leading-tight group-hover:text-brand-accent transition-colors duration-200">
            {question}
          </span>
        </div>
        <div className={`shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-300 ${open ? "border-brand-accent bg-brand-accent text-white" : "border-white/20 text-white/40 group-hover:border-brand-accent group-hover:text-brand-accent"}`}>
          {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 pl-10 pr-6 text-white/80 leading-relaxed text-lg border-l border-brand-accent ml-6 text-justify">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface FAQAccordionProps { faqs: FAQ[] }

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <section id="faq" className="flex flex-col lg:flex-row">

      {/* ── Left image panel ── */}
      <div className="relative lg:w-[42%] min-h-[40vh] lg:min-h-[600px] overflow-hidden">
        <Image
          src={UNSPLASH_FACTORY}
          alt="Raft Garments Manufacturing"
          fill
          unoptimized
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-brand-dark/20" />

        {/* Overlay content */}
        <div className="absolute bottom-10 left-8 right-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 70, damping: 18, delay: 0.2 }}
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-accent mb-3 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-brand-accent" />
              Quick answers
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none mb-4">
              Common<br />questions.
            </h2>
            <div className="w-10 h-0.5 bg-brand-accent" />
          </motion.div>
        </div>
      </div>

      {/* ── Right FAQ panel ── */}
      <div className="relative lg:w-[58%] bg-brand-dark px-8 sm:px-12 lg:px-14 py-12">
        <div className="border-t border-white/10 max-w-2xl">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.id} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
