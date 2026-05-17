"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, Clock, Package, Users } from "lucide-react"
import { QuoteStatusBadge, OrderStatusBadge } from "@/components/dashboard/StatusBadge"
import { apiGet } from "@/lib/api"

interface Quote { id: string; product: string; status: string; createdAt: string; company: string; user?: { company: string } }
interface Order { id: string; orderNumber: string; product: string; status: string; user?: { company: string } }

export default function AdminOverviewPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({ totalQuotes: 0, pendingQuotes: 0, activeOrders: 0, totalBuyers: 0 })

  useEffect(() => {
    Promise.all([
      apiGet("/admin/stats").then((r) => r.json()),
      apiGet("/quotes").then((r) => r.json()),
      apiGet("/orders").then((r) => r.json()),
    ]).then(([s, q, o]) => {
      setStats(s)
      setQuotes((Array.isArray(q) ? q : []).slice(0, 6))
      setOrders((Array.isArray(o) ? o : []).slice(0, 6))
    }).catch(() => {/* backend offline — keep empty state */})
  }, [])

  const statCards = [
    { label: "Total Quotes",       value: stats.totalQuotes,   icon: FileText, href: "/admin/quotes",               color: "text-blue-600" },
    { label: "Pending Review",     value: stats.pendingQuotes, icon: Clock,    href: "/admin/quotes?status=PENDING", color: "text-yellow-600" },
    { label: "Active Orders",      value: stats.activeOrders,  icon: Package,  href: "/admin/orders",                color: "text-orange-600" },
    { label: "Registered Buyers",  value: stats.totalBuyers,   icon: Users,    href: "/admin/users",                 color: "text-green-600" },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-brand-navy">Admin Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white border border-brand-border p-5 hover:border-brand-accent transition-colors">
            <s.icon className={`w-5 h-5 mb-3 ${s.color}`} />
            <div className="text-3xl font-black text-brand-navy">{s.value}</div>
            <div className="text-xs text-brand-slate mt-1">{s.label}</div>
          </Link>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-brand-navy">Latest Quotes</h2>
            <Link href="/admin/quotes" className="text-xs text-brand-accent hover:underline">View all</Link>
          </div>
          <div className="bg-white border border-brand-border divide-y divide-brand-border">
            {quotes.length === 0 ? (
              <p className="px-4 py-6 text-sm text-brand-ash text-center">No quotes yet.</p>
            ) : quotes.map((q) => (
              <Link key={q.id} href={`/admin/quotes?id=${q.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-brand-light-gray transition-colors">
                <div>
                  <p className="text-sm font-medium text-brand-navy">{q.user?.company ?? q.company}</p>
                  <p className="text-xs text-brand-ash">{q.product} · {new Date(q.createdAt).toLocaleDateString("en-GB")}</p>
                </div>
                <QuoteStatusBadge status={q.status} />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-brand-navy">Latest Orders</h2>
            <Link href="/admin/orders" className="text-xs text-brand-accent hover:underline">View all</Link>
          </div>
          <div className="bg-white border border-brand-border divide-y divide-brand-border">
            {orders.length === 0 ? (
              <p className="px-4 py-6 text-sm text-brand-ash text-center">No orders yet.</p>
            ) : orders.map((o) => (
              <Link key={o.id} href={`/admin/orders?id=${o.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-brand-light-gray transition-colors">
                <div>
                  <p className="text-sm font-medium text-brand-navy">{o.orderNumber}</p>
                  <p className="text-xs text-brand-ash">{o.user?.company} · {o.product}</p>
                </div>
                <OrderStatusBadge status={o.status} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
