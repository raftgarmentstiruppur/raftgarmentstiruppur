import type { Metadata } from "next"
import { Bebas_Neue, Barlow_Condensed, Inter } from "next/font/google"
import "./globals.css"

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
})

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Raft-Garments | Fiber to Fashion",
    template: "%s | Raft-Garments",
  },
  description:
    "One of India's leading fully vertical garment manufacturers. 18 facilities, fiber to fashion, since 1993.",
  keywords: ["garment manufacturer","B2B","Tirupur","knitwear","private label","babies wear","kids wear","export"],
  openGraph: {
    type: "website",
    siteName: "Raft-Garments",
    title: "Raft-Garments | Fiber to Fashion",
    description: "India's leading fully vertical garment manufacturer. 18 facilities, since 1993.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${barlowCondensed.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased min-h-full flex flex-col bg-brand-surface">
        {children}
      </body>
    </html>
  )
}
