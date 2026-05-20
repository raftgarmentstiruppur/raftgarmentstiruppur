"use client"

import { motion, useReducedMotion } from "framer-motion"

interface ShapeDef {
  shape: "rect" | "dot" | "line"
  left: string
  top: string
  width: string
  height: string
  opacity: number
  delay: number
  duration: number
  rotate: number
}

const SHAPES_LIGHT: ShapeDef[] = [
  { shape: "rect", left: "8%",  top: "15%", width: "40px", height: "40px", opacity: 0.12, delay: 0,    duration: 6,   rotate: 15  },
  { shape: "dot",  left: "15%", top: "65%", width: "8px",  height: "8px",  opacity: 0.20, delay: 1.2,  duration: 5,   rotate: 0   },
  { shape: "line", left: "80%", top: "20%", width: "60px", height: "2px",  opacity: 0.15, delay: 0.6,  duration: 7,   rotate: 45  },
  { shape: "rect", left: "88%", top: "60%", width: "24px", height: "24px", opacity: 0.10, delay: 2,    duration: 5.5, rotate: -20 },
  { shape: "dot",  left: "50%", top: "85%", width: "6px",  height: "6px",  opacity: 0.18, delay: 0.8,  duration: 6.5, rotate: 0   },
  { shape: "line", left: "25%", top: "30%", width: "48px", height: "1px",  opacity: 0.12, delay: 1.5,  duration: 8,   rotate: -30 },
]

const SHAPES_DARK: ShapeDef[] = [
  { shape: "rect", left: "5%",  top: "20%", width: "36px", height: "36px", opacity: 0.15, delay: 0,    duration: 6,   rotate: 20  },
  { shape: "dot",  left: "12%", top: "70%", width: "10px", height: "10px", opacity: 0.25, delay: 1,    duration: 5,   rotate: 0   },
  { shape: "line", left: "85%", top: "15%", width: "56px", height: "2px",  opacity: 0.20, delay: 0.4,  duration: 7,   rotate: 40  },
  { shape: "rect", left: "90%", top: "55%", width: "20px", height: "20px", opacity: 0.12, delay: 1.8,  duration: 5.5, rotate: -15 },
  { shape: "dot",  left: "55%", top: "80%", width: "6px",  height: "6px",  opacity: 0.22, delay: 0.6,  duration: 6.5, rotate: 0   },
  { shape: "line", left: "30%", top: "25%", width: "44px", height: "1px",  opacity: 0.18, delay: 1.3,  duration: 8,   rotate: -25 },
]

export default function FloatingElements({
  variant = "light",
  count = 6,
}: {
  variant?: "light" | "dark"
  count?: number
}) {
  const prefersReduced = useReducedMotion()
  const shapes = (variant === "light" ? SHAPES_LIGHT : SHAPES_DARK).slice(0, count)
  const color = variant === "light" ? "rgba(255,255,255,1)" : "rgba(255,255,255,1)"

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none select-none z-[1] overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            width: s.width,
            height: s.height,
            opacity: s.opacity,
            rotate: s.rotate,
            background:
              s.shape === "dot"
                ? color
                : s.shape === "line"
                  ? color
                  : "transparent",
            border: s.shape === "rect" ? `1px solid ${color}` : "none",
            borderRadius: s.shape === "dot" ? "50%" : 0,
          }}
          animate={prefersReduced ? {} : { y: [0, -18, 0] }}
          transition={{
            repeat: Infinity,
            duration: s.duration,
            delay: s.delay,
            ease: "easeInOut" as const,
          }}
        />
      ))}
    </div>
  )
}
