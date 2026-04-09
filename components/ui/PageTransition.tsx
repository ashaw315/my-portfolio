"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // Skip the fade-in animation on first render so SSR content is immediately
  // visible. Only animate on subsequent client-side navigations.
  const skipInitial = isFirstRender.current;
  if (isFirstRender.current) {
    isFirstRender.current = false;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={skipInitial ? false : { opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
