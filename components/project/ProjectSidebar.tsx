"use client";

import { motion } from "framer-motion";
import type { ProjectData } from "@/lib/projects";

interface ProjectSidebarProps {
  project: ProjectData;
}

export default function ProjectSidebar({ project }: ProjectSidebarProps) {
  return (
    <motion.aside
      className="project-sidebar"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
    >
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "1.25rem",
          color: "var(--color-text)",
          marginBottom: "2rem",
          lineHeight: 1.5,
        }}
      >
        {project.tagline}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs px-2.5 py-1 border border-border rounded-sm text-foreground/60"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-sidebar-link"
          >
            View live ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-sidebar-link"
          >
            View source ↗
          </a>
        )}
      </div>
    </motion.aside>
  );
}
