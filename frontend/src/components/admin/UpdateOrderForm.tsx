"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { apiPatch } from "@/lib/api"

const STATUSES = ["CONFIRMED", "IN_PRODUCTION", "QUALITY_CHECK", "SHIPPED", "DELIVERED", "CANCELLED"]
const LABELS: Record<string, string> = {
  CONFIRMED: "Confirmed", IN_PRODUCTION: "In Production", QUALITY_CHECK: "Quality Check",
  SHIPPED: "Shipped", DELIVERED: "Delivered", CANCELLED: "Cancelled",
}

interface UpdateOrderFormProps {
  orderId: string
  currentStatus: string
  currentTracking?: string | null
  onUpdated?: () => void
}

export default function UpdateOrderForm({ orderId, currentStatus, currentTracking, onUpdated }: UpdateOrderFormProps) {
  const [status, setStatus] = useState(currentStatus)
  const [tracking, setTracking] = useState(currentTracking ?? "")
  const [note, setNote] = useState("")
  const [estimatedDelivery, setEstimatedDelivery] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setSaving(true); setSaved(false)
    await apiPatch(`/orders/${orderId}`, {
      status,
      note: note || undefined,
      trackingNumber: tracking || undefined,
      estimatedDelivery: estimatedDelivery || undefined,
    })
    setSaving(false); setSaved(true)
    onUpdated?.()
    setTimeout(() => setSaved(false), 3000)
  }

  const inputCls = "w-full border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand-accent bg-white transition-colors"

  return (
    <div className="bg-white border border-brand-border p-6 space-y-4">
      <h3 className="font-bold text-brand-navy uppercase tracking-tight text-sm">Update Order Status</h3>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          autoComplete="off"
          className={inputCls}
        >
          {STATUSES.map((s) => <option key={s} value={s}>{LABELS[s]}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">Tracking Number</label>
        <input
          type="text"
          value={tracking}
          onChange={(e) => setTracking(e.target.value)}
          placeholder="e.g. 1Z999AA10123456784"
          autoComplete="off"
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">Est. Delivery Date</label>
        <input
          type="date"
          value={estimatedDelivery}
          onChange={(e) => setEstimatedDelivery(e.target.value)}
          autoComplete="off"
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">Status Note</label>
        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Fabric inspection complete, entering sewing stage..."
          autoComplete="off"
          className={`${inputCls} resize-none`}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-brand-navy text-white font-bold py-2.5 text-xs uppercase tracking-widest hover:bg-brand-charcoal transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
        {saving ? "Saving…" : saved ? "✓ Saved" : "Update Order"}
      </button>
    </div>
  )
}
