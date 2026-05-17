"use client"

import { useContentValue } from "@/context/ContentContext"

interface ContentListProps {
  contentKey: string
  fallback: string[]
  itemClassName?: string
}

export default function ContentList({ contentKey, fallback, itemClassName }: ContentListProps) {
  const raw = useContentValue(contentKey)
  const items = raw
    ? raw.split(",").map((s) => s.trim()).filter(Boolean)
    : fallback

  return (
    <>
      {items.map((item, i) => (
        <div key={i} className={itemClassName}>
          {item}
        </div>
      ))}
    </>
  )
}
