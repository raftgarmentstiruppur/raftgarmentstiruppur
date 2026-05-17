import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/" className="font-black text-lg tracking-tight text-white uppercase">
          Draft<span className="font-light">Garments</span>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        {children}
      </div>
    </div>
  )
}
