"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { RelatedProjectData } from "@/lib/projects";

interface RelatedProjectsProps {
  projects: RelatedProjectData[];
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  return (
    <motion.section
      className="mt-16"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
    >
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-muted)",
          marginBottom: "1.5rem",
        }}
      >
        Related
      </p>

      <div className="related-grid">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="related-card"
          >
            {project.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.thumbnail}
                alt={`Screenshot of ${project.title}`}
                className="related-card-image"
                style={{
                  width: "120px",
                  height: "auto",
                  aspectRatio: "4/3",
                  objectFit: "cover",
                }}
              />
            )}
            <div style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column" }}>
              <span className="related-card-title">
                {project.title}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  color: "var(--color-muted)",
                  marginTop: "0.25rem",
                }}
              >
                {project.type || project.tagline}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
