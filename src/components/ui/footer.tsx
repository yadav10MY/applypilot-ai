import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ApplyPilot AI</h3>
            <p className="text-sm text-muted-foreground">
              Transform your career with AI-powered insights.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="text-muted-foreground hover:foreground">Features</Link></li>
              <li><Link href="#pricing" className="text-muted-foreground hover:foreground">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:foreground">About</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:foreground">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:foreground">Privacy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:foreground">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 ApplyPilot AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
