"use client"

import { useContentValue } from "@/context/ContentContext"
import type { ElementType, HTMLAttributes } from "react"

interface ContentTextProps extends HTMLAttributes<HTMLElement> {
  contentKey: string
  fallback?: string
  as?: ElementType
}

export default function ContentText({
  contentKey,
  fallback = "",
  as: Tag = "span",
  ...props
}: ContentTextProps) {
  const value = useContentValue(contentKey, fallback)
  return <Tag {...props}>{value}</Tag>
}
