/**
 * Runs before `next build` on every deploy.
 * - No DATABASE_URL: skips, so the site still builds (the contact form and admin stay off).
 * - Fresh database: applies the SQL in ./drizzle and seeds the insights from the static posts.
 * - Database created earlier with `drizzle-kit push`: leaves it alone and says how to update it.
 */
import { config } from "dotenv";
config({ path: ".env.local", quiet: true });
config({ path: ".env", quiet: true });

import { neon } from "@neondatabase/serverless";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { articleFor } from "../lib/data/insight-articles";
import { featuredPost, insightPosts } from "../lib/data/insights";
import { insights } from "../lib/db/schema";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.log("[db] DATABASE_URL is not set, skipping migrations.");
    return;
  }

  const sql = neon(url);
  const db = drizzle(sql);

  const [state] = (await sql`
    select
      to_regclass('public.contact_messages') is not null as has_tables,
      to_regclass('drizzle.__drizzle_migrations') is not null as has_journal
  `) as { has_tables: boolean; has_journal: boolean }[];

  if (state.has_tables && !state.has_journal) {
    console.warn(
      "[db] Tables exist but were created with `drizzle-kit push`, so migrations are skipped.\n" +
        "[db] Run `bun run db:push` against this database to add new tables (contact_replies).",
    );
  } else {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("[db] Migrations are up to date.");
  }

  const existing = await db.select({ id: insights.id }).from(insights).limit(1);
  if (existing.length === 0) {
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
    await db.insert(insights).values(posts).onConflictDoNothing({ target: insights.slug });
    console.log(`[db] Seeded ${posts.length} insights.`);
    return;
  }

  // Built-in posts first seeded with only their excerpt get the full article.
  // A post edited in the admin no longer matches the placeholder and is left alone.
  let filled = 0;
  for (const post of [featuredPost, ...insightPosts]) {
    const article = articleFor(post.slug, post.excerpt);
    const placeholder = `<p>${post.excerpt}</p>`;
    if (article === placeholder) continue;
    const updated = await db
      .update(insights)
      .set({ content: article, updatedAt: new Date() })
      .where(and(eq(insights.slug, post.slug), eq(insights.content, placeholder)))
      .returning({ id: insights.id });
    filled += updated.length;
  }
  if (filled) console.log(`[db] Added full articles to ${filled} insights.`);
}

main().catch((error) => {
  console.error("[db] Migration failed:", error);
  process.exit(1);
});
