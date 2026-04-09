"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { HomeProjectData } from "@/lib/projects";
import LiveSiteIcon from "@/components/ui/LiveSiteIcon";

interface ProjectTableProps {
  projects: HomeProjectData[];
}

const TABLE_TYPE_MAP: Record<string, string> = {
  "finance-tracker": "Full-Stack",
  "daily-news-digest": "Automation",
  "draw-together": "Full-Stack",
  "photo-a-day": "Automation",
  "we-were-here-briefly": "Lab",
};

const FILTER_LABELS = ["All", "Full-Stack", "Automation", "Lab"] as const;

function isValidLiveUrl(url: string | undefined): boolean {
  if (!url) return false;
  return url.startsWith("http://") || url.startsWith("https://");
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [sortDesc, setSortDesc] = useState(true);
  const isFirstRender = useRef(true);

  // Capture and clear the flag so only the initial render skips animation
  const skipInitial = isFirstRender.current;
  if (isFirstRender.current) {
    isFirstRender.current = false;
  }

  const sorted = [...projects].sort((a, b) =>
    sortDesc ? b.year - a.year : a.year - b.year
  );

  const filtered =
    activeFilter === "All"
      ? sorted
      : sorted.filter((p) => TABLE_TYPE_MAP[p.slug] === activeFilter);

  return (
    <section
      id="work"
      className="w-full max-w-content mx-auto px-6 flex flex-col"
      style={{ flex: 1, minHeight: 0, paddingTop: "1.5rem", paddingBottom: "1rem" }}
    >
      {/* Controls row: year sort + type filter */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          marginBottom: "1rem",
          flexShrink: 0,
        }}
      >
        {/* Year sort toggle */}
        <button
          onClick={() => setSortDesc((prev) => !prev)}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-text)",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          Year
          <span
            style={{
              display: "inline-block",
              transition: "transform 200ms ease",
              transform: sortDesc ? "rotate(0deg)" : "rotate(180deg)",
              fontSize: "12px",
              lineHeight: 1,
            }}
          >
            ↓
          </span>
        </button>

        {/* Divider */}
        <span
          style={{
            width: "1px",
            height: "14px",
            background: "var(--color-border)",
            flexShrink: 0,
          }}
        />

        {/* Type filter */}
        {FILTER_LABELS.map((label) => (
          <button
            key={label}
            onClick={() => setActiveFilter(label)}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color:
                activeFilter === label
                  ? "var(--color-text)"
                  : "var(--color-muted)",
              background: "none",
              border: "none",
              borderBottom:
                activeFilter === label
                  ? "1px solid var(--color-accent)"
                  : "1px solid transparent",
              padding: "0 0 2px 0",
              cursor: "pointer",
              transition: "color 150ms ease",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Scrollable table area */}
      <div className="home-table-scroll">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <ProjectRow
              key={project.slug}
              project={project}
              tableType={TABLE_TYPE_MAP[project.slug] || project.type}
              index={index}
              isFirst={index === 0}
              skipInitial={skipInitial}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  tableType,
  index,
  isFirst,
  skipInitial,
}: {
  project: HomeProjectData;
  tableType: string;
  index: number;
  isFirst: boolean;
  skipInitial: boolean;
}) {
  const hasLiveUrl = isValidLiveUrl(project.liveUrl);

  return (
    <motion.div
      layout
      initial={skipInitial ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, delay: skipInitial ? 0 : index * 0.05 }}
    >
      <div
        className="project-table-row"
        style={{
          borderTop: isFirst ? "1px solid var(--color-border)" : undefined,
        }}
      >
        <Link
          href={`/projects/${project.slug}`}
          className="project-table-row-link"
        >
          <span className="project-table-year">{project.year || "—"}</span>
          <span className="project-table-title">{project.title}</span>
          <span className="project-table-desc">
            {project.shortDescription || project.tagline}
          </span>
          <span className="project-table-type">{tableType}</span>
        </Link>
        <span className="project-table-live">
          {hasLiveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View live site"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                lineHeight: 1,
                textDecoration: "none",
              }}
            >
              <LiveSiteIcon />
            </a>
          ) : null}
        </span>
      </div>
    </motion.div>
  );
}
