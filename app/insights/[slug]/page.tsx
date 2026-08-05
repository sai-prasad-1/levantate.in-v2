import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageSlot } from "@/components/ui/ImageSlot";
import {
  getInsightBySlug,
  getPublishedInsights,
} from "@/lib/data/insights-db";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedInsights();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getInsightBySlug(slug);
  if (!post) {
    return createPageMetadata({
      title: "Insight not found",
      description: "This insight could not be found.",
      path: `/insights/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    keywords: [post.tag, "Levantate Labs insights", post.title],
    type: "article",
    publishedTime: post.publishedAt ?? undefined,
    ogImage: post.coverImageUrl ?? undefined,
  });
}

export default async function InsightArticlePage({ params }: InsightPageProps) {
  const { slug } = await params;
  const post = await getInsightBySlug(slug);
  if (!post) notFound();

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Insights", path: "/insights" },
      { name: post.title, path: `/insights/${post.slug}` },
    ]),
    articleJsonLd({
      title: post.title,
      description: post.excerpt,
      path: `/insights/${post.slug}`,
      publishedAt: post.publishedAt ?? new Date().toISOString(),
      tags: [post.tag],
    }),
  ];

  return (
    <>
      {jsonLd.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, "\\u003c"),
          }}
        />
      ))}

      <article className="page-x pt-[140px] pb-20 sm:pt-[170px] sm:pb-28 md:pt-[200px] md:pb-[140px]">
        <div className="mx-auto max-w-site">
          <Link
            href="/insights"
            className="mb-10 inline-block text-[14px] text-smoke transition-colors hover:text-ink"
          >
            ← Insights
          </Link>

          <div className="flex flex-wrap gap-3 text-[13px] text-muted">
            <span className="font-medium text-ember">{post.tag}</span>
            <span>·</span>
            <time dateTime={post.publishedAt ?? undefined}>{post.date}</time>
          </div>

          <h1 className="mt-5 mb-0 max-w-[920px] text-[clamp(36px,5vw,64px)] font-semibold leading-[1.08] tracking-[-0.035em]">
            {post.title}
          </h1>

          <p className="mt-8 mb-0 max-w-[640px] text-[18px] leading-[1.7] text-[rgba(22,21,15,0.65)]">
            {post.excerpt}
          </p>

          <div
            data-media-frame="1"
            className="relative mt-12 h-[42vh] min-h-[280px] overflow-hidden rounded-[18px] bg-panel-warm sm:mt-14 sm:h-[48vh]"
          >
            {post.coverImageUrl ? (
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            ) : (
              <ImageSlot
                id={`cover-${post.slug}`}
                label={post.title}
                className="absolute inset-0"
              />
            )}
          </div>

          <div
            className="insight-body mt-12 max-w-[640px] text-[16px] leading-[1.75] text-[rgba(22,21,15,0.72)]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 max-w-[640px]">
            <Link
              href="/contact"
              className="button-dark inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[15px] font-medium"
            >
              Start a conversation →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
