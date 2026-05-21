import type { NavItem } from "@/types"

export const navItems: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    megaMenu: [
      {
        heading: "Categories",
        links: [
          { label: "Kids' Innerwear",   href: "/products/kids-innerwear" },
          { label: "Men's Innerwear",   href: "/products/mens-innerwear" },
          { label: "Women's Innerwear", href: "/products/womens-innerwear" },
          { label: "Outerwear",        href: "/products/outerwear" },
        ],
      },
      {
        heading: "Browse by",
        links: [
          { label: "New arrivals",       href: "/products?filter=New+Arrival" },
          { label: "Best sellers",       href: "/products?filter=Best+Seller" },
          { label: "Sustainable styles", href: "/products?filter=Sustainable" },
          { label: "Private label",      href: "/products?filter=Private+Label" },
        ],
      },
    ],
  },
  {
    label: "Infrastructure",
    href: "/infrastructure",
    megaMenu: [
      {
        heading: "Our divisions",
        links: [
          { label: "Knitting",             href: "/infrastructure#knitting" },
          { label: "Fabric Inspection",    href: "/infrastructure#fabric-inspection" },
          { label: "Cutting",              href: "/infrastructure#cutting" },
          { label: "Elastic Weaving",      href: "/infrastructure#elastic-weaving" },
          { label: "Sewing",               href: "/infrastructure#sewing" },
          { label: "Finishing & packing",  href: "/infrastructure#finishing-packing" },
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
          { label: "Our story",        href: "/about#story" },
          { label: "Mission & vision", href: "/about#mission" },
          { label: "Core values",      href: "/about#values" },
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
  { label: "Sustainability",  href: "/sustainability" },
  { label: "Certifications", href: "/certifications" },
  { label: "Resources",      href: "/resources" },
  { label: "Contact",        href: "/contact" },
]
