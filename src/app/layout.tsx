import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/ui/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ApplyPilot AI - Transform Your Career with AI",
  description: "Get AI-powered resume analysis, personalized job matches, and a roadmap to your dream career. All in one platform.",
  keywords: ["resume analysis", "job matching", "career roadmap", "ATS score", "AI career coach"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
