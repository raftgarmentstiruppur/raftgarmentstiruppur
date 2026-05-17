import type { Certification } from "@/types"

interface CertificationStripProps {
  certs: Certification[]
}

export default function CertificationStrip({ certs }: CertificationStripProps) {
  const doubled = [...certs, ...certs]

  return (
    <section className="bg-black py-5 overflow-hidden border-y border-white/10">
      <div className="group flex gap-16 w-max animate-marquee hover:[animation-play-state:paused]">
        {doubled.map((cert, i) => (
          <div
            key={`${cert.id}-${i}`}
            className="flex items-center gap-3 shrink-0"
          >
            <span className="w-1 h-1 bg-brand-accent" />
            <span className="text-xs font-bold text-white/50 whitespace-nowrap uppercase tracking-widest">
              {cert.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
