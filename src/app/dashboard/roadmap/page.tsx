"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { 
  Map, 
  Target, 
  TrendingUp, 
  CheckCircle2,
  Circle,
  Loader2,
  BookOpen,
  Calendar,
  Award
} from "lucide-react"

interface Milestone {
  month: number
  title: string
  goals: string[]
  resources: string[]
}

interface Roadmap {
  targetRole: string
  currentLevel: string
  milestones: Milestone[]
  recommendations: string[]
}

export default function RoadmapPage() {
  const [targetRole, setTargetRole] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const { toast } = useToast()

  // Mock user data - in real app, this would come from resume analysis
  const userSkills = ["React", "JavaScript", "Node.js", "TypeScript"]
  const missingSkills = ["Kubernetes", "AWS", "Docker", "GraphQL", "Python", "DevOps"]

  const handleGenerateRoadmap = async () => {
    if (!targetRole.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your target role",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: '',
          skills: userSkills,
          missingSkills: missingSkills,
          targetRole: targetRole,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate roadmap')
      }

      const result = await response.json()
      setRoadmap(result)

      toast({
        title: "Roadmap Generated!",
        description: `Your personalized path to ${result.targetRole}`,
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to generate roadmap. Please try again.",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const getMilestoneProgress = (month: number) => {
    // Mock progress - in real app, this would be tracked
    const today = new Date()
    const startDate = new Date(today.getFullYear(), today.getMonth() - month, 1)
    return startDate < today ? 100 : 0
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Career Roadmap</h1>
        <p className="text-muted-foreground">
          Get a personalized 12-month plan to achieve your career goals
        </p>
      </div>

      {!roadmap && (
        <>
          {/* Current Status */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Your Skills
                </CardTitle>
                <CardDescription>Skills from your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userSkills.map((skill, index) => (
                    <Badge key={index} variant="default">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-500" />
                  Skills to Learn
                </CardTitle>
                <CardDescription>Based on market demand</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Target Role Input */}
          <Card>
            <CardHeader>
              <CardTitle>What&apos;s Your Target Role?</CardTitle>
              <CardDescription>
                Enter the position you want to achieve in 12 months
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetRole">Target Role</Label>
                <Input
                  id="targetRole"
                  placeholder="e.g., Senior Full Stack Developer, Tech Lead, DevOps Engineer"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  disabled={isGenerating}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleGenerateRoadmap()
                    }
                  }}
                />
              </div>
              <Button 
                onClick={handleGenerateRoadmap}
                disabled={isGenerating || !targetRole.trim()}
                className="w-full"
              >
                {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isGenerating ? "Generating Your Roadmap..." : "Generate Roadmap"}
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {/* Roadmap Display */}
      {roadmap && (
        <div className="space-y-6">
          {/* Roadmap Header */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">{roadmap.targetRole}</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Current Level: <span className="font-semibold">{roadmap.currentLevel}</span>
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>12-Month Roadmap</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">0%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>
              <Progress value={0} className="mt-4" />
            </CardContent>
          </Card>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Map className="w-5 h-5" />
              Your Journey
            </h3>
            
            <div className="relative space-y-8">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

              {roadmap.milestones.map((milestone, index) => {
                const progress = getMilestoneProgress(milestone.month)
                const isCompleted = progress === 100
                
                return (
                  <div key={index} className="relative pl-12">
                    {/* Timeline dot */}
                    <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </div>

                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              Month {milestone.month}
                            </Badge>
                            <CardTitle>{milestone.title}</CardTitle>
                          </div>
                          {progress > 0 && (
                            <Badge variant="default">
                              {progress}% Complete
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Goals */}
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Goals
                          </h4>
                          <ul className="space-y-2">
                            {milestone.goals.map((goal, goalIndex) => (
                              <li key={goalIndex} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <span>{goal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Resources */}
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Resources
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {milestone.resources.map((resource, resIndex) => (
                              <Badge key={resIndex} variant="secondary">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Key Recommendations
              </CardTitle>
              <CardDescription>
                Tips to accelerate your career growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {roadmap.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button onClick={() => {
              setRoadmap(null)
              setTargetRole("")
            }}>
              Generate New Roadmap
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              Download PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
