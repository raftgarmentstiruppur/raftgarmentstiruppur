"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { getSiteContent } from "@/lib/content"

type ContentMap = Record<string, string>

interface ContentContextValue {
  content: ContentMap
  reload: () => Promise<void>
}

const ContentContext = createContext<ContentContextValue>({
  content: {},
  reload: async () => {},
})

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentMap>({})

  async function reload() {
    const data = await getSiteContent()
    setContent(data)
  }

  useEffect(() => { reload() }, [])

  return (
    <ContentContext.Provider value={{ content, reload }}>
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
