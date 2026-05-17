"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { NavItem } from "@/types"
import { cn } from "@/lib/utils"

interface NavDesktopProps {
  items: NavItem[]
}

export default function NavDesktop({ items }: NavDesktopProps) {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(label)
  }

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180)
  }

  return (
    <nav className="hidden lg:flex items-center">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
        const isOpen = openMenu === item.label
        const colCount = item.megaMenu?.length ?? 1

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => item.megaMenu && handleEnter(item.label)}
            onMouseLeave={handleLeave}
          >
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-1 px-4 py-6 text-sm font-semibold uppercase tracking-wide transition-colors duration-200 whitespace-nowrap",
                isActive ? "text-brand-accent" : "text-white hover:text-brand-accent"
              )}
            >
              {item.label}
              {item.megaMenu && (
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              )}
            </Link>

            <AnimatePresence>
              {item.megaMenu && isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -4, scaleY: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{ transformOrigin: "top" }}
                  className={cn(
                    "absolute top-full bg-white border-t-2 border-brand-accent shadow-2xl z-50",
                    colCount === 1
                      ? "left-0 w-56"
                      : "left-1/2 -translate-x-1/2 w-80"
                  )}
                  onMouseEnter={() => handleEnter(item.label)}
                  onMouseLeave={handleLeave}
                >
                  <div
                    className={cn(
                      "p-5",
                      colCount === 1 ? "grid grid-cols-1" : "grid grid-cols-2 gap-6"
                    )}
                  >
                    {item.megaMenu.map((col) => (
                      <div key={col.heading}>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ash mb-3 border-b border-brand-border pb-2">
                          {col.heading}
                        </p>
                        <ul className="space-y-1">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                className="block py-1.5 text-sm text-brand-charcoal hover:text-brand-accent hover:pl-2 transition-all duration-150 font-medium"
                                onClick={() => setOpenMenu(null)}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </nav>
  )
}
