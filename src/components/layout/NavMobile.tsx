"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import type { NavItem } from "@/types"
import { cn } from "@/lib/utils"

export default function NavMobile({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const close = () => { setOpen(false); setExpanded(null) }

  return (
    <>
      <button className="lg:hidden p-2 text-brand-navy" aria-label="Open menu" onClick={() => setOpen(true)}>
        <Menu className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/70" onClick={close} />
          <div className="relative w-72 bg-white border-r-2 border-brand-navy h-full flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b-2 border-brand-navy">
              <span className="font-display text-xl uppercase tracking-widest text-brand-navy">Menu</span>
              <button onClick={close} className="text-brand-navy p-1"><X className="w-5 h-5" /></button>
            </div>

            <nav className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <div key={item.label} className="border-b border-brand-border">
                  {item.megaMenu ? (
                    <>
                      <button
                        className="flex items-center justify-between w-full px-5 py-4 text-xs font-heading font-700 uppercase tracking-[0.2em] text-brand-navy hover:text-brand-accent transition-colors"
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", expanded === item.label && "rotate-180")} />
                      </button>
                      {expanded === item.label && (
                        <div className="bg-brand-light-gray border-t border-brand-border px-5 py-3">
                          {item.megaMenu.map((col) => (
                            <div key={col.heading} className="mb-3">
                              <p className="text-[9px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash mb-2">{col.heading}</p>
                              {col.links.map((link) => (
                                <Link key={link.label} href={link.href} className="block py-1.5 text-xs text-brand-navy hover:text-brand-accent transition-colors font-sans" onClick={close}>{link.label}</Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} className="block px-5 py-4 text-xs font-heading font-700 uppercase tracking-[0.2em] text-brand-navy hover:text-brand-accent transition-colors" onClick={close}>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="p-5 border-t-2 border-brand-navy space-y-3">
              <Link href="/login" className="block w-full text-center border-2 border-brand-navy text-brand-navy font-heading font-700 py-3 text-xs uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-colors" onClick={close}>Sign In</Link>
              <Link href="/contact" className="block w-full text-center bg-brand-navy text-white font-heading font-700 py-3 text-xs uppercase tracking-widest hover:bg-brand-accent transition-colors" onClick={close}>Get a Quote</Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
