import type { Metadata } from "next"
import ContentPageHero from "@/components/shared/ContentPageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import CertificationsGrid from "./CertificationsGrid"

export const metadata: Metadata = {
  title: "Certifications",
  description: "10+ active certifications including ISO 9001:2015, WRAP, BCI, Oeko-Tex Standard 100, Walt Disney Approval, CTPAT, and more.",
}

export default function CertificationsPage() {
  return (
    <>
      <ContentPageHero
        titleKey="page-certifications-title"
        subtitleKey="page-certifications-subtitle"
        defaultTitle="10+ Active Certifications."
        defaultSubtitle="Independently verified quality, social, sustainability, and security standards — covering every aspect of our operations."
        breadcrumb={[{ label: "Certifications", href: "/certifications" }]}
        defaultImage="/images/certifications-hero.png"
      />

      <section className="py-section bg-brand-dark overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* Section header */}
          <div className="mb-14">
            <SectionHeader
              overline="Our Certifications"
              title="Verified at Every Level"
              subtitle="From product safety to ethical trade — every certification is independently audited and renewed annually."
              light
            />
          </div>

          <CertificationsGrid />
        </div>
      </section>
    </>
  )
}
