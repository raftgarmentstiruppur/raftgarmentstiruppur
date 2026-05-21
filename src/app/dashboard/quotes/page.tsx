export const dynamic = "force-dynamic"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import Link from "next/link"
import { QuoteStatusBadge } from "@/components/dashboard/StatusBadge"

export default async function MyQuotesPage() {
  const session = await auth()
  const quotes = await db.quoteRequest.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-navy">My Quote Requests</h1>
        <Link
          href="/contact"
          className="bg-brand-accent text-white text-sm font-semibold px-5 py-2 hover:bg-brand-accent-hover transition-colors"
        >
          + New Request
        </Link>
      </div>

      {quotes.length === 0 ? (
        <div className="bg-white border border-brand-border p-12 text-center">
          <p className="text-brand-slate mb-4">You haven&apos;t submitted any quote requests yet.</p>
          <Link href="/contact" className="text-brand-accent font-semibold hover:underline">
            Submit your first quote →
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-brand-border">
          <table className="w-full text-sm">
            <thead className="bg-brand-light-gray border-b border-brand-border">
              <tr>
                {["Date", "Product", "Inquiry Type", "Quoted Price", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-ash">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-brand-light-gray transition-colors">
                  <td className="px-4 py-3 text-brand-slate whitespace-nowrap">
                    {new Date(q.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3 font-medium text-brand-charcoal">{q.product}</td>
                  <td className="px-4 py-3 text-brand-slate">{q.inquiryType}</td>
                  <td className="px-4 py-3 text-brand-charcoal">
                    {q.quotedPrice ?? <span className="text-brand-ash">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <QuoteStatusBadge status={q.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/dashboard/quotes/${q.id}`} className="text-brand-accent text-xs font-semibold hover:underline">
                      View
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
