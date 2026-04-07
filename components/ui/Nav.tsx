"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function NavLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const inner = (
    <>
      <span>{children}</span>
      <motion.span
        className="absolute bottom-0 left-0 h-px w-full bg-accent"
        variants={{
          hover: {
            scaleX: 1,
            transition: { duration: 0.25, ease: "easeOut" as const },
          },
        }}
        initial={{ scaleX: 0 }}
        style={{ transformOrigin: "left" }}
      />
    </>
  );

  if (external) {
    return (
      <motion.div className="relative inline-block" whileHover="hover">
        <a
          href={href}
          className="text-foreground/70 hover:text-foreground transition-colors"
        >
          {inner}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div className="relative inline-block" whileHover="hover">
      <Link
        href={href}
        className="text-foreground/70 hover:text-foreground transition-colors"
      >
        {inner}
      </Link>
    </motion.div>
  );
}

export default function Nav() {
  return (
    <nav className="w-full max-w-content mx-auto px-6 py-8 flex items-center justify-between">
      <Link
        href="/"
        className="font-serif text-lg tracking-tight hover:text-accent transition-colors"
      >
        Adam Shaw
      </Link>
      <div className="flex items-center gap-8 text-sm">
        <NavLink href="/#work">Work</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="mailto:ashaw315@gmail.com" external>
          Email
        </NavLink>
      </div>
    </nav>
  );
}
