"use client"

import { useState, useEffect, useCallback } from "react"
import { getMe, logout as apiLogout, type AuthUser } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getMe().then((u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  const signOut = useCallback(async (redirectTo = "/") => {
    await apiLogout()
    setUser(null)
    router.push(redirectTo)
  }, [router])

  return { user, loading, signOut }
}

export function useRequireAuth(role?: "ADMIN" | "BUYER") {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.push("/login")
      return
    }
    if (role && user.role !== role) {
      router.push(user.role === "ADMIN" ? "/admin" : "/dashboard")
    }
  }, [user, loading, role, router])

  return { user, loading, signOut }
}
