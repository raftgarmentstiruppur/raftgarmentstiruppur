"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, Package, Clock, CheckCircle } from "lucide-react"
import { QuoteStatusBadge, OrderStatusBadge } from "@/components/dashboard/StatusBadge"
import { apiGet } from "@/lib/api"

interface Quote { id: string; product: string; status: string; createdAt: string }
interface Order { id: string; orderNumber: string; product: string; status: string }

export default function DashboardPage() {
  const [data, setData] = useState<{
    quoteCount: number; pendingQuotes: number; activeOrders: number; deliveredOrders: number
    recentQuotes: Quote[]; recentOrders: Order[]
  } | null>(null)

  useEffect(() => {
    Promise.all([
      apiGet("/quotes").then((r) => r.json()),
      apiGet("/orders").then((r) => r.json()),
    ]).then(([quotes, orders]: [Quote[], Order[]]) => {
      setData({
        quoteCount: quotes.length,
        pendingQuotes: quotes.filter((q) => ["PENDING", "REVIEWING"].includes(q.status)).length,
        activeOrders: orders.filter((o) => !["DELIVERED", "CANCELLED"].includes(o.status)).length,
        deliveredOrders: orders.filter((o) => o.status === "DELIVERED").length,
        recentQuotes: quotes.slice(0, 5),
        recentOrders: orders.slice(0, 5),
      })
    })
  }, [])

  if (!data) return <div className="text-sm text-brand-slate">Loading…</div>

  const stats = [
    { label: "Total Quotes",   value: data.quoteCount,      icon: FileText,    href: "/dashboard/quotes" },
    { label: "Pending Review", value: data.pendingQuotes,    icon: Clock,       href: "/dashboard/quotes" },
    { label: "Active Orders",  value: data.activeOrders,     icon: Package,     href: "/dashboard/orders" },
    { label: "Delivered",      value: data.deliveredOrders,  icon: CheckCircle, href: "/dashboard/orders" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy">Welcome back</h1>
        <p className="text-sm text-brand-slate mt-1">Here&apos;s an overview of your account.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-white border border-brand-border p-5 hover:border-brand-accent transition-colors group">
            <stat.icon className="w-5 h-5 text-brand-accent mb-3" />
            <div className="text-3xl font-black text-brand-navy">{stat.value}</div>
            <div className="text-xs text-brand-slate mt-1">{stat.label}</div>
          </Link>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-brand-navy">Recent Quote Requests</h2>
          <Link href="/dashboard/quotes" className="text-xs text-brand-accent hover:underline">View all</Link>
        </div>
        {data.recentQuotes.length === 0 ? (
          <div className="bg-white border border-brand-border p-8 text-center text-sm text-brand-ash">No quote requests yet.</div>
        ) : (
          <div className="bg-white border border-brand-border divide-y divide-brand-border">
            {data.recentQuotes.map((q) => (
              <Link key={q.id} href={`/dashboard/quotes?id=${q.id}`} className="flex items-center justify-between px-5 py-4 hover:bg-brand-light-gray transition-colors">
                <div>
                  <p className="text-sm font-medium text-brand-navy">{q.product}</p>
                  <p className="text-xs text-brand-ash mt-0.5">{new Date(q.createdAt).toLocaleDateString("en-GB")}</p>
                </div>
                <QuoteStatusBadge status={q.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-brand-navy">Recent Orders</h2>
          <Link href="/dashboard/orders" className="text-xs text-brand-accent hover:underline">View all</Link>
        </div>
        {data.recentOrders.length === 0 ? (
          <div className="bg-white border border-brand-border p-8 text-center text-sm text-brand-ash">No orders yet.</div>
        ) : (
          <div className="bg-white border border-brand-border divide-y divide-brand-border">
            {data.recentOrders.map((o) => (
              <Link key={o.id} href={`/dashboard/orders?id=${o.id}`} className="flex items-center justify-between px-5 py-4 hover:bg-brand-light-gray transition-colors">
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
