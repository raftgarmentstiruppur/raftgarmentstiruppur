import { cn } from "@/lib/utils"

const quoteColors: Record<string, string> = {
  PENDING:   "bg-yellow-50 text-yellow-700 border-yellow-200",
  REVIEWING: "bg-blue-50 text-blue-700 border-blue-200",
  QUOTED:    "bg-purple-50 text-purple-700 border-purple-200",
  ACCEPTED:  "bg-green-50 text-green-700 border-green-200",
  REJECTED:  "bg-red-50 text-red-700 border-red-200",
}

const orderColors: Record<string, string> = {
  CONFIRMED:     "bg-blue-50 text-blue-700 border-blue-200",
  IN_PRODUCTION: "bg-orange-50 text-orange-700 border-orange-200",
  QUALITY_CHECK: "bg-purple-50 text-purple-700 border-purple-200",
  SHIPPED:       "bg-cyan-50 text-cyan-700 border-cyan-200",
  DELIVERED:     "bg-green-50 text-green-700 border-green-200",
  CANCELLED:     "bg-red-50 text-red-700 border-red-200",
}

const labels: Record<string, string> = {
  PENDING: "Pending", REVIEWING: "Reviewing", QUOTED: "Quoted",
  ACCEPTED: "Accepted", REJECTED: "Rejected",
  CONFIRMED: "Confirmed", IN_PRODUCTION: "In Production",
  QUALITY_CHECK: "Quality Check", SHIPPED: "Shipped",
  DELIVERED: "Delivered", CANCELLED: "Cancelled",
}

export function QuoteStatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 text-xs font-semibold border", quoteColors[status] ?? "bg-gray-50 text-gray-700 border-gray-200")}>
      {labels[status] ?? status}
    </span>
  )
}

export function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 text-xs font-semibold border", orderColors[status] ?? "bg-gray-50 text-gray-700 border-gray-200")}>
      {labels[status] ?? status}
    </span>
  )
}
