import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { quoteSchema } from "@/lib/validations"
import { sendQuoteConfirmation, sendAdminQuoteNotification } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = quoteSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
    }

    const session = await auth()

    const quote = await db.quoteRequest.create({
      data: {
        ...parsed.data,
        userId: session?.user?.id ?? null,
      },
    })

    // Fire emails without blocking response
    sendQuoteConfirmation(quote.email, quote.name, quote.id).catch(console.error)
    sendAdminQuoteNotification(quote.id, quote.company, quote.product).catch(console.error)

    return NextResponse.json(quote, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to submit quote request." }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status")

  const where =
    session.user.role === "ADMIN"
      ? status ? { status: status as never } : {}
      : { userId: session.user.id }

  const quotes = await db.quoteRequest.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, company: true } } },
  })

  return NextResponse.json(quotes)
}

