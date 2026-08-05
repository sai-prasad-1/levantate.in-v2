"use server";

import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { insights } from "@/lib/db/schema";

const insightSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1).max(200),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase kebab-case"),
  excerpt: z.string().trim().min(1).max(600),
  content: z.string().min(1),
  tag: z.string().trim().min(1).max(60),
  coverImageUrl: z.string().url().optional().nullable().or(z.literal("")),
  status: z.enum(["draft", "published"]),
  featured: z.boolean().default(false),
  publishedAt: z.string().optional().nullable(),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
}

function revalidateInsightCaches(slug: string) {
  revalidateTag("insights", "max");
  revalidateTag(`insight:${slug}`, "max");
}

export async function saveInsight(input: z.infer<typeof insightSchema>) {
  const session = await requireAdmin();
  const data = insightSchema.parse(input);
  const db = getDb();

  const coverImageUrl =
    data.coverImageUrl && data.coverImageUrl.length > 0
      ? data.coverImageUrl
      : null;

  const publishedAt =
    data.status === "published"
      ? data.publishedAt
        ? new Date(data.publishedAt)
        : new Date()
      : null;

  if (data.id) {
    const existing = await db
      .select()
      .from(insights)
      .where(eq(insights.id, data.id))
      .limit(1);
    const prev = existing[0];
    if (!prev) throw new Error("Insight not found");

    await db
      .update(insights)
      .set({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        tag: data.tag,
        coverImageUrl,
        status: data.status,
        featured: data.featured,
        publishedAt:
          data.status === "published"
            ? publishedAt ?? prev.publishedAt ?? new Date()
            : null,
        updatedAt: new Date(),
      })
      .where(eq(insights.id, data.id));

    revalidateInsightCaches(prev.slug);
    revalidateInsightCaches(data.slug);
    return { id: data.id, slug: data.slug };
  }

  const [created] = await db
    .insert(insights)
    .values({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      tag: data.tag,
      coverImageUrl,
      status: data.status,
      featured: data.featured,
      publishedAt,
      authorId: session.user.id,
    })
    .returning();

  revalidateInsightCaches(created.slug);
  return { id: created.id, slug: created.slug };
}

export async function deleteInsight(id: string) {
  await requireAdmin();
  const db = getDb();
  const rows = await db
    .select()
    .from(insights)
    .where(eq(insights.id, id))
    .limit(1);
  const row = rows[0];
  if (!row) throw new Error("Insight not found");

  await db.delete(insights).where(eq(insights.id, id));
  revalidateInsightCaches(row.slug);
  return { ok: true };
}

export async function setInsightStatus(
  id: string,
  status: "draft" | "published",
) {
  await requireAdmin();
  const db = getDb();
  const rows = await db
    .select()
    .from(insights)
    .where(eq(insights.id, id))
    .limit(1);
  const row = rows[0];
  if (!row) throw new Error("Insight not found");

  await db
    .update(insights)
    .set({
      status,
      publishedAt:
        status === "published" ? row.publishedAt ?? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(insights.id, id));

  revalidateInsightCaches(row.slug);
  return { ok: true };
}
