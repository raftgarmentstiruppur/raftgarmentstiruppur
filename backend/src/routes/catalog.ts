import { Router, Request, Response } from "express"
import { db } from "../lib/db"
import { requireAdmin, AuthRequest } from "../middleware/auth"

const router = Router()

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = base
  let n = 1
  while (true) {
    const existing = await db.product.findUnique({ where: { slug } })
    if (!existing || existing.id === excludeId) return slug
    slug = `${base}-${n++}`
  }
}

const SPEC_FIELDS = [
  "ageRange","dyes","closures","seams","prints","embellishments",
  "weights","colors","printMethods","finishes","certifications","moq","leadTime",
] as const

router.get("/", async (req: Request, res: Response) => {
  const category = req.query.category as string | undefined
  const products = await db.product.findMany({
    where: { ...(category ? { category } : {}), active: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  })
  res.json(products)
})

router.get("/:slug", async (req: Request, res: Response) => {
  const product = await db.product.findUnique({ where: { slug: req.params.slug } })
  if (!product || !product.active) { res.status(404).json({ error: "Not found" }); return }
  res.json(product)
})

router.post("/", requireAdmin, async (req: AuthRequest, res: Response) => {
  const { category, subcategory, name, description, fabric, sizes, priceRange, badge, images, sortOrder, ...rest } = req.body
  if (!category || !name) { res.status(400).json({ error: "category and name are required" }); return }
  const slug = await uniqueSlug(slugify(name))
  const extraSpecs: Record<string, string | null> = {}
  for (const f of SPEC_FIELDS) extraSpecs[f] = rest[f] ?? null
  const product = await db.product.create({
    data: {
      category, name, slug,
      subcategory:   subcategory ?? null,
      description:   description ?? null,
      fabric:        fabric      ?? null,
      sizes:         sizes       ?? null,
      priceRange:    priceRange  ?? null,
      badge:         badge       ?? null,
      images:        Array.isArray(images) ? images : [],
      sortOrder:     sortOrder ?? 0,
      ...extraSpecs,
    },
  })
  res.status(201).json(product)
})

router.patch("/:id", requireAdmin, async (req: AuthRequest, res: Response) => {
  const { name, subcategory, description, fabric, sizes, priceRange, badge, images, sortOrder, active, ...rest } = req.body
  const data: Record<string, unknown> = {}
  if (name        !== undefined) { data.name = name; data.slug = await uniqueSlug(slugify(name), req.params.id) }
  if (subcategory !== undefined) data.subcategory = subcategory
  if (description !== undefined) data.description = description
  if (fabric      !== undefined) data.fabric      = fabric
  if (sizes       !== undefined) data.sizes       = sizes
  if (priceRange  !== undefined) data.priceRange  = priceRange
  if (badge       !== undefined) data.badge       = badge
  if (images      !== undefined) data.images      = Array.isArray(images) ? images : []
  if (sortOrder   !== undefined) data.sortOrder   = sortOrder
  if (active      !== undefined) data.active      = active
  for (const f of SPEC_FIELDS) if (rest[f] !== undefined) data[f] = rest[f]
  const product = await db.product.update({ where: { id: req.params.id }, data })
  res.json(product)
})

router.delete("/:id", requireAdmin, async (req: AuthRequest, res: Response) => {
  await db.product.delete({ where: { id: req.params.id } })
  res.json({ ok: true })
})

export default router
