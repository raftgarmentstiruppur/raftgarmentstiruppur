"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { navItems } from "@/data/navigation"
import NavDesktop from "./NavDesktop"
import NavMobile from "./NavMobile"

export default function Navbar() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-white/10"
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-28">
        <Link href="/" className="shrink-0 flex items-center">
          {/* Outer div: entrance slide-in from left */}
          <motion.div
            initial={{ opacity: 0, x: -32, scale: 0.7 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            {/* Inner div: continuous glow pulse + hover */}
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 0px rgba(122,173,104,0))",
                  "drop-shadow(0 0 14px rgba(122,173,104,0.30))",
                  "drop-shadow(0 0 0px rgba(122,173,104,0))",
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              whileHover={{
                scale: 1.1,
                filter: "drop-shadow(0 0 20px rgba(122,173,104,0.50))",
                transition: { duration: 0.25 },
              }}
              whileTap={{ scale: 0.93, transition: { duration: 0.1 } }}
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
          </motion.div>
        </Link>

        <NavDesktop items={navItems} />

        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Link
              href="/login"
              className="text-sm font-semibold text-white/70 hover:text-white transition-colors uppercase tracking-wide"
            >
              Sign In
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Link
              href="/contact"
              className="bg-brand-accent text-white text-xs font-bold px-5 py-2.5 hover:bg-brand-accent-hover transition-colors uppercase tracking-widest"
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
