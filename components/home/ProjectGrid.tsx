"use client";

import { motion } from "framer-motion";
import type { ProjectData } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: ProjectData[];
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section id="work" className="w-full max-w-content mx-auto px-6 pt-24 pb-12">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
