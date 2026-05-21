import Link from "next/link"

export default function PromoBanner() {
  return (
    <div className="h-10 flex items-center justify-center bg-brand-accent text-white px-4 sticky top-0 z-50">
      <p className="text-sm font-bold tracking-wider uppercase text-center">
        Free samples available &mdash; min 500 units per style &nbsp;
        <Link href="/contact" className="underline underline-offset-2 hover:text-white/80 transition-colors">
          Contact us today
        </Link>
      </p>
    </div>
  )
}
