import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import { auth } from "@/auth"

async function requireAdmin() {
  const session = await auth()
  return session?.user?.role === "ADMIN"
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const folder = new URL(req.url).searchParams.get("folder") ?? "Raft-Garments"

  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      max_results: 100,
      resource_type: "image",
    })
    return NextResponse.json(result.resources)
  } catch {
    return NextResponse.json([])
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const publicId = new URL(req.url).searchParams.get("public_id")
  if (!publicId)
    return NextResponse.json({ error: "public_id required" }, { status: 400 })

  try {
    await cloudinary.uploader.destroy(publicId)
    return NextResponse.json({ deleted: publicId })
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
