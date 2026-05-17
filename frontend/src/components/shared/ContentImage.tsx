"use client"

import Image from "next/image"
import { useContentValue } from "@/context/ContentContext"

interface ContentImageProps {
  contentKey: string
  fallback?: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
}

export default function ContentImage({
  contentKey,
  fallback,
  alt,
  className,
  fill = true,
  width,
  height,
  priority,
}: ContentImageProps) {
  const src = useContentValue(contentKey, fallback ?? "")

  if (!src) {
    return (
      <div className={`bg-brand-light-gray flex items-center justify-center ${className ?? ""}`}>
        <span className="text-brand-ash text-xs">{alt}</span>
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className ?? "object-cover"}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={className ?? "object-cover w-full"}
      priority={priority}
    />
  )
}
