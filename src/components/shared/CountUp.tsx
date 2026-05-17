"use client"
import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

function parse(raw: string): { prefix: string; number: number; suffix: string } | null {
  const m = raw.match(/^([^0-9]*)(\d+(?:\.\d+)?)([^0-9]*)$/)
  if (!m) return null
  return { prefix: m[1], number: parseFloat(m[2]), suffix: m[3] }
}

interface CountUpProps {
  value: string
  className?: string
  duration?: number
}

export default function CountUp({ value, className, duration = 1800 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const parsed = parse(value)
  const target = parsed?.number ?? 0
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView || !parsed) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      const val = target < 10 ? +(eased * target).toFixed(1) : Math.round(eased * target)
      setCount(val)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, target, duration])

  if (!parsed) {
    return <span ref={ref} className={className}>{value}</span>
  }

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}{isInView ? count : 0}{parsed.suffix}
    </span>
  )
}
