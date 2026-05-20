"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  TrendingUp,
  Search,
  Filter,
  ExternalLink,
  Building2
} from "lucide-react"
import { generateMockJobs } from "@/lib/src/lib/job-matcher"
import type { Job, JobMatch } from "@/lib/src/lib/job-matcher"

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [sortBy, setSortBy] = useState("relevant")
  const [userSkills] = useState<string[]>(["React", "JavaScript", "Node.js", "TypeScript"])

  useEffect(() => {
    // Load mock jobs
    const mockJobs = generateMockJobs()
    setJobs(mockJobs)
    setFilteredJobs(mockJobs)
  }, [])

  useEffect(() => {
    let result = [...jobs]

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Location filter
    if (locationFilter !== "all") {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    // Sort
    if (sortBy === "salary-high") {
      result.sort((a, b) => (b.salary_max || 0) - (a.salary_max || 0))
    } else if (sortBy === "salary-low") {
      result.sort((a, b) => (a.salary_min || 0) - (b.salary_min || 0))
    }

    setFilteredJobs(result)
  }, [searchTerm, locationFilter, sortBy, jobs])

  const calculateMatchScore = (job: Job): number => {
    const matchedSkills = userSkills.filter((skill) =>
      job.requirements.some((req) =>
        req.toLowerCase().includes(skill.toLowerCase())
      )
    )
    return Math.round((matchedSkills.length / job.requirements.length) * 100)
  }

  const getMatchColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getMatchLabel = (score: number) => {
    if (score >= 80) return "Excellent Match"
    if (score >= 60) return "Good Match"
    if (score >= 40) return "Moderate Match"
    return "Low Match"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Job Matching</h1>
        <p className="text-muted-foreground">
          Find jobs that match your skills and experience
        </p>
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Job title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="san francisco">San Francisco</SelectItem>
                  <SelectItem value="new york">New York</SelectItem>
                  <SelectItem value="austin">Austin</SelectItem>
                  <SelectItem value="seattle">Seattle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevant">Most Relevant</SelectItem>
                  <SelectItem value="salary-high">Salary (High to Low)</SelectItem>
                  <SelectItem value="salary-low">Salary (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Your Skills</CardTitle>
          <CardDescription>
            Based on your resume analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {userSkills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
        </p>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Briefcase className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-sm text-muted-foreground text-center">
                Try adjusting your filters or search terms
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredJobs.map((job) => {
            const matchScore = calculateMatchScore(job)
            return (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {job.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        {job.salary_min && job.salary_max && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            ${(job.salary_min / 1000).toFixed(0)}k - ${(job.salary_max / 1000).toFixed(0)}k
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getMatchColor(matchScore)}`}>
                        {matchScore}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getMatchLabel(matchScore)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{job.description}</p>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => {
                        const isMatched = userSkills.some((skill) =>
                          req.toLowerCase().includes(skill.toLowerCase())
                        )
                        return (
                          <Badge
                            key={index}
                            variant={isMatched ? "default" : "outline"}
                          >
                            {req}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1">
                      Apply Now
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                    <Button variant="outline">Save</Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Call to Action */}
      {filteredJobs.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
            <div>
              <h3 className="font-semibold mb-1">Want better matches?</h3>
              <p className="text-sm text-muted-foreground">
                Upload your resume to get personalized job recommendations
              </p>
            </div>
            <Button asChild>
              <a href="/dashboard/resume">Analyze Resume</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
