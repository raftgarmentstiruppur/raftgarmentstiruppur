import type { NavItem } from "@/types"

export const navItems: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    megaMenu: [
      {
        heading: "Categories",
        links: [
          { label: "Kids Innerwear",   href: "/products/kids-innerwear" },
          { label: "Mens Innerwear",   href: "/products/mens-innerwear" },
          { label: "Womens Innerwear", href: "/products/womens-innerwear" },
          { label: "Outerwear",        href: "/products/outerwear" },
        ],
      },
      {
        heading: "Browse By",
        links: [
          { label: "New Arrivals",       href: "/products?filter=New+Arrival" },
          { label: "Best Sellers",       href: "/products?filter=Best+Seller" },
          { label: "Sustainable Styles", href: "/products?filter=Sustainable" },
          { label: "Private Label",      href: "/products?filter=Private+Label" },
        ],
      },
    ],
  },
  {
    label: "Infrastructure",
    href: "/infrastructure",
    megaMenu: [
      {
        heading: "Our Divisions",
        links: [
          { label: "Knitting",             href: "/infrastructure#knitting" },
          { label: "Fabric Inspection",    href: "/infrastructure#fabric-inspection" },
          { label: "Cutting",              href: "/infrastructure#cutting" },
          { label: "Elastic Weaving",      href: "/infrastructure#elastic-weaving" },
          { label: "Sewing",               href: "/infrastructure#sewing" },
          { label: "Finishing & Packaging",href: "/infrastructure#finishing-packaging" },
        ],
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    megaMenu: [
      {
        heading: "Company",
        links: [
          { label: "Our Story",        href: "/about#story" },
          { label: "Mission & Vision", href: "/about#mission" },
          { label: "Core Values",      href: "/about#values" },
          { label: "Leadership",       href: "/about#leadership" },
          { label: "Milestones",       href: "/about#milestones" },
        ],
      },
      {
        heading: "Commitments",
        links: [
          { label: "Sustainability",   href: "/sustainability" },
          { label: "Certifications",   href: "/certifications" },
        ],
      },
    ],
  },
  { label: "Resources", href: "/resources" },
  { label: "Contact",   href: "/contact" },
]
