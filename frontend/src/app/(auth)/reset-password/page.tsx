"use client"

import { Suspense, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react"
import { apiPost } from "@/lib/api"

function ResetForm() {
  const params        = useSearchParams()
  const router        = useRouter()
  const token         = params.get("token") ?? ""
  const [password, setPassword]         = useState("")
  const [confirm, setConfirm]           = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [done, setDone]                 = useState(false)
  const [error, setError]               = useState("")

  if (!token) {
    return (
      <div className="text-center py-4">
        <p className="text-red-600 font-semibold mb-4">Invalid or missing reset link.</p>
        <Link href="/forgot-password" className="text-brand-accent text-sm hover:underline">
          Request a new link
        </Link>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 6)   { setError("Password must be at least 6 characters."); return }
    if (password !== confirm)  { setError("Passwords do not match."); return }
    setLoading(true)
    setError("")
    try {
      const res = await apiPost("/auth/reset-password", { token, password })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? "Reset failed. The link may have expired.")
      } else {
        setDone(true)
        setTimeout(() => router.push("/login"), 3000)
      }
    } catch {
      setError("Something went wrong. Please try again.")
    }
    setLoading(false)
  }

  if (done) {
    return (
      <div className="text-center py-4">
        <CheckCircle className="w-14 h-14 text-brand-accent mx-auto mb-4" />
        <h1 className="text-xl font-bold text-brand-navy mb-2">Password Reset!</h1>
        <p className="text-sm text-brand-slate">Your password has been updated. Redirecting to sign in…</p>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-xl font-bold text-brand-navy mb-2">Set New Password</h1>
      <p className="text-sm text-brand-slate mb-6">Choose a strong password for your account.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-5">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-brand-slate">New Password</label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-brand-border px-4 py-3 pr-11 text-sm outline-none focus:border-brand-accent transition-colors"
              placeholder="Min. 6 characters"
              autoComplete="new-password"
            />
            <button type="button" onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-ash hover:text-brand-slate">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-brand-border px-4 py-3 text-sm outline-none focus:border-brand-accent transition-colors"
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-brand-accent text-white font-semibold py-3 text-sm hover:bg-brand-accent-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Saving…" : "Reset Password"}
        </button>
      </form>
    </>
  )
}

export default function ResetPasswordPage() {
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
          <Suspense fallback={<div className="text-sm text-brand-slate">Loading…</div>}>
            <ResetForm />
          </Suspense>
        </div>
        <p className="text-center mt-6 text-xs text-brand-ash">
          <Link href="/login" className="hover:text-brand-accent transition-colors">← Back to Sign In</Link>
        </p>
      </div>
    </div>
  )
}
