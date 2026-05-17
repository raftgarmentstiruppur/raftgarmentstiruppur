import { Router, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { db } from "../lib/db"
import { loginSchema, registerSchema } from "../lib/validations"
import { requireAuth, AuthRequest } from "../middleware/auth"
import { sendPasswordResetEmail } from "../lib/email"

const router = Router()

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

router.post("/login", async (req, res: Response) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message })
    return
  }

  const { email, password } = parsed.data
  const user = await db.user.findUnique({ where: { email } })
  if (!user) {
    res.status(401).json({ error: "Invalid email or password." })
    return
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    res.status(401).json({ error: "Invalid email or password." })
    return
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  )

  res.cookie("token", token, COOKIE_OPTIONS)
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
    },
  })
})

router.post("/register", async (req, res: Response) => {
  const parsed = registerSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message })
    return
  }

  const { name, email, password, company, country, phone } = parsed.data

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    res.status(409).json({ error: "An account with this email already exists." })
    return
  }

  const hashed = await bcrypt.hash(password, 12)
  const user = await db.user.create({
    data: { name, email, password: hashed, company, country, phone, role: "BUYER" },
    select: { id: true, name: true, email: true, role: true },
  })

  res.status(201).json(user)
})

router.get("/me", requireAuth, async (req: AuthRequest, res: Response) => {
  const user = await db.user.findUnique({
    where: { id: req.user!.id },
    select: { id: true, name: true, email: true, role: true, company: true, country: true },
  })
  res.json(user)
})

router.post("/logout", (_req, res: Response) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" })
  res.json({ ok: true })
})

router.post("/forgot-password", async (req, res: Response) => {
  const { email } = req.body
  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "Email is required." })
    return
  }
  const user = await db.user.findUnique({ where: { email: email.toLowerCase().trim() } })
  // Always respond OK to prevent email enumeration
  if (!user) {
    res.json({ ok: true })
    return
  }
  const resetToken = jwt.sign(
    { id: user.id, email: user.email, purpose: "password-reset" },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  )
  const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000"
  const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`
  const emailSent = await sendPasswordResetEmail(user.email, user.name, resetLink)
  // When email is not configured, return the link directly so dev/admin can use it
  if (!emailSent) {
    res.json({ ok: true, resetUrl: resetLink })
    return
  }
  res.json({ ok: true })
})

router.post("/reset-password", async (req, res: Response) => {
  const { token, password } = req.body
  if (!token || !password || password.length < 6) {
    res.status(400).json({ error: "Invalid request." })
    return
  }
  let payload: { id: string; purpose: string }
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; purpose: string }
  } catch {
    res.status(400).json({ error: "Reset link is invalid or has expired. Please request a new one." })
    return
  }
  if (payload.purpose !== "password-reset") {
    res.status(400).json({ error: "Invalid reset token." })
    return
  }
  const hashed = await bcrypt.hash(password, 12)
  await db.user.update({ where: { id: payload.id }, data: { password: hashed } })
  res.json({ ok: true })
})

export default router
