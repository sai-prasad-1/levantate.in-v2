import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightEditorForm } from "@/components/admin/InsightEditorForm";
import { getAdminInsightById } from "@/lib/data/insights-db";

type EditPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Edit insight · Admin",
  robots: { index: false, follow: false },
};

export default async function EditInsightPage({ params }: EditPageProps) {
  const { id } = await params;
  const insight = await getAdminInsightById(id);
  if (!insight) notFound();

  return (
    <div>
      <h1 className="mb-8 text-[clamp(32px,4vw,44px)] font-semibold tracking-[-0.03em]">
        Edit insight
      </h1>
      <InsightEditorForm
        initial={{
          id: insight.id,
          title: insight.title,
          slug: insight.slug,
          excerpt: insight.excerpt,
          content: insight.content,
          tag: insight.tag,
          coverImageUrl: insight.coverImageUrl ?? "",
          status: insight.status,
          featured: insight.featured,
          publishedAt: insight.publishedAt?.toISOString() ?? null,
        }}
      />
    </div>
  );
}
