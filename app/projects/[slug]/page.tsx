import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getRelatedProjects,
} from "@/lib/projects";
import { urlFor } from "@/sanity/lib/image";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectBody from "@/components/project/ProjectBody";
import RelatedProjects from "@/components/project/RelatedProjects";

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const related = await getRelatedProjects(project.slug, project.section);

  return (
    <article className="w-full max-w-content mx-auto px-6 pt-12 pb-12">
      <ProjectHeader project={project} />

      {project.thumbnail && (
        <div className="my-12 overflow-hidden rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={urlFor(project.thumbnail).width(1600).url()}
            alt={`Screenshot of ${project.title}`}
            className="w-full aspect-[16/10] object-cover"
          />
        </div>
      )}

      <ProjectBody project={project} />

      {related.length > 0 && <RelatedProjects projects={related} />}

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
