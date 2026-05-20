"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"

interface ParallaxImageProps {
  src: string
  alt: string
  /** Applied to the outer wrapper. Use "absolute inset-0" for fill mode (preferred),
   *  or an aspect-ratio class for self-contained height mode. */
  className?: string
  speed?: number
  priority?: boolean
}

export default function ParallaxImage({
  src,
  alt,
  className = "absolute inset-0",
  speed = 0.2,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const range = prefersReduced ? 0 : speed * 12
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[124%] -top-[12%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </motion.div>
    </div>
  )
}
