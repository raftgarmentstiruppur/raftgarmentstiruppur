"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { loginSchema, type LoginInput } from "@/lib/validations"
import { login } from "@/lib/auth-client"
import { useAuthContext } from "@/context/AuthContext"
import { cn } from "@/lib/utils"

export default function LoginForm() {
  const router = useRouter()
  const { signIn } = useAuthContext()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(data: LoginInput) {
    setServerError("")
    try {
      const user = await login(data.email, data.password)
      signIn(user)
      router.push(user.role === "ADMIN" ? "/admin" : "/dashboard")
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Invalid email or password.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {serverError}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">
          Business Email
        </label>
        <input
          type="email"
          autoComplete="email"
          {...register("email")}
          className={cn(
            "w-full border px-4 py-3 text-sm outline-none transition-colors",
            errors.email
              ? "border-red-400 focus:border-red-500"
              : "border-brand-border focus:border-brand-accent"
          )}
          placeholder="you@company.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate">
            Password
          </label>
          <Link href="/forgot-password" className="text-xs text-brand-accent hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            {...register("password")}
            className={cn(
              "w-full border px-4 py-3 pr-11 text-sm outline-none transition-colors",
              errors.password
                ? "border-red-400 focus:border-red-500"
                : "border-brand-border focus:border-brand-accent"
            )}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-ash hover:text-brand-slate"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-accent text-white font-semibold py-3 text-sm hover:bg-brand-accent-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSubmitting ? "Signing in…" : "Sign In"}
      </button>

      <p className="text-center text-sm text-brand-slate">
        New to Raft Garments?{" "}
        <Link href="/register" className="text-brand-accent hover:underline font-medium">
          Create an account
        </Link>
      </p>
    </form>
  )
}

