import type { Metadata } from "next"
import ContentPageHero from "@/components/shared/ContentPageHero"
import AboutContent from "./AboutContent"

export const metadata: Metadata = {
  title: "About Us",
  description: "Raft Garments — 40+ years of knitwear manufacturing excellence from Tirupur, India. Premium innerwear and outerwear, second-generation leadership, serving Europe, USA, and India.",
}

export default function AboutPage() {
  return (
    <>
      <ContentPageHero
        titleKey="about-headline"
        subtitleKey="about-subheadline"
        defaultTitle="40+ Years of Knitwear Excellence."
        defaultSubtitle="Taking India's finest knitwear to the world — crafting quality, pioneering sustainability, shaping fashion."
        breadcrumb={[{ label: "About Us", href: "/about" }]}
        imageKey="about-hero"
        defaultImage="/images/about-hero.png"
      />
      <AboutContent />
    </>
  )
}
