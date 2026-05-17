import type { Metadata } from "next"
import Link from "next/link"
import LoginForm from "@/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to the Raft Garments buyer portal.",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brand-light-gray flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="font-black text-2xl tracking-tight text-brand-navy">
            RAFT<span className="font-light">GARMENTS</span>
          </Link>
          <p className="mt-2 text-sm text-brand-slate">B2B Buyer Portal</p>
        </div>

        <div className="bg-white border border-brand-border p-8">
          <h1 className="text-xl font-bold text-brand-navy mb-6">Sign In to Your Account</h1>
          <LoginForm />
        </div>

        <p className="text-center mt-6 text-xs text-brand-ash">
          <Link href="/" className="hover:text-brand-accent transition-colors">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  )
}

