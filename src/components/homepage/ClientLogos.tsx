import type { Client } from "@/types"
import Link from "next/link"
import Image from "next/image"

export default function ClientLogos({ clients, heading }: { clients: Client[]; heading?: string }) {
  return (
    <section className="border-t-2 border-brand-navy bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-14">
        {heading && (
          <p className="text-[10px] font-heading font-700 uppercase tracking-[0.3em] text-brand-ash mb-8 text-center">{heading}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-10">
          {clients.map((client) => (
            <Link key={client.name} href={client.href ?? "#"} className="group">
              <div className="relative h-9 w-28 grayscale opacity-35 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                <Image src={client.logo} alt={client.name} fill className="object-contain" />
              </div>
            </Link>
          ))}
        </div>
        <p className="text-center mt-8 text-xs text-brand-ash uppercase tracking-[0.2em] font-heading font-700">
          And many more global brands across Europe, North America &amp; Australia
        </p>
      </div>
    </section>
  )
}
