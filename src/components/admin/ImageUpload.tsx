"use client"

import { CldUploadWidget } from "next-cloudinary"
import { Upload, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface UploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  bytes: number
}

interface ImageUploadProps {
  folder?: string
  label?: string
  currentUrl?: string
  onUpload: (result: UploadResult) => void
}

export default function ImageUpload({
  folder = "Raft-Garments",
  label = "Upload Image",
  currentUrl,
  onUpload,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null)

  return (
    <div className="space-y-3">
      {preview && (
        <div className="relative aspect-video w-full border border-brand-border overflow-hidden bg-brand-light-gray">
          <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
        </div>
      )}

      <CldUploadWidget
        signatureEndpoint="/api/upload"
        options={{
          folder,
          multiple: false,
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "avif"],
          maxFileSize: 10_000_000,
        }}
        onSuccess={(result) => {
          if (result.info && typeof result.info === "object") {
            const info = result.info as UploadResult
            setPreview(info.secure_url)
            onUpload(info)
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-brand-border hover:border-brand-accent hover:text-brand-accent text-brand-slate transition-colors py-4 text-sm font-semibold uppercase tracking-wide"
          >
            {preview ? (
              <>
                <ImageIcon className="w-4 h-4" />
                Replace Image
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                {label}
              </>
            )}
          </button>
        )}
      </CldUploadWidget>
    </div>
  )
}
