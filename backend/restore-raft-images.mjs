// Restore Raft product cards (mens/womens/outerwear) from the real RAFT-branded
// Cloudinary images in "Raft Garments/products/<category>". Kids-innerwear is left
// as a placeholder (its folder contains pubj images). Idempotent: upsert by slug.
import { PrismaClient } from "@prisma/client"
import fs from "fs"

const env = fs.readFileSync(new URL("./.env", import.meta.url), "utf8")
const pick = (k) => env.match(new RegExp(k + '\\s*=\\s*"?([^"\\n]+)"?'))[1]
process.env.DATABASE_URL = pick("DATABASE_URL")
const KEY = pick("CLOUDINARY_API_KEY"), SECRET = pick("CLOUDINARY_API_SECRET")
const CLOUD = "dxysirrz7"
const auth = "Basic " + Buffer.from(`${KEY}:${SECRET}`).toString("base64")

const prisma = new PrismaClient()

const folderImages = async (cat) => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD}/resources/image?type=upload&prefix=${encodeURIComponent("Raft Garments/products/" + cat)}&max_results=100`
  const d = await (await fetch(url, { headers: { Authorization: auth } })).json()
  return d.resources.map((r) => r.secure_url)
}

// Exclude the one generic unbranded grey panty from womens
const EXCLUDE = ["aaordzmkiz7jbjagminw"]
const clean = (urls) => urls.filter((u) => !EXCLUDE.some((x) => u.includes(x)))

const defs = [
  { category: "mens-innerwear", slug: "mens-innerwear", name: "Men's Innerwear",
    description: "Premium innerwear in combed cotton and modal blends. Soft-touch waistband, 150+ colors, private label and branded waistband available.",
    fabric: "Combed cotton, modal, bamboo blend", sizes: "S, M, L, XL, 2XL, 3XL, 4XL", badge: "Best Seller" },
  { category: "womens-innerwear", slug: "womens-innerwear", name: "Women's Innerwear",
    description: "Comfortable everyday innerwear in cotton, modal, and microfibre. Lace trim capability, full embellishment, and premium nightwear range.",
    fabric: "Cotton, modal, microfibre, lace trim", sizes: "XS, S, M, L, XL, 2XL, 3XL", badge: "New Arrival" },
  { category: "outerwear", slug: "outerwear", name: "Outerwear",
    description: "Versatile casual outerwear in cotton, French Terry, and fleece blends. Screen print, digital print, and embroidery capability. Private label ready.",
    fabric: "Cotton, cotton-polyester blend, French Terry, fleece, bamboo blend", sizes: "XS, S, M, L, XL, 2XL, 3XL, 4XL", badge: "Private Label" },
]

const main = async () => {
  console.log("Before — active products:", await prisma.product.count({ where: { active: true } }))
  for (const d of defs) {
    const images = clean(await folderImages(d.category))
    const data = {
      category: d.category, slug: d.slug, name: d.name, description: d.description,
      fabric: d.fabric, sizes: d.sizes, badge: d.badge,
      certifications: "Oeko-Tex Standard 100, WRAP", moq: "500 units / style / colour",
      leadTime: "45–60 days (sample 10 days)", images, sortOrder: 0, active: true,
    }
    await prisma.product.upsert({ where: { slug: d.slug }, update: data, create: data })
    console.log(`  ${d.slug}: ${images.length} images`)
  }
  console.log("After — active products:", await prisma.product.count({ where: { active: true } }))
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
