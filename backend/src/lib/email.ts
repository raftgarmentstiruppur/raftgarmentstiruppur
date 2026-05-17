import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM = process.env.RESEND_FROM ?? "no-reply@raftgarments.com"
const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL ?? "admin@raftgarments.com"
const SITE_URL = process.env.FRONTEND_URL ?? "https://raftgarments.com"

export async function sendQuoteConfirmation(to: string, name: string, quoteId: string) {
  if (!resend) return
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Quote Request Received — Raft Garments",
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for your enquiry. We have received your quote request and our team will review it within 1–2 business days.</p>
      <p><strong>Reference:</strong> ${quoteId}</p>
      <p>You can track your quote status by logging in to your Dashboard at <a href="${SITE_URL}/dashboard/quotes?id=${quoteId}">Raft Garments Portal</a>.</p>
      <p>Best regards,<br/>Raft Garments Sales Team<br/>+91 421 4307777</p>
    `,
  })
}

export async function sendAdminQuoteNotification(quoteId: string, company: string, product: string) {
  if (!resend) return
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Quote Request from ${company} — Raft Garments`,
    html: `
      <p>A new quote request has been submitted.</p>
      <ul>
        <li><strong>Company:</strong> ${company}</li>
        <li><strong>Product:</strong> ${product}</li>
        <li><strong>Quote ID:</strong> ${quoteId}</li>
      </ul>
      <p><a href="${SITE_URL}/admin/quotes?id=${quoteId}">Review in Admin Dashboard</a></p>
    `,
  })
}

export async function sendOrderConfirmation(to: string, name: string, orderNumber: string) {
  if (!resend) return
  await resend.emails.send({
    from: FROM,
    to,
    subject: `Order Confirmed: ${orderNumber} — Raft Garments`,
    html: `
      <p>Hi ${name},</p>
      <p>Your order <strong>${orderNumber}</strong> has been confirmed and entered into production planning.</p>
      <p>Track your order status at <a href="${SITE_URL}/dashboard/orders">My Orders</a>.</p>
      <p>Best regards,<br/>Raft Garments Operations Team</p>
    `,
  })
}

export async function sendPasswordResetEmail(to: string, name: string, resetLink: string): Promise<boolean> {
  if (!resend) {
    console.log(`[NO-EMAIL] Password reset link for ${to}: ${resetLink}`)
    return false
  }
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: "Reset Your Password — Raft Garments",
      html: `
        <p>Hi ${name},</p>
        <p>We received a request to reset the password for your Raft Garments buyer account.</p>
        <p>Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
        <p style="margin: 24px 0;">
          <a href="${resetLink}" style="background:#7AAD68;color:#fff;padding:12px 24px;text-decoration:none;font-weight:bold;display:inline-block;">
            Reset Password
          </a>
        </p>
        <p>If you didn't request this, you can safely ignore this email — your password won't change.</p>
        <p>Best regards,<br/>Raft Garments Team</p>
      `,
    })
    return true
  } catch (err) {
    console.error("[EMAIL ERROR]", err)
    return false
  }
}
