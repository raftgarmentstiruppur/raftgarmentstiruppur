export const dynamic = "force-dynamic"
import { db } from "@/lib/db"
import Link from "next/link"
import { OrderStatusBadge } from "@/components/dashboard/StatusBadge"

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams

  const orders = await db.order.findMany({
    where: status ? { status: status as never } : {},
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, company: true } } },
  })

  const statuses = ["CONFIRMED", "IN_PRODUCTION", "QUALITY_CHECK", "SHIPPED", "DELIVERED", "CANCELLED"]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Orders</h1>

      <div className="flex gap-2 flex-wrap">
        <Link href="/admin/orders" className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${!status ? "bg-brand-navy text-white border-brand-navy" : "border-brand-border text-brand-slate hover:border-brand-accent"}`}>
          All
        </Link>
        {statuses.map((s) => (
          <Link key={s} href={`/admin/orders?status=${s}`} className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${status === s ? "bg-brand-navy text-white border-brand-navy" : "border-brand-border text-brand-slate hover:border-brand-accent"}`}>
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
                  <Link href={`/admin/orders/${o.id}`} className="text-brand-accent text-xs font-semibold hover:underline">Manage →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
