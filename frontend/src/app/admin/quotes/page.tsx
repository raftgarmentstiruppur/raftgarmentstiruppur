"use client"

import { useEffect, useState, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { QuoteStatusBadge } from "@/components/dashboard/StatusBadge"
import UpdateQuoteForm from "@/components/admin/UpdateQuoteForm"
import CreateOrderForm from "@/components/admin/CreateOrderForm"
import { apiGet } from "@/lib/api"

interface Quote {
  id: string; product: string; status: string; createdAt: string
  inquiryType: string; quotedPrice: string | null; adminNotes: string | null
  company: string; name: string; email: string; phone: string | null; country: string
  message: string; user?: { id: string; name: string; company: string; email: string }
  orders: { id: string; orderNumber: string }[]
}

const STATUSES = ["PENDING", "REVIEWING", "QUOTED", "ACCEPTED", "REJECTED"]

export default function AdminQuotesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedId = searchParams.get("id")
  const statusFilter = searchParams.get("status") ?? ""

  const [quotes, setQuotes] = useState<Quote[]>([])
  const [detail, setDetail] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchQuotes = useCallback(() => {
    const url = statusFilter ? `/quotes?status=${statusFilter}` : "/quotes"
    apiGet(url).then((r) => r.json()).then((data) => {
      setQuotes(Array.isArray(data) ? data : [])
      setLoading(false)
    })
  }, [statusFilter])

  useEffect(() => { fetchQuotes() }, [fetchQuotes])

  useEffect(() => {
    if (!selectedId) { setDetail(null); return }
    apiGet(`/quotes/${selectedId}`).then((r) => r.json()).then(setDetail)
  }, [selectedId])

  if (loading) return <div className="text-sm text-brand-slate">Loading…</div>

  if (selectedId && detail) {
    return (
      <div className="space-y-6">
        <div>
          <button onClick={() => router.push("/admin/quotes")} className="flex items-center gap-1 text-sm text-brand-slate hover:text-brand-accent mb-4">
            <ChevronLeft className="w-4 h-4" /> Back to Quotes
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-navy">Quote Request</h1>
            <QuoteStatusBadge status={detail.status} />
          </div>
          <p className="text-xs text-brand-ash mt-1">
            Received {new Date(detail.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white border border-brand-border divide-y divide-brand-border">
              {([
                ["Company", detail.user?.company ?? detail.company],
                ["Contact", detail.user?.name ?? detail.name],
                ["Email", detail.user?.email ?? detail.email],
                ["Phone", detail.phone ?? "—"],
                ["Country", detail.country],
                ["Product", detail.product],
                ["Inquiry Type", detail.inquiryType],
              ] as [string, string][]).map(([label, value]) => (
                <div key={label} className="grid grid-cols-2 px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-ash">{label}</span>
                  <span className="text-sm text-brand-charcoal">{value}</span>
                </div>
              ))}
              <div className="px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-ash mb-2">Message</p>
                <p className="text-sm text-brand-charcoal leading-relaxed">{detail.message}</p>
              </div>
            </div>
            {detail.orders.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-2">Linked Orders</p>
                <div className="bg-white border border-brand-border divide-y divide-brand-border">
                  {detail.orders.map((o) => (
                    <Link key={o.id} href={`/admin/orders?id=${o.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-brand-light-gray">
                      <span className="text-sm font-medium text-brand-navy">{o.orderNumber}</span>
                      <span className="text-xs text-brand-accent">View →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <UpdateQuoteForm
              quoteId={detail.id}
              currentStatus={detail.status}
              currentNotes={detail.adminNotes}
              currentPrice={detail.quotedPrice}
              onUpdated={fetchQuotes}
            />
            {detail.status === "ACCEPTED" && detail.user && (
              <CreateOrderForm quoteId={detail.id} userId={detail.user.id} product={detail.product} />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Quote Requests</h1>
      <div className="flex gap-2 flex-wrap">
        <Link href="/admin/quotes" className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${!statusFilter ? "bg-brand-navy text-white border-brand-navy" : "border-brand-border text-brand-slate hover:border-brand-accent"}`}>
          All ({quotes.length})
        </Link>
        {STATUSES.map((s) => (
          <Link key={s} href={`/admin/quotes?status=${s}`} className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${statusFilter === s ? "bg-brand-navy text-white border-brand-navy" : "border-brand-border text-brand-slate hover:border-brand-accent"}`}>
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </Link>
        ))}
      </div>
      <div className="bg-white border border-brand-border">
        <table className="w-full text-sm">
          <thead className="bg-brand-light-gray border-b border-brand-border">
            <tr>
              {["Date", "Company", "Product", "Inquiry Type", "Status", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-ash">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {quotes.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-ash">No quotes found.</td></tr>
            ) : quotes.map((q) => (
              <tr key={q.id} className="hover:bg-brand-light-gray transition-colors">
                <td className="px-4 py-3 text-brand-slate whitespace-nowrap">{new Date(q.createdAt).toLocaleDateString("en-GB")}</td>
                <td className="px-4 py-3 font-medium text-brand-navy">{q.user?.company ?? q.company}</td>
                <td className="px-4 py-3 text-brand-charcoal">{q.product}</td>
                <td className="px-4 py-3 text-brand-slate">{q.inquiryType}</td>
                <td className="px-4 py-3"><QuoteStatusBadge status={q.status} /></td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/quotes?id=${q.id}`} className="text-brand-accent text-xs font-semibold hover:underline">Review →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
