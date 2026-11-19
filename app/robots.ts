import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * Search engines and AI answer engines (the crawlers that fetch and cite pages in
 * ChatGPT search, Perplexity, Claude and other assistants) may read everything public.
 * The admin and the API stay out of every index.
 *
 * Rules for AI *training* crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot...) are
 * set in Cloudflare's "Manage robots.txt" setting, which adds its own block above these
 * lines in production. They are deliberately not repeated here so the two never conflict.
 */
const ANSWER_ENGINES = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "DuckAssistBot",
  "MistralAI-User",
];

const PRIVATE = ["/api/", "/admin"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: ANSWER_ENGINES, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow: PRIVATE },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
