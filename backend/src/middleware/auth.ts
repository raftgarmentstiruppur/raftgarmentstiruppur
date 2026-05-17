import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
  user?: { id: string; role: "ADMIN" | "BUYER" }
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  // Accept token from Authorization header (Bearer) or cookie
  const bearer = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null
  const token = bearer ?? req.cookies?.token
  if (!token) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string
      role: "ADMIN" | "BUYER"
    }
    req.user = payload
    next()
  } catch {
    res.status(401).json({ error: "Invalid or expired session" })
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  requireAuth(req, res, () => {
    if (req.user?.role !== "ADMIN") {
      res.status(403).json({ error: "Forbidden" })
      return
    }
    next()
  })
}
