"use client"

import { useState, useEffect, useCallback } from "react"
import dynamicImport from "next/dynamic"
import Image from "next/image"
import { Plus, Pencil, Trash2, X, Loader2, ImagePlus } from "lucide-react"
import { apiFetch, apiDelete } from "@/lib/api"
import ColorPaletteSelector from "@/components/admin/ColorPaletteSelector"

const CldUploadWidget = dynamicImport(
  () => import("next-cloudinary").then((m) => m.CldUploadWidget),
  { ssr: false }
)

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

// All possible spec field keys
type SpecKey = "ageRange"|"dyes"|"closures"|"seams"|"prints"|"embellishments"|"weights"|"colors"|"printMethods"|"finishes"|"certifications"|"moq"|"leadTime"

type FormState = {
  name: string; subcategory: string; description: string
  fabric: string; sizes: string; priceRange: string; badge: string; sortOrder: string
} & Record<SpecKey, string>

interface Product extends Omit<FormState, "sortOrder"> {
  id: string; category: string; slug: string
  images: string[]; sortOrder: number; active: boolean
}

const SPEC_KEYS: SpecKey[] = ["ageRange","dyes","closures","seams","prints","embellishments","weights","colors","printMethods","finishes","certifications","moq","leadTime"]

// Which spec fields to show per category, with label and default value
const CATEGORY_SPECS: Record<string, { key: SpecKey; label: string; default: string }[]> = {
  "kids-innerwear": [
    { key: "ageRange",       label: "Age Range",       default: "2–14 years" },
    { key: "colors",         label: "Available Colours", default: "[]" },
    { key: "closures",       label: "Waistband",       default: "Soft elastic with branded label option" },
    { key: "seams",          label: "Seam Finish",     default: "Flatlock seams for skin comfort" },
    { key: "certifications", label: "Certifications",  default: "Oeko-Tex Standard 100" },
    { key: "moq",            label: "MOQ",             default: "500 units per style, per color" },
    { key: "leadTime",       label: "Lead Time",       default: "45–60 days (sample: 10 days)" },
  ],
  "mens-innerwear": [
    { key: "closures",       label: "Waistband",       default: "Soft elastic, branded waistband available" },
    { key: "dyes",           label: "Leg Length",      default: "Brief, mid-thigh, long leg" },
    { key: "colors",         label: "Available Colours", default: "[]" },
    { key: "weights",        label: "Fabric Weight",   default: "140 GSM – 200 GSM" },
    { key: "certifications", label: "Certifications",  default: "Oeko-Tex Standard 100, WRAP" },
    { key: "moq",            label: "MOQ",             default: "500 units per style, per color" },
    { key: "leadTime",       label: "Lead Time",       default: "45–60 days (sample: 10 days)" },
  ],
  "womens-innerwear": [
    { key: "closures",       label: "Cup Sizes",       default: "A, B, C, D, DD (for underwired styles)" },
    { key: "colors",         label: "Available Colours", default: "[]" },
    { key: "embellishments", label: "Details & Trim",  default: "Lace trim, mesh panels, bow detail" },
    { key: "finishes",       label: "Finishes",        default: "Enzyme wash, soft-touch finish" },
    { key: "certifications", label: "Certifications",  default: "Oeko-Tex Standard 100" },
    { key: "moq",            label: "MOQ",             default: "500 units per style, per color" },
    { key: "leadTime",       label: "Lead Time",       default: "45–60 days (sample: 10 days)" },
  ],
  "outerwear": [
    { key: "weights",        label: "Fabric Weight",   default: "160 GSM – 340 GSM" },
    { key: "colors",         label: "Available Colours", default: "[]" },
    { key: "printMethods",   label: "Print Methods",   default: "Screen print, digital print, embroidery" },
    { key: "finishes",       label: "Finishes",        default: "Enzyme wash, pigment wash, soft-touch" },
    { key: "certifications", label: "Certifications",  default: "Oeko-Tex Standard 100, WRAP" },
    { key: "moq",            label: "MOQ",             default: "500 units per style, per color" },
    { key: "leadTime",       label: "Lead Time",       default: "45–60 days (sample: 10 days)" },
  ],
}

const FABRIC_DEFAULTS: Record<string, string> = {
  "kids-innerwear":   "100% combed cotton, cotton-modal blend",
  "mens-innerwear":   "Combed cotton, modal, bamboo blend",
  "womens-innerwear": "Cotton, modal, microfibre, lace trim",
  "outerwear":        "Cotton, cotton-polyester blend, French Terry, fleece, bamboo blend",
}
const SIZES_DEFAULTS: Record<string, string> = {
  "kids-innerwear":   "2Y, 3Y, 4Y, 5Y, 6Y, 7Y, 8Y, 9Y, 10Y, 11Y, 12Y, 13Y, 14Y",
  "mens-innerwear":   "S, M, L, XL, 2XL, 3XL, 4XL",
  "womens-innerwear": "XS, S, M, L, XL, 2XL, 3XL",
  "outerwear":        "XS, S, M, L, XL, 2XL, 3XL, 4XL",
}
const DESC_DEFAULTS: Record<string, string> = {
  "kids-innerwear":   "Soft, breathable innerwear for children aged 2–14. Combed cotton construction, Oeko-Tex certified dyes, flatlock seams for skin safety.",
  "mens-innerwear":   "Premium innerwear in combed cotton and modal blends. Soft-touch waistband, 150+ colors, private label and branded waistband available.",
  "womens-innerwear": "Comfortable everyday innerwear in cotton, modal, and microfibre. Lace trim capability, full embellishment, and premium nightwear range.",
  "outerwear":        "Versatile casual outerwear in cotton, French Terry, and fleece blends. Screen print, digital print, and embroidery capability. Private label ready.",
}

const CATEGORIES = [
  { id: "kids-innerwear",   label: "Kids' Innerwear" },
  { id: "mens-innerwear",   label: "Men's Innerwear" },
  { id: "womens-innerwear", label: "Women's Innerwear" },
  { id: "outerwear",        label: "Outerwear" },
]

const SUBCATEGORIES: Record<string, string[]> = {
  "kids-innerwear": [
    "Boys' briefs", "Boys' boxer shorts", "Boys' trunks",
    "Girls' briefs", "Girls' boy shorts", "Girls' hipster", "Training pants",
  ],
  "mens-innerwear": [
    "Briefs", "Boxer briefs", "Trunks", "Boxers (loose)", "Hipster briefs",
    "Sports / compression",
  ],
  "womens-innerwear": [
    "Bikini briefs", "Hipster briefs", "Boy shorts", "High-waist briefs", "Thongs",
  ],
  "outerwear": [
    "T-shirts", "Polo shirts", "Sweatshirts", "Hoodies",
    "Track pants / joggers", "Casual shorts",
  ],
}

function emptySpecs(): Record<SpecKey, string> {
  return Object.fromEntries(SPEC_KEYS.map((k) => [k, ""])) as Record<SpecKey, string>
}

function defaultForm(category: string): FormState {
  const specs = emptySpecs()
  for (const s of CATEGORY_SPECS[category] ?? []) specs[s.key] = s.default
  return {
    name: "", subcategory: "", description: DESC_DEFAULTS[category] ?? "",
    fabric: FABRIC_DEFAULTS[category] ?? "", sizes: SIZES_DEFAULTS[category] ?? "",
    priceRange: "", badge: "", sortOrder: "0", ...specs,
  }
}

export default function AdminProductsPage() {
  const [activeCategory, setActiveCategory] = useState("kids-innerwear")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState<FormState>(() => defaultForm("kids-innerwear"))
  const [images, setImages] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState("")

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch(`${API_URL}/catalog?category=${activeCategory}`)
      const data = await r.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch { setProducts([]) }
    setLoading(false)
  }, [activeCategory])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  function openAdd() {
    setEditing(null); setForm(defaultForm(activeCategory)); setImages([]); setError(""); setShowForm(true)
  }
  function openEdit(p: Product) {
    setEditing(p)
    const specs = emptySpecs()
    for (const k of SPEC_KEYS) specs[k] = ((p as unknown) as Record<string, string>)[k] ?? ""
    setForm({
      name: p.name, subcategory: p.subcategory ?? "", description: p.description ?? "",
      fabric: p.fabric ?? "", sizes: p.sizes ?? "", priceRange: p.priceRange ?? "",
      badge: p.badge ?? "", sortOrder: String(p.sortOrder), ...specs,
    })
    setImages([...p.images]); setError(""); setShowForm(true)
  }
  function closeForm() {
    setShowForm(false); setEditing(null); setForm(defaultForm(activeCategory)); setImages([]); setError("")
  }
  function set(key: keyof FormState, value: string) { setForm(p => ({ ...p, [key]: value })) }

  async function handleSave() {
    if (!form.name.trim()) { setError("Product name is required"); return }
    setSaving(true); setError("")
    try {
      const specBody: Record<string, string | null> = {}
      for (const k of SPEC_KEYS) specBody[k] = form[k].trim() || null
      const body = {
        category: activeCategory, subcategory: form.subcategory || null,
        name: form.name.trim(), description: form.description.trim() || null,
        fabric: form.fabric.trim() || null, sizes: form.sizes.trim() || null,
        priceRange: form.priceRange.trim() || null, badge: form.badge.trim() || null,
        images, sortOrder: parseInt(form.sortOrder) || 0, ...specBody,
      }
      if (editing) await apiFetch(`/catalog/${editing.id}`, { method: "PATCH", body: JSON.stringify(body) })
      else         await apiFetch("/catalog", { method: "POST", body: JSON.stringify(body) })
      closeForm(); fetchProducts()
    } catch { setError("Save failed — please try again") }
    setSaving(false)
  }

  async function handleDelete(p: Product) {
    if (!confirm(`Delete "${p.name}"?`)) return
    setDeleting(p.id); await apiDelete(`/catalog/${p.id}`); setDeleting(null); fetchProducts()
  }

  const categorySpecs = CATEGORY_SPECS[activeCategory] ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Product Catalog</h1>
          <p className="text-sm text-brand-slate mt-1">Add products with full specifications and multiple images.</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 bg-brand-accent text-white px-4 py-2.5 text-sm font-semibold hover:bg-brand-accent/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="flex gap-1 border-b border-brand-border">
        {CATEGORIES.map((cat) => (
          <button key={cat.id}
            onClick={() => { setActiveCategory(cat.id); if (showForm && !editing) setForm(defaultForm(cat.id)) }}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${activeCategory === cat.id ? "border-brand-accent text-brand-accent" : "border-transparent text-brand-slate hover:text-brand-charcoal"}`}
          >{cat.label}</button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-brand-slate py-8"><Loader2 className="w-5 h-5 animate-spin" /> Loading…</div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-brand-border">
          <p className="text-brand-slate text-sm">No products yet.</p>
          <button onClick={openAdd} className="mt-4 text-brand-accent text-sm font-semibold hover:underline">+ Add first product</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border border-brand-border bg-white overflow-hidden group">
              <div className="relative aspect-square overflow-hidden bg-brand-light-gray">
                {product.images[0] ? <Image src={product.images[0]} alt={product.name} fill className="object-cover" unoptimized /> : <div className="w-full h-full flex items-center justify-center text-brand-ash text-xs">No Image</div>}
                {product.badge && <span className="absolute top-2 left-2 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">{product.badge}</span>}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => openEdit(product)} className="p-2 bg-white text-brand-charcoal hover:bg-brand-accent hover:text-white transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(product)} disabled={deleting === product.id} className="p-2 bg-white text-red-600 hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50">
                    {deleting === product.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="p-3">
                {product.subcategory && <p className="text-[10px] font-bold uppercase tracking-wider text-brand-accent mb-1">{product.subcategory}</p>}
                <p className="text-sm font-semibold text-brand-charcoal leading-tight line-clamp-2">{product.name}</p>
                <p className="text-xs text-brand-ash mt-1">{product.images.length} image{product.images.length !== 1 ? "s" : ""}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
          <div className="bg-white w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
              <h2 className="text-lg font-bold text-brand-navy">{editing ? "Edit Product" : "Add Product"}</h2>
              <button onClick={closeForm} className="text-brand-ash hover:text-brand-charcoal"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 space-y-5">
              {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-2 border border-red-200">{error}</p>}

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-brand-ash mb-1.5">Product Name *</label>
                <input value={form.name} onChange={e => set("name", e.target.value)}
                  className="w-full border border-brand-border px-3 py-2 text-sm focus:outline-none focus:border-brand-accent"
                  placeholder="e.g. Organic Cotton Bodysuit" />
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-brand-ash mb-1.5">Subcategory</label>
                <select value={form.subcategory} onChange={e => set("subcategory", e.target.value)}
                  className="w-full border border-brand-border px-3 py-2 text-sm focus:outline-none focus:border-brand-accent bg-white">
                  <option value="">Select subcategory</option>
                  {(SUBCATEGORIES[activeCategory] ?? []).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-brand-ash mb-1.5">Badge / Browse By</label>
                  <select value={form.badge} onChange={e => set("badge", e.target.value)}
                    className="w-full border border-brand-border px-3 py-2 text-sm focus:outline-none focus:border-brand-accent bg-white">
                    <option value="">None</option>
                    <option value="New Arrival">New Arrival</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="Sustainable">Sustainable</option>
                    <option value="Private Label">Private Label</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-brand-ash mb-1.5">Price Range</label>
                  <input value={form.priceRange} onChange={e => set("priceRange", e.target.value)}
                    className="w-full border border-brand-border px-3 py-2 text-sm focus:outline-none focus:border-brand-accent"
                    placeholder="e.g. $2.50 – $4.00/unit" />
                </div>
              </div>

              {/* Description */}
              <div>
                <SpecFieldLabel label="Description" fieldKey="description" form={form} category={activeCategory} set={set} def={DESC_DEFAULTS[activeCategory] ?? ""} />
                <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={3}
                  className="w-full border border-brand-border px-3 py-2 text-sm focus:outline-none focus:border-brand-accent resize-none" />
              </div>

              {/* Fabric + Sizes */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <SpecFieldLabel label="Fabric / Material" fieldKey="fabric" form={form} category={activeCategory} set={set} def={FABRIC_DEFAULTS[activeCategory] ?? ""} />
                  <input value={form.fabric} onChange={e => set("fabric", e.target.value)}
                    className="w-full border border-brand-border px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" />
                </div>
                <div>
                  <SpecFieldLabel label="Available Sizes" fieldKey="sizes" form={form} category={activeCategory} set={set} def={SIZES_DEFAULTS[activeCategory] ?? ""} />
                  <input value={form.sizes} onChange={e => set("sizes", e.target.value)}
                    className="w-full border border-brand-border px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" />
                </div>
              </div>

              {/* Category-specific spec fields */}
              {categorySpecs.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-ash mb-3 border-b border-brand-border pb-2">
                    Specifications
                  </p>
                  <div className="space-y-4">
                    {/* Color palette selector — full width */}
                    {categorySpecs.filter(s => s.key === "colors").map(spec => {
                      let selected: string[] = []
                      try { selected = JSON.parse(form.colors || "[]") } catch { selected = [] }
                      return (
                        <div key={spec.key} className="border border-brand-border p-4 bg-brand-light-gray">
                          <p className="text-xs font-black uppercase tracking-widest text-brand-ash mb-3">
                            {spec.label}
                          </p>
                          <ColorPaletteSelector
                            selected={selected}
                            onChange={(colors) => set("colors", JSON.stringify(colors))}
                          />
                        </div>
                      )
                    })}
                    {/* Other spec fields — 2-col grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {categorySpecs.filter(s => s.key !== "colors").map(spec => (
                        <div key={spec.key}>
                          <SpecFieldLabel label={spec.label} fieldKey={spec.key} form={form} category={activeCategory} set={set} def={spec.default} />
                          <input value={form[spec.key]} onChange={e => set(spec.key, e.target.value)}
                            className="w-full border border-brand-border px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sort Order */}
              <div className="w-1/4">
                <label className="block text-xs font-semibold uppercase tracking-wide text-brand-ash mb-1.5">Sort Order</label>
                <input type="number" value={form.sortOrder} onChange={e => set("sortOrder", e.target.value)}
                  className="w-full border border-brand-border px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" placeholder="0" />
              </div>

              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wide text-brand-ash">Product Images</label>
                  <span className="text-xs text-brand-ash">{images.length} uploaded — first is main thumbnail</span>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {images.map((url, idx) => (
                    <div key={idx} className="relative aspect-square border border-brand-border overflow-hidden group">
                      <Image src={url} alt={`Image ${idx + 1}`} fill className="object-cover" unoptimized />
                      {idx === 0 && <span className="absolute bottom-0 left-0 right-0 text-center text-[9px] bg-brand-accent text-white font-bold py-0.5">MAIN</span>}
                      <button onClick={() => setImages(p => p.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <CldUploadWidget
                    signatureEndpoint={`${API_URL}/upload/sign`}
                    options={{ folder: `Raft Garments/products/${activeCategory}`, multiple: true }}
                    onSuccess={(result) => {
                      if (result.info && typeof result.info === "object" && "secure_url" in result.info)
                        setImages(p => [...p, (result.info as { secure_url: string }).secure_url])
                    }}
                  >
                    {({ open }) => (
                      <button type="button" onClick={() => open()}
                        className="aspect-square border-2 border-dashed border-brand-border flex flex-col items-center justify-center gap-1 text-brand-ash hover:border-brand-accent hover:text-brand-accent transition-colors">
                        <ImagePlus className="w-6 h-6" /><span className="text-[10px] font-medium">Add</span>
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-brand-border bg-brand-light-gray">
              <button onClick={closeForm} className="px-4 py-2 text-sm text-brand-slate hover:text-brand-charcoal">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="inline-flex items-center gap-2 bg-brand-accent text-white px-5 py-2 text-sm font-semibold hover:bg-brand-accent/90 disabled:opacity-60">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editing ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SpecFieldLabel({ label, fieldKey, form, category, set, def }: {
  label: string; fieldKey: keyof FormState; form: FormState
  category: string; set: (k: keyof FormState, v: string) => void; def: string
}) {
  const isDefault = form[fieldKey] === def
  return (
    <div className="flex items-center justify-between mb-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-brand-ash">{label}</label>
      <div className="flex items-center gap-2">
        {def && <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 ${isDefault ? "bg-brand-light-gray text-brand-ash" : "bg-green-100 text-green-700"}`}>{isDefault ? "Default" : "Edited"}</span>}
        {def && !isDefault && <button type="button" onClick={() => set(fieldKey, def)} className="text-[10px] text-brand-slate hover:text-brand-charcoal underline">↩ Reset</button>}
      </div>
    </div>
  )
}

