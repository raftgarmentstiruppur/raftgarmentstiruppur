import { auth } from "@/auth"
import { db } from "@/lib/db"
import Link from "next/link"
import { FileText, Package, Clock, CheckCircle } from "lucide-react"
import { QuoteStatusBadge, OrderStatusBadge } from "@/components/dashboard/StatusBadge"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await auth()
  const userId = session!.user.id

  const [quoteCount, pendingQuotes, activeOrders, deliveredOrders, recentQuotes, recentOrders] =
    await Promise.all([
      db.quoteRequest.count({ where: { userId } }),
      db.quoteRequest.count({ where: { userId, status: { in: ["PENDING", "REVIEWING"] } } }),
      db.order.count({ where: { userId, status: { notIn: ["DELIVERED", "CANCELLED"] } } }),
      db.order.count({ where: { userId, status: "DELIVERED" } }),
      db.quoteRequest.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      db.order.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ])

  const stats = [
    { label: "Total Quotes",   value: quoteCount,      icon: FileText,    href: "/dashboard/quotes" },
    { label: "Pending Review", value: pendingQuotes,    icon: Clock,       href: "/dashboard/quotes" },
    { label: "Active Orders",  value: activeOrders,     icon: Package,     href: "/dashboard/orders" },
    { label: "Delivered",      value: deliveredOrders,  icon: CheckCircle, href: "/dashboard/orders" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy">Welcome back</h1>
        <p className="text-sm text-brand-slate mt-1">Here&apos;s an overview of your account.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white border border-brand-border p-5 hover:border-brand-accent transition-colors group"
          >
            <stat.icon className="w-5 h-5 text-brand-accent mb-3" />
            <div className="text-3xl font-black text-brand-navy">{stat.value}</div>
            <div className="text-xs text-brand-slate mt-1">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent quotes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-brand-navy">Recent Quote Requests</h2>
          <Link href="/dashboard/quotes" className="text-xs text-brand-accent hover:underline">
            View all
          </Link>
        </div>
        {recentQuotes.length === 0 ? (
          <div className="bg-white border border-brand-border p-8 text-center text-sm text-brand-ash">
            No quote requests yet.{" "}
            <Link href="/contact" className="text-brand-accent hover:underline">
              Submit your first quote
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-brand-border divide-y divide-brand-border">
            {recentQuotes.map((q) => (
              <Link
                key={q.id}
                href={`/dashboard/quotes/${q.id}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-brand-light-gray transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-brand-navy">{q.product}</p>
                  <p className="text-xs text-brand-ash mt-0.5">
                    {new Date(q.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <QuoteStatusBadge status={q.status} />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-brand-navy">Recent Orders</h2>
          <Link href="/dashboard/orders" className="text-xs text-brand-accent hover:underline">
            View all
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="bg-white border border-brand-border p-8 text-center text-sm text-brand-ash">
            No orders yet.
          </div>
        ) : (
          <div className="bg-white border border-brand-border divide-y divide-brand-border">
            {recentOrders.map((o) => (
              <Link
                key={o.id}
                href={`/dashboard/orders/${o.id}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-brand-light-gray transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-brand-navy">{o.orderNumber}</p>
                  <p className="text-xs text-brand-ash mt-0.5">{o.product}</p>
                </div>
                <OrderStatusBadge status={o.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
