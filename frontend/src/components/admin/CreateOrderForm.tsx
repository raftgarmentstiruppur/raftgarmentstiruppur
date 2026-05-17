"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { apiPost } from "@/lib/api"

interface CreateOrderFormProps {
  quoteId: string
  userId: string
  product: string
}

export default function CreateOrderForm({ quoteId, userId, product }: CreateOrderFormProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState("")
  const [unitPrice, setUnitPrice] = useState("")
  const [notes, setNotes] = useState("")
  const [estimatedDelivery, setEstimatedDelivery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleCreate() {
    setError("")
    if (!quantity || parseInt(quantity) <= 0) { setError("Quantity is required."); return }
    setLoading(true)
    const res = await apiPost("/orders", {
      quoteId, userId, product,
      quantity: parseInt(quantity),
      unitPrice: unitPrice ? parseFloat(unitPrice) : undefined,
      notes,
      estimatedDelivery: estimatedDelivery || undefined,
    })
    setLoading(false)
    if (!res.ok) { const j = await res.json(); setError(j.error ?? "Failed to create order."); return }
    router.refresh()
    router.push("/admin/orders")
  }

  const inputCls = "w-full border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand-accent bg-white transition-colors"

  return (
    <div className="bg-brand-light-gray border border-brand-border p-6 space-y-4">
      <h3 className="font-bold text-black uppercase tracking-tight text-sm">Create Order from this Quote</h3>
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">Quantity *</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 1000"
            autoComplete="off"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">Unit Price (USD)</label>
          <input
            type="number"
            step="0.01"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            placeholder="e.g. 4.50"
            autoComplete="off"
            className={inputCls}
          />
        </div>
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
        <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">Internal Notes</label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes for production team..."
          autoComplete="off"
          className={`${inputCls} resize-none`}
        />
      </div>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full bg-black text-white font-bold py-2.5 text-xs uppercase tracking-widest hover:bg-brand-charcoal transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Creating…" : "Create Order"}
      </button>
    </div>
  )
}
