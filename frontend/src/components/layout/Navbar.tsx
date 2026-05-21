"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import ScrollLink from "@/components/shared/ScrollLink"
import { motion } from "framer-motion"
import { navItems } from "@/data/navigation"
import NavDesktop from "./NavDesktop"
import NavMobile from "./NavMobile"
import { useAuthContext } from "@/context/AuthContext"

export default function Navbar() {
  const { user } = useAuthContext()
  const [mounted, setMounted]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const portalLink = mounted && user?.role === "ADMIN"
    ? { href: "/admin",     label: "Admin" }
    : mounted && user?.role === "BUYER"
    ? { href: "/dashboard", label: "Dashboard" }
    : { href: "/login",     label: "Sign in" }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        background: scrolled ? "rgba(6,25,74,0.98)" : "rgba(6,25,74,0.90)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled ? "0 8px 40px rgba(6,25,74,0.5)" : "none",
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 22, delay: 0.1 }}
    >
      {/* Top accent line */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-brand-accent to-transparent" />

      <div className="px-3 sm:px-5 lg:px-6 xl:px-10 w-full max-w-[1600px] mx-auto">

        {/* 3-column: Logo | Nav (centered) | Actions */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-[60px] xl:h-[72px] gap-2 xl:gap-6">

          {/* ── LOGO ── */}
          <ScrollLink href="/" className="flex items-center shrink-0">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="logo-glow bg-white px-2 py-1 lg:px-2.5 xl:px-3"
            >
              <Image
                src="/logo.png"
                alt="Raft Garments"
                width={220}
                height={108}
                className="h-[38px] xl:h-[52px] w-auto object-contain"
                priority
              />
            </motion.div>
          </ScrollLink>

          {/* ── NAV LINKS — centered, desktop only ── */}
          <div className="hidden xl:flex justify-center min-w-0">
            <NavDesktop items={navItems} />
          </div>

          {/* ── RIGHT ACTIONS ── */}
          <div className="flex items-center gap-2 xl:gap-3 shrink-0">
            <div className="hidden xl:flex items-center gap-2 xl:gap-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <ScrollLink
                  href={portalLink.href}
                  className="text-xs xl:text-sm font-semibold text-white/75 hover:text-white transition-colors duration-200 uppercase tracking-wide whitespace-nowrap"
                >
                  {portalLink.label}
                </ScrollLink>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, type: "spring", stiffness: 200 }}
              >
                <ScrollLink
                  href="/contact"
                  className="group relative overflow-hidden bg-brand-accent text-white text-xs xl:text-sm font-black px-3 xl:px-5 py-2 xl:py-2.5 uppercase tracking-wide inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span className="absolute inset-0 bg-brand-accent-hover -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                  <span className="relative z-10">Get a Quote</span>
                  <span className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                </ScrollLink>
              </motion.div>
            </div>

            {/* Mobile hamburger */}
            <NavMobile items={navItems} />
          </div>

        </div>
      </div>
    </motion.header>
  )
}
