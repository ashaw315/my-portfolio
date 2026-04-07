import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getRelatedProjects,
} from "@/lib/projects";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectBody from "@/components/project/ProjectBody";
import RelatedProjects from "@/components/project/RelatedProjects";

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.tagline,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const related = getRelatedProjects(project.slug, project.section);

  return (
    <article className="w-full max-w-content mx-auto px-6 pt-12 pb-12">
      <ProjectHeader project={project} />

      {project.thumbnail && (
        <div className="my-12 overflow-hidden rounded-sm">
          <Image
            src={project.thumbnail}
            alt={`Screenshot of ${project.title}`}
            width={800}
            height={500}
            className="w-full aspect-[16/10] object-cover"
          />
        </div>
      )}

      <ProjectBody project={project} />

      {related.length > 0 && (
        <RelatedProjects projects={related} />
      )}

      <div className="mt-16 pt-8 border-t border-border">
        <Link
          href="/#work"
          className="text-sm text-foreground/50 hover:text-foreground transition-colors"
        >
          &larr; All work
        </Link>
      </div>
    </article>
  );
}
