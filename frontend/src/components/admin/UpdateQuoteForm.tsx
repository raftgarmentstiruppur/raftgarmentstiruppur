"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { apiPatch } from "@/lib/api"

interface UpdateQuoteFormProps {
  quoteId: string
  currentStatus: string
  currentNotes?: string | null
  currentPrice?: string | null
  onUpdated?: () => void
}

const STATUSES = ["PENDING", "REVIEWING", "QUOTED", "ACCEPTED", "REJECTED"]
const LABELS: Record<string, string> = {
  PENDING: "Pending", REVIEWING: "Reviewing", QUOTED: "Quoted",
  ACCEPTED: "Accepted", REJECTED: "Rejected",
}

export default function UpdateQuoteForm({
  quoteId, currentStatus, currentNotes, currentPrice, onUpdated,
}: UpdateQuoteFormProps) {
  const [status, setStatus] = useState(currentStatus)
  const [notes, setNotes] = useState(currentNotes ?? "")
  const [price, setPrice] = useState(currentPrice ?? "")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setSaving(true); setSaved(false)
    await apiPatch(`/quotes/${quoteId}`, { status, adminNotes: notes, quotedPrice: price })
    setSaving(false); setSaved(true)
    onUpdated?.()
    setTimeout(() => setSaved(false), 3000)
  }

  const inputCls = "w-full border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand-accent bg-white transition-colors"

  return (
    <div className="bg-white border border-brand-border p-6 space-y-4">
      <h3 className="font-bold text-black uppercase tracking-tight text-sm">Admin Actions</h3>

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
        <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">Quoted Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g. USD 4.50 per unit"
          autoComplete="off"
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">Notes to Buyer</label>
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes visible to the buyer..."
          autoComplete="off"
          className={`${inputCls} resize-none`}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-black text-white font-bold py-2.5 text-xs uppercase tracking-widest hover:bg-brand-charcoal transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
        {saving ? "Saving…" : saved ? "✓ Saved" : "Save Changes"}
      </button>
    </div>
  )
}
