import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import ProductCard from "@/components/shared/ProductCard"
import CTAButton from "@/components/shared/CTAButton"
import AnimateIn from "@/components/shared/AnimateIn"
import { productCategories } from "@/data/products"
import { CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Products",
  description: "Browse Raft-Garments product range: Babies Wear, Kids Wear, Mens Wear, Womens Wear & Nightwear.",
}

const why = [
  { title: "No Middlemen", body: "Order direct from the manufacturer. Transparent pricing, direct relationship." },
  { title: "Full Vertical Control", body: "From yarn to packaging — we own every step, so quality never depends on a supplier." },
  { title: "Private Label Ready", body: "Custom labels, hang-tags, packaging, and tech-pack development included." },
  { title: "14+ Certifications", body: "ISO 9001, GOTS, WRAP, Oeko-Tex, Disney Approval, and 9 more active certifications." },
  { title: "Fast Lead Times", body: "45–60 days standard. 30 days for repeat orders. Sample dispatched in 10 days." },
  { title: "Export Experience", body: "40+ countries. FOB, CIF, and DDP incoterms available. Customs documentation handled." },
]

export default function ProductsPage() {
  return (
    <>
      <PageHero title="Built for Every Age. Every Market." subtitle="Four categories. 150+ fabric constructions. 500+ colors. One campus." breadcrumb={[{ label: "Products", href: "/products" }]} number="02" />

      <section className="border-t-2 border-brand-navy">
        <div className="border-b-2 border-brand-navy">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-7 flex items-center gap-5">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">01</span>
            <div className="h-px w-10 bg-brand-navy" />
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">Our Range</span>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-navy">
            {productCategories.map((cat, i) => (
              <AnimateIn key={cat.id} delay={i * 0.08}>
                <ProductCard {...cat} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-off-white border-t-2 border-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
          <div className="flex items-center gap-5 mb-10">
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash">02</span>
            <div className="h-px w-10 bg-brand-navy" />
            <span className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-accent">Why Raft-Garments</span>
            <h2 className="hidden md:block text-2xl font-display uppercase text-brand-navy ml-2">The Manufacturer Behind the Label</h2>
          </div>
          <div className="grid md:grid-cols-3 border-2 border-brand-navy divide-y-2 divide-x-0 md:divide-x-2 md:divide-y-0 divide-brand-navy">
            {why.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 0.06}>
                <div className={`p-7 group hover:bg-brand-navy transition-colors duration-300 h-full ${i >= 3 ? "border-t-2 border-brand-navy" : ""}`}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-800 uppercase text-brand-navy group-hover:text-white transition-colors duration-300 mb-1">{item.title}</h3>
                      <p className="text-sm text-brand-slate group-hover:text-white/55 leading-relaxed transition-colors duration-300">{item.body}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTAButton label="Request a Sample" href="/contact" variant="primary" size="lg" arrow />
          </div>
        </div>
      </section>
    </>
  )
}
