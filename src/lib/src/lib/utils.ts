import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function calculateMatchScore(
  userSkills: string[],
  jobSkills: string[]
): number {
  if (jobSkills.length === 0) return 0;
  const matched = userSkills.filter((skill) =>
    jobSkills.some((js) => js.toLowerCase().includes(skill.toLowerCase()))
  ).length;
  return Math.round((matched / jobSkills.length) * 100);
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + "..." : str;
}
