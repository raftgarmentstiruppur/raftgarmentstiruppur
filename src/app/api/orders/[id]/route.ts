import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { updateOrderSchema } from "@/lib/validations"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const order = await db.order.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, company: true, email: true } },
      quote: true,
      statusHistory: { orderBy: { createdAt: "asc" } },
    },
  })

  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 })

  if (session.user.role !== "ADMIN" && order.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return NextResponse.json(order)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { id } = await params
  const body = await req.json()
  const parsed = updateOrderSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
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
    where: { id },
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

  return NextResponse.json(order)
}
