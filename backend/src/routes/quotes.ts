import { Router, Response } from "express"
import { db } from "../lib/db"
import { quoteSchema, updateQuoteSchema } from "../lib/validations"
import { requireAuth, AuthRequest } from "../middleware/auth"
import { sendQuoteConfirmation, sendAdminQuoteNotification } from "../lib/email"

const router = Router()

router.post("/", async (req, res: Response) => {
  const parsed = quoteSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message })
    return
  }

  // Optional auth — logged-in users get userId attached
  let userId: string | null = null
  try {
    const token = req.cookies?.token
    if (token) {
      const jwt = await import("jsonwebtoken")
      const payload = jwt.default.verify(token, process.env.JWT_SECRET!) as { id: string }
      userId = payload.id
    }
  } catch { /* not logged in */ }

  try {
    const quote = await db.quoteRequest.create({
      data: { ...parsed.data, userId },
    })

    sendQuoteConfirmation(quote.email, quote.name, quote.id).catch(console.error)
    sendAdminQuoteNotification(quote.id, quote.company, quote.product).catch(console.error)

    res.status(201).json(quote)
  } catch {
    res.status(500).json({ error: "Failed to submit quote request." })
  }
})

router.get("/", requireAuth, async (req: AuthRequest, res: Response) => {
  const status = req.query.status as string | undefined

  const where =
    req.user!.role === "ADMIN"
      ? status ? { status: status as never } : {}
      : { userId: req.user!.id }

  const quotes = await db.quoteRequest.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, company: true } } },
  })

  res.json(quotes)
})

router.get("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  const quote = await db.quoteRequest.findUnique({
    where: { id: req.params.id },
    include: {
      user: { select: { id: true, name: true, company: true, email: true } },
      orders: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  })

  if (!quote) {
    res.status(404).json({ error: "Not found" })
    return
  }
  if (req.user!.role !== "ADMIN" && quote.userId !== req.user!.id) {
    res.status(403).json({ error: "Forbidden" })
    return
  }

  res.json(quote)
})

router.patch("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  if (req.user!.role !== "ADMIN") {
    res.status(403).json({ error: "Forbidden" })
    return
  }

  const parsed = updateQuoteSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message })
    return
  }

  const quote = await db.quoteRequest.update({
    where: { id: req.params.id },
    data: parsed.data,
  })

  res.json(quote)
})

export default router
