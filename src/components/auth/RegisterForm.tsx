"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { registerSchema, type RegisterInput } from "@/lib/validations"
import { cn } from "@/lib/utils"

const inputCls = (hasError: boolean) =>
  cn(
    "w-full border px-4 py-3 text-sm outline-none transition-colors",
    hasError
      ? "border-red-400 focus:border-red-500"
      : "border-brand-border focus:border-brand-accent"
  )

export default function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) })

  async function onSubmit(data: RegisterInput) {
    setServerError("")
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const json = await res.json()
      setServerError(json.error ?? "Registration failed.")
      return
    }
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="on">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">
            Contact Name
          </label>
          <input
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            {...register("name")}
            className={inputCls(!!errors.name)}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">
            Company Name
          </label>
          <input
            type="text"
            autoComplete="organization"
            placeholder="Your company"
            {...register("company")}
            className={inputCls(!!errors.company)}
          />
          {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">
          Business Email
        </label>
        <input
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          {...register("email")}
          className={inputCls(!!errors.email)}
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            {...register("password")}
            className={cn(inputCls(!!errors.password), "pr-11")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-ash hover:text-brand-slate"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">
            Country
          </label>
          <input
            type="text"
            autoComplete="country-name"
            placeholder="Your country"
            {...register("country")}
            className={inputCls(!!errors.country)}
          />
          {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-brand-slate mb-1.5">
            Phone (optional)
          </label>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+1 555 000 0000"
            {...register("phone")}
            className={inputCls(!!errors.phone)}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-accent text-white font-bold py-3 text-xs uppercase tracking-widest hover:bg-brand-accent-hover transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSubmitting ? "Creating account…" : "Create Account"}
      </button>

      <p className="text-center text-sm text-brand-slate">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-accent hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </form>
  )
}
