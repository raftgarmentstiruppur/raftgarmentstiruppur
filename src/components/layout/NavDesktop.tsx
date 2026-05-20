"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef } from "react"
import { ChevronDown } from "lucide-react"
import type { NavItem } from "@/types"
import { cn } from "@/lib/utils"

export default function NavDesktop({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const enter = (label: string) => { if (timer.current) clearTimeout(timer.current); setOpenMenu(label) }
  const leave = () => { timer.current = setTimeout(() => setOpenMenu(null), 200) }

  return (
    <nav className="hidden lg:flex items-center">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/")
        const open = openMenu === item.label

        return (
          <div key={item.label} className="relative" onMouseEnter={() => item.megaMenu && enter(item.label)} onMouseLeave={leave}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-1 px-4 py-5 text-xs font-heading font-700 uppercase tracking-[0.2em] transition-colors whitespace-nowrap border-b-2",
                active ? "text-brand-accent border-brand-accent" : "text-brand-navy border-transparent hover:text-brand-accent hover:border-brand-accent"
              )}
            >
              {item.label}
              {item.megaMenu && <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", open && "rotate-180")} />}
            </Link>

            {item.megaMenu && open && (
              <div
                className={cn("absolute top-full bg-white border-2 border-brand-navy border-t-0 z-50", item.megaMenu.length === 1 ? "left-0 w-52" : "left-1/2 -translate-x-1/2 w-80")}
                onMouseEnter={() => enter(item.label)} onMouseLeave={leave}
              >
                <div className={cn("p-5", item.megaMenu.length === 1 ? "grid grid-cols-1" : "grid grid-cols-2 gap-5")}>
                  {item.megaMenu.map((col) => (
                    <div key={col.heading}>
                      <p className="text-[9px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash mb-3 border-b border-brand-border pb-2">{col.heading}</p>
                      <ul className="space-y-0">
                        {col.links.map((link) => (
                          <li key={link.label}>
                            <Link href={link.href} className="block py-1.5 text-xs text-brand-navy hover:text-brand-accent hover:pl-2 transition-all font-sans font-500" onClick={() => setOpenMenu(null)}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
