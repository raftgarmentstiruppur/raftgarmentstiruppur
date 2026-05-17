import type { Metadata } from "next"
import ContentPageHero from "@/components/shared/ContentPageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import ContentStyleGrid from "@/components/shared/ContentStyleGrid"
import ProductsAlternatingSection from "@/components/shared/ProductsAlternatingSection"

export const metadata: Metadata = {
  title: "Mens Innerwear",
  description: "Premium mens innerwear — briefs, boxers, trunks, vests and thermals in combed cotton and modal blends. 150+ colors, private label ready.",
}

const P = "product-mens-innerwear"

const DEFAULT_STYLES = [
  "Briefs", "Boxer Briefs", "Trunks", "Boxers (Loose)", "Hipster Briefs",
  "Sports / Compression",
]

export default function MensInnerwearPage() {
  return (
    <>
      <ContentPageHero
        titleKey="page-mens-innerwear-title"
        subtitleKey="page-mens-innerwear-subtitle"
        defaultTitle="Mens Innerwear"
        defaultSubtitle="Combed cotton. Modal blends. 150+ colors. Private label ready — from classic briefs to performance sports innerwear."
        breadcrumb={[
          { label: "Products", href: "/products" },
          { label: "Mens Innerwear", href: "/products/mens-innerwear" },
        ]}
      />

      <ProductsAlternatingSection category="mens-innerwear" categoryPath="mens-innerwear" />

      <section className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader overline="Available Styles" title="Full Mens Innerwear Range" className="mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ContentStyleGrid productKey={P} defaultStyles={DEFAULT_STYLES} />
          </div>
        </div>
      </section>
    </>
  )
}
