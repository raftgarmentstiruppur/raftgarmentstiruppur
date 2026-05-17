import type { Metadata } from "next"
import Link from "next/link"
import RegisterForm from "@/components/auth/RegisterForm"

export const metadata: Metadata = {
  title: "Create Account",
  description: "Register for a Raft Garments B2B buyer account.",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-brand-light-gray flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="font-black text-2xl tracking-tight text-brand-navy">
            RAFT<span className="font-light">GARMENTS</span>
          </Link>
          <p className="mt-2 text-sm text-brand-slate">Create a B2B Buyer Account</p>
        </div>

        <div className="bg-white border border-brand-border p-8">
          <h1 className="text-xl font-bold text-brand-navy mb-2">Create Your Account</h1>
          <p className="text-sm text-brand-slate mb-6">
            Register to submit quote requests, track orders, and access exclusive buyer resources.
          </p>
          <RegisterForm />
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
