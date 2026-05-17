import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import CTAButton from "@/components/shared/CTAButton"

export const metadata: Metadata = {
  title: "Womens Wear & Nightwear",
  description: "Fashion tees, loungewear, and nightwear in premium jersey, rib, and fleece. Full embellishment capability.",
}

const highlights = [
  { label: "Sizes", value: "XS – 3XL (custom sizing available)" },
  { label: "Fabrics", value: "Jersey, rib, interlock, modal blend, fleece" },
  { label: "Weights", value: "130 GSM – 280 GSM" },
  { label: "Embellishments", value: "Embroidery, foil print, sublimation, lace trim" },
  { label: "Finishes", value: "Enzyme wash, garment dye, acid wash, vintage" },
  { label: "Certifications", value: "Oeko-Tex, GOTS (organic range), SWAN Ecolabel" },
  { label: "MOQ", value: "500 units per style, per color" },
  { label: "Lead Time", value: "45–60 days (sample: 10 days)" },
]

const styles = [
  "Fashion T-Shirts",
  "Crop Tops & Bodies",
  "Loungewear Sets",
  "Nightwear & Pyjamas",
  "Dresses & Skirts",
  "Leggings & Joggers",
  "Sweatshirts & Hoodies",
  "Robes & Sleepwear",
]

export default function WomensWearPage() {
  return (
    <>
      <PageHero
        title="Womens Wear & Nightwear"
        subtitle="Soft fabrics, precise fits, and full embellishment capability — from fashion tees to premium nightwear collections."
        breadcrumb={[
          { label: "Products", href: "/products" },
          { label: "Womens Wear & Nightwear", href: "/products/womens-wear" },
        ]}
      />

      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="aspect-square bg-brand-light-gray flex items-center justify-center border border-brand-border">
              <p className="text-brand-ash text-sm">Womens Wear product photography</p>
            </div>
            <div>
              <SectionHeader overline="Womens & Nightwear" title="Fashion-Forward. Comfort-First." align="left" />
              <p className="mt-4 text-brand-slate leading-relaxed">
                Our womens and nightwear range spans everything from lightweight jersey fashion tops to luxurious modal-blend robes. We use carefully selected fabrics chosen for drape, hand-feel, and durability — then pair them with our full suite of embellishment options.
              </p>
              <p className="mt-3 text-brand-slate leading-relaxed">
                Nordic Swan Ecolabel and Oeko-Tex certification ensures chemical safety across all garments. Garment wash and dye finishing services are available in-house for vintage and fashion-washed looks.
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
                <CTAButton label="Download Catalog" href="/resources#catalog" variant="outline" size="lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader overline="Available Styles" title="Full Womens Range" className="mb-10" />
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
