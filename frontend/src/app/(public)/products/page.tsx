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
  description: "Browse Raft Garments' product range: Kids', Men's, and Women's innerwear, seamless bonded underwear, shapewear, swimwear, and casual outerwear. Cotton, bamboo, Tencel, and more.",
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="India's finest knitwear. Built for the world."
        subtitle="Premium innerwear and outerwear — from intimate essentials to versatile casual styles. Cotton, bamboo, Tencel, nylon, viscose, and recycled polyester."
        breadcrumb={[{ label: "Products", href: "/products" }]}
        bgImage="/images/products-hero.png"
      />

      {/* Filter view OR default category grid */}
      <Suspense fallback={<CategoryGrid />}>
        <FilteredProducts />
      </Suspense>

      {/* Why choose us */}
      <section className="relative py-section bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ background: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader overline="Why Raft Garments" title="The manufacturer behind the label" className="mb-12" light />
          <div className="grid md:grid-cols-3 gap-px">
            {[
              {
                title: "No Middlemen",
                bullets: [
                  "Order direct from the manufacturer",
                  "Transparent, agent-free pricing",
                  "No commissions, no markups",
                ],
              },
              {
                title: "Full Vertical Control",
                bullets: [
                  "Knitting to packing under one roof",
                  "Italian CAD/CAM auto-cutting systems",
                  "In-house Jacquard elastic & AQL-audited finishing",
                ],
              },
              {
                title: "10+ Certifications",
                bullets: [
                  "ISO 9001:2015 & WRAP certified",
                  "BCI, Oeko-Tex Standard 100 approved",
                  "CTPAT compliance secured",
                ],
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/[0.05] border border-white/[0.08] hover:bg-white/10 hover:border-brand-accent/30 p-8 transition-all duration-300 group">
                <div className="w-6 h-0.5 bg-brand-accent mb-4" />
                <h3 className="font-black text-white text-base uppercase tracking-wide mb-4 group-hover:text-brand-accent transition-colors duration-300">{item.title}</h3>
                <ul className="space-y-2.5">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                      <span className="text-base text-white/75 leading-relaxed group-hover:text-white/90 transition-colors duration-300 text-justify">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <CTAButton label="Request a sample" href="/contact" variant="primary" size="lg" arrow />
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
          title="Explore our categories"
          subtitle="From innerwear essentials to casual outerwear — each category built with certified materials, precise construction, and AQL-inspected finishing."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
          {productCategories.map((cat) => (
            <ProductCard key={cat.id} {...cat} />
          ))}
        </div>
      </div>
    </section>
  )
}

