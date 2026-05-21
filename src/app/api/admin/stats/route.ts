export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function GET() {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const [totalQuotes, pendingQuotes, activeOrders, totalBuyers] = await Promise.all([
    db.quoteRequest.count(),
    db.quoteRequest.count({ where: { status: "PENDING" } }),
    db.order.count({
      where: { status: { notIn: ["DELIVERED", "CANCELLED"] } },
    }),
    db.user.count({ where: { role: "BUYER" } }),
  ])

  return NextResponse.json({ totalQuotes, pendingQuotes, activeOrders, totalBuyers })
}

