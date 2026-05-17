import { Router, Response } from "express"
import { db } from "../lib/db"
import { createOrderSchema, updateOrderSchema } from "../lib/validations"
import { requireAuth, AuthRequest } from "../middleware/auth"
import { sendOrderConfirmation } from "../lib/email"

const router = Router()

async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const count = await db.order.count({
    where: { orderNumber: { startsWith: `DG-${year}-` } },
  })
  return `DG-${year}-${String(count + 1).padStart(4, "0")}`
}

router.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
  if (req.user!.role !== "ADMIN") {
    res.status(403).json({ error: "Forbidden" })
    return
  }

  const parsed = createOrderSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message })
    return
  }

  try {
    const { userId, quoteId, product, quantity, unitPrice, notes, estimatedDelivery } =
      parsed.data

    const orderNumber = await generateOrderNumber()
    const totalAmount = unitPrice ? unitPrice * quantity : undefined

    const order = await db.order.create({
      data: {
        orderNumber,
        userId,
        quoteId: quoteId ?? null,
        product,
        quantity,
        unitPrice,
        totalAmount,
        notes,
        estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : null,
        statusHistory: {
          create: { status: "CONFIRMED", note: "Order created by admin." },
        },
      },
      include: { user: { select: { name: true, email: true } } },
    })

    sendOrderConfirmation(order.user.email, order.user.name, order.orderNumber).catch(
      console.error
    )

    res.status(201).json(order)
  } catch {
    res.status(500).json({ error: "Failed to create order." })
  }
})

router.get("/", requireAuth, async (req: AuthRequest, res: Response) => {
  const status = req.query.status as string | undefined

  const where =
    req.user!.role === "ADMIN"
      ? status ? { status: status as never } : {}
      : { userId: req.user!.id }

  const orders = await db.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, company: true } },
      statusHistory: { orderBy: { createdAt: "asc" } },
    },
  })

  res.json(orders)
})

router.get("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  const order = await db.order.findUnique({
    where: { id: req.params.id },
    include: {
      user: { select: { name: true, company: true, email: true } },
      quote: true,
      statusHistory: { orderBy: { createdAt: "asc" } },
    },
  })

  if (!order) {
    res.status(404).json({ error: "Not found" })
    return
  }
  if (req.user!.role !== "ADMIN" && order.userId !== req.user!.id) {
    res.status(403).json({ error: "Forbidden" })
    return
  }

  res.json(order)
})

router.patch("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  if (req.user!.role !== "ADMIN") {
    res.status(403).json({ error: "Forbidden" })
    return
  }

  const parsed = updateOrderSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message })
    return
  }

  const { status, note, trackingNumber, estimatedDelivery } = parsed.data

  const updateData: Record<string, unknown> = {}
  if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber
  if (estimatedDelivery) updateData.estimatedDelivery = new Date(estimatedDelivery)
  if (status) {
    updateData.status = status
    if (status === "SHIPPED") updateData.shippedAt = new Date()
    if (status === "DELIVERED") updateData.deliveredAt = new Date()
  }

  const order = await db.order.update({
    where: { id: req.params.id },
    data: {
      ...updateData,
      ...(status && {
        statusHistory: {
          create: { status, note: note ?? undefined },
        },
      }),
    },
    include: { statusHistory: { orderBy: { createdAt: "asc" } } },
  })

  res.json(order)
})

export default router
