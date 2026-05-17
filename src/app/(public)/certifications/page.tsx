import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import CTAButton from "@/components/shared/CTAButton"
import AnimateIn from "@/components/shared/AnimateIn"
import CertificationsSection from "./CertificationsSection"
import { certifications } from "@/data/certifications"

export const metadata: Metadata = {
  title: "Certifications",
  description: "14+ active certifications including ISO 9001, GOTS, WRAP, Oeko-Tex, Disney Approval, and more.",
}

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        title="14+ Active Certifications."
        subtitle="Independently verified quality, safety, environmental, and social standards — covering every aspect of our operations."
        breadcrumb={[{ label: "Certifications", href: "/certifications" }]}
      />

      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <AnimateIn>
            <SectionHeader
              overline="Our Certifications"
              title="Verified at Every Level"
              subtitle="From organic cotton to worker safety, every certification represents a commitment we keep every single day."
              className="mb-12"
            />
          </AnimateIn>

          <CertificationsSection certifications={certifications} />

          {/* Download CTA */}
          <AnimateIn delay={0.2}>
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
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
