import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { FAQ } from "@/types"

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="border-t-2 border-brand-navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
        <div className="flex items-center gap-5 mb-10">
          <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">08</span>
          <div className="h-px w-10 bg-brand-navy" />
          <p className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">FAQs</p>
        </div>
        <div className="grid lg:grid-cols-[360px_1fr] gap-12 lg:gap-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-display uppercase leading-[0.9] text-brand-navy">Common Questions</h2>
            <p className="mt-4 text-brand-slate leading-relaxed">Everything you need to know about working with Raft‑Garments.</p>
          </div>
          <Accordion multiple={false} className="border-t-2 border-brand-navy">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b-2 border-brand-navy px-0">
                <AccordionTrigger className="text-left font-heading font-800 text-brand-navy hover:text-brand-accent hover:no-underline py-5 uppercase tracking-tight text-sm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-brand-slate leading-relaxed pb-6 text-sm font-sans">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
