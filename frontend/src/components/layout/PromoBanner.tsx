import Link from "next/link"

export default function PromoBanner() {
  return (
    <div className="h-10 flex items-center justify-center bg-black text-white px-4 sticky top-0 z-50">
      <p className="text-[10px] font-bold tracking-widest uppercase text-center">
        Free Samples Available — Min 500 Units Per Style{" "}
        <Link
          href="/contact"
          className="underline underline-offset-2 hover:text-brand-accent transition-colors ml-1"
        >
          Contact Us Today
        </Link>
      </p>
    </div>
  )
}
