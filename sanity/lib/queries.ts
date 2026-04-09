// Home page — minimal fields, never ship full body to client
export const homeProjectsQuery = `
  *[_type == "project"] | order(year desc) {
    "slug": slug.current,
    title,
    year,
    type,
    shortDescription,
    tagline,
    liveUrl,
    thumbnail,
    section
  }
`;

// Detail page — full project data
export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    tagline,
    shortDescription,
    section,
    year,
    type,
    role,
    liveUrl,
    githubUrl,
    thumbnail,
    stack,
    body,
    architectureNote
  }
`;

// For generateStaticParams
export const allProjectSlugsQuery = `
  *[_type == "project"] { "slug": slug.current }
`;

// Related projects
export const relatedProjectsQuery = `
  *[_type == "project" && slug.current != $slug] | order(year desc) {
    "slug": slug.current,
    title,
    tagline,
    type,
    thumbnail,
    section
  }
`;
