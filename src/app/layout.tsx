import type { Metadata } from "next"
import { Barlow } from "next/font/google"
import "./globals.css"

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
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
    <html lang="en" className={barlow.variable}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased min-h-full flex flex-col bg-white">
        {children}
      </body>
    </html>
  )
}
