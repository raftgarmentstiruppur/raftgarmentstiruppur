export const dynamic = "force-dynamic"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { OrderStatusBadge } from "@/components/dashboard/StatusBadge"
import OrderTimeline from "@/components/dashboard/OrderTimeline"

export const dynamic = 'force-dynamic'

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await auth()

  const order = await db.order.findUnique({
    where: { id },
    include: { statusHistory: { orderBy: { createdAt: "asc" } } },
  })

  if (!order) notFound()
  if (order.userId !== session!.user.id) redirect("/dashboard/orders")

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link href="/dashboard/orders" className="flex items-center gap-1 text-sm text-brand-slate hover:text-brand-accent mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Orders
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand-navy">{order.orderNumber}</h1>
          <OrderStatusBadge status={order.status} />
        </div>
        <p className="text-xs text-brand-ash mt-1">
          Created {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Order details */}
      <div className="bg-white border border-brand-border divide-y divide-brand-border">
        {[
          ["Product", order.product],
          ["Quantity", order.quantity.toLocaleString() + " units"],
          ["Unit Price", order.unitPrice ? `${order.currency} ${order.unitPrice.toFixed(2)}` : "—"],
          ["Total Amount", order.totalAmount ? `${order.currency} ${order.totalAmount.toFixed(2)}` : "—"],
          ["Est. Delivery", order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString("en-GB") : "To be confirmed"],
          ["Tracking No.", order.trackingNumber ?? "—"],
        ].map(([label, value]) => (
          <div key={String(label)} className="grid grid-cols-2 px-5 py-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-ash">{label}</span>
            <span className="text-sm text-brand-charcoal">{value}</span>
          </div>
        ))}
      </div>

      {/* Status timeline */}
      <div className="bg-white border border-brand-border p-6">
        <h2 className="font-semibold text-brand-navy mb-6">Order Progress</h2>
        <OrderTimeline
          currentStatus={order.status}
          history={order.statusHistory.map((h) => ({
            status: h.status,
            note: h.note,
            createdAt: h.createdAt,
          }))}
        />
      </div>

      {order.notes && (
        <div className="bg-brand-light-gray border border-brand-border p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-2">Notes</p>
          <p className="text-sm text-brand-slate leading-relaxed">{order.notes}</p>
        </div>
      )}
    </div>
  )
}
