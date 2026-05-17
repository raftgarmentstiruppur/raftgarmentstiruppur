import { Router, Request, Response } from "express"
import cloudinary from "../lib/cloudinary"

const router = Router()

function sign(req: Request, res: Response) {
  const { paramsToSign } = req.body
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  )
  res.json({ signature })
}

router.post("/", sign)
router.post("/sign", sign)

export default router
