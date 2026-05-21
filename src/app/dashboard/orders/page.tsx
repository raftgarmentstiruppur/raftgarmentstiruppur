export const dynamic = "force-dynamic"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import Link from "next/link"
import { OrderStatusBadge } from "@/components/dashboard/StatusBadge"

export const dynamic = 'force-dynamic'

export default async function MyOrdersPage() {
  const session = await auth()
  const orders = await db.order.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
  })

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
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-ash">
                    {h}
                  </th>
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
                    {o.estimatedDelivery
                      ? new Date(o.estimatedDelivery).toLocaleDateString("en-GB")
                      : <span className="text-brand-ash">TBC</span>}
                  </td>
                  <td className="px-4 py-3"><OrderStatusBadge status={o.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/dashboard/orders/${o.id}`} className="text-brand-accent text-xs font-semibold hover:underline">
                      Track
                    </Link>
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
