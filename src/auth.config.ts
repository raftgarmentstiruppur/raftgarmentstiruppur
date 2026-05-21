import type { NextAuthConfig } from "next-auth"

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const role = (auth?.user as { role?: string } | undefined)?.role

      if (nextUrl.pathname.startsWith("/admin")) {
        if (!isLoggedIn) return Response.redirect(new URL("/login", nextUrl))
        if (role !== "ADMIN") return Response.redirect(new URL("/dashboard", nextUrl))
        return true
      }

      if (nextUrl.pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) return Response.redirect(new URL("/login", nextUrl))
        return true
      }

      if (["/login", "/register"].includes(nextUrl.pathname) && isLoggedIn) {
        const dest = role === "ADMIN" ? "/admin" : "/dashboard"
        return Response.redirect(new URL(dest, nextUrl))
      }

      return true
    },
  },
}
