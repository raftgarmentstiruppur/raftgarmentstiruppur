import { apiGet, apiPost, setStoredToken, clearStoredToken, getStoredToken, getStoredUser, setStoredUser } from "./api"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: "ADMIN" | "BUYER"
  company?: string
  country?: string
}

export async function getMe(): Promise<AuthUser | null> {
  if (!getStoredToken()) return null

  // Return the cached user immediately — verify in the background
  const cached = getStoredUser<AuthUser>()

  try {
    const res = await apiGet("/auth/me")
    if (res.status === 401) {
      // Token is genuinely invalid/expired — clear everything
      clearStoredToken()
      return null
    }
    if (!res.ok) {
      // Network/server error — keep the cached user, don't sign out
      return cached
    }
    const user = await res.json() as AuthUser
    setStoredUser(user)
    return user
  } catch {
    // Network unreachable — keep cached user, don't sign out
    return cached
  }
}

export async function login(email: string, password: string): Promise<AuthUser> {
  const res = await apiPost("/auth/login", { email, password })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? "Login failed")
  if (data.token) setStoredToken(data.token)
  setStoredUser(data.user)
  return data.user
}

export async function register(payload: {
  name: string
  email: string
  password: string
  company: string
  country: string
  phone?: string
}): Promise<void> {
  const res = await apiPost("/auth/register", payload)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? "Registration failed")
}

export async function logout(): Promise<void> {
  clearStoredToken()
  await apiPost("/auth/logout", {}).catch(() => {})
}
