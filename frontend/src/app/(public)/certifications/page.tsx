import type { Metadata } from "next"
import ContentPageHero from "@/components/shared/ContentPageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import CertBadge from "@/components/shared/CertBadge"
import CTAButton from "@/components/shared/CTAButton"
import { certifications } from "@/data/certifications"

export const metadata: Metadata = {
  title: "Certifications",
  description: "10+ active certifications including ISO 9001:2015, WRAP, BCI, Oeko-Tex Standard 100, Walt Disney Approval, CTPAT, and more.",
}

const categories = ["All", "Quality", "Safety", "Social", "Sustainability", "Recycled", "Brand Compliance", "Security"]

export default function CertificationsPage() {
  return (
    <>
      <ContentPageHero
        titleKey="page-certifications-title"
        subtitleKey="page-certifications-subtitle"
        defaultTitle="10+ Active Certifications."
        defaultSubtitle="Independently verified quality, social, sustainability, and security standards — covering every aspect of our operations."
        breadcrumb={[{ label: "Certifications", href: "/certifications" }]}
      />

      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            overline="Our Certifications"
            title="Verified at Every Level"
            subtitle="From product safety to ethical trade — every certification is independently audited and renewed annually."
            className="mb-12"
          />

          {/* Category legend */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 text-xs font-medium border border-brand-border text-brand-slate bg-brand-light-gray"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Cert grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <CertBadge key={cert.id} {...cert} />
            ))}
          </div>

          {/* Download CTA */}
          <div className="mt-16 bg-brand-light-gray border border-brand-border p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3">Documents</p>
            <h3 className="text-2xl font-bold text-brand-navy mb-3">
              Need Certification Letters?
            </h3>
            <p className="text-brand-slate mb-6 max-w-lg mx-auto">
              All certification documents are available for download from our Resources page, or request them directly by email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton label="Download Documents" href="/resources" variant="primary" arrow />
              <CTAButton label="Email Us" href="/contact" variant="outline" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
