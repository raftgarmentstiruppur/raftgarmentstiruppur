"use client"

import ScrollLink from "@/components/shared/ScrollLink"
import { usePathname } from "next/navigation"
import { useState, useRef, useCallback, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { NavItem } from "@/types"
import { cn } from "@/lib/utils"

interface NavDesktopProps { items: NavItem[] }

export default function NavDesktop({ items }: NavDesktopProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timer.current) { clearTimeout(timer.current); timer.current = null }
  }, [])

  const enter = useCallback((label: string) => {
    clearTimer()
    setOpen(label)
  }, [clearTimer])

  const leave = useCallback(() => {
    clearTimer()
    // 300ms — generous enough to cross any gap without flickering
    timer.current = setTimeout(() => setOpen(null), 300)
  }, [clearTimer])

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null) }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <nav role="navigation" aria-label="Main navigation" className="flex items-center gap-0">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
        const isOpen   = open === item.label
        const hasMenu  = !!item.megaMenu

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => hasMenu && enter(item.label)}
            onMouseLeave={leave}
          >
            <ScrollLink
              href={item.href}
              aria-haspopup={hasMenu ? "true" : undefined}
              aria-expanded={hasMenu ? isOpen : undefined}
              onKeyDown={(e) => {
                if (hasMenu && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault()
                  isOpen ? setOpen(null) : enter(item.label)
                }
              }}
              className={cn(
                "group relative flex items-center gap-1 px-2 lg:px-3 xl:px-4 py-2 text-xs lg:text-sm xl:text-base font-black uppercase tracking-wide transition-colors duration-200 whitespace-nowrap",
                isActive ? "text-brand-accent" : "text-white hover:text-brand-accent"
              )}
            >
              <span className={cn(
                "absolute bottom-0 left-4 right-4 h-0.5 bg-brand-accent transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] origin-left",
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )} />
              {item.label}
              {hasMenu && (
                <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", isOpen && "rotate-180")} />
              )}
            </ScrollLink>

            <AnimatePresence>
              {hasMenu && isOpen && (
                <>
                  {/* Invisible bridge — fills the gap between trigger bottom and dropdown top
                      so the mouse never leaves the hover zone */}
                  <div className="absolute left-0 right-0 h-2 top-full z-40" />

                  <motion.div
                    role="menu"
                    aria-label={`${item.label} submenu`}
                    initial={{ opacity: 0, scaleY: 0.95 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0.95 }}
                    transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ transformOrigin: "top" }}
                    className={cn(
                      "absolute top-full mt-1 bg-white border-t-2 border-brand-accent shadow-2xl z-50 min-w-[200px]",
                      item.megaMenu!.length > 1 ? "left-1/2 -translate-x-1/2 w-80" : "left-0 w-52"
                    )}
                    onMouseEnter={() => enter(item.label)}
                    onMouseLeave={leave}
                  >
                    <div className={cn("p-5", item.megaMenu!.length > 1 ? "grid grid-cols-2 gap-6" : "grid grid-cols-1")}>
                      {item.megaMenu!.map((col) => (
                        <div key={col.heading}>
                          <p className="text-xs font-black uppercase tracking-widest text-brand-ash mb-3 pb-2 border-b border-brand-border">
                            {col.heading}
                          </p>
                          <ul className="space-y-0.5" role="none">
                            {col.links.map((link) => (
                              <li key={link.label} role="none">
                                <ScrollLink
                                  href={link.href}
                                  role="menuitem"
                                  onClick={() => setOpen(null)}
                                  className="group/link flex items-center gap-2 py-2.5 text-base font-semibold text-brand-charcoal hover:text-brand-accent transition-colors duration-150"
                                >
                                  <span className="w-0 group-hover/link:w-3 h-0.5 bg-brand-accent transition-all duration-200 overflow-hidden" />
                                  {link.label}
                                </ScrollLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </nav>
  )
}
