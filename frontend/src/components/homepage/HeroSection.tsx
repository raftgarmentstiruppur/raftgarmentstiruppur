"use client"

import Link from "next/link"
import CTAButton from "@/components/shared/CTAButton"
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react"

interface HeroSectionProps {
  headline: string
  subheadline: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  bgImage?: string
}

const leftNavLinks = [
  { label: "About Us",        href: "/about" },
  { label: "Infrastructure",  href: "/infrastructure" },
  { label: "Products",        href: "/products" },
  { label: "Corporate Video", href: "/resources" },
  { label: "Contact Us",      href: "/contact" },
]

const rightActions = [
  { icon: <Phone  className="w-5 h-5" />, href: "tel:+919843166345",          label: "Call us" },
  { icon: <Mail   className="w-5 h-5" />, href: "mailto:info@raftgarments.com", label: "Email us" },
  { icon: <MapPin className="w-5 h-5" />, href: "/contact",                    label: "Location" },
]

export default function HeroSection({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  return (
    <>
      {/* Full-screen video with side panels */}
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
        <div className="absolute inset-0 bg-black/40" />

        {/* Left nav panel */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col">
          {leftNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-5 py-3.5 text-xs font-semibold text-white tracking-wide bg-black/50 hover:bg-black/80 border-b border-white/10 transition-colors whitespace-nowrap backdrop-blur-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right action panel */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-0">
          {rightActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              aria-label={action.label}
              className="w-12 h-12 flex items-center justify-center bg-brand-accent hover:bg-brand-accent-hover text-white transition-colors border-b border-white/20"
            >
              {action.icon}
            </a>
          ))}
        </div>

        {/* Scroll down arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/60" />
          <ChevronDown className="w-6 h-6 text-white/30 -mt-3" />
        </div>
      </section>

      {/* Content block below the video */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-6">
            40+ Years &nbsp;·&nbsp; Tirupur, India
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none uppercase max-w-4xl mx-auto">
            {headline}
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            {subheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
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
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-3 max-w-md mx-auto divide-x divide-white/10 border border-white/10">
            {[
              { value: "800", label: "Employees" },
              { value: "350", label: "Machines" },
              { value: "80K", label: "Garments/Day" },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-6 px-4">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
