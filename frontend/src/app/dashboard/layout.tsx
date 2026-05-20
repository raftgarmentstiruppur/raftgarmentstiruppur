"use client"

import Link from "next/link"
import { useAuthContext } from "@/context/AuthContext"
import { getStoredToken } from "@/lib/api"
import DashboardShell from "@/components/dashboard/DashboardShell"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext()

  // Show content immediately if user is already known (from localStorage seed)
  if (!user) {
    if (loading) {
      // Still verifying — show minimal spinner only when user data isn't cached
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
            {hasToken ? "Session expired. Please sign in again." : "Please sign in to access your dashboard."}
          </p>
          <Link href="/login" className="inline-block bg-brand-navy text-white px-6 py-2.5 text-sm font-semibold hover:bg-brand-charcoal transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <DashboardShell userName={user.name} userCompany={user.company}>
      {children}
    </DashboardShell>
  )
}
