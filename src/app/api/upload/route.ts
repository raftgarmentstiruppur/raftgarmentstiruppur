import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import { auth } from "@/auth"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { paramsToSign } = await req.json()
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  )

  return NextResponse.json({ signature })
}
