import { client } from "@/sanity/lib/client";
import {
  homeProjectsQuery,
  projectBySlugQuery,
  allProjectSlugsQuery,
  relatedProjectsQuery,
} from "@/sanity/lib/queries";

export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
  };
};

export type HomeProjectData = {
  slug: string;
  title: string;
  year: number;
  type: string;
  shortDescription?: string;
  tagline: string;
  liveUrl?: string;
  thumbnail?: SanityImage;
  section: string;
};

export type ProjectData = {
  slug: string;
  title: string;
  tagline: string;
  shortDescription?: string;
  section: string;
  year: number;
  type: string;
  role?: string;
  liveUrl?: string;
  githubUrl?: string;
  thumbnail?: SanityImage;
  stack?: string[];
  body?: string;
  architectureNote?: string;
};

export async function getAllProjects(): Promise<HomeProjectData[]> {
  return client.fetch(homeProjectsQuery);
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectData | null> {
  return client.fetch(projectBySlugQuery, { slug });
}

export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(allProjectSlugsQuery);
}

export async function getRelatedProjects(
  slug: string,
  section: string,
  count: number = 2
): Promise<ProjectData[]> {
  const all: ProjectData[] = await client.fetch(relatedProjectsQuery, {
    slug,
  });
  const sameSection = all.filter((p) => p.section === section);
  const otherSection = all.filter((p) => p.section !== section);
  return [...sameSection, ...otherSection].slice(0, count);
}
