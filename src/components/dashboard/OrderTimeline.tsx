import { cn } from "@/lib/utils"

const STEPS = [
  { key: "CONFIRMED",     label: "Order Confirmed" },
  { key: "IN_PRODUCTION", label: "In Production" },
  { key: "QUALITY_CHECK", label: "Quality Check" },
  { key: "SHIPPED",       label: "Shipped" },
  { key: "DELIVERED",     label: "Delivered" },
]

const ORDER = STEPS.map((s) => s.key)

interface HistoryEntry {
  status: string
  note?: string | null
  createdAt: string | Date
}

interface OrderTimelineProps {
  currentStatus: string
  history: HistoryEntry[]
}

export default function OrderTimeline({ currentStatus, history }: OrderTimelineProps) {
  if (currentStatus === "CANCELLED") {
    return (
      <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
        This order has been cancelled.
      </div>
    )
  }

  const currentIdx = ORDER.indexOf(currentStatus)

  return (
    <div className="space-y-0">
      {STEPS.map((step, i) => {
        const done = i <= currentIdx
        const current = i === currentIdx
        const historyEntry = history.find((h) => h.status === step.key)

        return (
          <div key={step.key} className="flex gap-4">
            {/* Line + dot */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 shrink-0 mt-1",
                  done
                    ? "bg-brand-accent border-brand-accent"
                    : "bg-white border-brand-border"
                )}
              />
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "w-0.5 flex-1 my-1",
                    done && i < currentIdx ? "bg-brand-accent" : "bg-brand-border"
                  )}
                />
              )}
            </div>
            {/* Content */}
            <div className={cn("pb-6", i === STEPS.length - 1 && "pb-0")}>
              <p
                className={cn(
                  "font-semibold text-sm",
                  current ? "text-brand-navy" : done ? "text-brand-charcoal" : "text-brand-ash"
                )}
              >
                {step.label}
                {current && (
                  <span className="ml-2 text-xs font-normal text-brand-accent">← Current</span>
                )}
              </p>
              {historyEntry && (
                <p className="text-xs text-brand-slate mt-0.5">
                  {new Date(historyEntry.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  {historyEntry.note && ` · ${historyEntry.note}`}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
