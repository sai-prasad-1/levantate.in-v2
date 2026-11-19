"use client";

import { useState } from "react";
import { InsightCard, type InsightCardData } from "@/components/insights/InsightCard";

const ALL = "All";

/** Category chips that filter the grid of notes. */
export function InsightFilter({ posts, tags }: { posts: InsightCardData[]; tags: string[] }) {
  const [active, setActive] = useState(ALL);
  const visible = active === ALL ? posts : posts.filter((p) => p.tag === active);
  const countLabel = `${visible.length} ${visible.length === 1 ? "note" : "notes"}${active === ALL ? "" : ` in ${active}`}`;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-hair pb-6">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter notes by category">
          <span className="mr-2 text-[12px] font-semibold tracking-[0.14em] text-dim uppercase">Browse</span>
          {[ALL, ...tags].map((tag) => {
            const on = tag === active;
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(tag)}
                className={`min-h-[44px] cursor-pointer rounded-full border px-[18px] text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink ${
                  on ? "border-night bg-night text-white" : "border-hair-strong bg-white text-night hover:border-night"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
        <span className="font-mono text-[12px] text-dim" aria-live="polite">
          {countLabel}
        </span>
      </div>

      <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-x-5 gap-y-[clamp(28px,3vw,40px)]">
        {visible.map((post) => (
          <InsightCard key={post.slug} post={post} />
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="mt-10 text-[16px] text-dim">No notes in this category yet.</p>
      ) : null}
    </>
  );
}
