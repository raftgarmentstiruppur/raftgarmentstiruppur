import Link from "next/link"

export default function PromoBanner() {
  return (
    <div className="h-10 flex items-center justify-center bg-brand-accent text-white px-4 sticky top-0 z-50">
      <p className="text-sm font-bold tracking-wider uppercase text-center">
        Free Samples Available &mdash; Min 500 Units Per Style &nbsp;
        <Link href="/contact" className="underline underline-offset-2 hover:text-white/80 transition-colors">
          Contact Us Today
        </Link>
      </p>
    </div>
  )
}
