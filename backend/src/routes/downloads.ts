import { Router, Response } from "express"
import { db } from "../lib/db"
import { requireAuth, AuthRequest } from "../middleware/auth"

const router = Router()

router.post("/", async (req, res: Response) => {
  const { name, email, company, phone, document } = req.body
  if (!name || !email || !company || !document) {
    res.status(400).json({ error: "Name, email, company, and document are required." })
    return
  }
  try {
    const record = await db.downloadRequest.create({
      data: { name, email, company, phone: phone || null, document },
    })
    res.status(201).json(record)
  } catch {
    res.status(500).json({ error: "Failed to save download request." })
  }
})

router.get("/", requireAuth, async (req: AuthRequest, res: Response) => {
  if (req.user!.role !== "ADMIN") { res.status(403).json({ error: "Forbidden" }); return }
  const records = await db.downloadRequest.findMany({ orderBy: { createdAt: "desc" } })
  res.json(records)
})

router.patch("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  if (req.user!.role !== "ADMIN") { res.status(403).json({ error: "Forbidden" }); return }
  const { name, email, company, phone, document } = req.body
  try {
    const record = await db.downloadRequest.update({
      where: { id: req.params.id },
      data: { name, email, company, phone: phone || null, document },
    })
    res.json(record)
  } catch {
    res.status(500).json({ error: "Failed to update record." })
  }
})

router.delete("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  if (req.user!.role !== "ADMIN") { res.status(403).json({ error: "Forbidden" }); return }
  try {
    await db.downloadRequest.delete({ where: { id: req.params.id } })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: "Failed to delete record." })
  }
})

export default router
