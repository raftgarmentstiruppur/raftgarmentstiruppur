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
      className="fixed top-0 left-0 right-0 z-40 bg-white border-b-2 border-brand-navy"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-16">
        <Link href="/" className="shrink-0 flex items-center">
          <Image src="/logo.png" alt="Raft Garments" width={140} height={56} className="h-10 w-auto object-contain" priority />
        </Link>

        <NavDesktop items={navItems} />

        <div className="hidden lg:flex items-center gap-0 shrink-0">
          <Link href="/login" className="text-xs font-heading font-700 uppercase tracking-[0.2em] text-brand-slate hover:text-brand-navy transition-colors px-4 py-2">
            Sign In
          </Link>
          <Link href="/contact" className="bg-brand-navy text-white text-xs font-heading font-700 px-6 py-3 hover:bg-brand-accent border-2 border-brand-navy hover:border-brand-accent transition-all duration-200 uppercase tracking-widest">
            Get a Quote
          </Link>
        </div>

        <NavMobile items={navItems} />
      </div>
    </motion.header>
  )
}
