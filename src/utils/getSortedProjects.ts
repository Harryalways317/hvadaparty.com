import type { MarkdownInstance } from "astro";
import type { Frontmatter } from "../types";

const getSortedProjects = (posts: MarkdownInstance<Frontmatter>[]) =>
  posts
    .filter(
      ({ frontmatter }) =>
        (!frontmatter.draft || process.env.NODE_ENV != "production") && frontmatter.type === "project"
    )
    .sort(
      (a, b) =>
        Math.floor(new Date(b.frontmatter.datetime).getTime() / 1000) -
        Math.floor(new Date(a.frontmatter.datetime).getTime() / 1000)
    );

export default getSortedProjects;
