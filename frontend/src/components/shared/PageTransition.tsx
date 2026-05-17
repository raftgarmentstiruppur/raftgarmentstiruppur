"use client"

import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ReactNode } from "react"

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  )
}
