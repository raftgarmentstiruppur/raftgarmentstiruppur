"use client"

import { useState } from "react"
import Link from "next/link"
import { Loader2, ArrowLeft, Mail, LinkIcon } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

export default function ForgotPasswordPage() {
  const [email, setEmail]       = useState("")
  const [loading, setLoading]   = useState(false)
  const [sent, setSent]         = useState(false)
  const [resetUrl, setResetUrl] = useState<string | null>(null)
  const [error, setError]       = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) { setError("Please enter your email address."); return }
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${API}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })
      let data: Record<string, string> = {}
      try { data = await res.json() } catch { /* non-JSON */ }

      if (!res.ok) {
        setError(data.error ?? `Error ${res.status}. Please try again.`)
      } else {
        setSent(true)
        if (data.resetUrl) setResetUrl(data.resetUrl)
      }
    } catch (err) {
      setError(`Network error: ${err instanceof Error ? err.message : "Could not connect to server (port 4000)."}`)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-brand-light-gray flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-black text-2xl tracking-tight text-brand-navy">
            RAFT<span className="font-light">GARMENTS</span>
          </Link>
          <p className="mt-2 text-sm text-brand-slate">B2B Buyer Portal</p>
        </div>

        <div className="bg-white border border-brand-border p-8">
          {sent ? (
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-4">
                {resetUrl ? <LinkIcon className="w-7 h-7 text-brand-accent" /> : <Mail className="w-7 h-7 text-brand-accent" />}
              </div>

              {resetUrl ? (
                <>
                  <h1 className="text-xl font-bold text-brand-navy mb-2">Use This Link to Reset</h1>
                  <p className="text-sm text-brand-slate mb-5 leading-relaxed">
                    Email service is not configured. Click the link below — it expires in <strong>1 hour</strong>.
                  </p>
                  <a
                    href={resetUrl}
                    className="inline-block w-full text-center bg-brand-accent text-white font-semibold py-3 text-sm hover:bg-brand-accent-hover transition-colors"
                  >
                    Reset My Password →
                  </a>
                  <p className="text-xs text-brand-ash mt-3 break-all select-all">{resetUrl}</p>
                </>
              ) : (
                <>
                  <h1 className="text-xl font-bold text-brand-navy mb-2">Check Your Inbox</h1>
                  <p className="text-sm text-brand-slate leading-relaxed">
                    If <strong>{email}</strong> is registered, you'll receive a reset link within a few minutes.
                    Also check your spam folder.
                  </p>
                  <button
                    onClick={() => { setSent(false); setResetUrl(null); setEmail("") }}
                    className="text-xs text-brand-accent hover:underline mt-4 inline-block"
                  >
                    ← Try a different email
                  </button>
                </>
              )}
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-brand-navy mb-2">Forgot Your Password?</h1>
              <p className="text-sm text-brand-slate mb-6">
                Enter your registered email and we'll send you a reset link.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-5 break-words">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">
                    Business Email
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-brand-border px-4 py-3 text-sm outline-none focus:border-brand-accent transition-colors"
                    placeholder="you@company.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-accent text-white font-semibold py-3 text-sm hover:bg-brand-accent-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Sending…" : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center mt-6 text-xs text-brand-ash">
          <Link href="/login" className="hover:text-brand-accent transition-colors flex items-center justify-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
