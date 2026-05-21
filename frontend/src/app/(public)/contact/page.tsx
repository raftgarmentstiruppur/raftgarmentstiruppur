import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import ContactContent from "./ContactContent"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Raft Garments for wholesale orders, private label enquiries, sampling, or general questions. Netaji Apparel Park, Tirupur – 641666, Tamil Nadu, India.",
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's build something together"
        subtitle="Reach our team for wholesale orders, private label enquiries, sampling, or general questions."
        breadcrumb={[{ label: "Contact", href: "/contact" }]}
        bgImage="/images/contact-hero.png"
      />
      <ContactContent />
    </>
  )
}
