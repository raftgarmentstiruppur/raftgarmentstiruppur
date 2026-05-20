"use client"
import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/data/siteConfig"

const cols = {
  Products: [{ label: "Babies Wear", href: "/products/babies-wear" }, { label: "Kids Wear", href: "/products/kids-wear" }, { label: "Mens Wear", href: "/products/mens-wear" }, { label: "Womens Wear", href: "/products/womens-wear" }],
  Company:  [{ label: "About Us", href: "/about" }, { label: "Infrastructure", href: "/infrastructure" }, { label: "Sustainability", href: "/sustainability" }, { label: "Certifications", href: "/certifications" }],
  Resources:[{ label: "Product Catalog", href: "/resources#catalog" }, { label: "Colour Card", href: "/resources#colour-card" }, { label: "Product Specs", href: "/resources#specs" }, { label: "Sustainability Report", href: "/resources#sustainability" }],
  Support:  [{ label: "Contact Us", href: "/contact" }, { label: "Request a Sample", href: "/contact" }, { label: "FAQs", href: "/#faq" }, { label: "Sign In", href: "/login" }],
}

const socials = [
  { label: "LI", title: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "IG", title: "Instagram", href: siteConfig.social.instagram },
  { label: "FB", title: "Facebook", href: siteConfig.social.facebook },
  { label: "TW", title: "Twitter", href: siteConfig.social.twitter },
]

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white border-t-2 border-brand-navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Top band */}
        <div className="py-10 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link href="/">
            <Image src="/logo.png" alt="Raft Garments" width={120} height={48} className="h-10 w-auto object-contain brightness-0 invert" />
          </Link>
          <p className="text-xs text-white/40 max-w-xs leading-relaxed">One of India&apos;s leading fully vertical clothing manufacturers. Fiber to fashion, since 1993.</p>
          <div className="flex gap-2">
            {socials.map((s) => (
              <Link key={s.label} href={s.href} title={s.title} className="w-8 h-8 border border-white/20 text-white/40 hover:border-brand-accent hover:text-brand-accent transition-colors text-[10px] font-heading font-700 flex items-center justify-center">
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Link grid */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/10">
          {Object.entries(cols).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[9px] font-heading font-700 uppercase tracking-[0.3em] text-white/30 mb-5">{heading}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/55 hover:text-white transition-colors font-sans">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="py-7 border-b border-white/10 grid md:grid-cols-3 gap-5 text-sm text-white/35">
          {[
            { label: "Address", val: siteConfig.address.full, href: null },
            { label: "Phone", val: siteConfig.phone, href: `tel:${siteConfig.phone}` },
            { label: "Email", val: siteConfig.email, href: `mailto:${siteConfig.email}` },
          ].map((item) => (
            <div key={item.label}>
              <span className="text-[9px] font-heading font-700 uppercase tracking-[0.3em] text-white/20 block mb-1">{item.label}</span>
              {item.href ? <a href={item.href} className="hover:text-white transition-colors">{item.val}</a> : <span>{item.val}</span>}
            </div>
          ))}
        </div>

        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-white/20 font-heading font-700 uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} Raft-Garments. All rights reserved.</p>
          <p>Tirupur, Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  )
}
