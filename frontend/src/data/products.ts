import type { ProductCategory } from "@/types"

export const productCategories: ProductCategory[] = [
  {
    id: "kids-innerwear",
    title: "Kids Innerwear",
    description:
      "Soft, skin-safe innerwear for children aged 2–14. Combed cotton briefs, vests, thermal sets, and loungewear built for all-day comfort.",
    image: "https://placehold.co/800x600/1a2e1a/ffffff?text=Kids+Innerwear",
    href: "/products/kids-innerwear",
    featured: true,
    badge: "Oeko-Tex Certified",
  },
  {
    id: "mens-innerwear",
    title: "Mens Innerwear",
    description:
      "Briefs, boxers, trunks, vests, and thermal sets in combed cotton and modal blends. 150+ colors, private label ready.",
    image: "https://placehold.co/800x600/0D1B2A/C8A96E?text=Mens+Innerwear",
    href: "/products/mens-innerwear",
    featured: true,
    badge: "Best Seller",
  },
  {
    id: "womens-innerwear",
    title: "Womens Innerwear",
    description:
      "Bras, panties, camisoles, thermal sets, and nightwear in cotton, modal, and microfibre. Lace trim and full embellishment capability.",
    image: "https://placehold.co/800x600/4A5568/ffffff?text=Womens+Innerwear",
    href: "/products/womens-innerwear",
  },
  {
    id: "outerwear",
    title: "Outerwear",
    description:
      "Versatile casual outerwear — T-shirts, polo shirts, sweatshirts, hoodies, track pants, and shorts in cotton, French Terry, and fleece blends. Private label ready.",
    image: "https://placehold.co/800x600/2D4A3E/ffffff?text=Outerwear",
    href: "/products/outerwear",
  },
]
