import { Navigation } from "@/components/ui/navigation"
import { Hero } from "@/components/ui/hero"
import { Features } from "@/components/ui/features"
import { Pricing } from "@/components/ui/pricing"
import { CTA } from "@/components/ui/cta"
import { Footer } from "@/components/ui/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
