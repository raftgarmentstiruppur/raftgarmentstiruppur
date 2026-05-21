"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useAuthContext } from "@/context/AuthContext"
import {
  LayoutDashboard, FileText, Package, Users,
  LayoutPanelLeft, ShoppingBag, LogOut, Menu, X, ArrowLeft, Download,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Overview", href: "/admin",          icon: LayoutDashboard },
  { label: "Quotes",   href: "/admin/quotes",   icon: FileText },
  { label: "Orders",   href: "/admin/orders",   icon: Package },
  { label: "Buyers",   href: "/admin/users",    icon: Users },
  { label: "Products", href: "/admin/products", icon: ShoppingBag },
  { label: "Content",   href: "/admin/content",   icon: LayoutPanelLeft },
  { label: "Downloads", href: "/admin/downloads", icon: Download },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname          = usePathname()
  const { signOut }       = useAuthContext()
  const [open, setOpen]   = useState(false)

  // Close drawer on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll when drawer open on mobile
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex flex-col gap-0.5">
          <Image src="/logo.png" alt="Raft Garments" width={90} height={44} className="h-9 w-auto object-contain brightness-0 invert" />
          <p className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">Admin Panel</p>
        </Link>
        {/* Close button — mobile only */}
        <button onClick={() => setOpen(false)} className="lg:hidden text-white/50 hover:text-white p-1">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 text-sm font-semibold transition-colors rounded-sm",
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

      {/* Bottom actions */}
      <div className="p-3 border-t border-white/10 space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to website
        </Link>
        <button
          onClick={() => signOut("/")}
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/50 hover:text-white w-full transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-brand-light-gray flex">

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex w-60 bg-brand-dark text-white flex-col shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* ── Mobile: backdrop ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/55 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Mobile: slide-in drawer ── */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-72 bg-brand-dark text-white flex flex-col lg:hidden transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">

        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-brand-dark text-white flex items-center gap-4 px-4 h-14 border-b border-white/10 shrink-0">
          <button
            onClick={() => setOpen(true)}
            className="p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/">
            <Image src="/logo.png" alt="Raft Garments" width={80} height={40} className="h-8 w-auto object-contain brightness-0 invert" />
          </Link>
          <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest ml-auto">Admin</span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
