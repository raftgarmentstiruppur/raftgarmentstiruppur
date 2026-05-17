import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import StatCard from "@/components/shared/StatCard"
import CTAButton from "@/components/shared/CTAButton"
import AnimateIn from "@/components/shared/AnimateIn"
import { divisions } from "@/data/infrastructure"
import {
  Layers, Grid3x3, Droplets, Scissors, Printer, Star, Workflow, CheckCircle, Package
} from "lucide-react"

export const metadata: Metadata = {
  title: "Infrastructure",
  description: "9 integrated manufacturing divisions under one roof — from spinning to packaging. 18 facilities in Tirupur, India.",
}

const iconMap: Record<string, React.ReactNode> = {
  Layers:      <Layers className="w-8 h-8" />,
  Grid3x3:     <Grid3x3 className="w-8 h-8" />,
  Droplets:    <Droplets className="w-8 h-8" />,
  Scissors:    <Scissors className="w-8 h-8" />,
  Printer:     <Printer className="w-8 h-8" />,
  Star:        <Star className="w-8 h-8" />,
  Workflow:    <Workflow className="w-8 h-8" />,
  CheckCircle: <CheckCircle className="w-8 h-8" />,
  Package:     <Package className="w-8 h-8" />,
}

const processSteps = ["Fiber", "Spinning", "Knitting", "Dyeing", "Cutting", "Sewing", "Printing", "Finishing", "Shipping"]

export default function InfrastructurePage() {
  return (
    <>
      <PageHero
        title="End-to-End. In-House. In Control."
        subtitle="9 integrated manufacturing divisions. 18 facilities. Every step from raw fiber to export-ready garment — under one roof."
        breadcrumb={[{ label: "Infrastructure", href: "/infrastructure" }]}
      />

      {/* Process flow */}
      <section className="py-12 bg-brand-light-gray border-b border-brand-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl overflow-x-auto">
          <div className="flex items-center gap-0 min-w-max mx-auto w-fit">
            {processSteps.map((step, i) => (
              <AnimateIn key={step} delay={i * 0.07} direction="none">
                <div className="flex items-center">
                  <div className="text-center px-4">
                    <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center text-xs font-bold mx-auto">
                      {i + 1}
                    </div>
                    <p className="mt-2 text-xs font-medium text-brand-slate">{step}</p>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-8 h-px bg-brand-accent" />
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Division detail sections */}
      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <AnimateIn>
            <SectionHeader
              overline="Our Divisions"
              title="Integrated at Every Stage"
              subtitle="Full vertical integration means we control quality, cost, and lead times across all 9 divisions."
              className="mb-16"
            />
          </AnimateIn>
          <div className="space-y-16">
            {divisions.map((div, i) => (
              <AnimateIn key={div.number} delay={0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div
                  id={div.name.toLowerCase()}
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Placeholder image */}
                  <div className="aspect-[4/3] bg-brand-light-gray flex items-center justify-center border border-brand-border overflow-hidden group hover:border-brand-accent transition-colors duration-300">
                    <div className="text-center transition-transform duration-300 group-hover:scale-110">
                      <div className="text-brand-accent mx-auto w-fit">
                        {iconMap[div.icon ?? ""] ?? null}
                      </div>
                      <p className="mt-3 text-sm text-brand-ash">{div.name} facility photo</p>
                    </div>
                  </div>
                  {/* Content */}
                  <div>
                    <span className="text-7xl font-black text-brand-navy/5 leading-none select-none block -mb-4">
                      {div.number}
                    </span>
                    <div className="text-brand-accent mb-3">{iconMap[div.icon ?? ""] ?? null}</div>
                    <h2 className="text-2xl font-bold text-brand-navy">{div.name}</h2>
                    <div className="inline-block bg-brand-accent text-white text-xs font-semibold px-3 py-1 mt-2 mb-4 animate-pulse">
                      {div.capacity}
                    </div>
                    <p className="text-brand-slate leading-relaxed">{div.description}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Capacity summary */}
      <section className="py-section bg-brand-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <AnimateIn>
            <SectionHeader
              overline="Combined Capacity"
              title="Built for Scale"
              light
              className="mb-12"
            />
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "60+", label: "Tons Yarn/Day", accent: "border-t-2 border-t-brand-accent/40" },
              { value: "50+", label: "Tons Fabric Dyed/Day", accent: "border-t-2 border-t-brand-accent/60" },
              { value: "4M+", label: "Units Cut/Month", accent: "border-t-2 border-t-brand-accent/80" },
              { value: "100K", label: "Garments Sewn/Day", accent: "border-t-2 border-t-brand-accent" },
            ].map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 0.1}>
                <StatCard value={stat.value} label={stat.label} variant="dark" className={stat.accent} animate />
              </AnimateIn>
            ))}
          </div>
          <AnimateIn delay={0.4}>
            <div className="text-center mt-12">
              <CTAButton label="Request a Tour" href="/contact" variant="outline-light" size="lg" arrow />
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  )
}
