import type { Metadata } from "next"
import ContentPageHero from "@/components/shared/ContentPageHero"
import SustainabilityContent from "./SustainabilityContent"

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Raft Garments is committed to sustainable innerwear manufacturing — BCI cotton, Oeko-Tex, WRAP, and SMETA certified.",
}

export default function SustainabilityPage() {
  return (
    <>
      <ContentPageHero
        titleKey="sustainability-title"
        subtitleKey="sustainability-subtitle"
        defaultTitle="Responsible by design."
        defaultSubtitle="Sustainable fabrics, ethical labor, and certified practices — knitted into every garment we make."
        breadcrumb={[{ label: "Sustainability", href: "/sustainability" }]}
        imageKey="sustainability-hero"
        defaultImage="/images/sustainability-hero.png"
      />
      <SustainabilityContent />
    </>
  )
}
