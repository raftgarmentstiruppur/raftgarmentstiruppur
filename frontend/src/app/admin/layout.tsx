"use client"

import Link from "next/link"
import { useAuthContext } from "@/context/AuthContext"
import { getStoredToken } from "@/lib/api"
import AdminShell from "@/components/admin/AdminShell"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext()

  // Render immediately if admin user is already known from localStorage
  if (!user || user.role !== "ADMIN") {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-light-gray">
          <div className="w-5 h-5 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )
    }
    const hasToken = getStoredToken()
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light-gray">
        <div className="text-center space-y-4">
          <p className="text-brand-slate text-sm">
            {hasToken ? "Session expired. Please sign in again." : "Admin access required."}
          </p>
          <Link href="/login" className="inline-block bg-brand-navy text-white px-6 py-2.5 text-sm font-semibold hover:bg-brand-charcoal transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return <AdminShell>{children}</AdminShell>
}
