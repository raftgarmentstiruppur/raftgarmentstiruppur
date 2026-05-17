"use client"

import { useState } from "react"
import dynamicImport from "next/dynamic"
import Image from "next/image"
import { Save, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { apiPatch } from "@/lib/api"
import { useContent } from "@/context/ContentContext"

const CldUploadWidget = dynamicImport(
  () => import("next-cloudinary").then((m) => m.CldUploadWidget),
  { ssr: false }
)

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

interface Field {
  key: string
  label: string
  type: "image" | "text" | "textarea" | "list" | "gallery" | "multi-image"
  maxImages?: number
  folder?: string
  placeholder?: string
  rows?: number
  hint?: string
  defaultStyles?: string[]
}

interface Section {
  id: string
  title: string
  page: string
  fields: Field[]
}

const DIVISION_NAMES: Record<string, string> = {
  "01": "Cutting",   "02": "Printing",  "03": "Embroidery",
  "04": "Sewing",    "05": "Finishing", "06": "Packaging",
}
const DIVISION_DEFAULTS: Record<string, { capacity: string; description: string }> = {
  "01": { capacity: "4M+ Units/Month",    description: "Precision CAD-driven cutting systems deliver 92%+ fabric utilisation with zero-defect protocol and inline quality checks at every layer." },
  "02": { capacity: "50,000+ Pieces/Day", description: "Full-spectrum print capability — screen, rotary, digital, discharge, sublimation, and foil — in up to 20 colours using Oeko-Tex certified, azo-free inks." },
  "03": { capacity: "10M Stitches/Day",   description: "500-head multi-needle embroidery fleet handling complex logo digitising, 3D puff, chenille, and appliqué for the world's leading brands." },
  "04": { capacity: "100,000 Pieces/Day", description: "18 high-efficiency sewing lines equipped for flatlock, coverstitch, and overlock operations, governed by ISO 9001-certified quality processes." },
  "05": { capacity: "AQL 2.5 Standard",   description: "100% inline inspection followed by AQL 2.5 final audit, professional steam pressing, precise folding and hanging — all in temperature-controlled pre-export storage." },
  "06": { capacity: "3 Tons/Day",         description: "In-house corrugated box manufacturing, polybag printing, custom retail-ready packaging, branded hang-tags, and full barcode and compliance labeling." },
}

const SECTIONS: Section[] = [
  {
    id: "infrastructure", title: "Infrastructure", page: "/infrastructure",
    fields: [
      { key: "page-infrastructure-title",    label: "Page Title",    type: "text",     placeholder: "End-to-End. In-House. In Control." },
      { key: "page-infrastructure-subtitle", label: "Page Subtitle", type: "textarea", rows: 2, placeholder: "9 integrated manufacturing divisions…" },
      ...["01","02","03","04","05","06"].flatMap((n): Field[] => [
        { key: `division-${n}-image`,       label: `Division ${n} — ${DIVISION_NAMES[n]} Images`,      type: "multi-image", folder: "Raft-Garments/infrastructure", maxImages: 5 },
        { key: `division-${n}-name`,        label: `Division ${n} — Name`,        type: "text",     placeholder: DIVISION_NAMES[n] },
        { key: `division-${n}-capacity`,    label: `Division ${n} — Capacity`,    type: "text",     placeholder: DIVISION_DEFAULTS[n].capacity },
        { key: `division-${n}-description`, label: `Division ${n} — Description`, type: "textarea", rows: 2, placeholder: DIVISION_DEFAULTS[n].description },
      ]),
    ],
  },
  {
    id: "kids-innerwear", title: "Kids Innerwear", page: "/products/kids-innerwear",
    fields: [
      { key: "page-kids-innerwear-title",    label: "Page Title",       type: "text",     placeholder: "Kids Innerwear" },
      { key: "page-kids-innerwear-subtitle", label: "Page Subtitle",    type: "textarea", rows: 2, placeholder: "Soft, breathable innerwear for children aged 2–14…" },
      { key: "product-kids-innerwear-styles", label: "Available Styles", type: "list", placeholder: "Boys Briefs, Boys Boxer Shorts, Boys Trunks, Girls Briefs, Girls Boy Shorts, Girls Hipster, Training Pants", hint: "Comma-separated" },
      { key: "product-kids-innerwear-gallery", label: "Style Images", type: "gallery", folder: "Raft-Garments/products/kids-innerwear", defaultStyles: ["Boys Briefs","Boys Boxer Shorts","Boys Trunks","Girls Briefs","Girls Boy Shorts","Girls Hipster","Training Pants"] },
    ],
  },
  {
    id: "mens-innerwear", title: "Mens Innerwear", page: "/products/mens-innerwear",
    fields: [
      { key: "page-mens-innerwear-title",    label: "Page Title",       type: "text",     placeholder: "Mens Innerwear" },
      { key: "page-mens-innerwear-subtitle", label: "Page Subtitle",    type: "textarea", rows: 2, placeholder: "Combed cotton. Modal blends. 150+ colors…" },
      { key: "product-mens-innerwear-styles", label: "Available Styles", type: "list", placeholder: "Briefs, Boxer Briefs, Trunks, Boxers (Loose), Hipster Briefs, Sports / Compression", hint: "Comma-separated" },
      { key: "product-mens-innerwear-gallery", label: "Style Images", type: "gallery", folder: "Raft-Garments/products/mens-innerwear", defaultStyles: ["Briefs","Boxer Briefs","Trunks","Boxers (Loose)","Hipster Briefs","Sports / Compression"] },
    ],
  },
  {
    id: "womens-innerwear", title: "Womens Innerwear", page: "/products/womens-innerwear",
    fields: [
      { key: "page-womens-innerwear-title",    label: "Page Title",       type: "text",     placeholder: "Womens Innerwear" },
      { key: "page-womens-innerwear-subtitle", label: "Page Subtitle",    type: "textarea", rows: 2, placeholder: "Cotton, modal, and microfibre constructions…" },
      { key: "product-womens-innerwear-styles", label: "Available Styles", type: "list", placeholder: "Bikini Briefs, Hipster Briefs, Boy Shorts, High-Waist Briefs, Thongs", hint: "Comma-separated" },
      { key: "product-womens-innerwear-gallery", label: "Style Images", type: "gallery", folder: "Raft-Garments/products/womens-innerwear", defaultStyles: ["Bikini Briefs","Hipster Briefs","Boy Shorts","High-Waist Briefs","Thongs"] },
    ],
  },
  {
    id: "homepage", title: "Homepage", page: "/",
    fields: [
      { key: "hero-headline",              label: "Hero Headline",              type: "text",     placeholder: "Fiber to Fashion. Built for the World." },
      { key: "hero-subheadline",           label: "Hero Subheadline",           type: "textarea", rows: 2, placeholder: "India's fully vertical garment manufacturer…" },
      { key: "hero-stat-1-value",          label: "Hero Stat 1 — Value",        type: "text",     placeholder: "18" },
      { key: "hero-stat-1-label",          label: "Hero Stat 1 — Label",        type: "text",     placeholder: "Facilities" },
      { key: "hero-stat-2-value",          label: "Hero Stat 2 — Value",        type: "text",     placeholder: "30+" },
      { key: "hero-stat-2-label",          label: "Hero Stat 2 — Label",        type: "text",     placeholder: "Years" },
      { key: "hero-stat-3-value",          label: "Hero Stat 3 — Value",        type: "text",     placeholder: "40+" },
      { key: "hero-stat-3-label",          label: "Hero Stat 3 — Label",        type: "text",     placeholder: "Countries" },
      { key: "marketing-banner-headline",  label: "Marketing Banner Headline",  type: "text",     placeholder: "Crafted at Scale. Finished to Perfection." },
      { key: "marketing-banner-body",      label: "Marketing Banner Body",      type: "textarea", rows: 2, placeholder: "Explore our full range…" },
      { key: "brand-narrative-statement",  label: "Brand Narrative Statement",  type: "text",     placeholder: "Different by Design. Driven by Craft." },
      { key: "brand-narrative-body",       label: "Brand Narrative Body",       type: "textarea", rows: 3, placeholder: "Raft Garments was founded…" },
      { key: "hero-banner",                label: "Hero Background Image",      type: "image",    folder: "Raft-Garments/banners" },
      { key: "marketing-banner-image",     label: "Marketing Banner Image",     type: "image",    folder: "Raft-Garments/banners" },
    ],
  },
  {
    id: "company", title: "Company Pages", page: "/about",
    fields: [
      { key: "about-hero",           label: "About Page Image",     type: "image",    folder: "Raft-Garments/about" },
      { key: "about-headline",       label: "About Headline",       type: "text",     placeholder: "40+ Years of Knitwear Excellence." },
      { key: "about-subheadline",    label: "About Subheadline",    type: "textarea", rows: 2, placeholder: "Taking India's finest knitwear to the world…" },
      { key: "about-story",          label: "About Story Body",     type: "textarea", rows: 4, placeholder: "What began as a single knitting unit…" },
      { key: "infrastructure-hero",  label: "Infrastructure Image", type: "image",    folder: "Raft-Garments/infrastructure" },
      { key: "sustainability-hero",  label: "Sustainability Image", type: "image",    folder: "Raft-Garments/sustainability" },
      { key: "certifications-hero",  label: "Certifications Image", type: "image",    folder: "Raft-Garments/certifications" },
    ],
  },
  {
    id: "contact", title: "Contact & Company Info", page: "/contact",
    fields: [
      { key: "company-phone",    label: "Phone Number",  type: "text",     placeholder: "+91 421 4307777" },
      { key: "company-email",    label: "Email Address", type: "text",     placeholder: "info@Raft Garments.com" },
      { key: "company-address",  label: "Address",       type: "textarea", rows: 2, placeholder: "123 Industrial Estate, Tirupur, Tamil Nadu 641604, India" },
      { key: "company-whatsapp", label: "WhatsApp",      type: "text",     placeholder: "+91 98765 43210" },
    ],
  },
]

export default function AdminContentPage() {
  const { content, reload } = useContent()
  const [edits, setEdits]   = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [saved, setSaved]   = useState<Record<string, boolean>>({})
  const [open, setOpen]     = useState<string>(SECTIONS[0].id)

  // Return edited value → CMS value → placeholder default (so fields always show current content)
  function val(key: string, placeholder?: string) {
    return edits[key] ?? content[key] ?? placeholder ?? ""
  }
  function set(key: string, value: string) { setEdits((p) => ({ ...p, [key]: value })) }

  async function saveKey(key: string, value: string) {
    if (!value.trim()) return
    setSaving((p) => ({ ...p, [key]: true }))
    await apiPatch(`/content/${key}`, { value: value.trim() })
    setSaving((p) => ({ ...p, [key]: false }))
    setSaved((p) => ({ ...p, [key]: true }))
    await reload()
    setTimeout(() => setSaved((p) => ({ ...p, [key]: false })), 2500)
  }

  async function saveSection(section: Section) {
    await Promise.all(
      section.fields
        .filter((f) => f.type !== "image" && f.type !== "gallery")
        .map((f) => {
          const v = val(f.key, f.placeholder)
          return v.trim() ? saveKey(f.key, v) : Promise.resolve()
        })
    )
  }

  return (
    <div className="space-y-4 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy">Content Manager</h1>
        <p className="text-sm text-brand-slate mt-1">
          Edit every image, spec, description, and style list. Changes go live immediately — no rebuild needed.
        </p>
      </div>

      {SECTIONS.map((section) => (
        <div key={section.id} className="border border-brand-border bg-white overflow-hidden">
          <button
            onClick={() => setOpen(open === section.id ? "" : section.id)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-brand-light-gray transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-brand-navy">{section.title}</span>
              <a href={section.page} target="_blank" rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] text-brand-accent hover:underline">
                View page →
              </a>
            </div>
            {open === section.id
              ? <ChevronUp className="w-4 h-4 text-brand-ash" />
              : <ChevronDown className="w-4 h-4 text-brand-ash" />}
          </button>

          {open === section.id && (
            <div className="border-t border-brand-border px-6 py-6 space-y-5">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold uppercase tracking-wide text-brand-ash">{field.label}</label>
                      {/* Show "Default" badge when no custom CMS value has been saved */}
                      {!content[field.key] && field.type !== "image" && field.type !== "gallery" && field.type !== "multi-image" && (
                        <span className="text-[9px] bg-brand-light-gray border border-brand-border text-brand-ash px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide">Default</span>
                      )}
                      {content[field.key] && field.type !== "image" && field.type !== "gallery" && field.type !== "multi-image" && (
                        <span className="text-[9px] bg-green-50 border border-green-200 text-green-700 px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide">Custom</span>
                      )}
                    </div>
                    {field.hint && <span className="text-[10px] text-brand-ash italic">{field.hint}</span>}
                  </div>

                  {field.type === "image" && (
                    <div className="space-y-2">
                      {val(field.key) && (
                        <div className="relative aspect-video w-40 overflow-hidden border border-brand-border bg-brand-light-gray">
                          <Image src={val(field.key)} alt={field.label} fill className="object-cover" unoptimized />
                        </div>
                      )}
                      <CldUploadWidget
                        signatureEndpoint={`${API_URL}/upload`}
                        options={{ folder: field.folder, multiple: false, resourceType: "image", maxFileSize: 10_000_000 }}
                        onSuccess={async (result) => {
                          const info = result.info
                          const url = typeof info === "object" && info !== null ? (info as { secure_url?: string }).secure_url : undefined
                          if (url) { set(field.key, url); await saveKey(field.key, url) }
                        }}
                      >
                        {({ open: openWidget }: { open: () => void }) => (
                          <button type="button" onClick={() => openWidget()}
                            className="flex items-center gap-2 border-2 border-dashed border-brand-border hover:border-brand-accent hover:text-brand-accent text-brand-slate transition-colors py-2.5 px-4 text-sm font-semibold">
                            {val(field.key) ? "Replace Image" : "Upload Image"}
                            {saved[field.key] && <span className="text-green-600 text-xs">✓ Saved</span>}
                          </button>
                        )}
                      </CldUploadWidget>
                    </div>
                  )}

                  {field.type === "gallery" && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(field.defaultStyles ?? []).map((styleName, idx) => {
                        const galleryKey = `${field.key}-${idx + 1}`
                        const imgUrl = val(galleryKey)
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="relative aspect-square border border-brand-border overflow-hidden bg-brand-light-gray">
                              {imgUrl && (
                                <Image src={imgUrl} alt={styleName} fill className="object-cover" unoptimized />
                              )}
                              {!imgUrl && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-[10px] text-brand-ash text-center px-1">{styleName}</span>
                                </div>
                              )}
                            </div>
                            <CldUploadWidget
                              signatureEndpoint={`${API_URL}/upload`}
                              options={{ folder: field.folder, multiple: false, resourceType: "image", maxFileSize: 10_000_000 }}
                              onSuccess={async (result) => {
                                const info = result.info
                                const url = typeof info === "object" && info !== null ? (info as { secure_url?: string }).secure_url : undefined
                                if (url) { set(galleryKey, url); await saveKey(galleryKey, url) }
                              }}
                            >
                              {({ open: openWidget }: { open: () => void }) => (
                                <button type="button" onClick={() => openWidget()}
                                  className="w-full text-center border border-brand-border py-1 text-[10px] font-semibold text-brand-slate hover:border-brand-accent hover:text-brand-accent transition-colors truncate px-1">
                                  {imgUrl ? "Replace" : "Upload"}
                                  {saved[galleryKey] && " ✓"}
                                </button>
                              )}
                            </CldUploadWidget>
                            <p className="text-[10px] text-brand-ash text-center truncate">{styleName}</p>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {field.type === "multi-image" && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-5 gap-2">
                        {Array.from({ length: field.maxImages ?? 5 }, (_, idx) => {
                          const imgKey = `${field.key}-${idx + 1}`
                          const imgUrl = val(imgKey)
                          return (
                            <div key={idx} className="space-y-1">
                              <div className="relative aspect-square border border-brand-border overflow-hidden bg-brand-light-gray">
                                {imgUrl ? (
                                  <>
                                    <Image src={imgUrl} alt={`Image ${idx + 1}`} fill className="object-cover" unoptimized />
                                    <button
                                      onClick={async () => { set(imgKey, ""); await saveKey(imgKey, " ") }}
                                      className="absolute top-1 right-1 bg-red-600 text-white text-[9px] px-1 py-0.5 font-bold hover:bg-red-700"
                                    >✕</button>
                                  </>
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center text-brand-ash text-[10px]">{idx + 1}</div>
                                )}
                              </div>
                              <CldUploadWidget
                                signatureEndpoint={`${API_URL}/upload`}
                                options={{ folder: field.folder, multiple: false, resourceType: "image", maxFileSize: 10_000_000 }}
                                onSuccess={async (result) => {
                                  const info = result.info
                                  const url = typeof info === "object" && info !== null ? (info as { secure_url?: string }).secure_url : undefined
                                  if (url) { set(imgKey, url); await saveKey(imgKey, url) }
                                }}
                              >
                                {({ open: openWidget }: { open: () => void }) => (
                                  <button type="button" onClick={() => openWidget()}
                                    className="w-full border border-brand-border py-1 text-[10px] font-semibold text-brand-slate hover:border-brand-accent hover:text-brand-accent transition-colors">
                                    {imgUrl ? "Replace" : "Upload"}
                                    {saved[imgKey] && " ✓"}
                                  </button>
                                )}
                              </CldUploadWidget>
                            </div>
                          )
                        })}
                      </div>
                      <p className="text-[10px] text-brand-ash">Upload up to {field.maxImages ?? 5} images — they auto-scroll on the page at 1 second intervals.</p>
                    </div>
                  )}

                  {(field.type === "text" || field.type === "list") && (
                    <div className="space-y-1">
                      <div className="flex gap-2">
                        <input type="text" value={val(field.key, field.placeholder)}
                          onChange={(e) => set(field.key, e.target.value)}
                          className="flex-1 border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand-accent"
                        />
                        <button onClick={() => saveKey(field.key, val(field.key, field.placeholder))} disabled={saving[field.key]}
                          className="flex items-center gap-1 bg-brand-navy text-white px-3 py-2 text-xs font-bold uppercase hover:bg-black transition-colors disabled:opacity-50 shrink-0">
                          {saving[field.key] ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                          {saved[field.key] ? "✓" : "Save"}
                        </button>
                      </div>
                      {content[field.key] && (
                        <button onClick={() => { set(field.key, field.placeholder ?? ""); saveKey(field.key, field.placeholder ?? "") }}
                          className="text-[10px] text-brand-ash hover:text-red-500 transition-colors">
                          ↩ Reset to default
                        </button>
                      )}
                    </div>
                  )}

                  {field.type === "textarea" && (
                    <div className="space-y-1">
                      <div className="flex gap-2 items-start">
                        <textarea rows={field.rows ?? 3} value={val(field.key, field.placeholder)}
                          onChange={(e) => set(field.key, e.target.value)}
                          className="flex-1 border border-brand-border px-3 py-2 text-sm outline-none focus:border-brand-accent resize-none"
                        />
                        <button onClick={() => saveKey(field.key, val(field.key, field.placeholder))} disabled={saving[field.key]}
                          className="flex items-center gap-1 bg-brand-navy text-white px-3 py-2 text-xs font-bold uppercase hover:bg-black transition-colors disabled:opacity-50 shrink-0">
                          {saving[field.key] ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                          {saved[field.key] ? "✓" : "Save"}
                        </button>
                      </div>
                      {content[field.key] && (
                        <button onClick={() => { set(field.key, field.placeholder ?? ""); saveKey(field.key, field.placeholder ?? "") }}
                          className="text-[10px] text-brand-ash hover:text-red-500 transition-colors">
                          ↩ Reset to default
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {section.fields.some((f) => f.type !== "image") && (
                <button onClick={() => saveSection(section)}
                  className="flex items-center gap-2 bg-black text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-brand-navy transition-colors">
                  <Save className="w-3.5 h-3.5" />
                  Save All in This Section
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}


