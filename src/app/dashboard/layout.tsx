import { auth } from "@/auth"
import { db } from "@/lib/db"
import DashboardShell from "@/components/dashboard/DashboardShell"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  let user = null

  if (session?.user?.id) {
    user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, company: true },
    })
  }

  return (
    <DashboardShell userName={user?.name} userCompany={user?.company}>
      {children}
    </DashboardShell>
  )
}
