import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
