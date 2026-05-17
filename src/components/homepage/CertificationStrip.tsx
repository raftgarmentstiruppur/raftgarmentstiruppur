import type { Certification } from "@/types"

interface CertificationStripProps {
  certs: Certification[]
}

export default function CertificationStrip({ certs }: CertificationStripProps) {
  const doubled = [...certs, ...certs]

  return (
    <section className="bg-black py-7 overflow-hidden border-y border-white/10">
      <div className="group flex gap-16 w-max animate-marquee hover:[animation-play-state:paused]">
        {doubled.map((cert, i) => (
          <div
            key={`${cert.id}-${i}`}
            className="flex items-center gap-4 shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_2px_rgba(122,173,104,0.6)]" />
            <span className="text-xs font-bold text-white/50 whitespace-nowrap uppercase tracking-widest hover:text-white/80 transition-colors duration-300">
              {cert.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
