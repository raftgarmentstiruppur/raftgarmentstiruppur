import type { Client } from "@/types"
import SectionHeader from "@/components/shared/SectionHeader"
import Link from "next/link"
import Image from "next/image"

interface ClientLogosProps {
  clients: Client[]
  heading?: string
}

export default function ClientLogos({ clients, heading }: ClientLogosProps) {
  return (
    <section className="py-section bg-brand-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {heading && (
          <SectionHeader
            overline="Our Clients"
            title={heading}
            className="mb-14"
          />
        )}
        <div className="flex flex-wrap items-center justify-center gap-12">
          {clients.map((client) => (
            <Link
              key={client.name}
              href={client.href ?? "#"}
              className="group flex items-center justify-center"
            >
              <div className="relative h-10 w-32 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
        <p className="text-center mt-10 text-xs text-brand-ash uppercase tracking-widest font-semibold">
          And many more global brands across Europe, North America, and Australia.
        </p>
      </div>
    </section>
  )
}
