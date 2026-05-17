"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { NavItem } from "@/types"
import { cn } from "@/lib/utils"
import { useAuthContext } from "@/context/AuthContext"

interface NavMobileProps {
  items: NavItem[]
}

export default function NavMobile({ items }: NavMobileProps) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const { user } = useAuthContext()

  const portalLink = user?.role === "ADMIN"
    ? { href: "/admin",     label: "Admin Panel" }
    : user?.role === "BUYER"
    ? { href: "/dashboard", label: "My Dashboard" }
    : { href: "/login",     label: "Sign In" }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const close = () => { setOpen(false); setExpanded(null) }

  return (
    <>
      <motion.button
        className="lg:hidden p-2 text-white cursor-pointer"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        whileTap={{ scale: 0.9 }}
      >
        <Menu className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={close}
            />

            {/* Drawer */}
            <motion.div
              className="relative w-72 sm:w-80 bg-black h-full flex flex-col shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 h-16">
                <Link href="/" onClick={close}>
                  <Image src="/logo.png" alt="Raft Garments" width={90} height={44} className="h-9 w-auto object-contain" />
                </Link>
                <motion.button
                  onClick={close}
                  className="text-white/60 hover:text-white p-1 transition-colors"
                  aria-label="Close menu"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-4">
                {items.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.04, duration: 0.25, ease: "easeOut" }}
                  >
                    {item.megaMenu ? (
                      <>
                        <button
                          className="flex items-center justify-between w-full px-5 py-3.5 text-sm font-semibold uppercase tracking-wide text-white hover:text-brand-accent transition-colors cursor-pointer"
                          onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-200 text-white/40",
                              expanded === item.label && "rotate-180 text-brand-accent"
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {expanded === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
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
                            </motion.div>
                          )}
                        </AnimatePresence>
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
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTAs */}
              <motion.div
                className="px-5 pb-8 pt-4 border-t border-white/10 space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.25 }}
              >
                <Link
                  href={portalLink.href}
                  className="block w-full text-center border border-white/20 text-white/80 font-semibold py-3 text-sm uppercase tracking-wide hover:border-white hover:text-white transition-colors"
                  onClick={close}
                >
                  {portalLink.label}
                </Link>
                <Link
                  href="/contact"
                  className="block w-full text-center bg-brand-accent text-white font-bold py-3 text-xs uppercase tracking-widest hover:bg-brand-accent-hover transition-colors"
                  onClick={close}
                >
                  Get a Quote
                </Link>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
