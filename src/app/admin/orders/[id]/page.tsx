export const dynamic = "force-dynamic"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { OrderStatusBadge } from "@/components/dashboard/StatusBadge"
import OrderTimeline from "@/components/dashboard/OrderTimeline"
import UpdateOrderForm from "@/components/admin/UpdateOrderForm"

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = await db.order.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, company: true, email: true } },
      quote: true,
      statusHistory: { orderBy: { createdAt: "asc" } },
    },
  })

  if (!order) notFound()

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/orders" className="flex items-center gap-1 text-sm text-brand-slate hover:text-brand-accent mb-4">
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: order details + timeline */}
        <div className="space-y-4">
          <div className="bg-white border border-brand-border divide-y divide-brand-border">
            {[
              ["Buyer", order.user?.name],
              ["Company", order.user?.company],
              ["Email", order.user?.email],
              ["Product", order.product],
              ["Quantity", order.quantity.toLocaleString() + " units"],
              ["Unit Price", order.unitPrice ? `USD ${order.unitPrice.toFixed(2)}` : "—"],
              ["Total", order.totalAmount ? `USD ${order.totalAmount.toFixed(2)}` : "—"],
              ["Tracking No.", order.trackingNumber ?? "—"],
              ["Est. Delivery", order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString("en-GB") : "—"],
            ].map(([label, value]) => (
              <div key={String(label)} className="grid grid-cols-2 px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-ash">{label}</span>
                <span className="text-sm text-brand-charcoal">{value}</span>
              </div>
            ))}
            {order.notes && (
              <div className="px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-ash mb-2">Notes</p>
                <p className="text-sm text-brand-charcoal">{order.notes}</p>
              </div>
            )}
          </div>

          {order.quote && (
            <div className="bg-brand-light-gray border border-brand-border px-4 py-3">
              <p className="text-xs text-brand-ash">Linked from quote</p>
              <Link href={`/admin/quotes/${order.quoteId}`} className="text-sm text-brand-accent font-semibold hover:underline">
                View Quote →
              </Link>
            </div>
          )}

          <div className="bg-white border border-brand-border p-6">
            <h3 className="font-semibold text-brand-navy mb-6">Order Timeline</h3>
            <OrderTimeline
              currentStatus={order.status}
              history={order.statusHistory.map((h) => ({
                status: h.status,
                note: h.note,
                createdAt: h.createdAt,
              }))}
            />
          </div>
        </div>

        {/* Right: update form */}
        <div>
          <UpdateOrderForm
            orderId={order.id}
            currentStatus={order.status}
            currentTracking={order.trackingNumber}
          />
        </div>
      </div>
    </div>
  )
}
