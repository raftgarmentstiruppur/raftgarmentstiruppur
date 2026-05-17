import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import ProductCard from "@/components/shared/ProductCard"
import CTAButton from "@/components/shared/CTAButton"
import { productCategories } from "@/data/products"

export const metadata: Metadata = {
  title: "Products",
  description: "Browse Raft-Garments product range: Babies Wear, Kids Wear, Mens Wear, Womens Wear & Nightwear. MOQ from 500 units.",
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Built for Every Age. Every Market."
        subtitle="Four product categories. 150+ fabric constructions. 500+ colors. All from one vertically integrated campus."
        breadcrumb={[{ label: "Products", href: "/products" }]}
      />

      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            overline="Our Range"
            title="Explore Our Categories"
            subtitle="Each category is engineered with category-specific fabric constructions, safety standards, and finishing requirements."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productCategories.map((cat) => (
              <ProductCard key={cat.id} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            overline="Why Raft-Garments"
            title="The Manufacturer Behind the Label"
            className="mb-12"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "No Middlemen",
                body: "Order direct from the manufacturer. Transparent pricing, direct relationship.",
              },
              {
                title: "Full Vertical Control",
                body: "From yarn to packaging — we own every step, so quality never depends on a supplier.",
              },
              {
                title: "Private Label Ready",
                body: "Custom labels, hang-tags, packaging, and tech-pack development included.",
              },
              {
                title: "14+ Certifications",
                body: "ISO 9001, GOTS, WRAP, Oeko-Tex, Disney Approval, and 9 more active certifications.",
              },
              {
                title: "Fast Lead Times",
                body: "45–60 days standard. 30 days for repeat orders. Sample dispatched in 10 days.",
              },
              {
                title: "Export Experience",
                body: "40+ countries. FOB, CIF, and DDP incoterms available. Customs documentation handled.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 border border-brand-border">
                <h3 className="font-bold text-brand-navy mb-2">{item.title}</h3>
                <p className="text-sm text-brand-slate leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <CTAButton label="Request a Sample" href="/contact" variant="primary" size="lg" arrow />
          </div>
        </div>
      </section>
    </>
  )
}
