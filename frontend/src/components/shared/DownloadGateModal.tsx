"use client"

import { useState } from "react"
import { X, Download, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

interface Props {
  document: string
  fileUrl: string
  onClose: () => void
}

export default function DownloadGateModal({ document, fileUrl, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${API}/downloads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, document }),
      })
      if (!res.ok) throw new Error("Failed")
      setDone(true)
      // Trigger download
      const a = window.document.createElement("a")
      a.href = fileUrl
      a.download = ""
      a.click()
      setTimeout(onClose, 2000)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="bg-white w-full max-w-md shadow-2xl relative"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          {/* Header */}
          <div className="bg-brand-dark px-6 py-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-brand-accent mb-0.5">Free download</p>
              <h2 className="text-lg font-black text-white">{document}</h2>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {done ? (
            <div className="px-6 py-12 text-center">
              <div className="w-14 h-14 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-brand-navy mb-2">Download started!</h3>
              <p className="text-brand-ash text-sm">Your file is downloading. Thank you for your interest in Raft Garments.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
              <p className="text-sm text-brand-ash">Please fill in your details to download this document.</p>

              {[
                { name: "name",    label: "Full name",    type: "text",  required: true },
                { name: "email",   label: "Email address", type: "email", required: true },
                { name: "company", label: "Company name", type: "text",  required: true },
                { name: "phone",   label: "Phone (optional)", type: "tel", required: false },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    required={f.required}
                    value={form[f.name as keyof typeof form]}
                    onChange={(e) => setForm(prev => ({ ...prev, [f.name]: e.target.value }))}
                    className="w-full border border-brand-border px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
              ))}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-black uppercase tracking-wider py-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {loading ? "Saving…" : "Download Now"}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
