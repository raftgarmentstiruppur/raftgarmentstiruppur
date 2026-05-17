import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM = process.env.RESEND_FROM ?? "no-reply@raftgarments.com"
const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL ?? "admin@raftgarments.com"

export async function sendQuoteConfirmation(to: string, name: string, quoteId: string) {
  if (!resend) return
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Quote Request Received — Raft-Garments",
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for your enquiry. We have received your quote request and our team will review it within 1–2 business days.</p>
      <p><strong>Reference:</strong> ${quoteId}</p>
      <p>You can track your quote status by logging in to your Dashboard at <a href="${process.env.NEXTAUTH_URL}/dashboard/quotes/${quoteId}">Raft-Garments Portal</a>.</p>
      <p>Best regards,<br/>Raft-Garments Sales Team<br/>+91 421 4307777</p>
    `,
  })
}

export async function sendAdminQuoteNotification(quoteId: string, company: string, product: string) {
  if (!resend) return
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Quote Request from ${company} — Raft-Garments`,
    html: `
      <p>A new quote request has been submitted.</p>
      <ul>
        <li><strong>Company:</strong> ${company}</li>
        <li><strong>Product:</strong> ${product}</li>
        <li><strong>Quote ID:</strong> ${quoteId}</li>
      </ul>
      <p><a href="${process.env.NEXTAUTH_URL}/admin/quotes/${quoteId}">Review in Admin Dashboard</a></p>
    `,
  })
}

export async function sendOrderConfirmation(to: string, name: string, orderNumber: string) {
  if (!resend) return
  await resend.emails.send({
    from: FROM,
    to,
    subject: `Order Confirmed: ${orderNumber} — Raft-Garments`,
    html: `
      <p>Hi ${name},</p>
      <p>Your order <strong>${orderNumber}</strong> has been confirmed and entered into production planning.</p>
      <p>Track your order status at <a href="${process.env.NEXTAUTH_URL}/dashboard/orders">My Orders</a>.</p>
      <p>Best regards,<br/>Raft-Garments Operations Team</p>
    `,
  })
}
