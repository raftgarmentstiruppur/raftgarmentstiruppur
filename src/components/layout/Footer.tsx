"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { siteConfig } from "@/data/siteConfig"

const footerLinks = {
  Products: [
    { label: "Babies Wear", href: "/products/babies-wear" },
    { label: "Kids Wear", href: "/products/kids-wear" },
    { label: "Mens Wear", href: "/products/mens-wear" },
    { label: "Womens Wear & Nightwear", href: "/products/womens-wear" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Infrastructure", href: "/infrastructure" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Certifications", href: "/certifications" },
  ],
  Resources: [
    { label: "Product Catalog", href: "/resources#catalog" },
    { label: "Colour Card", href: "/resources#colour-card" },
    { label: "Product Specs", href: "/resources#specs" },
    { label: "Sustainability Report", href: "/resources#sustainability" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Request a Sample", href: "/contact" },
    { label: "FAQs", href: "/#faq" },
    { label: "Sign In", href: "/login" },
  ],
}

const socialLinks = [
  { label: "LI", title: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "IG", title: "Instagram", href: siteConfig.social.instagram },
  { label: "FB", title: "Facebook", href: siteConfig.social.facebook },
  { label: "TW", title: "Twitter", href: siteConfig.social.twitter },
  { label: "YT", title: "YouTube", href: siteConfig.social.youtube },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const col = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
}

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-16 pb-10">

        {/* Main grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Brand + logo column */}
          <motion.div className="lg:col-span-1" variants={col}>
            <Link href="/" className="inline-block">
              {/* Entrance scale + glow pulse (same treatment as navbar, lighter) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              >
                <motion.div
                  animate={{
                    filter: [
                      "drop-shadow(0 0 0px rgba(122,173,104,0))",
                      "drop-shadow(0 0 14px rgba(122,173,104,0.30))",
                      "drop-shadow(0 0 0px rgba(122,173,104,0))",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  whileHover={{
                    scale: 1.08,
                    filter: "drop-shadow(0 0 20px rgba(122,173,104,0.50))",
                    transition: { duration: 0.25 },
                  }}
                  whileTap={{ scale: 0.94, transition: { duration: 0.1 } }}
                >
                  <Image
                    src="/logo.png"
                    alt="Raft Garments"
                    width={140}
                    height={68}
                    className="h-16 w-auto object-contain"
                  />
                </motion.div>
              </motion.div>
            </Link>
            <p className="mt-4 text-sm text-white/50 leading-relaxed">
              One of India&apos;s leading fully vertical clothing manufacturers. Fiber to fashion, since 1993.
            </p>
            <motion.div
              className="flex items-center gap-2 mt-6"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {socialLinks.map((s) => (
                <motion.div key={s.label} variants={col}>
                  <Link
                    href={s.href}
                    title={s.title}
                    className="w-8 h-8 flex items-center justify-center border border-white/20 text-white/50 hover:border-brand-accent hover:text-brand-accent transition-colors text-xs font-bold"
                  >
                    {s.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <motion.div key={heading} variants={col}>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-5">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white hover:pl-1 transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact strip */}
        <motion.div
          className="py-8 border-b border-white/10 grid md:grid-cols-3 gap-6 text-sm text-white/40"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 block mb-2">Address</span>
            {siteConfig.address.full}
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 block mb-2">Phone</span>
            <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">
              {siteConfig.phone}
            </a>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 block mb-2">Email</span>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
              {siteConfig.email}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>© {new Date().getFullYear()} Raft-Garments. All rights reserved.</p>
          <p>Tirupur, Tamil Nadu, India</p>
        </motion.div>

      </div>
    </footer>
  )
}
