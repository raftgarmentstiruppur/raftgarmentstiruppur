import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import ContactForm from "@/components/contact/ContactForm"
import { siteConfig } from "@/data/siteConfig"
import { leadership } from "@/data/leadership"
import { MapPin, Phone, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Raft Garments for wholesale orders, private label enquiries, sampling, or general questions. Netaji Apparel Park, Tirupur, Tamil Nadu.",
}

const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.862221129564!2d77.26661467537518!3d11.197828288977696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9039958ba4667%3A0xb1bad15b19c68c9a!2sRaft%20Garments!5e0!3m2!1sen!2sin!4v1778930597414!5m2!1sen!2sin"

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's Build Something Together."
        subtitle="Reach our team for wholesale orders, private label enquiries, sampling, or general questions."
        breadcrumb={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="py-section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Form */}
            <div>
              <SectionHeader overline="Get in Touch" title="Send Us a Message" align="left" className="mb-8" />
              <ContactForm />
            </div>

            {/* Contact info */}
            <div className="space-y-8">
              <SectionHeader overline="Our Details" title="Find Us" align="left" className="mb-0" />

              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-ash mb-1">Head Office</p>
                    <p className="text-sm text-brand-charcoal leading-relaxed">{siteConfig.headOffice.full}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-ash mb-1">Unit 2 — Factory</p>
                    <p className="text-sm text-brand-charcoal leading-relaxed">
                      {siteConfig.address.line1}<br />
                      {siteConfig.address.line2}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-ash mb-1">Phone</p>
                    <a href={`tel:${siteConfig.phone}`} className="text-sm text-brand-charcoal hover:text-brand-accent transition-colors block">{siteConfig.phone}</a>
                    <a href={`tel:${siteConfig.phone2}`} className="text-sm text-brand-charcoal hover:text-brand-accent transition-colors block">{siteConfig.phone2}</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-ash mb-1">Email</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-sm text-brand-charcoal hover:text-brand-accent transition-colors block">{siteConfig.email}</a>
                    <a href={`mailto:${siteConfig.email2}`} className="text-sm text-brand-charcoal hover:text-brand-accent transition-colors block">{siteConfig.email2}</a>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="w-full aspect-video border border-brand-border overflow-hidden">
                <iframe
                  src={MAPS_EMBED_SRC}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Raft Garments — Netaji Apparel Park, Tirupur"
                />
              </div>

              {/* Key contacts */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-4">Key Contacts</p>
                <div className="space-y-3">
                  {leadership.map((member) => (
                    <div key={member.name} className="flex items-center gap-4 p-4 border border-brand-border">
                      <div className="w-10 h-10 bg-brand-navy flex items-center justify-center shrink-0">
                        <span className="text-sm font-black text-brand-accent">
                          {member.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-brand-navy">{member.name}</p>
                        <p className="text-xs text-brand-ash">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
