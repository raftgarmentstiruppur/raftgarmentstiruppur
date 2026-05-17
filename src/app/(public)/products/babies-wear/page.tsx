import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import CTAButton from "@/components/shared/CTAButton"

export const metadata: Metadata = {
  title: "Babies Wear",
  description: "GOTS-certified organic cotton garments for newborns to 24 months. Oeko-Tex compliant, skin-safe, Disney approved.",
}

const highlights = [
  { label: "Age Range", value: "Newborn – 24 months" },
  { label: "Fabric", value: "GOTS organic cotton, OCS-certified" },
  { label: "Dyes", value: "Oeko-Tex Standard 100 compliant" },
  { label: "Closures", value: "Snap buttons, envelope necklines" },
  { label: "Seams", value: "Flatlock & turned seams for skin safety" },
  { label: "Certifications", value: "GOTS, OCS, Oeko-Tex, Disney Approval" },
  { label: "MOQ", value: "500 units per style, per color" },
  { label: "Lead Time", value: "45–60 days (sample: 10 days)" },
]

const styles = [
  "Bodysuits & Onesies",
  "Sleepsuits & Rompers",
  "T-Shirts & Vests",
  "Sets (top + bottom)",
  "Hooded Towels & Bibs",
  "Knitwear & Cardigans",
  "Pyjamas & Sleepwear",
  "Seasonal Collections",
]

export default function BabiesWearPage() {
  return (
    <>
      <PageHero
        title="Babies Wear"
        subtitle="Every stitch made for the softest skin. GOTS-certified organic cotton, Oeko-Tex compliant dyes, and skin-safe finishing — from newborn to 24 months."
        breadcrumb={[
          { label: "Products", href: "/products" },
          { label: "Babies Wear", href: "/products/babies-wear" },
        ]}
      />

      {/* Overview */}
      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Placeholder product image */}
            <div className="aspect-square bg-brand-light-gray flex items-center justify-center border border-brand-border">
              <p className="text-brand-ash text-sm">Babies Wear product photography</p>
            </div>
            <div>
              <SectionHeader
                overline="Babies Wear"
                title="Safety-First Knitwear for the Youngest"
                align="left"
              />
              <p className="mt-4 text-brand-slate leading-relaxed">
                Our babies wear range is designed from the ground up with infant safety at its core. We source only GOTS-certified organic cotton, processed in our Oeko-Tex approved dyehouse with reactive dyes free from azo compounds and allergens.
              </p>
              <p className="mt-3 text-brand-slate leading-relaxed">
                Every garment goes through flatlock seam finishing and AQL 2.5 inspection to ensure zero sharp edges or loose threads. Snap closures are tested to withstand 100+ open-close cycles.
              </p>

              {/* Spec table */}
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

      {/* Styles */}
      <section className="py-section bg-brand-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            overline="Available Styles"
            title="Full Range for Babies"
            className="mb-10"
          />
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
