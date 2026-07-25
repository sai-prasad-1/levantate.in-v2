import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { featuredPost, insightPosts } from "@/lib/data/insights";
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

export default function InsightsPage() {
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

      <section className="page-x pb-[80px] sm:pb-[100px]">
        <div className="mx-auto max-w-site">
          <Link
            href="#"
            className="rgrid grid grid-cols-[1.4fr_1fr] items-end gap-14 text-ink"
          >
            <div
              data-reveal="1"
              data-media-frame="1"
              className="relative h-[480px] overflow-hidden rounded-[18px]"
            >
              <ImageSlot
                id={featuredPost.imgId}
                label={featuredPost.imgHint}
              />
            </div>
            <div data-reveal="1" className="pb-3">
              <div className="flex gap-3 text-[12.5px] text-muted">
                <span className="font-medium text-ember">Featured</span>
                <span>·</span>
                <span>{featuredPost.tag}</span>
                <span>·</span>
                <span>{featuredPost.date}</span>
              </div>
              <div className="mt-5 text-[clamp(26px,2.8vw,38px)] font-semibold leading-[1.15] tracking-[-0.025em]">
                {featuredPost.title}
              </div>
              <p className="mt-5 mb-0 text-[15.5px] leading-[1.7] text-[rgba(22,21,15,0.6)]">
                {featuredPost.excerpt}
              </p>
              <span className="mt-[26px] inline-block border-b border-[rgba(22,21,15,0.3)] pb-[3px] text-[15px] font-medium">
                Read the note
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="page-x pb-[100px] sm:pb-[150px]">
        <div className="mx-auto max-w-site">
          <div className="rgrid grid grid-cols-3 gap-x-8 gap-y-16">
            {insightPosts.map((post) => (
              <Link
                key={post.imgId}
                href="#"
                data-reveal="1"
                className="flex flex-col gap-[18px] text-ink"
              >
                <div
                  data-media-frame="1"
                  className="relative h-60 overflow-hidden rounded-[14px] bg-panel-warm"
                >
                  <ImageSlot id={post.imgId} label="Article visual" />
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
