import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeResumeWithAI(resumeText: string) {
  try {
    const message = await openai.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Analyze this resume and provide:
1. ATS Score (0-100)
2. Top 3 strengths
3. Top 3 weaknesses
4. 3 actionable recommendations
5. List of skills found
6. List of missing skills for tech industry

Resume:
${resumeText}

Respond in JSON format:
{
  "atsScore": number,
  "strengths": [strings],
  "weaknesses": [strings],
  "recommendations": [strings],
  "skills": [strings],
  "missingSkills": [strings]
}`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type === "text") {
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }

    return generateMockAnalysis();
  } catch (error) {
    console.error("OpenAI error:", error);
    return generateMockAnalysis();
  }
}

export async function generateCareerRoadmap(
  resumeText: string,
  skills: string[],
  missingSkills: string[],
  targetRole?: string
) {
  try {
    const message = await openai.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Create a 12-month career roadmap for someone with:
Skills: ${skills.join(", ")}
Missing Skills: ${missingSkills.join(", ")}
Target Role: ${targetRole || "Senior Developer"}

Resume: ${resumeText.substring(0, 500)}

Respond in JSON format:
{
  "targetRole": "string",
  "currentLevel": "string",
  "milestones": [
    {
      "month": number,
      "title": "string",
      "goals": ["strings"],
      "resources": ["strings"]
    }
  ],
  "recommendations": ["strings"]
}`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type === "text") {
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }

    return generateMockRoadmap();
  } catch (error) {
    console.error("OpenAI error:", error);
    return generateMockRoadmap();
  }
}

function generateMockAnalysis() {
  return {
    atsScore: 78,
    strengths: [
      "Strong technical skills in React and Node.js",
      "Good project experience with real-world applications",
      "Clear communication and problem-solving abilities",
    ],
    weaknesses: [
      "Limited AWS/Cloud experience mentioned",
      "Missing certifications section",
      "No quantifiable metrics in achievements",
    ],
    recommendations: [
      "Add AWS certification or cloud projects",
      "Include specific metrics (performance improvements, user numbers)",
      "Add more keywords related to current job market",
    ],
    skills: [
      "React",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Git",
      "REST API",
    ],
    missingSkills: [
      "Kubernetes",
      "AWS",
      "Docker",
      "GraphQL",
      "Python",
      "DevOps",
    ],
  };
}

function generateMockRoadmap() {
  return {
    targetRole: "Senior Full Stack Developer",
    currentLevel: "Mid-level Developer",
    milestones: [
      {
        month: 3,
        title: "Master Cloud Basics",
        goals: [
          "Complete AWS Fundamentals course",
          "Deploy 2 projects to AWS",
          "Learn Docker basics",
        ],
        resources: ["AWS Free Tier", "Docker Official Docs", "Udemy Course"],
      },
      {
        month: 6,
        title: "Advanced Backend Skills",
        goals: [
          "Learn GraphQL",
          "Build GraphQL API project",
          "Study microservices architecture",
        ],
        resources: ["GraphQL Official Docs", "Apollo Tutorial", "System Design"],
      },
      {
        month: 9,
        title: "DevOps & Deployment",
        goals: [
          "Master Kubernetes",
          "Setup CI/CD pipelines",
          "Learn Infrastructure as Code",
        ],
        resources: ["Kubernetes Docs", "GitHub Actions", "Terraform Basics"],
      },
      {
        month: 12,
        title: "Leadership & Architecture",
        goals: [
          "Design system for new project",
          "Mentor junior developers",
          "Lead technical decisions",
        ],
        resources: ["System Design Course", "Leadership Books", "Tech Talks"],
      },
    ],
    recommendations: [
      "Build 2-3 full-stack projects showcasing new skills",
      "Contribute to open source projects",
      "Prepare for senior role interviews",
    ],
  };
}
