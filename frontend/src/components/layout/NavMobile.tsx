"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import ScrollLink from "@/components/shared/ScrollLink"
import { Menu, X, ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import type { NavItem } from "@/types"
import { useAuthContext } from "@/context/AuthContext"

interface NavMobileProps { items: NavItem[] }

export default function NavMobile({ items }: NavMobileProps) {
  const [open, setOpen]       = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { user }              = useAuthContext()

  // Only portal after hydration
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const close = () => { setOpen(false); setExpanded(null) }

  const portalHref  = user?.role === "ADMIN" ? "/admin" : user?.role === "BUYER" ? "/dashboard" : "/login"
  const portalLabel = user?.role === "ADMIN" ? "Admin Panel" : user?.role === "BUYER" ? "My Dashboard" : "Sign In"

  const drawer = (
    <AnimatePresence>
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.55)" }}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "82vw",
              maxWidth: "320px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#06194A",
              boxShadow: "6px 0 40px rgba(0,0,0,0.6)",
              overflowY: "auto",
            }}
          >

            {/* Header row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
              height: 64,
              flexShrink: 0,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Menu
              </span>
              <button onClick={close} aria-label="Close menu" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 0, padding: 4 }}>
                <X size={20} />
              </button>
            </div>

            {/* Nav items */}
            <nav style={{ flex: 1 }}>
              {items.map((item) => (
                <div key={item.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>

                  {item.megaMenu ? (
                    <>
                      <button
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          width: "100%", padding: "17px 20px",
                          background: "none", border: "none", cursor: "pointer",
                          color: "#fff", fontSize: 13, fontWeight: 700,
                          letterSpacing: "0.1em", textTransform: "uppercase",
                          textAlign: "left",
                        }}
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          style={{
                            color: "rgba(255,255,255,0.4)",
                            transform: expanded === item.label ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s",
                            flexShrink: 0,
                          }}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {expanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: "hidden" }}
                          >
                            <div style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                              {item.megaMenu.map((col) => (
                                <div key={col.heading}>
                                  <p style={{
                                    padding: "10px 20px 4px 28px",
                                    fontSize: 9, fontWeight: 700,
                                    letterSpacing: "0.2em", textTransform: "uppercase",
                                    color: "rgba(255,255,255,0.35)",
                                    margin: 0,
                                  }}>
                                    {col.heading}
                                  </p>
                                  {col.links.map((link) => (
                                    <ScrollLink
                                      key={link.href}
                                      href={link.href}
                                      onClick={close}
                                      style={{
                                        display: "block",
                                        padding: "12px 20px 12px 28px",
                                        fontSize: 13, fontWeight: 500,
                                        color: "rgba(255,255,255,0.7)",
                                        textDecoration: "none",
                                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                                      }}
                                    >
                                      {link.label}
                                    </ScrollLink>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <ScrollLink
                      href={item.href}
                      onClick={close}
                      style={{
                        display: "block",
                        padding: "17px 20px",
                        color: "#fff", fontSize: 13, fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        textDecoration: "none",
                      }}
                    >
                      {item.label}
                    </ScrollLink>
                  )}

                </div>
              ))}
            </nav>

            {/* Bottom CTAs */}
            <div style={{ padding: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
              <ScrollLink
                href={portalHref}
                onClick={close}
                style={{
                  display: "block", textAlign: "center",
                  padding: "13px", marginBottom: 10,
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                {portalLabel}
              </ScrollLink>
              <ScrollLink
                href="/contact"
                onClick={close}
                style={{
                  display: "block", textAlign: "center", padding: "13px",
                  backgroundColor: "#43A047", color: "#fff",
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Get a Quote
              </ScrollLink>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {/* Hamburger — stays inside the navbar */}
      <button
        className="xl:hidden p-2 text-white"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Drawer — portalled directly onto document.body, bypassing the transformed header */}
      {mounted && createPortal(drawer, document.body)}
    </>
  )
}
