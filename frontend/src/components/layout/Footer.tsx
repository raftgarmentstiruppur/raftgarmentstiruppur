"use client"

import Link from "next/link"
import Image from "next/image"
import ScrollLink from "@/components/shared/ScrollLink"
import { motion } from "framer-motion"
import { siteConfig } from "@/data/siteConfig"

const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.862221129564!2d77.26661467537518!3d11.197828288977696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9039958ba4667%3A0xb1bad15b19c68c9a!2sRaft%20Garments!5e0!3m2!1sen!2sin!4v1778930597414!5m2!1sen!2sin"

const footerLinks = {
  Products: [
    { label: "Kids' Innerwear",   href: "/products/kids-innerwear" },
    { label: "Men's Innerwear",   href: "/products/mens-innerwear" },
    { label: "Women's Innerwear", href: "/products/womens-innerwear" },
    { label: "Outerwear",        href: "/products/outerwear" },
  ],
  Company: [
    { label: "About us",       href: "/about" },
    { label: "Infrastructure", href: "/infrastructure" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Certifications", href: "/certifications" },
  ],
  Resources: [
    { label: "Corporate brochure", href: "/resources#corporate-brochure" },
    { label: "Product brochure",   href: "/resources#product-brochure" },
    { label: "Certifications",     href: "/certifications" },
    { label: "Sustainability",     href: "/sustainability" },
  ],
  Support: [
    { label: "Contact us",       href: "/contact" },
    { label: "Request a sample", href: "/contact" },
    { label: "FAQs",             href: "/#faq" },
    { label: "Sign in",          href: "/login" },
  ],
}

// Social links with brand colours
const socialLinks = [
  {
    title: "Instagram",
    href:  siteConfig.social.instagram,
    color: "#fff",
    bg:    "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
    icon: (
      <svg viewBox="0 0 448 512" fill="currentColor" className="w-5 h-5">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
      </svg>
    ),
  },
  {
    title: "Facebook",
    href:  siteConfig.social.facebook,
    color: "#fff",
    bg:    "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    title: "WhatsApp",
    href:  siteConfig.social.whatsapp,
    color: "#fff",
    bg:    "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    title: "Email",
    href:  siteConfig.social.email,
    color: "#fff",
    bg:    "#EA4335",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
]

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const col     = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 70, damping: 18 } } }

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">

      {/* ── Map + Contact ── */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-0">

            {/* Map — natural colours, no filter */}
            <div className="h-44 sm:h-56 lg:h-72 overflow-hidden">
              <iframe
                src={MAPS_EMBED_SRC}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Raft Garments location"
              />
            </div>

            {/* Contact details */}
            <div className="flex flex-col justify-center gap-6 py-10 lg:pl-14">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-accent flex items-center gap-3">
                <span className="w-6 h-0.5 bg-brand-accent" />
                Find us
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Address</span>
                  <p className="text-white/80 leading-relaxed text-base">{siteConfig.address.full}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Phone</span>
                  <a href={`tel:${siteConfig.phone}`} className="text-white/80 hover:text-brand-accent transition-colors block text-base">{siteConfig.phone}</a>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Email</span>
                  <a href={`mailto:${siteConfig.email}`}  className="text-white/80 hover:text-brand-accent transition-colors block text-base">{siteConfig.email}</a>
                  <a href={`mailto:${siteConfig.email2}`} className="text-white/80 hover:text-brand-accent transition-colors block text-base">{siteConfig.email2}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Link grid ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-12 pb-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 pb-10 border-b border-white/10"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Brand column */}
          <motion.div className="col-span-2 md:col-span-1" variants={col}>
            <ScrollLink href="/" className="inline-block mb-5">
              <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 300 }} className="logo-glow bg-white inline-block px-2 py-1">
                <Image src="/logo.png" alt="Raft Garments" width={120} height={58} className="h-10 w-auto object-contain" />
              </motion.div>
            </ScrollLink>
            <p className="text-base text-white/70 leading-relaxed mb-6 max-w-[200px]">
              Premium knitwear manufacturer.<br />Tirupur, India. 50+ years.
            </p>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <motion.div key={heading} variants={col}>
              <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-5">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <ScrollLink href={link.href}
                      className="group flex items-center gap-0 text-base text-white/75 hover:text-white transition-colors duration-200"
                    >
                      <span className="w-0 group-hover:w-3 h-0.5 bg-brand-accent transition-all duration-200 overflow-hidden mr-0 group-hover:mr-1.5" />
                      {link.label}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom bar — social + copyright ── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Social icons with brand colours */}
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.title}
                className="group flex items-center gap-2 transition-all duration-200"
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  style={{ background: s.bg, color: s.color }}
                >
                  {s.icon}
                </span>
                <span className="text-xs font-semibold text-white/50 group-hover:text-white hidden sm:block transition-colors duration-200">
                  {s.title}
                </span>
              </Link>
            ))}
          </div>

          <p className="text-sm text-white/50 font-medium text-center sm:text-right">
            © {new Date().getFullYear()} Raft Garments. All rights reserved. · Tirupur, Tamil Nadu, India
          </p>
        </div>
      </div>
    </footer>
  )
}
