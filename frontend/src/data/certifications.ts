import type { Certification } from "@/types"

export const certifications: Certification[] = [
  {
    id: "iso9001",
    name: "ISO 9001:2015",
    category: "Quality",
    description: "Quality Management System — consistent product standards and customer satisfaction across all processes.",
  },
  {
    id: "wrap",
    name: "WRAP",
    category: "Social",
    description: "Worldwide Responsible Accredited Production — ethical manufacturing, fair wages, and safe working conditions.",
  },
  {
    id: "sedex",
    name: "SMETA / Sedex",
    category: "Social",
    description: "Supplier Ethical Data Exchange — independently audited ethical trade standards covering labor, health, and safety.",
  },
  {
    id: "bci",
    name: "BCI",
    category: "Sustainability",
    description: "Better Cotton Initiative — responsibly grown cotton that protects farmers, communities, and the environment.",
  },
  {
    id: "grs",
    name: "Global Recycled Standard",
    category: "Recycled",
    description: "Verified recycled content with responsible social, environmental, and chemical practices throughout the supply chain.",
  },
  {
    id: "higg",
    name: "Higg Index",
    category: "Sustainability",
    description: "Sustainable Apparel Coalition tool measuring and improving environmental and social sustainability performance.",
  },
  {
    id: "oekotex",
    name: "Oeko-Tex Standard 100",
    category: "Safety",
    description: "Every component tested for harmful substances — safe for skin contact at every age, including infants.",
  },
  {
    id: "disney",
    name: "Walt Disney Approved",
    category: "Brand Compliance",
    description: "Approved licensed manufacturer meeting Disney's rigorous standards for social compliance and product quality.",
  },
  {
    id: "walmart",
    name: "Walmart Approved",
    category: "Brand Compliance",
    description: "Approved supplier meeting Walmart's standards for quality, ethics, and responsible sourcing.",
  },
  {
    id: "ctpat",
    name: "CTPAT",
    category: "Security",
    description: "Customs-Trade Partnership Against Terrorism — certified secure supply chain from manufacture to export.",
  },
]
