export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  salary_min?: number;
  salary_max?: number;
  location: string;
}

export interface JobMatch {
  job: Job;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  reason: string;
}

export function matchJobsWithResume(
  userSkills: string[],
  missingSkills: string[],
  jobs: Job[]
): JobMatch[] {
  return jobs
    .map((job) => {
      const matchedSkills = userSkills.filter((skill) =>
        job.requirements.some((req) =>
          req.toLowerCase().includes(skill.toLowerCase())
        )
      );

      const jobMissingSkills = job.requirements.filter(
        (req) =>
          !userSkills.some((skill) =>
            req.toLowerCase().includes(skill.toLowerCase())
          )
      );

      const matchScore = Math.round(
        (matchedSkills.length / job.requirements.length) * 100
      );

      let reason = "";
      if (matchScore >= 80) {
        reason = "Excellent match for your profile";
      } else if (matchScore >= 60) {
        reason = "Good match with some skill gaps";
      } else if (matchScore >= 40) {
        reason = "Moderate match - consider upskilling";
      } else {
        reason = "Consider building required skills";
      }

      return {
        job,
        matchScore,
        matchedSkills,
        missingSkills: jobMissingSkills,
        reason,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

export function generateMockJobs(): Job[] {
  return [
    {
      id: "1",
      title: "Senior React Developer",
      company: "Tech Corp",
      description:
        "Looking for experienced React developer to lead frontend team",
      requirements: [
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "AWS",
        "Docker",
      ],
      salary_min: 120000,
      salary_max: 160000,
      location: "San Francisco, CA",
    },
    {
      id: "2",
      title: "Full Stack JavaScript Developer",
      company: "StartUp Inc",
      description: "Build scalable web applications with modern tech stack",
      requirements: ["JavaScript", "React", "Node.js", "MongoDB", "Git"],
      salary_min: 90000,
      salary_max: 130000,
      location: "Remote",
    },
    {
      id: "3",
      title: "Python Backend Engineer",
      company: "Data Systems",
      description: "Develop robust backend services and APIs",
      requirements: ["Python", "Django", "PostgreSQL", "REST API", "Git"],
      salary_min: 100000,
      salary_max: 140000,
      location: "New York, NY",
    },
    {
      id: "4",
      title: "UI/UX Developer",
      company: "Design Studio",
      description: "Create beautiful and responsive user interfaces",
      requirements: ["React", "CSS", "HTML", "Figma", "JavaScript"],
      salary_min: 80000,
      salary_max: 120000,
      location: "Austin, TX",
    },
    {
      id: "5",
      title: "DevOps Engineer",
      company: "Cloud Solutions",
      description: "Manage infrastructure and CI/CD pipelines",
      requirements: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
      salary_min: 110000,
      salary_max: 150000,
      location: "Remote",
    },
    {
      id: "6",
      title: "Full Stack Developer",
      company: "E-commerce Plus",
      description: "Build end-to-end e-commerce solutions",
      requirements: [
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "AWS",
        "Stripe",
      ],
      salary_min: 95000,
      salary_max: 135000,
      location: "Seattle, WA",
    },
  ];
}
