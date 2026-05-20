import { apiPatch, apiDelete } from "./api"

export type SiteContent = Record<string, string>

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

// Simple fetch — no Content-Type / credentials headers so browser needs no CORS preflight
export async function getSiteContent(): Promise<SiteContent> {
  try {
    const res = await fetch(`${API}/content`, { cache: "no-store" })
    if (!res.ok) return {}
    return res.json()
  } catch {
    return {}
  }
}

export function getContentValue(content: SiteContent, key: string, fallback: string): string {
  return content[key]?.trim() || fallback
}

// Admin-only save — still uses authenticated apiFetch
export async function saveContentKey(key: string, value: string): Promise<void> {
  await apiPatch(`/content/${key}`, { value })
}

// Admin-only delete — removes the record entirely
export async function deleteContentKey(key: string): Promise<void> {
  await apiDelete(`/content/${key}`)
}
