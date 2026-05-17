import "dotenv/config"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRoutes   from "./routes/auth"
import quotesRoutes from "./routes/quotes"
import ordersRoutes from "./routes/orders"
import uploadRoutes from "./routes/upload"
import mediaRoutes  from "./routes/media"
import adminRoutes   from "./routes/admin"
import contentRoutes from "./routes/content"
import catalogRoutes from "./routes/catalog"

const app = express()

app.use(cors({
  origin: (origin, cb) => {
    const allowed = process.env.FRONTEND_URL ?? "http://localhost:3000"
    if (!origin || origin === allowed || /^http:\/\/localhost:\d+$/.test(origin))
      cb(null, true)
    else
      cb(new Error(`CORS: ${origin} not allowed`))
  },
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.get("/health", (_req, res) => res.json({ status: "ok" }))
app.use("/auth",   authRoutes)
app.use("/quotes", quotesRoutes)
app.use("/orders", ordersRoutes)
app.use("/upload", uploadRoutes)
app.use("/media",  mediaRoutes)
app.use("/admin",   adminRoutes)
app.use("/content", contentRoutes)
app.use("/catalog", catalogRoutes)

const PORT = process.env.PORT ?? 4000
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))
