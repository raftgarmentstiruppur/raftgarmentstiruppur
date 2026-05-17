"use client"

import { useEffect, useState, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { OrderStatusBadge } from "@/components/dashboard/StatusBadge"
import OrderTimeline from "@/components/dashboard/OrderTimeline"
import UpdateOrderForm from "@/components/admin/UpdateOrderForm"
import { apiGet } from "@/lib/api"

interface StatusHistory { status: string; note: string | null; createdAt: string }
interface Order {
  id: string; orderNumber: string; product: string; quantity: number
  status: string; estimatedDelivery: string | null; trackingNumber: string | null
  unitPrice: number | null; totalAmount: number | null; currency: string
  notes: string | null; createdAt: string; quoteId: string | null
  statusHistory: StatusHistory[]
  user?: { name: string; company: string; email: string }
}

const STATUSES = ["CONFIRMED", "IN_PRODUCTION", "QUALITY_CHECK", "SHIPPED", "DELIVERED", "CANCELLED"]

export default function AdminOrdersPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedId = searchParams.get("id")
  const statusFilter = searchParams.get("status") ?? ""

  const [orders, setOrders] = useState<Order[]>([])
  const [detail, setDetail] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchOrders = useCallback(() => {
    const url = statusFilter ? `/orders?status=${statusFilter}` : "/orders"
    apiGet(url).then((r) => r.json()).then((data) => {
      setOrders(Array.isArray(data) ? data : [])
      setLoading(false)
    })
  }, [statusFilter])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  useEffect(() => {
    if (!selectedId) { setDetail(null); return }
    apiGet(`/orders/${selectedId}`).then((r) => r.json()).then(setDetail)
  }, [selectedId])

  if (loading) return <div className="text-sm text-brand-slate">Loading…</div>

  if (selectedId && detail) {
    return (
      <div className="space-y-6">
        <div>
          <button onClick={() => router.push("/admin/orders")} className="flex items-center gap-1 text-sm text-brand-slate hover:text-brand-accent mb-4">
            <ChevronLeft className="w-4 h-4" /> Back to Orders
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-navy">{detail.orderNumber}</h1>
            <OrderStatusBadge status={detail.status} />
          </div>
          <p className="text-xs text-brand-ash mt-1">
            Created {new Date(detail.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white border border-brand-border divide-y divide-brand-border">
              {([
                ["Buyer", detail.user?.name ?? "—"],
                ["Company", detail.user?.company ?? "—"],
                ["Email", detail.user?.email ?? "—"],
                ["Product", detail.product],
                ["Quantity", `${detail.quantity.toLocaleString()} units`],
                ["Unit Price", detail.unitPrice ? `USD ${detail.unitPrice.toFixed(2)}` : "—"],
                ["Total", detail.totalAmount ? `USD ${detail.totalAmount.toFixed(2)}` : "—"],
                ["Tracking No.", detail.trackingNumber ?? "—"],
                ["Est. Delivery", detail.estimatedDelivery ? new Date(detail.estimatedDelivery).toLocaleDateString("en-GB") : "—"],
              ] as [string, string][]).map(([label, value]) => (
                <div key={label} className="grid grid-cols-2 px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-ash">{label}</span>
                  <span className="text-sm text-brand-charcoal">{value}</span>
                </div>
              ))}
              {detail.notes && (
                <div className="px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-ash mb-2">Notes</p>
                  <p className="text-sm text-brand-charcoal">{detail.notes}</p>
                </div>
              )}
            </div>
            {detail.quoteId && (
              <div className="bg-brand-light-gray border border-brand-border px-4 py-3">
                <p className="text-xs text-brand-ash">Linked from quote</p>
                <Link href={`/admin/quotes?id=${detail.quoteId}`} className="text-sm text-brand-accent font-semibold hover:underline">View Quote →</Link>
              </div>
            )}
            <div className="bg-white border border-brand-border p-6">
              <h3 className="font-semibold text-brand-navy mb-6">Order Timeline</h3>
              <OrderTimeline
                currentStatus={detail.status}
                history={detail.statusHistory.map((h) => ({ status: h.status, note: h.note, createdAt: new Date(h.createdAt) }))}
              />
            </div>
          </div>
          <div>
            <UpdateOrderForm
              orderId={detail.id}
              currentStatus={detail.status}
              currentTracking={detail.trackingNumber}
              onUpdated={fetchOrders}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Orders</h1>
      <div className="flex gap-2 flex-wrap">
        <Link href="/admin/orders" className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${!statusFilter ? "bg-brand-navy text-white border-brand-navy" : "border-brand-border text-brand-slate hover:border-brand-accent"}`}>
          All
        </Link>
        {STATUSES.map((s) => (
          <Link key={s} href={`/admin/orders?status=${s}`} className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${statusFilter === s ? "bg-brand-navy text-white border-brand-navy" : "border-brand-border text-brand-slate hover:border-brand-accent"}`}>
            {s.replace("_", " ")}
          </Link>
        ))}
      </div>
      <div className="bg-white border border-brand-border">
        <table className="w-full text-sm">
          <thead className="bg-brand-light-gray border-b border-brand-border">
            <tr>
              {["Order No.", "Company", "Product", "Qty", "Est. Delivery", "Status", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-ash">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {orders.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-brand-ash">No orders found.</td></tr>
            ) : orders.map((o) => (
              <tr key={o.id} className="hover:bg-brand-light-gray transition-colors">
                <td className="px-4 py-3 font-medium text-brand-navy">{o.orderNumber}</td>
                <td className="px-4 py-3 text-brand-charcoal">{o.user?.company}</td>
                <td className="px-4 py-3 text-brand-slate">{o.product}</td>
                <td className="px-4 py-3 text-brand-slate">{o.quantity.toLocaleString()}</td>
                <td className="px-4 py-3 text-brand-slate whitespace-nowrap">
                  {o.estimatedDelivery ? new Date(o.estimatedDelivery).toLocaleDateString("en-GB") : "—"}
                </td>
                <td className="px-4 py-3"><OrderStatusBadge status={o.status} /></td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/orders?id=${o.id}`} className="text-brand-accent text-xs font-semibold hover:underline">Manage →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
