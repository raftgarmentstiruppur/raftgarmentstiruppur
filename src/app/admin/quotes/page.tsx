export const dynamic = "force-dynamic"
import { db } from "@/lib/db"
import Link from "next/link"
import { QuoteStatusBadge } from "@/components/dashboard/StatusBadge"

export const dynamic = 'force-dynamic'

export default async function AdminQuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams

  const quotes = await db.quoteRequest.findMany({
    where: status ? { status: status as never } : {},
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, company: true } } },
  })

  const statuses = ["PENDING", "REVIEWING", "QUOTED", "ACCEPTED", "REJECTED"]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-navy">Quote Requests</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        <Link href="/admin/quotes" className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${!status ? "bg-brand-navy text-white border-brand-navy" : "border-brand-border text-brand-slate hover:border-brand-accent"}`}>
          All ({quotes.length})
        </Link>
        {statuses.map((s) => (
          <Link key={s} href={`/admin/quotes?status=${s}`} className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${status === s ? "bg-brand-navy text-white border-brand-navy" : "border-brand-border text-brand-slate hover:border-brand-accent"}`}>
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </Link>
        ))}
      </div>

      <div className="bg-white border border-brand-border">
        <table className="w-full text-sm">
          <thead className="bg-brand-light-gray border-b border-brand-border">
            <tr>
              {["Date", "Company", "Product", "Inquiry Type", "Status", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-ash">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {quotes.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-ash">No quotes found.</td></tr>
            ) : quotes.map((q) => (
              <tr key={q.id} className="hover:bg-brand-light-gray transition-colors">
                <td className="px-4 py-3 text-brand-slate whitespace-nowrap">{new Date(q.createdAt).toLocaleDateString("en-GB")}</td>
                <td className="px-4 py-3 font-medium text-brand-navy">{q.user?.company ?? q.company}</td>
                <td className="px-4 py-3 text-brand-charcoal">{q.product}</td>
                <td className="px-4 py-3 text-brand-slate">{q.inquiryType}</td>
                <td className="px-4 py-3"><QuoteStatusBadge status={q.status} /></td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/quotes/${q.id}`} className="text-brand-accent text-xs font-semibold hover:underline">Review →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
