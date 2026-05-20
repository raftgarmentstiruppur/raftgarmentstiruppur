import type { Metadata } from "next"
import ContentPageHero from "@/components/shared/ContentPageHero"
import InfrastructureDivisions from "@/components/infrastructure/InfrastructureDivisions"
import InfrastructureProcessStrip from "./InfrastructureProcessStrip"
import InfrastructureCTA from "./InfrastructureCTA"
import { divisions } from "@/data/infrastructure"

export const metadata: Metadata = {
  title: "Infrastructure",
  description: "6 integrated manufacturing divisions — knitting, fabric inspection, cutting, elastic weaving, sewing, and finishing & packing. Italian CAD/CAM and German Jacquard technology in Tirupur, India.",
}

export default function InfrastructurePage() {
  return (
    <>
      <ContentPageHero
        titleKey="page-infrastructure-title"
        subtitleKey="page-infrastructure-subtitle"
        defaultTitle="End-to-End. In-House. In Control."
        defaultSubtitle="6 integrated divisions. Complete control over quality, cost and lead times."
        breadcrumb={[{ label: "Infrastructure", href: "/infrastructure" }]}
        imageKey="infrastructure-hero"
        defaultImage="/images/infra-hero.png"
      />
      <InfrastructureProcessStrip />
      <InfrastructureDivisions divisions={divisions} />
      <InfrastructureCTA />
    </>
  )
}
