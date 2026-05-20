import type { Certification } from "@/types"

export default function CertificationStrip({ certs }: { certs: Certification[] }) {
  const doubled = [...certs, ...certs]
  return (
    <section className="border-t-2 border-brand-navy bg-brand-navy py-5 overflow-hidden">
      <div className="flex gap-14 w-max animate-marquee hover:[animation-play-state:paused]">
        {doubled.map((cert, i) => (
          <div key={`${cert.id}-${i}`} className="flex items-center gap-4 shrink-0">
            <span className="w-1 h-1 bg-brand-accent" />
            <span className="text-[10px] font-heading font-700 text-white/40 whitespace-nowrap uppercase tracking-[0.25em] hover:text-white/70 transition-colors duration-300">
              {cert.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
