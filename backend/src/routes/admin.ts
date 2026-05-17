import { Router, Response } from "express"
import { db } from "../lib/db"
import { requireAdmin, AuthRequest } from "../middleware/auth"

const router = Router()

router.get("/stats", requireAdmin, async (_req: AuthRequest, res: Response) => {
  const [totalQuotes, pendingQuotes, activeOrders, totalBuyers] = await Promise.all([
    db.quoteRequest.count(),
    db.quoteRequest.count({ where: { status: "PENDING" } }),
    db.order.count({ where: { status: { notIn: ["DELIVERED", "CANCELLED"] } } }),
    db.user.count({ where: { role: "BUYER" } }),
  ])
  res.json({ totalQuotes, pendingQuotes, activeOrders, totalBuyers })
})

router.get("/users", requireAdmin, async (_req: AuthRequest, res: Response) => {
  const buyers = await db.user.findMany({
    where: { role: "BUYER" },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { quotes: true, orders: true } } },
  })
  res.json(buyers)
})

export default router
