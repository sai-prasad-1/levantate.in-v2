import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { articleFor } from "../lib/data/insight-articles";
import { featuredPost, insightPosts } from "../lib/data/insights";
import { insights } from "../lib/db/schema";

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to seed");
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  const posts = [featuredPost, ...insightPosts].map((post, index) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: articleFor(post.slug, post.excerpt),
    tag: post.tag,
    status: "published" as const,
    featured: index === 0,
    publishedAt: new Date(post.publishedAt),
    coverImageUrl: null,
  }));

  for (const post of posts) {
    await db
      .insert(insights)
      .values(post)
      .onConflictDoUpdate({
        target: insights.slug,
        set: {
          title: post.title,
          excerpt: post.excerpt,
          tag: post.tag,
          featured: post.featured,
          status: post.status,
          publishedAt: post.publishedAt,
          updatedAt: new Date(),
        },
      });
  }

  console.log(`Seeded ${posts.length} insights`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
