import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { updateQuoteSchema } from "@/lib/validations"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const quote = await db.quoteRequest.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, company: true, email: true } },
      orders: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  })

  if (!quote) return NextResponse.json({ error: "Not found" }, { status: 404 })

  // Buyers can only see their own quotes
  if (session.user.role !== "ADMIN" && quote.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return NextResponse.json(quote)
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
  const parsed = updateQuoteSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
  }

  const quote = await db.quoteRequest.update({
    where: { id },
    data: parsed.data,
  })

  return NextResponse.json(quote)
}
