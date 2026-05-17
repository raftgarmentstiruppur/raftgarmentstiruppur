"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { navItems } from "@/data/navigation"
import NavDesktop from "./NavDesktop"
import NavMobile from "./NavMobile"
import { useAuthContext } from "@/context/AuthContext"

export default function Navbar() {
  const { user } = useAuthContext()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const portalLink = mounted && user?.role === "ADMIN"
    ? { href: "/admin",     label: "Admin Panel" }
    : mounted && user?.role === "BUYER"
    ? { href: "/dashboard", label: "My Dashboard" }
    : { href: "/login",     label: "Sign In" }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-white/10"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-28">
        <Link href="/" className="shrink-0 flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.94, transition: { duration: 0.1 } }}
            className="logo-glow"
          >
            <Image
              src="/logo.png"
              alt="Raft Garments"
              width={180}
              height={88}
              className="h-20 w-auto object-contain"
              priority
            />
          </motion.div>
        </Link>

        <NavDesktop items={navItems} />

        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.35 }}
          >
            <Link
              href={portalLink.href}
              className="text-sm font-semibold text-white/70 hover:text-white transition-colors duration-200 uppercase tracking-wide"
            >
              {portalLink.label}
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.35 }}
          >
            <Link
              href="/contact"
              className="bg-brand-accent text-white text-xs font-bold px-5 py-2.5 hover:bg-brand-accent-hover transition-colors duration-200 uppercase tracking-widest"
            >
              Get a Quote
            </Link>
          </motion.div>
        </div>

        <NavMobile items={navItems} />
      </div>
    </motion.header>
  )
}
