"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { getSiteContent } from "@/lib/content"

type ContentMap = Record<string, string>

interface ContentContextValue {
  content: ContentMap
  loading: boolean
  reload: () => Promise<void>
}

const ContentContext = createContext<ContentContextValue>({
  content: {},
  loading: true,
  reload: async () => {},
})

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentMap>({})
  const [loading, setLoading] = useState(true)

  async function reload() {
    setLoading(true)
    const data = await getSiteContent()
    setContent(data)
    setLoading(false)
  }

  useEffect(() => { reload() }, [])

  return (
    <ContentContext.Provider value={{ content, loading, reload }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}

export function useContentValue(key: string, fallback = "") {
  const { content } = useContext(ContentContext)
  return content[key]?.trim() || fallback
}
