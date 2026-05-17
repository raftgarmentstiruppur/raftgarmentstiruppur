"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import type { NavItem } from "@/types"
import { cn } from "@/lib/utils"

interface NavMobileProps {
  items: NavItem[]
}

export default function NavMobile({ items }: NavMobileProps) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  const close = () => {
    setOpen(false)
    setExpanded(null)
  }

  return (
    <>
      <button
        className="lg:hidden p-2 text-white cursor-pointer"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" onClick={close} />

          {/* Drawer */}
          <div className="relative w-72 sm:w-80 bg-black h-full flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 h-16">
              <Link
                href="/"
                className="font-black text-lg tracking-tight text-white uppercase"
                onClick={close}
              >
                Raft<span className="font-light">Garments</span>
              </Link>
              <button
                onClick={close}
                className="text-white/60 hover:text-white p-1 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto py-4">
              {items.map((item) => (
                <div key={item.label}>
                  {item.megaMenu ? (
                    <>
                      <button
                        className="flex items-center justify-between w-full px-5 py-3.5 text-sm font-semibold uppercase tracking-wide text-white hover:text-brand-accent transition-colors cursor-pointer"
                        onClick={() =>
                          setExpanded(expanded === item.label ? null : item.label)
                        }
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-200 text-white/40",
                            expanded === item.label && "rotate-180 text-brand-accent"
                          )}
                        />
                      </button>

                      {expanded === item.label && (
                        <div className="bg-white/5 border-y border-white/10 py-3 mb-1">
                          {item.megaMenu.map((col) => (
                            <div key={col.heading} className="px-5 mb-3">
                              <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-2">
                                {col.heading}
                              </p>
                              {col.links.map((link) => (
                                <Link
                                  key={link.label}
                                  href={link.href}
                                  className="block py-2 text-sm text-white/70 hover:text-brand-accent transition-colors font-medium"
                                  onClick={close}
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-5 py-3.5 text-sm font-semibold uppercase tracking-wide text-white hover:text-brand-accent transition-colors"
                      onClick={close}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Bottom CTAs */}
            <div className="px-5 pb-8 pt-4 border-t border-white/10 space-y-3">
              <Link
                href="/login"
                className="block w-full text-center border border-white/20 text-white/80 font-semibold py-3 text-sm uppercase tracking-wide hover:border-white hover:text-white transition-colors"
                onClick={close}
              >
                Sign In
              </Link>
              <Link
                href="/contact"
                className="block w-full text-center bg-brand-accent text-white font-bold py-3 text-xs uppercase tracking-widest hover:bg-brand-accent-hover transition-colors"
                onClick={close}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
