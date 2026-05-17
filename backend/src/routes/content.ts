import { Router, Request, Response } from "express"
import { db } from "../lib/db"
import { requireAdmin, AuthRequest } from "../middleware/auth"

const router = Router()

// Public — frontend fetches this to get image URLs
router.get("/", async (_req: Request, res: Response) => {
  const rows = await db.siteContent.findMany()
  const content: Record<string, string> = {}
  for (const row of rows) content[row.key] = row.value
  res.json(content)
})

// Admin only — upsert a key
router.patch("/:key", requireAdmin, async (req: AuthRequest, res: Response) => {
  const { value } = req.body
  if (!value || typeof value !== "string") {
    res.status(400).json({ error: "value is required" })
    return
  }
  const row = await db.siteContent.upsert({
    where: { key: req.params.key },
    update: { value },
    create: { key: req.params.key, value },
  })
  res.json(row)
})

export default router
