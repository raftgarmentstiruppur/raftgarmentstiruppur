import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import WhatsAppButton from "@/components/shared/WhatsAppButton"
import PageTransition from "@/components/shared/PageTransition"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="flex-1">{children}</main>
      </PageTransition>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
