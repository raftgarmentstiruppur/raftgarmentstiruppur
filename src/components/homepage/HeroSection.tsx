"use client"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import CTAButton from "@/components/shared/CTAButton"
import CountUp from "@/components/shared/CountUp"

interface HeroSectionProps {
  headline: string
  subheadline: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  bgImage?: string
}

const stats = [
  { value: "18", label: "Facilities" },
  { value: "30+", label: "Years" },
  { value: "40+", label: "Countries" },
]

export default function HeroSection({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  return (
    <>
      {/* Full-screen video with headline overlay */}
      <section className="relative min-h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />

        {/* Headline overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 text-center px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <div className="max-w-5xl">
            <motion.p
              className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Since 1993 &nbsp;·&nbsp; Tirupur, India
            </motion.p>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black tracking-tight text-white leading-none uppercase">
              {headline}
            </h1>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* Content block below the video */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <motion.p
            className="text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {subheadline}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <CTAButton
              label={ctaPrimary.label}
              href={ctaPrimary.href}
              variant="secondary"
              size="lg"
              arrow
            />
            <CTAButton
              label={ctaSecondary.label}
              href={ctaSecondary.href}
              variant="outline-light"
              size="lg"
            />
          </motion.div>

          {/* Stats bar with count-up */}
          <motion.div
            className="mt-16 grid grid-cols-3 max-w-md mx-auto divide-x divide-white/10 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center py-6 px-4">
                <div className="text-2xl font-black text-white">
                  <CountUp value={stat.value} />
                </div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
