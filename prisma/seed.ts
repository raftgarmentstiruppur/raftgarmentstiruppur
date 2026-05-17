import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient({ log: ["error"] })

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "raftgarmentstiruppur@gmail.com"
  const adminPassword = process.env.ADMIN_PASSWORD ?? "123456"

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (existing) {
    console.log(`Admin already exists: ${adminEmail}`)
    return
  }

  const hashed = await bcrypt.hash(adminPassword, 12)
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: adminEmail,
      password: hashed,
      role: "ADMIN",
      company: "Raft-Garments",
      country: "India",
    },
  })

  console.log(`✓ Admin created: ${admin.email}`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
