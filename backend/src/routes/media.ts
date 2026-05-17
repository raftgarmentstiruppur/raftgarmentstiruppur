import { Router, Response } from "express"
import cloudinary from "../lib/cloudinary"
import { requireAdmin, AuthRequest } from "../middleware/auth"

const router = Router()

router.get("/", requireAdmin, async (req: AuthRequest, res: Response) => {
  const folder = (req.query.folder as string) ?? "Raft-Garments"
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      max_results: 100,
      resource_type: "image",
    })
    res.json(result.resources)
  } catch {
    res.json([])
  }
})

router.delete("/", requireAdmin, async (req: AuthRequest, res: Response) => {
  const publicId = req.query.public_id as string
  if (!publicId) {
    res.status(400).json({ error: "public_id required" })
    return
  }
  try {
    await cloudinary.uploader.destroy(publicId)
    res.json({ deleted: publicId })
  } catch {
    res.status(500).json({ error: "Delete failed" })
  }
})

export default router
