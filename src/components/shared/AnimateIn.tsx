"use client"
import { motion } from "framer-motion"

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "none"
  duration?: number
}

export default function AnimateIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
}: AnimateInProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: direction === "up" ? 28 : 0,
        x: direction === "left" ? -28 : direction === "right" ? 28 : 0,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
