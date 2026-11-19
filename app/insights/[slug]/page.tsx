import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InsightCard } from "@/components/insights/InsightCard";
import { InsightCover, TitleWithAccent } from "@/components/insights/InsightCover";
import { Mark } from "@/components/site/Mark";
import { CtaBand, Eyebrow, Serif } from "@/components/site/ui";
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

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
  "&rsquo;": "’",
  "&lsquo;": "‘",
  "&rdquo;": "”",
  "&ldquo;": "“",
  "&mdash;": "—",
  "&ndash;": "–",
};

function toPlainText(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, (entity) => ENTITIES[entity] ?? " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Gives each h2 in the CMS HTML an id so the "On this page" list can link to it. */
function withHeadingAnchors(html: string) {
  const toc: { id: string; label: string }[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi, (match, attrs: string | undefined, inner: string) => {
    const label = toPlainText(inner);
    if (!label) return match;
    const existing = attrs?.match(/\bid\s*=\s*["']([^"']+)["']/i)?.[1];
    if (existing) {
      toc.push({ id: existing, label });
      used.add(existing);
      return match;
    }
    let id =
      label
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || `section-${toc.length + 1}`;
    while (used.has(id)) id = `${id}-${toc.length + 1}`;
    used.add(id);
    toc.push({ id, label });
    return `<h2${attrs ?? ""} id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
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

  const { html, toc } = withHeadingAnchors(post.content);
  const words = toPlainText(post.content).split(" ").filter(Boolean).length;
  const readMinutes = words >= 150 ? Math.max(1, Math.round(words / 220)) : null;

  const others = (await getPublishedInsights()).filter((p) => p.slug !== post.slug);
  const related = [
    ...others.filter((p) => p.tag === post.tag),
    ...others.filter((p) => p.tag !== post.tag),
  ].slice(0, 2);

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

      {/* Article header */}
      <header className="wrap pt-[clamp(40px,6vw,72px)]">
        <Link
          href="/insights"
          className="up d1 inline-flex min-h-10 items-center gap-2 rounded-full border border-hair py-0 pr-4 pl-3 text-[14px] font-medium text-night! transition-colors hover:border-night"
        >
          <span aria-hidden="true">←</span>All insights
        </Link>
        <div className="up d2 mt-[clamp(32px,4vw,48px)] flex flex-wrap items-center gap-x-3 gap-y-2.5 text-[14px] text-dim">
          <Eyebrow className="text-night!">{post.tag}</Eyebrow>
          {post.date ? <time dateTime={post.publishedAt ?? undefined}>{post.date}</time> : null}
          {readMinutes ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{readMinutes} min read</span>
            </>
          ) : null}
        </div>
        <h1 className="up d3 mt-[22px] mb-0 max-w-[1060px] text-[clamp(38px,5.6vw,84px)] leading-[0.98] font-semibold tracking-[-0.05em]">
          <TitleWithAccent slug={post.slug} title={post.title} />
        </h1>
        <div className="up d4 mt-7 flex flex-wrap items-end justify-between gap-7">
          <p className="m-0 max-w-[680px] text-[clamp(19px,1.7vw,23px)] leading-normal text-body">{post.excerpt}</p>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-night">
              <Mark className="h-5 w-[18px]" ours="#FFFFFF" />
            </span>
            <span className="flex flex-col gap-0.5">
              <strong className="text-[15px] font-semibold">Levantate Labs</strong>
              <span className="text-[13px] text-dim">Notes from the studio</span>
            </span>
          </div>
        </div>
      </header>

      {/* Cover */}
      <div className="wrap pt-[clamp(40px,5vw,64px)]">
        <InsightCover
          slug={post.slug}
          tag={post.tag}
          title={post.title}
          coverImageUrl={post.coverImageUrl}
          size="hero"
          priority
          className="h-[clamp(280px,36vw,500px)] rounded-[32px]"
        />
      </div>

      {/* Body */}
      <div className="wrap flex flex-wrap gap-[clamp(32px,6vw,96px)] pt-[clamp(48px,6vw,88px)]">
        {toc.length >= 2 ? (
          <aside
            aria-label="On this page"
            className="sticky top-28 flex flex-[0_1_220px] flex-col gap-3 self-start text-[14px] max-[820px]:hidden"
          >
            <span className="text-[12px] font-semibold tracking-[0.14em] text-dim uppercase">On this page</span>
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="border-l-2 border-hair pl-3 text-dim! transition-colors hover:border-g1 hover:text-night!"
              >
                {item.label}
              </a>
            ))}
          </aside>
        ) : null}
        <article className="max-w-[68ch] min-w-0 flex-[1_1_560px]">
          <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-hair pt-6">
            <span className="mr-1.5 text-[12px] font-semibold tracking-[0.14em] text-dim uppercase">Filed under</span>
            <span className="rounded-full border border-hair px-3.5 py-1.5 text-[13px] text-night">{post.tag}</span>
          </div>
        </article>
      </div>

      {/* Related */}
      {related.length ? (
        <section aria-label="Related notes" className="wrap pt-[clamp(80px,10vw,128px)]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <h2 className="m-0 text-[clamp(30px,3.6vw,48px)] leading-none font-semibold tracking-[-0.045em] uppercase">
              Keep <Serif>reading.</Serif>
            </h2>
            <Link
              href="/insights"
              className="out inline-flex min-h-[48px] items-center rounded-full border border-night px-[22px] text-[15px] font-medium text-night! hover:bg-night hover:text-white!"
            >
              All insights
            </Link>
          </div>
          <div className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5">
            {related.map((p) => (
              <InsightCard
                key={p.slug}
                post={{
                  slug: p.slug,
                  title: p.title,
                  excerpt: p.excerpt,
                  tag: p.tag,
                  date: p.date,
                  coverImageUrl: p.coverImageUrl,
                }}
              />
            ))}
          </div>
        </section>
      ) : null}

      <div className="pt-[clamp(72px,9vw,120px)]">
        <CtaBand body="Bring us the product you're planning. We reply within two working days." />
      </div>
    </>
  );
}
