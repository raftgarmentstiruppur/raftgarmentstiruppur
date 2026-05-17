"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LayoutDashboard, FileText, Package, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Overview",   href: "/dashboard",         icon: LayoutDashboard },
  { label: "My Quotes",  href: "/dashboard/quotes",  icon: FileText },
  { label: "My Orders",  href: "/dashboard/orders",  icon: Package },
]

interface DashboardShellProps {
  children: React.ReactNode
  userName?: string
  userCompany?: string
}

export default function DashboardShell({ children, userName, userCompany }: DashboardShellProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-brand-light-gray flex">
      {/* Sidebar */}
      <aside className="w-60 bg-brand-navy text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="font-black text-lg tracking-tight text-white">
            RAFT<span className="font-light">GARMENTS</span>
          </Link>
          <p className="text-xs text-white/40 mt-0.5">Buyer Portal</p>
        </div>

        {userName && (
          <div className="px-6 py-4 border-b border-white/10">
            <p className="text-sm font-semibold text-white truncate">{userName}</p>
            <p className="text-xs text-white/50 truncate">{userCompany}</p>
          </div>
        )}

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-accent text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
