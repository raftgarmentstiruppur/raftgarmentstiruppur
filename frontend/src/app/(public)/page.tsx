import HeroSection from "@/components/homepage/HeroSection"
import AnimatedImageStrip from "@/components/homepage/AnimatedImageStrip"
import ProductCategoryCards from "@/components/homepage/ProductCategoryCards"
import MarketingBanner from "@/components/homepage/MarketingBanner"
import CertificationStrip from "@/components/homepage/CertificationStrip"
import BrandNarrative from "@/components/homepage/BrandNarrative"
import FourColumnCTA from "@/components/homepage/FourColumnCTA"
import InfrastructureCards from "@/components/homepage/InfrastructureCards"
import SustainabilityBanner from "@/components/homepage/SustainabilityBanner"
import FAQAccordion from "@/components/homepage/FAQAccordion"
import ClientLogos from "@/components/homepage/ClientLogos"
import NewsletterSignup from "@/components/homepage/NewsletterSignup"
import { productCategories } from "@/data/products"
import { divisions } from "@/data/infrastructure"
import { faqs } from "@/data/faq"
import { clients } from "@/data/clients"
import { certifications } from "@/data/certifications"
import { sustainabilityData } from "@/data/sustainability"
import type { CTACard } from "@/types"

const fourColumnCards: CTACard[] = [
  {
    icon: "Package",
    title: "Wholesale direct",
    description: "Order in bulk, direct from manufacturer. No agents, no markups. MOQ from 500 units per style.",
    ctaLabel: "Get a quote",
    ctaHref: "/contact",
  },
  {
    icon: "Tag",
    title: "Private label",
    description: "Your brand on our world-class garments. Full service from tech pack to retail-ready packaging.",
    ctaLabel: "Learn more",
    ctaHref: "/about#private-label",
  },
  {
    icon: "Globe",
    title: "Global distributors",
    description: "Authorized distributor programs with dedicated account management and preferential pricing.",
    ctaLabel: "Partner with us",
    ctaHref: "/contact",
  },
  {
    icon: "BookOpen",
    title: "Catalog & samples",
    description: "Download our 2025 product catalog or request physical fabric swatches and garment samples.",
    ctaLabel: "Request samples",
    ctaHref: "/resources",
  },
]

export default function HomePage() {
  return (
    <>
      {/* 1 — Full-screen video hero */}
      <HeroSection
        headline="Built for better comfort"
        subheadline="India's finest knitwear — crafted for the world."
        ctaPrimary={{ label: "Request a Sample", href: "/contact" }}
        ctaSecondary={{ label: "Browse products", href: "/products" }}
        bgImage=""
      />

      {/* 2 — 2×2 portrait category grid */}
      <ProductCategoryCards categories={productCategories} />

      {/* 3 — Animated scrolling image strip */}
      <AnimatedImageStrip />

      {/* 4 — Full-bleed editorial banner */}
      <MarketingBanner
        eyebrow="2025 Collection"
        headline="Crafted at scale. Finished to perfection."
        description="Premium innerwear and outerwear — cotton, bamboo, Tencel, recycled polyester, and more. Custom NOOS programs available."
        ctaLabel="Download catalog"
        ctaHref="/resources"
      />

      {/* 5 — Certification marquee strip */}
      <CertificationStrip certs={certifications} />

      {/* 6 — Split image + brand story */}
      <BrandNarrative
        eyebrow="50+ years of legacy"
        statement="Different by design. Driven by craft."
        body="For over five decades, Raft Garments has built its reputation on quality without compromise. Every garment carries the trust of 50+ years and the strength of 10+ global certifications."
        ctaLabel="Our story"
        ctaHref="/about"
        stat1={{ value: "Expert",    label: "Skilled Workforce" }}
        stat2={{ value: "Precision", label: "Advanced Machinery" }}
        stat3={{ value: "Scale",     label: "Daily Production" }}
        stat4={{ value: "10+",       label: "Global Certifications" }}
      />

      {/* 7 — Partnership CTA grid */}
      <FourColumnCTA cards={fourColumnCards} heading="Create with us" />

      {/* 8 — Infrastructure division cards */}
      <InfrastructureCards divisions={divisions} />

      {/* 9 — Sustainability */}
      <SustainabilityBanner
        headline={sustainabilityData.headline}
        stats={sustainabilityData.stats}
        ctaLabel="Our green journey"
        ctaHref="/sustainability"
      />

      {/* 10 — FAQ */}
      <FAQAccordion faqs={faqs} />

      {/* 11 — Client logos */}
      <ClientLogos clients={clients} heading="Trusted by leading global brands" />

      {/* 12 — Newsletter */}
      <NewsletterSignup
        headline="Stay ahead of the trend"
        description="Get quarterly updates on new fabric developments, collection previews, and sustainability reports."
        placeholder="Enter your business email"
        buttonLabel="Subscribe"
      />
    </>
  )
}
