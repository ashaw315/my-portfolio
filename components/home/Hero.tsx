"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const isFirstRender = useRef(true);
  const skipInitial = isFirstRender.current;
  if (isFirstRender.current) {
    isFirstRender.current = false;
  }

  return (
    <motion.section
      className="w-full max-w-content mx-auto px-6 pt-10 pb-4 sm:pt-16 sm:pb-6"
      style={{ flexShrink: 0 }}
      variants={containerVariants}
      initial={skipInitial ? false : "hidden"}
      animate="show"
    >
      <motion.h1
        className="font-serif text-5xl sm:text-7xl tracking-tight leading-[1.1]"
        variants={itemVariants}
      >
        Adam Shaw
      </motion.h1>
      <motion.p
        className="mt-4 text-lg sm:text-xl text-foreground/70 max-w-[540px] leading-relaxed"
        variants={itemVariants}
      >
        Full-stack engineer and artist based in Brooklyn. I build web
        applications with a focus on thoughtful design and solid architecture.
      </motion.p>
      <motion.div
        className="mt-5 flex items-center gap-8 text-sm"
        variants={itemVariants}
      >
        <Link
          href="/#work"
          className="text-accent hover:underline transition-colors"
        >
          See my work &darr;
        </Link>
        <a
          href="mailto:ashaw315@gmail.com"
          className="text-accent hover:underline transition-colors"
        >
          Get in touch &rarr;
        </a>
      </motion.div>
    </motion.section>
  );
}
