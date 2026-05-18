import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="glass rounded-lg p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of job seekers who have already improved their careers
            with ApplyPilot AI.
          </p>
          <div className="pt-4">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                Start For Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
