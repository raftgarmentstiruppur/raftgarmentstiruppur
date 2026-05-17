"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FAQ } from "@/types"
import SectionHeader from "@/components/shared/SectionHeader"
import { useContentValue } from "@/context/ContentContext"

function FAQItem({ faq }: { faq: FAQ }) {
  const question = useContentValue(`${faq.id}-question`, faq.question)
  const answer   = useContentValue(`${faq.id}-answer`,   faq.answer)
  return (
    <AccordionItem value={faq.id} className="border-b border-brand-border px-0">
      <AccordionTrigger className="text-left font-black text-black hover:text-brand-accent hover:no-underline py-5 uppercase tracking-tight text-sm">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-brand-slate leading-relaxed pb-6 text-sm">
        {answer}
      </AccordionContent>
    </AccordionItem>
  )
}

interface FAQAccordionProps { faqs: FAQ[] }

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <section id="faq" className="py-section bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <SectionHeader
          overline="FAQs"
          title="Common Questions"
          subtitle="Everything you need to know about working with Raft Garments."
          className="mb-12"
        />
        <Accordion multiple={false} className="space-y-0 border-t border-brand-border">
          {faqs.map((faq) => <FAQItem key={faq.id} faq={faq} />)}
        </Accordion>
      </div>
    </section>
  )
}

