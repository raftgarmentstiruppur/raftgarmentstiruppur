import type { Metadata } from "next"
import ContentPageHero from "@/components/shared/ContentPageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import ContentStyleGrid from "@/components/shared/ContentStyleGrid"
import ProductsAlternatingSection from "@/components/shared/ProductsAlternatingSection"

export const metadata: Metadata = {
  title: "Kids' Innerwear",
  description: "Premium combed cotton innerwear for children aged 2–14. Briefs, vests, thermal sets, and loungewear. Oeko-Tex certified, skin-safe.",
}

const P = "product-kids-innerwear"

const DEFAULT_STYLES = [
  "Boys' Briefs", "Boys' Boxer Shorts", "Boys' Trunks",
  "Girls' Briefs", "Girls' Boy Shorts", "Girls' Hipster", "Training Pants",
]

export default function KidsInnerwearPage() {
  return (
    <>
      <ContentPageHero
        titleKey="page-kids-innerwear-title"
        subtitleKey="page-kids-innerwear-subtitle"
        defaultTitle="Kids' Innerwear"
        defaultSubtitle="Soft, breathable, and skin-safe innerwear for children aged 2–14. Combed cotton, Oeko-Tex certified, built for all-day comfort."
        breadcrumb={[
          { label: "Products", href: "/products" },
          { label: "Kids' Innerwear", href: "/products/kids-innerwear" },
        ]}
        defaultImage="/images/kids-hero.png"
      />

      <ProductsAlternatingSection category="kids-innerwear" categoryPath="kids-innerwear" />

      <section className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader overline="Available Styles" title="Full Kids' Innerwear Range" className="mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ContentStyleGrid productKey={P} defaultStyles={DEFAULT_STYLES} />
          </div>
        </div>
      </section>
    </>
  )
}
