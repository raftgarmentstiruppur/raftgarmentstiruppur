"use client"

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react"
import { getMe, logout as apiLogout, type AuthUser } from "@/lib/auth-client"
import { getStoredUser } from "@/lib/api"
import { useRouter } from "next/navigation"

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  signIn: (user: AuthUser) => void
  signOut: (redirectTo?: string) => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signIn: () => {},
  signOut: async () => {},
  refresh: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  // Start null on both server and client — avoids hydration mismatch
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Immediately seed from localStorage (synchronous, no flash)
    const cached = getStoredUser<AuthUser>()
    if (cached) {
      setUser(cached)
      setLoading(false)
    }
    // Background verify the token with the server
    getMe().then((u) => {
      if (u !== null) {
        setUser(u)
      } else {
        setUser(null)
      }
      setLoading(false)
    })
  }, [])

  // Called after login/register — sets user immediately, no extra network call
  const signIn = useCallback((u: AuthUser) => {
    setUser(u)
    setLoading(false)
  }, [])

  const refresh = useCallback(async () => {
    const u = await getMe()
    if (u !== null) setUser(u)
    else setUser(null)
    setLoading(false)
  }, [])

  const signOut = useCallback(async (redirectTo = "/") => {
    await apiLogout()
    setUser(null)
    router.push(redirectTo)
  }, [router])

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
