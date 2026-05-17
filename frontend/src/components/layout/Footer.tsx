"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { siteConfig } from "@/data/siteConfig"

const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.862221129564!2d77.26661467537518!3d11.197828288977696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9039958ba4667%3A0xb1bad15b19c68c9a!2sRaft%20Garments!5e0!3m2!1sen!2sin!4v1778930597414!5m2!1sen!2sin"

const footerLinks = {
  Products: [
    { label: "Kids Innerwear",   href: "/products/kids-innerwear" },
    { label: "Mens Innerwear",   href: "/products/mens-innerwear" },
    { label: "Womens Innerwear", href: "/products/womens-innerwear" },
    { label: "Outerwear",        href: "/products/outerwear" },
  ],
  Company: [
    { label: "About Us",        href: "/about" },
    { label: "Infrastructure",  href: "/infrastructure" },
    { label: "Sustainability",  href: "/sustainability" },
    { label: "Certifications",  href: "/certifications" },
  ],
  Resources: [
    { label: "Corporate Brochure", href: "/resources#corporate-brochure" },
    { label: "Product Brochure",   href: "/resources#product-brochure" },
    { label: "Certifications",     href: "/certifications" },
    { label: "Sustainability",     href: "/sustainability" },
  ],
  Support: [
    { label: "Contact Us",       href: "/contact" },
    { label: "Request a Sample", href: "/contact" },
    { label: "FAQs",             href: "/#faq" },
    { label: "Sign In",          href: "/login" },
  ],
}

const socialLinks = [
  { label: "LI", title: "LinkedIn",  href: siteConfig.social.linkedin },
  { label: "IG", title: "Instagram", href: siteConfig.social.instagram },
  { label: "FB", title: "Facebook",  href: siteConfig.social.facebook },
  { label: "TW", title: "Twitter",   href: siteConfig.social.twitter },
  { label: "YT", title: "YouTube",   href: siteConfig.social.youtube },
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

      {/* Map + Contact strip */}
      <motion.div
        className="border-b border-white/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-0">

            {/* Map */}
            <div className="h-64 lg:h-80 overflow-hidden">
              <iframe
                src={MAPS_EMBED_SRC}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Raft Garments location"
              />
            </div>

            {/* Contact details */}
            <div className="flex flex-col justify-center gap-6 py-10 lg:pl-12 px-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Find Us</p>
              <div className="space-y-5 text-sm text-white/50">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 block mb-1">Head Office</span>
                  <p className="leading-relaxed">{siteConfig.headOffice.full}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 block mb-1">Unit 2 — Factory</span>
                  <p className="leading-relaxed">{siteConfig.address.full}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 block mb-1">Phone</span>
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors block">{siteConfig.phone}</a>
                  <a href={`tel:${siteConfig.phone2}`} className="hover:text-white transition-colors block">{siteConfig.phone2}</a>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 block mb-1">Email</span>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors block">{siteConfig.email}</a>
                  <a href={`mailto:${siteConfig.email2}`} className="hover:text-white transition-colors block">{siteConfig.email2}</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Link grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-14 pb-10">
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
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.94, transition: { duration: 0.1 } }}
                className="logo-glow"
              >
                <Image
                  src="/logo.png"
                  alt="Raft Garments"
                  width={140}
                  height={68}
                  className="h-16 w-auto object-contain"
                />
              </motion.div>
            </Link>
            <p className="mt-4 text-sm text-white/50 leading-relaxed">
              Premium innerwear and outerwear manufacturer based in Tirupur — crafting quality, pioneering sustainability, shaping fashion.
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

        <motion.div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>© {new Date().getFullYear()} Raft Garments. All rights reserved.</p>
          <p>Tirupur, Tamil Nadu, India</p>
        </motion.div>
      </div>

    </footer>
  )
}
