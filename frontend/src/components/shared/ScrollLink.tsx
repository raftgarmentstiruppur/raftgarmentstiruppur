"use client"

import { useRouter, usePathname } from "next/navigation"
import type { AnchorHTMLAttributes, MouseEvent } from "react"

interface ScrollLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string
}

function scrollTop() {
  // Multiple methods for full browser compatibility
  try { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) } catch { /* noop */ }
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export default function ScrollLink({ href, onClick, children, ...props }: ScrollLinkProps) {
  const router   = useRouter()
  const pathname = usePathname()

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Let middle-click / ctrl+click open in new tab naturally
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return

    e.preventDefault()

    const hrefPath = href.split("?")[0].split("#")[0].replace(/\/$/, "") || "/"
    const current  = pathname.replace(/\/$/, "") || "/"

    if (hrefPath === current) {
      scrollTop()
    } else {
      router.push(href)
      // router.push scrolls to top by default in Next.js App Router
    }

    onClick?.(e)
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
