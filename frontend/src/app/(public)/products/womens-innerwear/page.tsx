import type { Metadata } from "next"
import ContentPageHero from "@/components/shared/ContentPageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import ContentStyleGrid from "@/components/shared/ContentStyleGrid"
import ProductsAlternatingSection from "@/components/shared/ProductsAlternatingSection"

export const metadata: Metadata = {
  title: "Womens Innerwear",
  description: "Premium womens innerwear — bras, panties, camisoles, thermals and nightwear in cotton, modal and microfibre. Lace trim capability.",
}

const P = "product-womens-innerwear"

const DEFAULT_STYLES = [
  "Bikini Briefs", "Hipster Briefs", "Boy Shorts", "High-Waist Briefs", "Thongs",
]

export default function WomensInnerwearPage() {
  return (
    <>
      <ContentPageHero
        titleKey="page-womens-innerwear-title"
        subtitleKey="page-womens-innerwear-subtitle"
        defaultTitle="Womens Innerwear"
        defaultSubtitle="Cotton, modal, and microfibre constructions with full lace trim and embellishment capability — from everyday basics to premium nightwear."
        breadcrumb={[
          { label: "Products", href: "/products" },
          { label: "Womens Innerwear", href: "/products/womens-innerwear" },
        ]}
      />

      <ProductsAlternatingSection category="womens-innerwear" categoryPath="womens-innerwear" />

      <section className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader overline="Available Styles" title="Full Womens Innerwear Range" className="mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ContentStyleGrid productKey={P} defaultStyles={DEFAULT_STYLES} />
          </div>
        </div>
      </section>
    </>
  )
}
