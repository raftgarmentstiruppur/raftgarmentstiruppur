"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, animate } from "framer-motion"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const offsetX = e.clientX - (rect.left + rect.width / 2)
    const offsetY = e.clientY - (rect.top + rect.height / 2)
    x.set(offsetX * strength)
    y.set(offsetY * strength)
  }

  function handleMouseLeave() {
    animate(x, 0, { type: "spring", stiffness: 150, damping: 15 })
    animate(y, 0, { type: "spring", stiffness: 150, damping: 15 })
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-flex ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
