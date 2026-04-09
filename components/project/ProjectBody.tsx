import { MDXRemote } from "next-mdx-remote/rsc";
import ArchitectureNote from "./ArchitectureNote";
import ProjectCarousel from "./ProjectCarousel";
import ProjectSidebar from "./ProjectSidebar";
import type { ProjectData } from "@/lib/projects";

interface ProjectBodyProps {
  project: ProjectData;
}

export default function ProjectBody({ project }: ProjectBodyProps) {
  return (
    <>
      <div className="project-columns">
        <div className="project-main">
          {project.gallery && project.gallery.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <ProjectCarousel
                images={project.gallery}
                title={project.title}
              />
            </div>
          )}
          {/* Mobile-only sidebar — shows between carousel and body on small
              screens. Hidden on desktop via CSS. */}
          <div className="mobile-sidebar">
            <ProjectSidebar project={project} />
          </div>
          <div className="prose">
            {project.body && <MDXRemote source={project.body} />}
          </div>
        </div>
        <ProjectSidebar project={project} />
      </div>

      {project.architectureNote && (
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "3rem",
            marginTop: "3rem",
          }}
        >
          <ArchitectureNote note={project.architectureNote} />
        </div>
      )}
    </>
  );
}
