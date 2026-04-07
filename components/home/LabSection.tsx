"use client";

import { motion } from "framer-motion";
import type { ProjectData } from "@/lib/projects";

interface LabSectionProps {
  projects: ProjectData[];
}

export default function LabSection({ projects }: LabSectionProps) {
  if (projects.length === 0) return null;

  return (
    <motion.section
      className="w-full max-w-content mx-auto px-6 pt-24 pb-12"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
    >
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-muted)",
          marginBottom: "1rem",
        }}
      >
        Lab
      </p>

      <div>
        {projects.map((project, index) => (
          <LabRow key={project.slug} project={project} isFirst={index === 0} />
        ))}
      </div>
    </motion.section>
  );
}

function LabRow({
  project,
  isFirst,
}: {
  project: ProjectData;
  isFirst: boolean;
}) {
  return (
    <a
      href={project.liveUrl || `/projects/${project.slug}`}
      target={project.liveUrl ? "_blank" : undefined}
      rel={project.liveUrl ? "noopener noreferrer" : undefined}
      className="lab-row"
      style={{
        borderTop: isFirst ? "1px solid var(--color-border)" : undefined,
      }}
    >
      <span className="lab-year">
        {project.year || "—"}
      </span>
      <span className="lab-title">
        {project.title}
      </span>
      <span className="lab-desc">
        {project.tagline}
      </span>
      <span className="lab-url">
        {project.liveUrl ? (
          <>
            {project.liveUrl
              .replace(/^https?:\/\//, "")
              .replace(/\/$/, "")}{" "}
            ↗
          </>
        ) : (
          ""
        )}
      </span>
    </a>
  );
}
