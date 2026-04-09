// One-time migration script. Run after setting up
// Sanity project and getting a write token.
//
// Prerequisites:
// 1. Create project at sanity.io/manage
// 2. Set env vars in .env.local:
//    NEXT_PUBLIC_SANITY_PROJECT_ID=your-id
//    NEXT_PUBLIC_SANITY_DATASET=production
//    SANITY_API_TOKEN=your-write-token
//
// Run with:
//    npx ts-node --skip-project scripts/import-to-sanity.ts
//
// After running: verify content in Studio, then
// upload thumbnails manually for each project,
// then delete content/projects/ directory.

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

const contentDir = path.join(process.cwd(), "content/projects");

async function importProjects() {
  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data: frontmatter, content } = matter(raw);
    const slug = file.replace(".mdx", "");

    const doc = {
      _type: "project",
      _id: `project-${slug}`,
      title: frontmatter.title,
      slug: { _type: "slug", current: slug },
      tagline: frontmatter.tagline,
      shortDescription: frontmatter.shortDescription,
      section: frontmatter.section,
      year: frontmatter.year,
      type: frontmatter.type,
      role: frontmatter.role,
      liveUrl:
        typeof frontmatter.liveUrl === "string" &&
        frontmatter.liveUrl.startsWith("http")
          ? frontmatter.liveUrl
          : undefined,
      githubUrl: frontmatter.githubUrl,
      stack: frontmatter.stack,
      body: content,
      architectureNote: frontmatter.architectureNote,
      // thumbnail: not migrated — upload manually in Studio
    };

    await client.createOrReplace(doc);
    console.log(`✓ Imported: ${slug}`);
  }

  console.log("Import complete.");
}

importProjects().catch(console.error);
