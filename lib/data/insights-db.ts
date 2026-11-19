import { desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import {
  featuredPost,
  getAllInsights as getStaticInsights,
  getInsightBySlug as getStaticBySlug,
} from "@/lib/data/insights";
import type { Insight } from "@/lib/db/schema";

export type PublicInsight = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  tag: string;
  featured: boolean;
  publishedAt: string | null;
  date: string;
};

function formatInsightDate(date: Date | null) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function toPublic(row: Insight): PublicInsight {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImageUrl: row.coverImageUrl,
    tag: row.tag,
    featured: row.featured,
    publishedAt: row.publishedAt?.toISOString() ?? null,
    date: formatInsightDate(row.publishedAt),
  };
}

function staticAsPublic(): PublicInsight[] {
  return getStaticInsights().map((post, index) => ({
    id: post.slug,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: `<p>${post.excerpt}</p>`,
    coverImageUrl: null,
    tag: post.tag,
    featured: index === 0 || post.slug === featuredPost.slug,
    publishedAt: post.publishedAt,
    date: post.date,
  }));
}

async function fetchPublishedInsights() {
  if (!process.env.DATABASE_URL) return staticAsPublic();

  try {
    const { getDb } = await import("@/lib/db");
    const { insights } = await import("@/lib/db/schema");
    const db = getDb();
    const rows = await db
      .select()
      .from(insights)
      .where(eq(insights.status, "published"))
      .orderBy(desc(insights.publishedAt));
    if (!rows.length) return staticAsPublic();
    return rows.map(toPublic);
  } catch (error) {
    console.error("Failed to load insights from DB, using static fallback", error);
    return staticAsPublic();
  }
}

export function getPublishedInsights() {
  return unstable_cache(fetchPublishedInsights, ["insights-published"], {
    tags: ["insights"],
    revalidate: 3600,
  })();
}

export async function getFeaturedInsight() {
  const posts = await getPublishedInsights();
  return posts.find((p) => p.featured) ?? posts[0] ?? null;
}

function staticBySlug(slug: string): PublicInsight | null {
  const post = getStaticBySlug(slug);
  if (!post) return null;
  return {
    id: post.slug,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: `<p>${post.excerpt}</p>`,
    coverImageUrl: null,
    tag: post.tag,
    featured: post.slug === featuredPost.slug,
    publishedAt: post.publishedAt,
    date: post.date,
  };
}

export async function getInsightBySlug(slug: string) {
  return unstable_cache(
    async () => {
      if (!process.env.DATABASE_URL) return staticBySlug(slug);

      try {
        const { getDb } = await import("@/lib/db");
        const { insights } = await import("@/lib/db/schema");
        const db = getDb();
        const rows = await db
          .select()
          .from(insights)
          .where(eq(insights.slug, slug))
          .limit(1);
        const row = rows[0];
        // A post that exists in the database but isn't published stays hidden.
        if (row) return row.status === "published" ? toPublic(row) : null;
        // Not in the database yet: keep the built-in posts reachable.
        return staticBySlug(slug);
      } catch (error) {
        console.error("Failed to load insight", error);
        return staticBySlug(slug);
      }
    },
    [`insight-${slug}`],
    { tags: ["insights", `insight:${slug}`], revalidate: 3600 },
  )();
}

export async function getAllAdminInsights() {
  const { getDb } = await import("@/lib/db");
  const { insights } = await import("@/lib/db/schema");
  const db = getDb();
  return db.select().from(insights).orderBy(desc(insights.updatedAt));
}

export async function getAdminInsightById(id: string) {
  const { getDb } = await import("@/lib/db");
  const { insights } = await import("@/lib/db/schema");
  const db = getDb();
  const rows = await db.select().from(insights).where(eq(insights.id, id)).limit(1);
  return rows[0] ?? null;
}
