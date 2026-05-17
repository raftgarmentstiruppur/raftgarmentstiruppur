import { db } from "@/lib/db"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
  const buyers = await db.user.findMany({
    where: { role: "BUYER" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { quotes: true, orders: true } },
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-navy">Registered Buyers</h1>
        <span className="text-sm text-brand-slate">{buyers.length} buyer{buyers.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="bg-white border border-brand-border">
        <table className="w-full text-sm">
          <thead className="bg-brand-light-gray border-b border-brand-border">
            <tr>
              {["Name", "Company", "Country", "Quotes", "Orders", "Joined", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-ash">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {buyers.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-brand-ash">No registered buyers yet.</td></tr>
            ) : buyers.map((b) => (
              <tr key={b.id} className="hover:bg-brand-light-gray transition-colors">
                <td className="px-4 py-3 font-medium text-brand-navy">{b.name}</td>
                <td className="px-4 py-3 text-brand-charcoal">{b.company}</td>
                <td className="px-4 py-3 text-brand-slate">{b.country}</td>
                <td className="px-4 py-3 text-center text-brand-slate">{b._count.quotes}</td>
                <td className="px-4 py-3 text-center text-brand-slate">{b._count.orders}</td>
                <td className="px-4 py-3 text-brand-slate whitespace-nowrap">
                  {new Date(b.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/quotes?userId=${b.id}`} className="text-brand-accent text-xs font-semibold hover:underline">
                    Quotes →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
