import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack engineer and artist based in Brooklyn.",
};

export default function AboutPage() {
  return (
    <article className="w-full max-w-content mx-auto px-6 pt-12 sm:pt-20 pb-12">
      <h1 className="font-serif text-4xl sm:text-5xl tracking-tight mb-10">
        About
      </h1>

      <div className="max-w-[600px] space-y-5 text-foreground/80 leading-relaxed">
        <p>
          Adam Shaw is a full-stack engineer and artist based in Brooklyn.
          He builds web applications with a focus on thoughtful design and
          solid architecture, and comes from a Fine Arts background that
          shapes how he thinks about interfaces, systems, and the details
          that make software feel considered.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-4">
          Languages &amp; Frameworks
        </h2>
        <p className="text-foreground/60">
          Ruby on Rails · React · Next.js · TypeScript · JavaScript · Python
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-4">
          Databases &amp; Storage
        </h2>
        <p className="text-foreground/60">
          PostgreSQL · MongoDB · Supabase · Cloudflare R2
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-4">
          Infrastructure &amp; Tools
        </h2>
        <p className="text-foreground/60">
          Vercel · Render · Docker · GitHub Actions
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-4">
          Currently Exploring
        </h2>
        <p className="text-foreground/60">
          AI-assisted development · generative systems · agentic workflows
        </p>
      </div>

      <div className="mt-12 flex items-center gap-6 text-sm">
        <a
          href="https://github.com/ashaw315"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          GitHub &nearr;
        </a>
        <a
          href="https://www.linkedin.com/in/adam-shaw-studio/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          LinkedIn &nearr;
        </a>
        <a
          href="https://adamshaw.studio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Art Portfolio &nearr;
        </a>
        <a
          href="mailto:ashaw315@gmail.com"
          className="text-accent hover:underline"
        >
          ashaw315@gmail.com
        </a>
      </div>
    </article>
  );
}
