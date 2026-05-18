import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Zap, Target, TrendingUp, Brain, Lightbulb } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    description: "AI-powered analysis of your resume with detailed feedback",
  },
  {
    icon: Zap,
    title: "ATS Score",
    description: "Get your resume's ATS score with improvement suggestions",
  },
  {
    icon: Target,
    title: "Job Matching",
    description: "Find jobs that perfectly match your skills and experience",
  },
  {
    icon: TrendingUp,
    title: "Skill Gap Analysis",
    description: "Identify missing skills for your target role",
  },
  {
    icon: Brain,
    title: "Career Roadmap",
    description: "Personalized 12-month path to career growth",
  },
  {
    icon: Lightbulb,
    title: "Optimization Tips",
    description: "Get AI-powered suggestions to improve your profile",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to advance your career
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
