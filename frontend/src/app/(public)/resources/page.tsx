import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import CTAButton from "@/components/shared/CTAButton"
import { FileText, Package, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "Resources",
  description: "Download the Raft Garments product catalog, colour card, product specs, and sustainability report.",
}

const resources = [
  {
    id: "corporate-brochure",
    icon: <FileText className="w-8 h-8" />,
    title: "Corporate Brochure",
    description: "Company overview covering our 40+ year legacy, manufacturing capabilities, certifications, sustainability practices, and global markets served.",
    file: "/downloads/corporate-brochure.pdf",
    ctaLabel: "Download Corporate Brochure",
  },
  {
    id: "product-brochure",
    icon: <Package className="w-8 h-8" />,
    title: "Product Brochure",
    description: "Full product range — men's, women's, and kids' innerwear, seamless bonded underwear, shapewear, and swimwear. Fabric options, styles, and certifications.",
    file: "/downloads/product-brochure.pdf",
    ctaLabel: "Download Product Brochure",
  },
]

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        title="Resources & Downloads"
        subtitle="Everything you need to evaluate, specify, and order from Raft Garments. All documents available as free PDF downloads."
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
                  href={res.file}
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
            <CTAButton label="Email Us" href="mailto:info@raftgarments.com" variant="outline-light" size="lg" />
          </div>
        </div>
      </section>
    </>
  )
}

