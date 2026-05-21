export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { createOrderSchema } from "@/lib/validations"
import { sendOrderConfirmation } from "@/lib/email"

async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const count = await db.order.count({
    where: { orderNumber: { startsWith: `DG-${year}-` } },
  })
  return `DG-${year}-${String(count + 1).padStart(4, "0")}`
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const body = await req.json()
    const parsed = createOrderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
    }

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

    return NextResponse.json(order, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create order." }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status")

  const where =
    session.user.role === "ADMIN"
      ? status ? { status: status as never } : {}
      : { userId: session.user.id }

  const orders = await db.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, company: true } },
      statusHistory: { orderBy: { createdAt: "asc" } },
    },
  })

  return NextResponse.json(orders)
}

