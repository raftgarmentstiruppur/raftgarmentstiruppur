// One-time restore of Raft Garments product catalog using real Cloudinary images.
// Idempotent: upserts by slug. Run: node restore-products.mjs
import { PrismaClient } from "@prisma/client"
import fs from "fs"

// Load DATABASE_URL from backend/.env (Prisma client does not auto-load .env at runtime)
const env = fs.readFileSync(new URL("./.env", import.meta.url), "utf8")
process.env.DATABASE_URL = env.match(/DATABASE_URL\s*=\s*"?([^"\n]+)"?/)[1]

const prisma = new PrismaClient()

const lines = fs.readFileSync(new URL("./rg_imgs.txt", import.meta.url), "utf8").split("\n").map((l) => l.trim()).filter(Boolean)
const cat = (c) => lines.filter((l) => l.includes(`/products/${c}/`))
const kids = cat("kids-innerwear"), mens = cat("mens-innerwear"), wom = cat("womens-innerwear"), out = cat("outerwear")

const CERT_INNER = "Oeko-Tex Standard 100, WRAP"
const CERT_KIDS = "Oeko-Tex Standard 100, GOTS, WRAP"
const CERT_OUT = "Oeko-Tex, GOTS (organic range), WRAP"
const MOQ = "500 units / style / colour"
const LEAD = "45–60 days (sample 10 days)"

const products = [
  { category: "mens-innerwear", slug: "mens-briefs", name: "Men's Briefs", description: "Classic combed-cotton briefs with covered elastic waistband and full-coverage support. 150+ colours, private-label ready.", fabric: "Combed cotton & modal blends", sizes: "S–XXL", badge: "Best Seller", closures: "Covered elastic waistband", certifications: CERT_INNER, moq: MOQ, leadTime: LEAD, images: mens.slice(0, 4), sortOrder: 0 },
  { category: "mens-innerwear", slug: "mens-boxer-briefs", name: "Men's Boxer Briefs", description: "Body-mapped boxer briefs in soft modal-cotton with flat-lock seams for chafe-free comfort.", fabric: "Combed cotton & modal blends", sizes: "S–XXL", closures: "Elasticated waistband", certifications: CERT_INNER, moq: MOQ, leadTime: LEAD, images: mens.slice(4, 7), sortOrder: 1 },
  { category: "mens-innerwear", slug: "mens-trunks", name: "Men's Trunks", description: "Shorter-leg trunks with a contoured pouch and stay-put waistband. Combed cotton for breathable all-day wear.", fabric: "Combed cotton & modal blends", sizes: "S–XXL", closures: "Branded jacquard waistband", certifications: CERT_INNER, moq: MOQ, leadTime: LEAD, images: mens.slice(7, 10), sortOrder: 2 },
  { category: "mens-innerwear", slug: "mens-vests", name: "Men's Vests", description: "Ribbed and plain combed-cotton vests with reinforced shoulders. Round and V-neck options.", fabric: "Combed cotton", sizes: "S–XXL", certifications: CERT_INNER, moq: MOQ, leadTime: LEAD, images: mens.slice(10, 13), sortOrder: 3 },

  { category: "womens-innerwear", slug: "womens-bras", name: "Women's Bras", description: "Wirefree and lightly-lined bras in cotton-modal and microfibre with soft elastic bands.", fabric: "Cotton, modal & microfibre", sizes: "30B–42D", badge: "New", closures: "Hook-and-eye closure", certifications: CERT_INNER, moq: MOQ, leadTime: LEAD, images: wom.slice(0, 2), sortOrder: 0 },
  { category: "womens-innerwear", slug: "womens-panties", name: "Women's Panties", description: "Full-coverage and hipster panties with flat-lock seams and covered elastic for everyday comfort.", fabric: "Cotton, modal & microfibre", sizes: "S–XXL", closures: "Covered elastic", certifications: CERT_INNER, moq: MOQ, leadTime: LEAD, images: wom.slice(2, 4), sortOrder: 1 },
  { category: "womens-innerwear", slug: "womens-camisoles", name: "Women's Camisoles", description: "Stretch cotton-modal camisoles with adjustable straps — layer-ready essentials.", fabric: "Cotton & modal", sizes: "S–XXL", closures: "Adjustable straps", certifications: CERT_INNER, moq: MOQ, leadTime: LEAD, images: wom.slice(4, 6), sortOrder: 2 },
  { category: "womens-innerwear", slug: "womens-thermal-sets", name: "Women's Thermal Sets", description: "Brushed-inside thermal tops and bottoms for cold-weather warmth without bulk.", fabric: "Brushed cotton blend", sizes: "S–XXL", certifications: CERT_INNER, moq: MOQ, leadTime: LEAD, images: wom.slice(6, 8), sortOrder: 3 },

  { category: "kids-innerwear", slug: "kids-briefs-vests", name: "Kids' Briefs & Vests", description: "Soft, skin-safe combed-cotton briefs and vests for ages 2-14. Tagless and flat-seam finished.", fabric: "Combed cotton", sizes: "2-14 years", badge: "Oeko-Tex Certified", ageRange: "2–14 years", certifications: CERT_KIDS, moq: MOQ, leadTime: LEAD, images: kids.slice(0, 7), sortOrder: 0 },
  { category: "kids-innerwear", slug: "kids-thermal-sets", name: "Kids' Thermal Sets", description: "Warm brushed-cotton thermal sets sized for children, with soft non-pinch waistbands.", fabric: "Brushed cotton", sizes: "2-14 years", ageRange: "2–14 years", closures: "Soft non-pinch waistband", certifications: CERT_KIDS, moq: MOQ, leadTime: LEAD, images: kids.slice(7, 14), sortOrder: 1 },
  { category: "kids-innerwear", slug: "kids-loungewear", name: "Kids' Loungewear", description: "Cosy loungewear and sleep sets in breathable cotton, built for play and rest.", fabric: "Combed cotton", sizes: "2-14 years", ageRange: "2–14 years", certifications: CERT_KIDS, moq: MOQ, leadTime: LEAD, images: kids.slice(14, 21), sortOrder: 2 },

  { category: "outerwear", slug: "outerwear-tshirts", name: "T-Shirts", description: "Ring-spun cotton tees in 140-220 GSM. Crew and V-neck, 150+ colours, full print capability.", fabric: "Ring-spun combed cotton", sizes: "XS–4XL", badge: "Private Label", certifications: CERT_OUT, moq: MOQ, leadTime: LEAD, images: out.slice(0, 1), sortOrder: 0 },
  { category: "outerwear", slug: "outerwear-hoodies", name: "Hoodies & Sweatshirts", description: "French-terry and fleece hoodies up to 320 GSM with brushed-back warmth. Private-label ready.", fabric: "French Terry & fleece blends", sizes: "XS–4XL", certifications: CERT_OUT, moq: MOQ, leadTime: LEAD, images: out.slice(1, 2), sortOrder: 1 },
]

const main = async () => {
  console.log("Before — active products:", await prisma.product.count({ where: { active: true } }))
  for (const p of products) {
    await prisma.product.upsert({ where: { slug: p.slug }, update: { ...p, active: true }, create: { ...p, active: true } })
    console.log(`  upserted ${p.slug} (${p.images.length} imgs)`)
  }
  console.log("After — active products:", await prisma.product.count({ where: { active: true } }))
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
