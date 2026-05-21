"use client"

import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import CTAButton from "@/components/shared/CTAButton"
import DownloadGateModal from "@/components/shared/DownloadGateModal"
import { FileText, Package, Download } from "lucide-react"
import { useState } from "react"

const resources = [
  {
    id: "corporate-brochure",
    icon: <FileText className="w-8 h-8" />,
    title: "Corporate Brochure",
    description: "Company overview covering our 50+ year legacy, manufacturing capabilities, certifications, sustainability practices, and global markets served.",
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
  const [active, setActive] = useState<{ title: string; file: string } | null>(null)

  return (
    <>
      <PageHero
        title="Resources and downloads"
        subtitle="Everything you need to evaluate, specify, and order from Raft Garments. All documents available as free PDF downloads."
        breadcrumb={[{ label: "Resources", href: "/resources" }]}
        bgImage="/images/resources-hero.png"
      />

      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            overline="Downloads"
            title="All documents in one place"
            subtitle="Updated quarterly. Fill in a quick form to download — your details help us serve you better."
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
                  <h3 className="font-black text-brand-navy text-2xl">{res.title}</h3>
                  <p className="text-sm text-brand-ash mt-1 uppercase tracking-widest font-semibold">PDF Download</p>
                </div>
                <p className="text-lg text-brand-slate leading-relaxed flex-1 text-justify">{res.description}</p>
                <button
                  onClick={() => setActive({ title: res.title, file: res.file })}
                  className="inline-flex items-center gap-2 text-base font-bold self-start animate-blink-highlight hover:[animation-play-state:paused]"
                >
                  <Download className="w-4 h-4" />
                  {res.ctaLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request samples */}
      <section className="py-section bg-brand-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-widest text-brand-accent mb-4">Physical Samples</p>
          <h2 className="text-4xl md:text-5xl font-black">Need fabric swatches or garment samples?</h2>
          <p className="mt-6 text-xl text-white/85 leading-relaxed">
            Request physical samples via email or our contact form. Fabric swatches dispatched within 2–3 business days. Garment samples within 10 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <CTAButton label="Request samples" href="/contact" variant="primary" size="lg" arrow />
            <CTAButton label="Email us" href="mailto:info@raftgarments.com" variant="outline-light" size="lg" />
          </div>
        </div>
      </section>

      {active && (
        <DownloadGateModal
          document={active.title}
          fileUrl={active.file}
          onClose={() => setActive(null)}
        />
      )}
    </>
  )
}
