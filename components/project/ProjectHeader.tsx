"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ProjectData } from "@/lib/projects";

interface ProjectHeaderProps {
  project: ProjectData;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const metaParts = [
    project.year ? String(project.year) : null,
    project.type || null,
    project.role || null,
  ].filter(Boolean);

  return (
    <motion.header
      className="mb-12"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link
        href="/#work"
        className="inline-block text-sm text-foreground/50 hover:text-foreground transition-colors mb-8"
      >
        &larr; All work
      </Link>
      <h1 className="font-serif text-4xl sm:text-5xl tracking-tight">
        {project.title}
      </h1>
      {metaParts.length > 0 && (
        <p
          className="mt-3"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
          }}
        >
          {metaParts.join(" \u00B7 ")}
        </p>
      )}
    </motion.header>
  );
}
