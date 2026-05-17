import HeroSection from "@/components/homepage/HeroSection"
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
    title: "Wholesale Direct",
    description:
      "Order in bulk, direct from manufacturer. No agents, no markups. MOQ from 500 units per style.",
    ctaLabel: "Get a Quote",
    ctaHref: "/contact",
  },
  {
    icon: "Tag",
    title: "Private Label",
    description:
      "Your brand on our world-class garments. Full service from tech pack to retail-ready packaging.",
    ctaLabel: "Learn More",
    ctaHref: "/about#private-label",
  },
  {
    icon: "Globe",
    title: "Global Distributors",
    description:
      "Authorized distributor programs with dedicated account management and preferential pricing.",
    ctaLabel: "Partner With Us",
    ctaHref: "/contact",
  },
  {
    icon: "BookOpen",
    title: "Catalog & Samples",
    description:
      "Download our 2025 product catalog or request physical fabric swatches and garment samples.",
    ctaLabel: "Request Samples",
    ctaHref: "/resources",
  },
]

export default function HomePage() {
  return (
    <>
      <HeroSection
        headline="Crafting Quality, Pioneering Sustainability, Shaping Fashion."
        subheadline="Taking India's finest knitwear to the world — 40+ years of premium innerwear and outerwear manufacturing from Tirupur."
        ctaPrimary={{ label: "Request a Sample", href: "/contact" }}
        ctaSecondary={{ label: "Browse Products", href: "/products" }}
        bgImage="https://placehold.co/1920x1080/000000/FFFFFF?text=RAFT+GARMENTS"
      />
      <ProductCategoryCards categories={productCategories} />
      <MarketingBanner
        eyebrow="2025 Collection"
        headline="Crafted at Scale. Finished to Perfection."
        description="Premium innerwear and outerwear — from intimate essentials to versatile casual styles. Cotton, bamboo, Tencel, recycled polyester, and more. Custom NOOS programs available."
        ctaLabel="Download Catalog"
        ctaHref="/resources"
      />
      <CertificationStrip certs={certifications} />
      <BrandNarrative
        eyebrow="40+ Years of Legacy"
        statement="Different by Design. Driven by Craft."
        body="For over four decades, Raft Garments has built its reputation on quality without compromise. From premium innerwear to versatile outerwear, every garment we produce — for brands across Europe, the USA, and India — carries the trust of 40+ years and the strength of 10+ global certifications."
        ctaLabel="Our Story"
        ctaHref="/about"
        stat1={{ value: "800", label: "Employees" }}
        stat2={{ value: "350", label: "Machines" }}
        stat3={{ value: "80K", label: "Garments Per Day" }}
      />
      <FourColumnCTA cards={fourColumnCards} heading="Create With Us" />
      <InfrastructureCards divisions={divisions} />
      <SustainabilityBanner
        headline={sustainabilityData.headline}
        stats={sustainabilityData.stats}
        ctaLabel="Our Green Journey"
        ctaHref="/sustainability"
      />
      <FAQAccordion faqs={faqs} />
      <ClientLogos clients={clients} heading="Trusted by Leading Global Brands" />
      <NewsletterSignup
        headline="Stay Ahead of the Trend"
        description="Get quarterly updates on new fabric developments, collection previews, and sustainability reports."
        placeholder="Enter your business email"
        buttonLabel="Subscribe"
      />
    </>
  )
}

