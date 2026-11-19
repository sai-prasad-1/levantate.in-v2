import type { Metadata } from "next";
import Link from "next/link";
import { InsightCover, TitleWithAccent } from "@/components/insights/InsightCover";
import type { InsightCardData } from "@/components/insights/InsightCard";
import { InsightFilter } from "@/components/insights/InsightFilter";
import { ArrowIcon, CtaBand, Eyebrow, Serif } from "@/components/site/ui";
import { getFeaturedInsight, getPublishedInsights } from "@/lib/data/insights-db";
import { siteConfig } from "@/lib/data/site";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { createPageMetadata, blogJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Insights",
  description:
    "Notes from the Levantate Labs studio: engineering, AI and product lessons from building our own products and our clients', written down while they're still fresh.",
  path: "/insights",
  keywords: [
    "software engineering blog",
    "AI product insights",
    "Levantate Labs insights",
    "product studio notes",
  ],
});

function toCard(post: {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  coverImageUrl: string | null;
}): InsightCardData {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    tag: post.tag,
    date: post.date,
    coverImageUrl: post.coverImageUrl,
  };
}

export default async function InsightsPage() {
  const posts = await getPublishedInsights();
  const featured = await getFeaturedInsight();
  const rest = posts.filter((p) => p.slug !== featured?.slug);
  const tags = Array.from(new Set(rest.map((p) => p.tag).filter(Boolean)));

  // Posts arrive newest first, so the range runs from the last to the first.
  const newest = posts[0]?.date;
  const oldest = posts[posts.length - 1]?.date;
  const range = newest && oldest && newest !== oldest ? `${oldest} → ${newest}` : newest;

  return (
    <>
      <JsonLdScript data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }]), blogJsonLd(posts)]} />
      {/* Hero */}
      <header className="wrap pt-[clamp(56px,8vw,104px)]">
        <Eyebrow className="up d1">Insights</Eyebrow>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-7">
          <h1 className="up d2 m-0 text-[clamp(44px,6.6vw,100px)] leading-[0.94] font-semibold tracking-[-0.05em] uppercase">
            Notes from
            <br />
            <Serif>the studio.</Serif>
          </h1>
          <div className="up d3 flex max-w-[440px] flex-col gap-4">
            <p className="m-0 text-[clamp(17px,1.4vw,19px)] leading-relaxed text-body">
              What we learn building products, ours and our clients&apos;, written down while it&apos;s still
              fresh. Engineering, AI, and how a small studio ships.
            </p>
            {posts.length ? (
              <span className="font-mono text-[12px] text-dim">
                {posts.length} {posts.length === 1 ? "note" : "notes"}
                {range ? ` · ${range}` : ""}
              </span>
            ) : null}
          </div>
        </div>
      </header>

      {/* Featured */}
      {featured ? (
        <section aria-label="Featured note" className="wrap pt-[clamp(48px,6vw,72px)]">
          <Link
            href={`/insights/${featured.slug}`}
            className="lift up d4 flex flex-wrap overflow-hidden rounded-[32px] border border-hair bg-white text-night!"
          >
            <div className="relative min-h-[420px] min-w-0 flex-[3_1_560px] max-[640px]:min-h-[300px]">
              <InsightCover
                slug={featured.slug}
                tag={featured.tag}
                title={featured.title}
                coverImageUrl={featured.coverImageUrl}
                size="feature"
                priority
                className="absolute inset-0"
              />
              <span className="absolute top-5 left-5 rounded-[10px] bg-white px-3 py-2 text-[13px] leading-none font-medium text-night">
                Featured
              </span>
            </div>
            <div className="flex min-w-0 flex-[2_1_380px] flex-col gap-4 p-[clamp(28px,3.6vw,48px)]">
              <span className="font-mono text-[12px] text-dim uppercase">
                {featured.tag}
                {featured.date ? ` · ${featured.date}` : ""}
              </span>
              <h2 className="m-0 text-[clamp(28px,2.8vw,40px)] leading-[1.08] font-semibold tracking-[-0.035em]">
                <TitleWithAccent slug={featured.slug} title={featured.title} />
              </h2>
              <p className="m-0 text-[17px] leading-relaxed text-body">{featured.excerpt}</p>
              <span className="go mt-auto inline-flex min-h-[48px] items-center gap-3.5 self-start rounded-full bg-night py-[5px] pr-[5px] pl-[22px] text-[15px] font-medium text-white">
                Read the note
                <span className="arr bg-grad inline-flex h-[38px] w-[38px] items-center justify-center rounded-full">
                  <ArrowIcon />
                </span>
              </span>
            </div>
          </Link>
        </section>
      ) : null}

      {/* All notes */}
      <section aria-label="All notes" className="wrap pt-[clamp(72px,9vw,112px)]">
        <h2 className="sr-only">All notes</h2>
        {rest.length ? (
          <InsightFilter posts={rest.map(toCard)} tags={tags} />
        ) : (
          <p className="m-0 border-t border-hair pt-8 text-[16px] text-dim">More notes are on the way.</p>
        )}

        {/* Question band */}
        <div className="mt-[clamp(56px,7vw,88px)] flex flex-wrap items-center justify-between gap-5 rounded-[28px] border border-hair px-[clamp(20px,3vw,32px)] py-6">
          <div className="flex min-w-0 items-center gap-4">
            <span
              aria-hidden="true"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-night"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 5.5C4 4.67 4.67 4 5.5 4H14.5C15.33 4 16 4.67 16 5.5V11.5C16 12.33 15.33 13 14.5 13H9L6 16V13H5.5C4.67 13 4 12.33 4 11.5V5.5Z"
                  stroke="var(--accent-glow)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="m-0 text-[17px] leading-normal">
              Got a question we should answer?{" "}
              <span className="text-dim">Write to us, and it might become the next note.</span>
            </p>
          </div>
          <a
            href={`mailto:${siteConfig.email}`}
            className="out inline-flex min-h-[48px] items-center rounded-full border border-night px-[22px] text-[15px] font-medium text-night! hover:bg-night hover:text-white!"
          >
            {siteConfig.email}
          </a>
        </div>
      </section>

      <div className="pt-[clamp(72px,9vw,120px)]">
        <CtaBand body="Tell us where it is today. We reply within two working days." />
      </div>
    </>
  );
}
