import type { NavItem } from "@/types"

export const navItems: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    megaMenu: [
      {
        heading: "Categories",
        links: [
          { label: "Babies Wear", href: "/products/babies-wear" },
          { label: "Kids Wear", href: "/products/kids-wear" },
          { label: "Mens Wear", href: "/products/mens-wear" },
          { label: "Womens Wear & Nightwear", href: "/products/womens-wear" },
        ],
      },
      {
        heading: "Browse By",
        links: [
          { label: "New Arrivals", href: "/products?filter=new" },
          { label: "Best Sellers", href: "/products?filter=bestsellers" },
          { label: "Sustainable Styles", href: "/products?filter=sustainable" },
          { label: "Private Label", href: "/products?filter=private-label" },
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
          { label: "Spinning", href: "/infrastructure#spinning" },
          { label: "Knitting", href: "/infrastructure#knitting" },
          { label: "Dyeing", href: "/infrastructure#dyeing" },
          { label: "Cutting", href: "/infrastructure#cutting" },
          { label: "Printing", href: "/infrastructure#printing" },
          { label: "Embroidery", href: "/infrastructure#embroidery" },
          { label: "Sewing", href: "/infrastructure#sewing" },
          { label: "Finishing", href: "/infrastructure#finishing" },
          { label: "Packaging", href: "/infrastructure#packaging" },
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
          { label: "Our Story", href: "/about#story" },
          { label: "Leadership", href: "/about#leadership" },
          { label: "Milestones", href: "/about#milestones" },
          { label: "Awards", href: "/about#awards" },
        ],
      },
      {
        heading: "Commitments",
        links: [
          { label: "Sustainability", href: "/sustainability" },
          { label: "Certifications", href: "/certifications" },
        ],
      },
    ],
  },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
]
