export async function extractResumeText(file: File): Promise<string> {
  const text = await file.text();
  return text;
}

export function parseResumeContent(text: string) {
  const sections = {
    contact: extractContact(text),
    experience: extractExperience(text),
    education: extractEducation(text),
    skills: extractSkills(text),
    certifications: extractCertifications(text),
  };

  return sections;
}

function extractContact(text: string) {
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const phoneMatch = text.match(/(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/);

  return {
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
  };
}

function extractExperience(text: string) {
  const lines = text.split("\n");
  const experience = [];

  for (let i = 0; i < lines.length; i++) {
    if (
      lines[i].toLowerCase().includes("experience") ||
      lines[i].toLowerCase().includes("work")
    ) {
      for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
        if (lines[j].trim()) {
          experience.push(lines[j].trim());
        }
      }
      break;
    }
  }

  return experience;
}

function extractEducation(text: string) {
  const lines = text.split("\n");
  const education = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes("education")) {
      for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
        if (lines[j].trim()) {
          education.push(lines[j].trim());
        }
      }
      break;
    }
  }

  return education;
}

function extractSkills(text: string): string[] {
  const commonSkills = [
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "node",
    "python",
    "java",
    "sql",
    "html",
    "css",
    "git",
    "aws",
    "docker",
    "kubernetes",
    "mongodb",
    "postgresql",
    "graphql",
    "rest",
    "api",
    "agile",
    "scrum",
  ];

  const foundSkills = commonSkills.filter((skill) =>
    text.toLowerCase().includes(skill)
  );

  return foundSkills;
}

function extractCertifications(text: string) {
  const lines = text.split("\n");
  const certs = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes("certification")) {
      for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
        if (lines[j].trim()) {
          certs.push(lines[j].trim());
        }
      }
      break;
    }
  }

  return certs;
}
