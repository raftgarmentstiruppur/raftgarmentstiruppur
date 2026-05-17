import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import CTAButton from "@/components/shared/CTAButton"

export const metadata: Metadata = {
  title: "Mens Wear",
  description: "Premium mens T-shirts, polos, hoodies and sweatshirts in ring-spun cotton. 150+ colors, private label capability.",
}

const highlights = [
  { label: "Sizes", value: "XS – 4XL (custom sizing available)" },
  { label: "Fabric", value: "Ring-spun, combed, compact, OCS organic" },
  { label: "Weights", value: "140 GSM – 320 GSM" },
  { label: "Colors", value: "150+ standard + custom Pantone matching" },
  { label: "Print Methods", value: "Screen, DTG, discharge, sublimation, foil" },
  { label: "Certifications", value: "Oeko-Tex, GOTS (organic range), WRAP" },
  { label: "MOQ", value: "500 units per style, per color" },
  { label: "Lead Time", value: "45–60 days (sample: 10 days)" },
]

const styles = [
  "Crew Neck T-Shirts",
  "V-Neck T-Shirts",
  "Polo Shirts",
  "Hoodies & Sweatshirts",
  "Track Pants & Joggers",
  "Tank Tops & Vests",
  "Long Sleeve Tees",
  "Zip-Up Hoodies",
]

export default function MensWearPage() {
  return (
    <>
      <PageHero
        title="Mens Wear"
        subtitle="Ring-spun cotton. 150+ colors. Private label capability. The blank canvas your brand needs."
        breadcrumb={[
          { label: "Products", href: "/products" },
          { label: "Mens Wear", href: "/products/mens-wear" },
        ]}
      />

      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="aspect-square bg-brand-light-gray flex items-center justify-center border border-brand-border">
              <p className="text-brand-ash text-sm">Mens Wear product photography</p>
            </div>
            <div>
              <SectionHeader overline="Mens Wear" title="Premium Blanks for Every Brand" align="left" />
              <p className="mt-4 text-brand-slate leading-relaxed">
                Our mens wear range is the workhorse of our product lineup — versatile, high-quality, and built for branding. From 140 GSM lightweight summer tees to 320 GSM heavyweight fleece hoodies, every style is available in 150+ standard colors with custom Pantone matching on request.
              </p>
              <p className="mt-3 text-brand-slate leading-relaxed">
                All styles support our full printing and embroidery capabilities: screen printing, direct-to-garment, discharge, sublimation, foil, and embroidery. Private label setup (labels, hangtags, polybag, barcode) included for all orders.
              </p>

              <div className="mt-8 border border-brand-border divide-y divide-brand-border">
                {highlights.map((h) => (
                  <div key={h.label} className="grid grid-cols-2 py-3 px-4">
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-ash">{h.label}</span>
                    <span className="text-sm text-brand-charcoal">{h.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <CTAButton label="Request a Quote" href="/contact" variant="primary" size="lg" arrow />
                <CTAButton label="Download Color Card" href="/resources#colour-card" variant="outline" size="lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader overline="Available Styles" title="Full Mens Range" className="mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {styles.map((style) => (
              <div key={style} className="bg-white border border-brand-border p-4 text-center text-sm font-medium text-brand-charcoal">
                {style}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
