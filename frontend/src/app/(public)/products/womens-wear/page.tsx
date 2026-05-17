"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Redirect() {
  const router = useRouter()
  useEffect(() => { router.replace("/products/womens-innerwear") }, [router])
  return null
}
