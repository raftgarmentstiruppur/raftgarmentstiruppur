"use client"

import { useEffect, useState } from "react"
import { Download, Eye, Pencil, Trash2, X, Save, Loader2 } from "lucide-react"
import { getStoredToken } from "@/lib/api"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

interface DownloadRecord {
  id: string
  name: string
  email: string
  company: string
  phone: string | null
  document: string
  createdAt: string
}

type ModalMode = "view" | "edit" | null

export default function AdminDownloadsPage() {
  const [records, setRecords]     = useState<DownloadRecord[]>([])
  const [loading, setLoading]     = useState(true)
  const [selected, setSelected]   = useState<DownloadRecord | null>(null)
  const [mode, setMode]           = useState<ModalMode>(null)
  const [editForm, setEditForm]   = useState<Partial<DownloadRecord>>({})
  const [saving, setSaving]       = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const fetchRecords = () => {
    const token = getStoredToken()
    if (!token) return
    fetch(`${API}/downloads`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { setRecords(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchRecords() }, [])

  const openView = (r: DownloadRecord) => { setSelected(r); setMode("view") }
  const openEdit = (r: DownloadRecord) => { setSelected(r); setEditForm({ ...r }); setMode("edit") }
  const closeModal = () => { setSelected(null); setMode(null); setEditForm({}) }

  const handleSave = async () => {
    if (!selected) return
    setSaving(true)
    const token = getStoredToken()
    try {
      const res = await fetch(`${API}/downloads/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editForm),
      })
      if (res.ok) {
        fetchRecords()
        closeModal()
      }
    } finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    const token = getStoredToken()
    try {
      await fetch(`${API}/downloads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setRecords(prev => prev.filter(r => r.id !== id))
      if (selected?.id === id) closeModal()
    } finally { setDeletingId(null); setConfirmId(null) }
  }

  const field = (key: keyof DownloadRecord, label: string, type = "text") => (
    <div key={key}>
      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">{label}</label>
      <input
        type={type}
        value={(editForm[key] as string) ?? ""}
        onChange={e => setEditForm(prev => ({ ...prev, [key]: e.target.value }))}
        className="w-full border border-brand-border px-3 py-2 text-sm text-brand-navy focus:outline-none focus:border-brand-accent"
      />
    </div>
  )

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Download className="w-6 h-6 text-brand-accent" />
        <h1 className="text-2xl font-bold text-brand-navy">Download Requests</h1>
        <span className="ml-auto bg-brand-light-gray text-brand-navy text-xs font-bold px-3 py-1 rounded-full">
          {records.length} total
        </span>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-brand-ash">Loading…</p>
      ) : records.length === 0 ? (
        <div className="text-center py-20 text-brand-ash">
          <Download className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No download requests yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-brand-border">
          <table className="w-full text-sm">
            <thead className="bg-brand-dark text-white">
              <tr>
                {["Name", "Email", "Company", "Phone", "Document", "Date", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-black uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={r.id} className={i % 2 === 0 ? "bg-white" : "bg-brand-light-gray"}>
                  <td className="px-4 py-3 font-semibold text-brand-navy whitespace-nowrap">{r.name}</td>
                  <td className="px-4 py-3 text-brand-slate">{r.email}</td>
                  <td className="px-4 py-3 text-brand-slate whitespace-nowrap">{r.company}</td>
                  <td className="px-4 py-3 text-brand-ash">{r.phone ?? "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="bg-brand-accent/10 text-brand-accent text-xs font-bold px-2 py-1 rounded">
                      {r.document}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-brand-ash whitespace-nowrap">
                    {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openView(r)}
                        className="p-1.5 rounded hover:bg-brand-light-gray text-brand-slate hover:text-brand-navy transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEdit(r)}
                        className="p-1.5 rounded hover:bg-brand-light-gray text-brand-slate hover:text-brand-navy transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      {confirmId === r.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(r.id)}
                            disabled={deletingId === r.id}
                            className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 disabled:opacity-60"
                          >
                            {deletingId === r.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Yes"}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(r.id)}
                          className="p-1.5 rounded hover:bg-red-50 text-brand-ash hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View / Edit Modal */}
      {mode && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={e => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white w-full max-w-lg shadow-2xl">

            {/* Modal header */}
            <div className="bg-brand-dark px-6 py-4 flex items-center justify-between">
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                {mode === "view" ? "Download Request Details" : "Edit Download Request"}
              </h2>
              <button onClick={closeModal} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-4">
              {mode === "view" ? (
                <>
                  {[
                    { label: "Name",     value: selected.name },
                    { label: "Email",    value: selected.email },
                    { label: "Company",  value: selected.company },
                    { label: "Phone",    value: selected.phone ?? "—" },
                    { label: "Document", value: selected.document },
                    { label: "Date",     value: new Date(selected.createdAt).toLocaleString("en-IN") },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-4 border-b border-brand-border pb-3 last:border-0">
                      <span className="text-xs font-black uppercase tracking-wider text-brand-ash w-24 shrink-0 pt-0.5">{label}</span>
                      <span className="text-sm text-brand-navy font-medium">{value}</span>
                    </div>
                  ))}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => { setEditForm({ ...selected }); setMode("edit") }}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-charcoal transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => setConfirmId(selected.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                  {confirmId === selected.id && (
                    <div className="bg-red-50 border border-red-200 p-3 rounded text-sm text-red-700">
                      <p className="font-semibold mb-2">Delete this record? This cannot be undone.</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(selected.id)}
                          disabled={!!deletingId}
                          className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700 disabled:opacity-60 flex items-center gap-1"
                        >
                          {deletingId ? <Loader2 className="w-3 h-3 animate-spin" /> : null} Confirm Delete
                        </button>
                        <button onClick={() => setConfirmId(null)} className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-bold rounded">
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {field("name",     "Full Name")}
                  {field("email",    "Email", "email")}
                  {field("company",  "Company")}
                  {field("phone",    "Phone")}
                  {field("document", "Document")}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-accent-hover transition-colors disabled:opacity-60"
                    >
                      {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      Save Changes
                    </button>
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-brand-border text-brand-slate text-xs font-bold uppercase tracking-wider hover:bg-brand-light-gray transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
