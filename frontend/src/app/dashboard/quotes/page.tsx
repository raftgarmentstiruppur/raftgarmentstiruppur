"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { QuoteStatusBadge } from "@/components/dashboard/StatusBadge"
import { apiGet } from "@/lib/api"

interface Quote {
  id: string; product: string; status: string; createdAt: string
  inquiryType: string; quotedPrice: string | null; company: string
  name: string; email: string; country: string; message: string
  adminNotes: string | null; orders: { id: string; orderNumber: string }[]
}

export default function MyQuotesPage() {
  const searchParams = useSearchParams()
  const selectedId = searchParams.get("id")
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [detail, setDetail] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet("/quotes").then((r) => r.json()).then((data) => {
      setQuotes(Array.isArray(data) ? data : [])
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!selectedId) { setDetail(null); return }
    apiGet(`/quotes/${selectedId}`).then((r) => r.json()).then(setDetail)
  }, [selectedId])

  if (loading) return <div className="text-sm text-brand-slate">Loading…</div>

  if (selectedId && detail) {
    return (
      <div className="space-y-6 max-w-2xl">
        <div>
          <Link href="/dashboard/quotes" className="flex items-center gap-1 text-sm text-brand-slate hover:text-brand-accent mb-4">
            <ChevronLeft className="w-4 h-4" /> Back to Quotes
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-navy">Quote Request</h1>
            <QuoteStatusBadge status={detail.status} />
          </div>
          <p className="text-xs text-brand-ash mt-1">
            Submitted {new Date(detail.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="bg-white border border-brand-border divide-y divide-brand-border">
          {([
            ["Company", detail.company],
            ["Contact", detail.name],
            ["Email", detail.email],
            ["Country", detail.country],
            ["Product Category", detail.product],
            ["Inquiry Type", detail.inquiryType],
          ] as [string, string][]).map(([label, value]) => (
            <div key={label} className="grid grid-cols-2 px-5 py-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-ash">{label}</span>
              <span className="text-sm text-brand-charcoal">{value}</span>
            </div>
          ))}
          <div className="px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-ash mb-2">Message</p>
            <p className="text-sm text-brand-charcoal leading-relaxed">{detail.message}</p>
          </div>
        </div>
        {(detail.adminNotes || detail.quotedPrice) && (
          <div className="bg-brand-light-gray border border-brand-border p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3">Response from Raft Garments</p>
            {detail.quotedPrice && <p className="text-sm text-brand-charcoal mb-2"><span className="font-semibold">Quoted Price: </span>{detail.quotedPrice}</p>}
            {detail.adminNotes && <p className="text-sm text-brand-slate leading-relaxed">{detail.adminNotes}</p>}
          </div>
        )}
        {detail.orders?.length > 0 && (
          <div>
            <h2 className="font-semibold text-brand-navy mb-3">Linked Orders</h2>
            <div className="bg-white border border-brand-border divide-y divide-brand-border">
              {detail.orders.map((order) => (
                <Link key={order.id} href={`/dashboard/orders?id=${order.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-brand-light-gray transition-colors">
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-navy">My Quote Requests</h1>
        <Link href="/contact" className="bg-brand-accent text-white text-sm font-semibold px-5 py-2 hover:bg-brand-accent-hover transition-colors">
          + New Request
        </Link>
      </div>
      {quotes.length === 0 ? (
        <div className="bg-white border border-brand-border p-12 text-center">
          <p className="text-brand-slate mb-4">You haven&apos;t submitted any quote requests yet.</p>
          <Link href="/contact" className="text-brand-accent font-semibold hover:underline">Submit your first quote →</Link>
        </div>
      ) : (
        <div className="bg-white border border-brand-border">
          <table className="w-full text-sm">
            <thead className="bg-brand-light-gray border-b border-brand-border">
              <tr>
                {["Date", "Product", "Inquiry Type", "Quoted Price", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-ash">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-brand-light-gray transition-colors">
                  <td className="px-4 py-3 text-brand-slate whitespace-nowrap">{new Date(q.createdAt).toLocaleDateString("en-GB")}</td>
                  <td className="px-4 py-3 font-medium text-brand-charcoal">{q.product}</td>
                  <td className="px-4 py-3 text-brand-slate">{q.inquiryType}</td>
                  <td className="px-4 py-3 text-brand-charcoal">{q.quotedPrice ?? <span className="text-brand-ash">—</span>}</td>
                  <td className="px-4 py-3"><QuoteStatusBadge status={q.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/dashboard/quotes?id=${q.id}`} className="text-brand-accent text-xs font-semibold hover:underline">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

