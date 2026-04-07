import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ProjectData = {
  slug: string;
  title: string;
  tagline: string;
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  thumbnail: string;
  featured: boolean;
  architectureNote: string;
  content: string;
  year: number;
  type: string;
  role: string;
  section: "project" | "lab";
};

const projectsDirectory = path.join(process.cwd(), "content", "projects");

function parseProjectFile(fileName: string): ProjectData | null {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(projectsDirectory, fileName);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: typeof data.title === "string" ? data.title : slug,
      tagline: typeof data.tagline === "string" ? data.tagline : "",
      stack: Array.isArray(data.stack) ? data.stack : [],
      liveUrl: typeof data.liveUrl === "string" ? data.liveUrl : "",
      githubUrl: typeof data.githubUrl === "string" ? data.githubUrl : "",
      thumbnail: typeof data.thumbnail === "string" ? data.thumbnail : "",
      featured: data.featured === true,
      architectureNote:
        typeof data.architectureNote === "string"
          ? data.architectureNote
          : "",
      content,
      year: typeof data.year === "number" ? data.year : 0,
      type: typeof data.type === "string" ? data.type : "",
      role: typeof data.role === "string" ? data.role : "",
      section: data.section === "lab" ? "lab" : "project",
    };
  } catch {
    return null;
  }
}

export function getAllProjects(): ProjectData[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);

  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map(parseProjectFile)
    .filter((project): project is ProjectData => project !== null);
}

export function getFeaturedProjects(): ProjectData[] {
  return getAllProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): ProjectData | null {
  const fileName = `${slug}.mdx`;
  return parseProjectFile(fileName);
}

export function getLabProjects(): ProjectData[] {
  return getAllProjects().filter((project) => project.section === "lab");
}

export function getRelatedProjects(
  currentSlug: string,
  currentSection: "project" | "lab",
  count: number = 2
): ProjectData[] {
  const all = getAllProjects().filter((p) => p.slug !== currentSlug);
  const sameSection = all.filter((p) => p.section === currentSection);
  const otherSection = all.filter((p) => p.section !== currentSection);
  return [...sameSection, ...otherSection].slice(0, count);
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(projectsDirectory)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}
