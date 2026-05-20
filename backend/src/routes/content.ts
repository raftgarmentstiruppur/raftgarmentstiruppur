import { Router, Request, Response } from "express"
import { db } from "../lib/db"
import { requireAdmin, AuthRequest } from "../middleware/auth"

const router = Router()

// Public — frontend fetches all content to get image URLs etc.
router.get("/", async (_req: Request, res: Response) => {
  const rows = await db.siteContent.findMany()
  const content: Record<string, string> = {}
  for (const row of rows) content[row.key] = row.value
  res.json(content)
})

// Admin — upsert a key/value
router.patch("/:key", requireAdmin, async (req: AuthRequest, res: Response) => {
  const { value } = req.body
  if (typeof value !== "string") {
    res.status(400).json({ error: "value must be a string" })
    return
  }
  const row = await db.siteContent.upsert({
    where:  { key: req.params.key },
    update: { value },
    create: { key: req.params.key, value },
  })
  res.json(row)
})

// Admin — delete a key (removes the image record entirely)
router.delete("/:key", requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await db.siteContent.delete({ where: { key: req.params.key } })
    res.json({ deleted: req.params.key })
  } catch (err: any) {
    // P2025 = record not found — treat as already deleted (success)
    if (err?.code === "P2025") {
      res.json({ deleted: req.params.key })
      return
    }
    console.error("[content DELETE]", err)
    res.status(500).json({ error: "Failed to delete content key" })
  }
})

export default router
