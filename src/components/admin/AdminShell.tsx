"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LayoutDashboard, FileText, Package, Users, ImageIcon, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Overview", href: "/admin",        icon: LayoutDashboard },
  { label: "Quotes",   href: "/admin/quotes",  icon: FileText },
  { label: "Orders",   href: "/admin/orders",  icon: Package },
  { label: "Buyers",   href: "/admin/users",   icon: Users },
  { label: "Media",    href: "/admin/media",   icon: ImageIcon },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-brand-light-gray flex">
      <aside className="w-60 bg-black text-white flex flex-col shrink-0">
        <div className="px-6 py-5 border-b border-white/10">
          <Link href="/" className="font-black text-lg tracking-tight text-white uppercase">
            Raft<span className="font-light">Garments</span>
          </Link>
          <p className="text-[10px] text-brand-accent mt-0.5 font-bold uppercase tracking-widest">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-colors",
                  active
                    ? "bg-brand-accent text-white"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-0.5">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            ← Back to website
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/50 hover:text-white w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
