"use client";

import { motion } from "framer-motion";

interface ArchitectureNoteProps {
  note: string;
}

export default function ArchitectureNote({ note }: ArchitectureNoteProps) {
  return (
    <motion.aside
      className="mb-12 pl-5 border-l-2 border-border"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
    >
      <span className="block text-xs font-mono uppercase tracking-widest text-foreground/40 mb-2">
        A technical note
      </span>
      <p className="text-foreground/70 leading-relaxed italic">{note}</p>
    </motion.aside>
  );
}
