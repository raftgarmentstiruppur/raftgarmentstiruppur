import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import ProductCard from "@/components/shared/ProductCard"
import CTAButton from "@/components/shared/CTAButton"
import { productCategories } from "@/data/products"
import { Suspense } from "react"
import FilteredProducts from "@/components/shared/FilteredProducts"

export const metadata: Metadata = {
  title: "Products",
  description: "Browse Raft Garments product range: Kids, Mens, and Womens innerwear, seamless bonded underwear, shapewear, swimwear, and casual outerwear. Cotton, bamboo, Tencel, and more.",
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="India's Finest Knitwear. Built for the World."
        subtitle="Premium innerwear and outerwear — from intimate essentials to versatile casual styles. Cotton, bamboo, Tencel, nylon, viscose, and recycled polyester."
        breadcrumb={[{ label: "Products", href: "/products" }]}
      />

      {/* Filter view OR default category grid */}
      <Suspense fallback={<CategoryGrid />}>
        <FilteredProducts />
      </Suspense>

      {/* Why choose us */}
      <section className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader overline="Why Raft Garments" title="The Manufacturer Behind the Label" className="mb-12" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "No Middlemen",          body: "Order direct from the manufacturer. Transparent pricing, direct relationship." },
              { title: "Full Vertical Control", body: "Italian CAD/CAM cutting, in-house Jacquard elastic, certified sewing lines, and AQL-audited finishing — all under one roof." },
              { title: "Private Label Ready",   body: "Custom labels, hang-tags, packaging, and tech-pack development included." },
              { title: "10+ Certifications",    body: "ISO 9001:2015, WRAP, BCI, Oeko-Tex Standard 100, Walt Disney Approval, CTPAT, and more." },
              { title: "Fast Lead Times",       body: "45–60 days standard. 30 days for repeat orders. Sample dispatched in 10 days." },
              { title: "Export Experience",     body: "Europe, USA, and India. NOOS programs available. Customs documentation and compliance handled end-to-end." },
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

function CategoryGrid() {
  return (
    <section className="py-section bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeader
          overline="Our Range"
          title="Explore Our Categories"
          subtitle="From innerwear essentials to casual outerwear — each category built with certified materials, precise construction, and AQL-inspected finishing."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productCategories.map((cat) => (
            <ProductCard key={cat.id} {...cat} />
          ))}
        </div>
      </div>
    </section>
  )
}

