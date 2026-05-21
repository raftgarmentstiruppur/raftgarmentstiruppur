export const dynamic = "force-dynamic"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { QuoteStatusBadge } from "@/components/dashboard/StatusBadge"
import UpdateQuoteForm from "@/components/admin/UpdateQuoteForm"
import CreateOrderForm from "@/components/admin/CreateOrderForm"

export const dynamic = 'force-dynamic'

export default async function AdminQuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const quote = await db.quoteRequest.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, company: true, email: true } },
      orders: { orderBy: { createdAt: "desc" } },
    },
  })

  if (!quote) notFound()

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/quotes" className="flex items-center gap-1 text-sm text-brand-slate hover:text-brand-accent mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Quotes
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand-navy">Quote Request</h1>
          <QuoteStatusBadge status={quote.status} />
        </div>
        <p className="text-xs text-brand-ash mt-1">
          Received {new Date(quote.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: quote details */}
        <div className="space-y-4">
          <div className="bg-white border border-brand-border divide-y divide-brand-border">
            {[
              ["Company", quote.user?.company ?? quote.company],
              ["Contact", quote.user?.name ?? quote.name],
              ["Email", quote.user?.email ?? quote.email],
              ["Phone", quote.phone ?? "—"],
              ["Country", quote.country],
              ["Product", quote.product],
              ["Inquiry Type", quote.inquiryType],
            ].map(([label, value]) => (
              <div key={String(label)} className="grid grid-cols-2 px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-ash">{label}</span>
                <span className="text-sm text-brand-charcoal">{value}</span>
              </div>
            ))}
            <div className="px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-ash mb-2">Message</p>
              <p className="text-sm text-brand-charcoal leading-relaxed">{quote.message}</p>
            </div>
          </div>

          {/* Linked orders */}
          {quote.orders.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-2">Linked Orders</p>
              <div className="bg-white border border-brand-border divide-y divide-brand-border">
                {quote.orders.map((o) => (
                  <Link key={o.id} href={`/admin/orders/${o.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-brand-light-gray">
                    <span className="text-sm font-medium text-brand-navy">{o.orderNumber}</span>
                    <span className="text-xs text-brand-accent">View →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: admin actions */}
        <div className="space-y-4">
          <UpdateQuoteForm
            quoteId={quote.id}
            currentStatus={quote.status}
            currentNotes={quote.adminNotes}
            currentPrice={quote.quotedPrice}
          />

          {quote.status === "ACCEPTED" && quote.user && (
            <CreateOrderForm
              quoteId={quote.id}
              userId={quote.user.id}
              product={quote.product}
            />
          )}
        </div>
      </div>
    </div>
  )
}
