import type { Metadata } from "next"
import PageHero from "@/components/shared/PageHero"
import SectionHeader from "@/components/shared/SectionHeader"
import ContactForm from "@/components/contact/ContactForm"
import { siteConfig } from "@/data/siteConfig"
import { leadership } from "@/data/leadership"
import { MapPin, Phone, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Raft-Garments for wholesale orders, private label enquiries, sampling, or general questions. Tirupur, Tamil Nadu.",
}

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
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-ash mb-1">Address</p>
                    <p className="text-sm text-brand-charcoal leading-relaxed">{siteConfig.address.full}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-ash mb-1">Phone</p>
                    <a href={`tel:${siteConfig.phone}`} className="text-sm text-brand-charcoal hover:text-brand-accent transition-colors">
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-ash mb-1">Email</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-sm text-brand-charcoal hover:text-brand-accent transition-colors">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="aspect-video bg-brand-light-gray border border-brand-border flex items-center justify-center">
                <p className="text-sm text-brand-ash">Map — Tirupur, Tamil Nadu, India</p>
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
