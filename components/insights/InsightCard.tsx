import Link from "next/link";
import { InsightCover } from "@/components/insights/InsightCover";

/** Plain post data that can cross from server to client components. */
export type InsightCardData = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  coverImageUrl: string | null;
};

export function InsightCard({ post, headingLevel = "h3" }: { post: InsightCardData; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link href={`/insights/${post.slug}`} className="lift group flex flex-col gap-[18px] text-night!">
      <InsightCover
        slug={post.slug}
        tag={post.tag}
        title={post.title}
        coverImageUrl={post.coverImageUrl}
        className="h-[240px] rounded-[24px]"
      />
      <div className="flex flex-col gap-2.5 px-1">
        <span className="font-mono text-[12px] text-dim uppercase">
          {post.tag}
          {post.date ? ` · ${post.date}` : ""}
        </span>
        <Heading className="m-0 text-[22px] leading-[1.25] font-semibold tracking-[-0.02em]">{post.title}</Heading>
        <p className="m-0 text-[15px] leading-relaxed text-dim">{post.excerpt}</p>
        <span className="mt-1 inline-flex items-center gap-2 text-[14px] font-medium">
          Read the note
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:rotate-45">
            <path d="M4 10L10 4M10 4H5M10 4V9" stroke="#0A0A0A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
