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
  try {
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
  } catch (err) {
    console.error(`[api] Network error on ${path}:`, err)
    throw new Error("Cannot reach the backend server. Make sure it is running on port 4000.")
  }
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
  // No Content-Type on DELETE — avoids CORS preflight rejection on bodyless requests
  const token = getStoredToken()
  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"
  try {
    return await fetch(`${API}${path}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
  } catch (err) {
    console.error(`[api] Network error on DELETE ${path}:`, err)
    throw new Error("Cannot reach the backend server. Make sure it is running on port 4000.")
  }
}
