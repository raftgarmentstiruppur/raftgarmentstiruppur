import type { Metadata } from "next"
import { Barlow } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/AuthContext"
import { ContentProvider } from "@/context/ContentContext"

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Raft Garments | Fiber to Fashion",
    template: "%s | Raft Garments",
  },
  description:
    "Raft Garments — 40+ years of knitwear manufacturing excellence from Tirupur, India. Premium innerwear and outerwear for brands across Europe, USA, and India.",
  keywords: ["knitwear manufacturer","innerwear","outerwear","B2B","Tirupur","private label","kids innerwear","mens innerwear","womens innerwear","export","NOOS"],
  openGraph: {
    type: "website",
    siteName: "Raft Garments",
    title: "Raft Garments | Crafting Quality, Pioneering Sustainability",
    description: "40+ years of innerwear manufacturing excellence from Tirupur, India. Taking India's finest knitwear to the world.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={barlow.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased min-h-full flex flex-col bg-white" suppressHydrationWarning>
        <AuthProvider><ContentProvider>{children}</ContentProvider></AuthProvider>
      </body>
    </html>
  )
}

