import type { ProductCategory } from "@/types"

export const productCategories: ProductCategory[] = [
  {
    id: "babies-wear",
    title: "Babies Wear",
    description:
      "Skin-safe, GOTS-certified organic cotton garments for newborns to 24 months. Oeko-Tex compliant dyes, snap closures, and gentle seam finishing.",
    image: "https://placehold.co/800x600/1a2e1a/ffffff?text=Babies+Wear",
    href: "/products/babies-wear",
    featured: true,
    badge: "GOTS Certified",
  },
  {
    id: "kids-wear",
    title: "Kids Wear",
    description:
      "Durable playwear and school clothing for ages 2–14. Reinforced stitching, bright colorfastness, and wash-tested prints that last.",
    image: "https://placehold.co/800x600/0D1B2A/C8A96E?text=Kids+Wear",
    href: "/products/kids-wear",
    featured: true,
    badge: "Disney Approved",
  },
  {
    id: "mens-wear",
    title: "Mens Wear",
    description:
      "T-shirts, polos, hoodies, and sweatshirts in ring-spun and combed cotton. Available in 150+ colors with full private label capability.",
    image: "https://placehold.co/800x600/2C2C2C/ffffff?text=Mens+Wear",
    href: "/products/mens-wear",
    badge: "Best Seller",
  },
  {
    id: "womens-wear",
    title: "Womens Wear & Nightwear",
    description:
      "Fashion tees, loungewear, and nightwear collections. Premium jersey, rib, and fleece constructions with embellishment capabilities.",
    image: "https://placehold.co/800x600/4A5568/ffffff?text=Womens+Wear",
    href: "/products/womens-wear",
  },
]
