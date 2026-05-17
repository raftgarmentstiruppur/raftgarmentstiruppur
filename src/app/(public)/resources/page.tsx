import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import CTAButton from "@/components/shared/CTAButton"
import { FileText, Palette, Package, Leaf, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "Resources",
  description: "Download the Raft-Garments product catalog, colour card, product specs, and sustainability report.",
}

const resources = [
  {
    id: "catalog",
    icon: <FileText className="w-8 h-8" />,
    title: "Product Catalog 2025",
    description: "Complete range of all 4 product categories — Babies, Kids, Mens, Womens. Includes fabric specs, available styles, and color options.",
    fileType: "PDF · 12 MB",
    ctaLabel: "Download Catalog",
  },
  {
    id: "colour-card",
    icon: <Palette className="w-8 h-8" />,
    title: "Colour Card",
    description: "500+ standard colors with Pantone references, available across our full product range. Custom Pantone matching available on request.",
    fileType: "PDF · 8 MB",
    ctaLabel: "Download Colour Card",
  },
  {
    id: "specs",
    icon: <Package className="w-8 h-8" />,
    title: "Product Specification Sheets",
    description: "Technical data sheets for each product category: fabric weight, composition, shrinkage tolerance, colorfastness ratings, and wash care.",
    fileType: "PDF · 5 MB",
    ctaLabel: "Download Spec Sheets",
  },
  {
    id: "sustainability",
    icon: <Leaf className="w-8 h-8" />,
    title: "Sustainability Report 2024",
    description: "Annual report covering our energy usage, green initiatives, carbon metrics, certification status, and social commitment programs.",
    fileType: "PDF · 4 MB",
    ctaLabel: "Download Report",
  },
]

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        title="Resources & Downloads"
        subtitle="Everything you need to evaluate, specify, and order from Raft-Garments. All documents available as free PDF downloads."
        breadcrumb={[{ label: "Resources", href: "/resources" }]}
      />

      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            overline="Downloads"
            title="All Documents in One Place"
            subtitle="Updated quarterly. All files are free to download — no registration required."
            className="mb-12"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((res) => (
              <div
                key={res.id}
                id={res.id}
                className="border border-brand-border p-8 flex flex-col gap-4 hover:border-brand-accent transition-colors"
              >
                <div className="text-brand-accent">{res.icon}</div>
                <div>
                  <h3 className="font-bold text-brand-navy text-lg">{res.title}</h3>
                  <p className="text-xs text-brand-ash mt-1">{res.fileType}</p>
                </div>
                <p className="text-sm text-brand-slate leading-relaxed flex-1">{res.description}</p>
                <a
                  href={`/downloads/${res.id}.pdf`}
                  download
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-accent-hover transition-colors self-start"
                >
                  <Download className="w-4 h-4" />
                  {res.ctaLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request samples */}
      <section className="py-section bg-brand-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-4">Physical Samples</p>
          <h2 className="text-3xl font-bold">Need Fabric Swatches or Garment Samples?</h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            Request physical samples via email or our contact form. Fabric swatches dispatched within 2–3 business days. Garment samples within 10 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <CTAButton label="Request Samples" href="/contact" variant="primary" size="lg" arrow />
            <CTAButton label="Email Us" href="mailto:mail@raftgarments.com" variant="outline-light" size="lg" />
          </div>
        </div>
      </section>
    </>
  )
}
