"use client"

import { useState, useEffect, useCallback } from "react"
import dynamicImport from "next/dynamic"
import Image from "next/image"
import { Copy, Check, Trash2, RefreshCw } from "lucide-react"

export const dynamic = "force-dynamic"

const ImageUpload = dynamicImport(() => import("@/components/admin/ImageUpload"), { ssr: false })

interface CloudinaryResource {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  bytes: number
  created_at: string
  folder: string
}

const FOLDERS = [
  { label: "Products — Babies Wear",  value: "Raft-Garments/products/babies-wear" },
  { label: "Products — Kids Wear",    value: "Raft-Garments/products/kids-wear" },
  { label: "Products — Mens Wear",    value: "Raft-Garments/products/mens-wear" },
  { label: "Products — Womens Wear",  value: "Raft-Garments/products/womens-wear" },
  { label: "Banners & Hero",          value: "Raft-Garments/banners" },
  { label: "Client Logos",            value: "Raft-Garments/clients" },
  { label: "General / Misc",          value: "Raft-Garments" },
]

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function MediaPage() {
  const [activeFolder, setActiveFolder] = useState(FOLDERS[6].value)
  const [images, setImages] = useState<CloudinaryResource[]>([])
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const fetchImages = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/media?folder=${encodeURIComponent(activeFolder)}`)
      const data = await res.json()
      setImages(Array.isArray(data) ? data : [])
    } catch {
      setImages([])
    } finally {
      setLoading(false)
    }
  }, [activeFolder])

  useEffect(() => { fetchImages() }, [fetchImages])

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  async function deleteImage(publicId: string) {
    if (!confirm("Delete this image from Cloudinary?")) return
    await fetch(`/api/media?public_id=${encodeURIComponent(publicId)}`, { method: "DELETE" })
    setImages((prev) => prev.filter((img) => img.public_id !== publicId))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-black uppercase tracking-tight">Media Library</h1>
          <p className="text-sm text-brand-slate mt-1">Upload and manage images stored on Cloudinary</p>
        </div>
        <button
          onClick={fetchImages}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-brand-border px-4 py-2 hover:border-black transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Folder tabs */}
      <div className="flex flex-wrap gap-2">
        {FOLDERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFolder(f.value)}
            className={`px-3 py-1.5 text-xs font-semibold border transition-colors ${
              activeFolder === f.value
                ? "bg-black text-white border-black"
                : "border-brand-border text-brand-slate hover:border-black hover:text-black"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Upload widget */}
      <div className="border border-brand-border p-6 bg-white">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-ash mb-4">
          Upload to: <span className="text-black">{FOLDERS.find(f => f.value === activeFolder)?.label}</span>
        </p>
        <ImageUpload
          folder={activeFolder}
          label="Click to upload image"
          onUpload={() => fetchImages()}
        />
      </div>

      {/* Image grid */}
      {loading ? (
        <div className="text-center py-16 text-brand-ash text-sm">Loading images…</div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-brand-border">
          <p className="text-brand-ash text-sm">No images in this folder yet.</p>
          <p className="text-brand-ash text-xs mt-1">Upload your first image above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.public_id} className="group border border-brand-border bg-white overflow-hidden">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-brand-light-gray overflow-hidden">
                <Image
                  src={img.secure_url}
                  alt={img.public_id}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Info + actions */}
              <div className="p-3 space-y-2">
                <p className="text-[10px] text-brand-ash truncate font-mono">
                  {img.public_id.split("/").pop()}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-brand-ash">
                  <span>{img.width}×{img.height}</span>
                  <span>·</span>
                  <span>{img.format.toUpperCase()}</span>
                  <span>·</span>
                  <span>{formatBytes(img.bytes)}</span>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => copyUrl(img.secure_url)}
                    title="Copy URL"
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] font-bold uppercase tracking-wide border border-brand-border hover:border-black hover:text-black transition-colors text-brand-slate"
                  >
                    {copied === img.secure_url ? (
                      <><Check className="w-3 h-3 text-brand-accent" /> Copied</>
                    ) : (
                      <><Copy className="w-3 h-3" /> Copy URL</>
                    )}
                  </button>
                  <button
                    onClick={() => deleteImage(img.public_id)}
                    title="Delete"
                    className="p-1.5 border border-brand-border hover:border-red-400 hover:text-red-500 transition-colors text-brand-slate"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
