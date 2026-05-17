const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("dg_token")
}

export function setStoredToken(token: string) {
  localStorage.setItem("dg_token", token)
}

export function clearStoredToken() {
  localStorage.removeItem("dg_token")
  localStorage.removeItem("dg_user")
}

export function getStoredUser<T>(): T | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem("dg_user")
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function setStoredUser(user: unknown) {
  localStorage.setItem("dg_user", JSON.stringify(user))
}

export async function apiFetch(path: string, init?: RequestInit) {
  const token = getStoredToken()
  const res = await fetch(`${API}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  })
  return res
}

export async function apiGet(path: string) {
  return apiFetch(path)
}

export async function apiPost(path: string, body: unknown) {
  return apiFetch(path, { method: "POST", body: JSON.stringify(body) })
}

export async function apiPatch(path: string, body: unknown) {
  return apiFetch(path, { method: "PATCH", body: JSON.stringify(body) })
}

export async function apiDelete(path: string) {
  return apiFetch(path, { method: "DELETE" })
}
