import type { Metadata } from "next"
import ContentPageHero from "@/components/shared/ContentPageHero"
import ContentText from "@/components/shared/ContentText"
import DivisionImageSlider from "@/components/shared/DivisionImageSlider"
import SectionHeader from "@/components/shared/SectionHeader"
import StatCard from "@/components/shared/StatCard"
import CTAButton from "@/components/shared/CTAButton"
import { divisions } from "@/data/infrastructure"
import {
  Layers, Grid3x3, Scissors, Workflow, Package, ScanSearch
} from "lucide-react"

export const metadata: Metadata = {
  title: "Infrastructure",
  description: "6 integrated manufacturing divisions — cutting, printing, embroidery, sewing, finishing, and packaging. Italian CAD/CAM and German Jacquard technology in Tirupur, India.",
}

const iconMap: Record<string, React.ReactNode> = {
  Grid3x3:    <Grid3x3 className="w-8 h-8" />,
  ScanSearch: <ScanSearch className="w-8 h-8" />,
  Scissors:   <Scissors className="w-8 h-8" />,
  Layers:     <Layers className="w-8 h-8" />,
  Workflow:   <Workflow className="w-8 h-8" />,
  Package:    <Package className="w-8 h-8" />,
}

const processSteps = ["Knitting","Fabric Inspection","Cutting","Elastic Weaving","Sewing","Finishing & Packaging","Shipping"]

export default function InfrastructurePage() {
  return (
    <>
      <ContentPageHero
        titleKey="page-infrastructure-title"
        subtitleKey="page-infrastructure-subtitle"
        defaultTitle="End-to-End. In-House. In Control."
        defaultSubtitle="6 integrated manufacturing divisions. From precision cutting to export-ready packaging — every step under one roof."
        breadcrumb={[{ label: "Infrastructure", href: "/infrastructure" }]}
      />

      <section className="py-12 bg-brand-light-gray border-b border-brand-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl overflow-x-auto">
          <div className="flex items-center gap-0 min-w-max mx-auto w-fit">
            {processSteps.map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="text-center px-4">
                  <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center text-xs font-bold mx-auto">{i + 1}</div>
                  <p className="mt-2 text-xs font-medium text-brand-slate">{step}</p>
                </div>
                {i < processSteps.length - 1 && <div className="w-8 h-px bg-brand-accent" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            overline="Our Divisions"
            title="Integrated at Every Stage"
            subtitle="From precision cutting to export-ready packaging — 6 specialised divisions operating under one roof, giving us complete control over quality, cost, and lead times."
            className="mb-16"
          />
          <div className="space-y-16">
            {divisions.map((div, i) => (
              <div key={div.number} id={div.name.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "").replace(/--+/g, "-").replace(/-$/,"")}
                className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <DivisionImageSlider divisionNumber={div.number} alt={div.name} />
                <div>
                  <span className="text-7xl font-black text-brand-navy/5 leading-none select-none block -mb-4">{div.number}</span>
                  <div className="text-brand-accent mb-3">{iconMap[div.icon ?? ""] ?? null}</div>
                  <ContentText contentKey={`division-${div.number}-name`}        fallback={div.name}        as="h2" className="text-2xl font-bold text-brand-navy" />
                  <div className="inline-block bg-brand-accent text-white text-xs font-semibold px-3 py-1 mt-2 mb-4">
                    <ContentText contentKey={`division-${div.number}-capacity`}   fallback={div.capacity}    as="span" />
                  </div>
                  <ContentText contentKey={`division-${div.number}-description`}  fallback={div.description} as="p" className="text-brand-slate leading-relaxed" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section bg-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader overline="Combined Capacity" title="Built for Scale" light className="mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="15M"    label="Pieces Cut/Year"     variant="dark" />
            <StatCard value="25K m"  label="Elastic/Day"         variant="dark" />
            <StatCard value="80K"    label="Garments Sewn/Day"   variant="dark" />
            <StatCard value="AQL 1.5" label="Quality Standard"   variant="dark" />
          </div>
          <div className="text-center mt-12">
            <CTAButton label="Request a Tour" href="/contact" variant="outline-light" size="lg" arrow />
          </div>
        </div>
      </section>
    </>
  )
}
