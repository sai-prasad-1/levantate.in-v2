import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";
import {
  getFeaturedInsight,
  getPublishedInsights,
} from "@/lib/data/insights-db";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Insights",
  description:
    "Notes from the Levantate Labs studio — engineering, AI and product lessons written down while they're still fresh.",
  path: "/insights",
  keywords: [
    "software engineering blog",
    "AI product insights",
    "Levantate Labs insights",
    "systems thinking",
  ],
});

export default async function InsightsPage() {
  const posts = await getPublishedInsights();
  const featured = await getFeaturedInsight();
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <section className="page-x pt-[140px] pb-16 sm:pt-[170px] sm:pb-20 md:pt-[200px] md:pb-[100px]">
        <div className="mx-auto max-w-site">
          <div data-reveal="1" className="mb-7 text-[13px] text-smoke">
            Insights
          </div>
          <h1 className="m-0 text-[clamp(48px,6.4vw,96px)] font-semibold leading-[1.04] tracking-[-0.038em] max-[820px]:text-[clamp(40px,11.5vw,64px)]">
            <span className="mb-[-0.08em] block overflow-hidden pb-[0.08em]">
              <span data-line="1" className="block">
                Notes from
              </span>
            </span>
            <span className="mb-[-0.08em] block overflow-hidden pb-[0.08em]">
              <span data-line="1" className="block">
                the studio<span className="text-ember">.</span>
              </span>
            </span>
          </h1>
          <p
            data-reveal="1"
            className="mt-12 mb-0 max-w-[480px] text-[18px] leading-[1.6] text-[rgba(22,21,15,0.6)]"
          >
            What we learn building systems — written down while it&apos;s still
            fresh. No thought leadership, just working notes.
          </p>
        </div>
      </section>

      {featured ? (
        <section className="page-x pb-[80px] sm:pb-[100px]">
          <div className="mx-auto max-w-site">
            <Link
              href={`/insights/${featured.slug}`}
              className="rgrid grid grid-cols-[1.4fr_1fr] items-end gap-14 text-ink"
            >
              <div
                data-reveal="1"
                data-media-frame="1"
                className="relative h-[480px] overflow-hidden rounded-[18px] bg-panel-warm"
              >
                {featured.coverImageUrl ? (
                  <Image
                    src={featured.coverImageUrl}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                ) : (
                  <ImageSlot
                    id={`featured-${featured.slug}`}
                    label={featured.title}
                    className="absolute inset-0"
                  />
                )}
              </div>
              <div data-reveal="1" className="pb-3">
                <div className="flex gap-3 text-[12.5px] text-muted">
                  <span className="font-medium text-ember">Featured</span>
                  <span>·</span>
                  <span>{featured.tag}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                </div>
                <div className="mt-5 text-[clamp(26px,2.8vw,38px)] font-semibold leading-[1.15] tracking-[-0.025em]">
                  {featured.title}
                </div>
                <p className="mt-5 mb-0 text-[15.5px] leading-[1.7] text-[rgba(22,21,15,0.6)]">
                  {featured.excerpt}
                </p>
                <span className="mt-[26px] inline-block border-b border-[rgba(22,21,15,0.3)] pb-[3px] text-[15px] font-medium">
                  Read the note
                </span>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="page-x pb-[100px] sm:pb-[150px]">
        <div className="mx-auto max-w-site">
          <div className="rgrid grid grid-cols-3 gap-x-8 gap-y-16">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                data-reveal="1"
                className="flex flex-col gap-[18px] text-ink"
              >
                <div
                  data-media-frame="1"
                  className="relative h-60 overflow-hidden rounded-[14px] bg-panel-warm"
                >
                  {post.coverImageUrl ? (
                    <Image
                      src={post.coverImageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 820px) 100vw, 33vw"
                    />
                  ) : (
                    <ImageSlot
                      id={`post-${post.slug}`}
                      label="Article visual"
                      className="absolute inset-0"
                    />
                  )}
                </div>
                <div className="flex gap-3 text-[12.5px] text-muted">
                  <span>{post.tag}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
                <div className="text-xl font-medium leading-[1.3] tracking-[-0.015em]">
                  {post.title}
                </div>
                <p className="m-0 text-sm leading-[1.65] text-[rgba(22,21,15,0.55)]">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
