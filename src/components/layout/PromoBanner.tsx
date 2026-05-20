import Link from "next/link"

export default function PromoBanner() {
  return (
    <div className="h-9 flex items-center justify-center bg-brand-accent border-b-2 border-brand-navy px-4">
      <p className="text-[10px] font-heading font-700 tracking-[0.2em] uppercase text-white text-center">
        Free Samples Available — Min 500 Units Per Style{" "}
        <Link href="/contact" className="underline underline-offset-2 hover:no-underline ml-2 transition-all">
          Contact Us Today →
        </Link>
      </p>
    </div>
  )
}
