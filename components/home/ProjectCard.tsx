"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ProjectData } from "@/lib/projects";

interface ProjectCardProps {
  project: ProjectData;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div variants={cardVariants}>
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="overflow-hidden rounded-sm">
          <Image
            src={project.thumbnail}
            alt={`Screenshot of ${project.title}`}
            width={800}
            height={500}
            className="w-full aspect-[16/10] object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>
        <h3 className="mt-4 font-serif text-xl tracking-tight group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-foreground/60 leading-relaxed">
          {project.tagline}
        </p>
      </Link>
    </motion.div>
  );
}
