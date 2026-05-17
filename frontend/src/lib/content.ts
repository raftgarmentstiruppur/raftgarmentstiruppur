import { apiGet } from "./api"

export type SiteContent = Record<string, string>

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const res = await apiGet("/content")
    if (!res.ok) return {}
    return res.json()
  } catch {
    return {}
  }
}

export function getContentValue(content: SiteContent, key: string, fallback: string): string {
  return content[key]?.trim() || fallback
}
