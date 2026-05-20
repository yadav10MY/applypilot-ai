import { createClient } from "@/lib/supabase-server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Briefcase, Map, TrendingUp, Upload, Search } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const stats = [
    {
      title: "Resumes Analyzed",
      value: "0",
      icon: FileText,
      description: "Total resumes uploaded",
    },
    {
      title: "Job Matches",
      value: "0",
      icon: Briefcase,
      description: "Matching opportunities",
    },
    {
      title: "ATS Score",
      value: "—",
      icon: TrendingUp,
      description: "Average score",
    },
    {
      title: "Career Progress",
      value: "0%",
      icon: Map,
      description: "Roadmap completion",
    },
  ]

  const quickActions = [
    {
      title: "Upload Resume",
      description: "Get AI-powered analysis and ATS scoring",
      icon: Upload,
      href: "/dashboard/resume",
      color: "text-blue-500",
    },
    {
      title: "Find Jobs",
      description: "Discover jobs matching your skills",
      icon: Search,
      href: "/dashboard/jobs",
      color: "text-green-500",
    },
    {
      title: "View Roadmap",
      description: "Check your personalized career path",
      icon: Map,
      href: "/dashboard/roadmap",
      color: "text-purple-500",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.user_metadata?.full_name || user?.email?.split("@")[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your career progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-lg bg-muted mb-4 w-fit ${action.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={action.href}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Getting Started Section */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>🚀 Getting Started</CardTitle>
          <CardDescription>
            Follow these steps to make the most of ApplyPilot AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              1
            </div>
            <div>
              <h3 className="font-semibold">Upload Your Resume</h3>
              <p className="text-sm text-muted-foreground">
                Get instant AI analysis with ATS scoring and improvement suggestions
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              2
            </div>
            <div>
              <h3 className="font-semibold">Find Matching Jobs</h3>
              <p className="text-sm text-muted-foreground">
                Discover job opportunities that match your skills and experience
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              3
            </div>
            <div>
              <h3 className="font-semibold">Create Your Roadmap</h3>
              <p className="text-sm text-muted-foreground">
                Get a personalized 12-month plan to achieve your career goals
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
