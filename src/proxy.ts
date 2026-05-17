import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const session = req.auth
  const isLoggedIn = !!session
  const role = session?.user?.role

  // Protect admin routes — must be ADMIN
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl))
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }
  }

  // Protect dashboard routes — must be logged in
  if (nextUrl.pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl))
    }
  }

  // Redirect logged-in users away from login/register
  if (["/login", "/register"].includes(nextUrl.pathname) && isLoggedIn) {
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", nextUrl))
    }
    return NextResponse.redirect(new URL("/dashboard", nextUrl))
  }
})

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
}
