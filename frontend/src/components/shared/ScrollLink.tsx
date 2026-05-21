"use client"

import { useRouter, usePathname } from "next/navigation"
import type { AnchorHTMLAttributes, MouseEvent } from "react"

interface ScrollLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string
}

function scrollTop() {
  try { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) } catch { /* noop */ }
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

function scrollToHash(hash: string) {
  const id = hash.startsWith("#") ? hash.slice(1) : hash
  const el = document.getElementById(id)
  if (!el) return
  // Offset for fixed navbar (~72px) plus a small visual gap
  const offset = 80
  const y = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: y, behavior: "smooth" })
}

export default function ScrollLink({ href, onClick, children, ...props }: ScrollLinkProps) {
  const router   = useRouter()
  const pathname = usePathname()

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Let middle-click / ctrl+click open in new tab naturally
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return

    e.preventDefault()

    const withoutQuery = href.split("?")[0]
    const hashIdx      = withoutQuery.indexOf("#")
    const hrefPath     = (hashIdx === -1 ? withoutQuery : withoutQuery.slice(0, hashIdx)).replace(/\/$/, "") || "/"
    const hashPart     = hashIdx === -1 ? "" : withoutQuery.slice(hashIdx)
    const current      = pathname.replace(/\/$/, "") || "/"

    if (hrefPath === current) {
      // Same page — scroll to hash section or back to top
      if (hashPart) {
        scrollToHash(hashPart)
      } else {
        scrollTop()
      }
    } else {
      router.push(href)
    }

    onClick?.(e)
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
