import type { Metadata } from "next"
import ContentPageHero from "@/components/shared/ContentPageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import ContentStyleGrid from "@/components/shared/ContentStyleGrid"
import ProductsAlternatingSection from "@/components/shared/ProductsAlternatingSection"

export const metadata: Metadata = {
  title: "Outerwear",
  description: "Versatile casual outerwear — T-shirts, polo shirts, sweatshirts, hoodies, track pants, and shorts. Cotton, French Terry, and fleece blends. Private label ready.",
}

const P = "product-outerwear"

const DEFAULT_STYLES = [
  "T-Shirts", "Polo Shirts", "Sweatshirts", "Hoodies",
  "Track Pants / Joggers", "Casual Shorts",
]

export default function OuterwearPage() {
  return (
    <>
      <ContentPageHero
        titleKey="page-outerwear-title"
        subtitleKey="page-outerwear-subtitle"
        defaultTitle="Outerwear"
        defaultSubtitle="Versatile casual outerwear crafted in cotton, French Terry, and fleece blends. From everyday T-shirts to hoodies and track pants — private label ready."
        breadcrumb={[
          { label: "Products", href: "/products" },
          { label: "Outerwear", href: "/products/outerwear" },
        ]}
      />

      <ProductsAlternatingSection category="outerwear" categoryPath="outerwear" />

      <section className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader overline="Available Styles" title="Full Outerwear Range" className="mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ContentStyleGrid productKey={P} defaultStyles={DEFAULT_STYLES} />
          </div>
        </div>
      </section>
    </>
  )
}
