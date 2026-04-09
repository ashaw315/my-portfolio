import { defineType, defineField } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      type: "string",
      description: "One sentence description",
    }),
    defineField({
      name: "shortDescription",
      type: "string",
      description: "3-4 word label for project table",
    }),
    defineField({
      name: "section",
      type: "string",
      options: {
        list: [
          { title: "Project", value: "project" },
          { title: "Lab", value: "lab" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      type: "number",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: ["Full-Stack", "Automation", "Lab", "Real-Time"],
      },
    }),
    defineField({
      name: "role",
      type: "string",
    }),
    defineField({
      name: "liveUrl",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      type: "url",
    }),
    defineField({
      name: "thumbnail",
      type: "image",
      options: { hotspot: true },
      description: "Project thumbnail — upload directly in Studio",
    }),
    defineField({
      name: "stack",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "body",
      type: "text",
      title: "Body (Markdown)",
      description: "Full project description in markdown.",
    }),
    defineField({
      name: "architectureNote",
      type: "text",
      title: "Architecture Note (Markdown)",
      description: "Technical architecture details in markdown.",
    }),
  ],
  orderings: [
    {
      title: "Year, Newest First",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
});
