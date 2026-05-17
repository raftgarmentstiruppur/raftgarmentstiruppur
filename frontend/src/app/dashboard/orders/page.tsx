"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { OrderStatusBadge } from "@/components/dashboard/StatusBadge"
import OrderTimeline from "@/components/dashboard/OrderTimeline"
import { apiGet } from "@/lib/api"

interface StatusHistory { status: string; note: string | null; createdAt: string }
interface Order {
  id: string; orderNumber: string; product: string; quantity: number
  status: string; estimatedDelivery: string | null; trackingNumber: string | null
  unitPrice: number | null; totalAmount: number | null; currency: string
  notes: string | null; createdAt: string; statusHistory: StatusHistory[]
}

export default function MyOrdersPage() {
  const searchParams = useSearchParams()
  const selectedId = searchParams.get("id")
  const [orders, setOrders] = useState<Order[]>([])
  const [detail, setDetail] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet("/orders").then((r) => r.json()).then((data) => {
      setOrders(Array.isArray(data) ? data : [])
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!selectedId) { setDetail(null); return }
    apiGet(`/orders/${selectedId}`).then((r) => r.json()).then(setDetail)
  }, [selectedId])

  if (loading) return <div className="text-sm text-brand-slate">Loading…</div>

  if (selectedId && detail) {
    return (
      <div className="space-y-6 max-w-2xl">
        <div>
          <Link href="/dashboard/orders" className="flex items-center gap-1 text-sm text-brand-slate hover:text-brand-accent mb-4">
            <ChevronLeft className="w-4 h-4" /> Back to Orders
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-navy">{detail.orderNumber}</h1>
            <OrderStatusBadge status={detail.status} />
          </div>
          <p className="text-xs text-brand-ash mt-1">
            Created {new Date(detail.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="bg-white border border-brand-border divide-y divide-brand-border">
          {([
            ["Product", detail.product],
            ["Quantity", `${detail.quantity.toLocaleString()} units`],
            ["Unit Price", detail.unitPrice ? `${detail.currency} ${detail.unitPrice.toFixed(2)}` : "—"],
            ["Total Amount", detail.totalAmount ? `${detail.currency} ${detail.totalAmount.toFixed(2)}` : "—"],
            ["Est. Delivery", detail.estimatedDelivery ? new Date(detail.estimatedDelivery).toLocaleDateString("en-GB") : "To be confirmed"],
            ["Tracking No.", detail.trackingNumber ?? "—"],
          ] as [string, string][]).map(([label, value]) => (
            <div key={label} className="grid grid-cols-2 px-5 py-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-ash">{label}</span>
              <span className="text-sm text-brand-charcoal">{value}</span>
            </div>
          ))}
        </div>
        <div className="bg-white border border-brand-border p-6">
          <h2 className="font-semibold text-brand-navy mb-6">Order Progress</h2>
          <OrderTimeline
            currentStatus={detail.status}
            history={detail.statusHistory.map((h) => ({ status: h.status, note: h.note, createdAt: new Date(h.createdAt) }))}
          />
        </div>
        {detail.notes && (
          <div className="bg-brand-light-gray border border-brand-border p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-2">Notes</p>
            <p className="text-sm text-brand-slate leading-relaxed">{detail.notes}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">My Orders</h1>
      {orders.length === 0 ? (
        <div className="bg-white border border-brand-border p-12 text-center">
          <p className="text-brand-slate">No orders yet. Orders are created after your quote is accepted.</p>
        </div>
      ) : (
        <div className="bg-white border border-brand-border">
          <table className="w-full text-sm">
            <thead className="bg-brand-light-gray border-b border-brand-border">
              <tr>
                {["Order No.", "Product", "Qty", "Est. Delivery", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-ash">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-brand-light-gray transition-colors">
                  <td className="px-4 py-3 font-medium text-brand-navy">{o.orderNumber}</td>
                  <td className="px-4 py-3 text-brand-charcoal">{o.product}</td>
                  <td className="px-4 py-3 text-brand-slate">{o.quantity.toLocaleString()}</td>
                  <td className="px-4 py-3 text-brand-slate whitespace-nowrap">
                    {o.estimatedDelivery ? new Date(o.estimatedDelivery).toLocaleDateString("en-GB") : <span className="text-brand-ash">TBC</span>}
                  </td>
                  <td className="px-4 py-3"><OrderStatusBadge status={o.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/dashboard/orders?id=${o.id}`} className="text-brand-accent text-xs font-semibold hover:underline">Track</Link>
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
