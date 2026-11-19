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
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
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
      content: `<p>${post.excerpt}</p>`,
      tag: post.tag,
      status: "published" as const,
      featured: index === 0,
      publishedAt: new Date(post.publishedAt),
      coverImageUrl: null,
    }));
    await db.insert(insights).values(posts).onConflictDoNothing({ target: insights.slug });
    console.log(`[db] Seeded ${posts.length} insights.`);
  }
}

main().catch((error) => {
  console.error("[db] Migration failed:", error);
  process.exit(1);
});
