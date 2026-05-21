"use client"

import Image from "next/image"

const ROW1 = [
  { src: "/images/hero/slide7.png", alt: "Premium Quality" },
  { src: "/images/hero/slide4.png", alt: "Kids' Innerwear" },
  { src: "/images/hero/slide1.png", alt: "Women's Range" },
  { src: "/images/hero/slide6.png", alt: "Premium Cotton Sets" },
  { src: "/images/hero/slide5.png", alt: "Full Catalogue" },
]

const ROW2 = [
  { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&auto=format&fit=crop", alt: "Fashion apparel" },
  { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&auto=format&fit=crop", alt: "Clothing detail" },
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop", alt: "Activewear" },
  { src: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=700&auto=format&fit=crop", alt: "Fabric texture" },
  { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&auto=format&fit=crop", alt: "Garment detail" },
  { src: "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=700&auto=format&fit=crop", alt: "Textile production" },
]

const kbClasses = ["animate-kb-a", "animate-kb-b", "animate-kb-a", "animate-kb-b"]

function ImageRow({
  images,
  reverse = false,
  rowIndex = 0,
}: {
  images: typeof ROW1
  reverse?: boolean
  rowIndex?: number
}) {
  const doubled = [...images, ...images]

  return (
    <div className="overflow-hidden relative h-[220px] sm:h-[260px] md:h-[300px]">
      <div
        className={`flex gap-[2px] w-max h-full ${reverse ? "animate-marquee-reverse" : "animate-marquee"} hover:[animation-play-state:paused]`}
      >
        {doubled.map((img, i) => (
          <div
            key={`${img.alt}-${i}`}
            className="relative shrink-0 h-full overflow-hidden"
            style={{ width: "clamp(280px, 28vw, 420px)" }}
          >
            <div
              className={`absolute inset-0 ${kbClasses[(i + rowIndex) % 4]}`}
              style={{ animationDelay: `${(i * 2.1) % 8}s` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 28vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AnimatedImageStrip() {
  return (
    <section className="bg-black overflow-hidden">
      <ImageRow images={ROW1} reverse={false} rowIndex={0} />
    </section>
  )
}
