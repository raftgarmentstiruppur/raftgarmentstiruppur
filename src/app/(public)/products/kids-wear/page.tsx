import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import CTAButton from "@/components/shared/CTAButton"

export const metadata: Metadata = {
  title: "Kids Wear",
  description: "Durable kids clothing for ages 2–14. Disney-approved manufacturer, reinforced stitching, wash-tested prints.",
}

const highlights = [
  { label: "Age Range", value: "2–14 years" },
  { label: "Fabric", value: "Combed cotton, cotton-poly blends, fleece" },
  { label: "Prints", value: "Screen, digital, sublimation — wash-tested 50+ cycles" },
  { label: "Embellishments", value: "Embroidery, appliqué, heat transfer" },
  { label: "Closures", value: "Elastic, drawcord, buttons, zip" },
  { label: "Certifications", value: "Oeko-Tex, GOTS (organic styles), Disney Approval" },
  { label: "MOQ", value: "500 units per style, per color" },
  { label: "Lead Time", value: "45–60 days (sample: 10 days)" },
]

const styles = [
  "T-Shirts & Tops",
  "Sweatshirts & Hoodies",
  "Shorts & Bottoms",
  "Sets & Co-ords",
  "School Uniforms",
  "Sportswear",
  "Pyjamas & Nightwear",
  "Outerwear",
]

export default function KidsWearPage() {
  return (
    <>
      <PageHero
        title="Kids Wear"
        subtitle="Built tough for the playground. Bright colors that last, reinforced seams that hold, and prints that survive 50+ wash cycles."
        breadcrumb={[
          { label: "Products", href: "/products" },
          { label: "Kids Wear", href: "/products/kids-wear" },
        ]}
      />

      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="aspect-square bg-brand-light-gray flex items-center justify-center border border-brand-border">
              <p className="text-brand-ash text-sm">Kids Wear product photography</p>
            </div>
            <div>
              <SectionHeader
                overline="Kids Wear"
                title="Active Wear Built to Last"
                align="left"
              />
              <p className="mt-4 text-brand-slate leading-relaxed">
                Kids are tough on their clothes. Our kids wear range is engineered to match. We use combed cotton and cotton-poly blends selected for abrasion resistance, with reinforced bartack stitching at all stress points.
              </p>
              <p className="mt-3 text-brand-slate leading-relaxed">
                Our printing division handles colorfastness-tested screen and digital prints — all Oeko-Tex approved — that remain bright after 50+ washes. As a Disney-approved manufacturer, we produce licensed character garments to Disney's strict quality requirements.
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
                <CTAButton label="Download Spec Sheet" href="/resources#specs" variant="outline" size="lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader overline="Available Styles" title="Full Range for Kids" className="mb-10" />
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
