export const dynamic = "force-dynamic"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { QuoteStatusBadge } from "@/components/dashboard/StatusBadge"
import { ChevronLeft } from "lucide-react"

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await auth()

  const quote = await db.quoteRequest.findUnique({
    where: { id },
    include: { orders: { orderBy: { createdAt: "desc" } } },
  })

  if (!quote) notFound()
  if (quote.userId !== session!.user.id) redirect("/dashboard/quotes")

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link href="/dashboard/quotes" className="flex items-center gap-1 text-sm text-brand-slate hover:text-brand-accent mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Quotes
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand-navy">Quote Request</h1>
          <QuoteStatusBadge status={quote.status} />
        </div>
        <p className="text-xs text-brand-ash mt-1">
          Submitted {new Date(quote.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      <div className="bg-white border border-brand-border divide-y divide-brand-border">
        {[
          ["Company", quote.company],
          ["Contact", quote.name],
          ["Email", quote.email],
          ["Country", quote.country],
          ["Product Category", quote.product],
          ["Inquiry Type", quote.inquiryType],
        ].map(([label, value]) => (
          <div key={label} className="grid grid-cols-2 px-5 py-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-ash">{label}</span>
            <span className="text-sm text-brand-charcoal">{value}</span>
          </div>
        ))}
        <div className="px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-ash mb-2">Message</p>
          <p className="text-sm text-brand-charcoal leading-relaxed">{quote.message}</p>
        </div>
      </div>

      {/* Admin response */}
      {(quote.adminNotes || quote.quotedPrice) && (
        <div className="bg-brand-light-gray border border-brand-border p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3">Response from Raft-Garments</p>
          {quote.quotedPrice && (
            <p className="text-sm text-brand-charcoal mb-2">
              <span className="font-semibold">Quoted Price: </span>{quote.quotedPrice}
            </p>
          )}
          {quote.adminNotes && (
            <p className="text-sm text-brand-slate leading-relaxed">{quote.adminNotes}</p>
          )}
        </div>
      )}

      {/* Linked orders */}
      {quote.orders.length > 0 && (
        <div>
          <h2 className="font-semibold text-brand-navy mb-3">Linked Orders</h2>
          <div className="bg-white border border-brand-border divide-y divide-brand-border">
            {quote.orders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/orders/${order.id}`}
                className="flex items-center justify-between px-5 py-3 hover:bg-brand-light-gray transition-colors"
              >
                <span className="text-sm font-medium text-brand-navy">{order.orderNumber}</span>
                <span className="text-xs text-brand-accent">View Order →</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
