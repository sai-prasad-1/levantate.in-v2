import Link from "next/link";
import { Eyebrow, GradDot, OutlineLink, SectionTitle, Serif } from "@/components/site/ui";
import { getPublishedInsights } from "@/lib/data/insights-db";
import { GradStops, MARK_OURS, MARK_YOURS } from "./svg";

/* Generated covers, picked by position so the row always reads as a set. */

function ErdCover() {
  const table = "w-[92px] overflow-hidden rounded-[10px] border border-night-edge bg-night-card font-mono text-[9px] text-on-night-dim";
  const row = "border-t border-night-line px-2 py-[5px]";
  const link = "w-[34px] border-t border-[#555555] max-[820px]:w-3";
  return (
    <div aria-hidden="true" className="relative flex h-[240px] items-center justify-center overflow-hidden rounded-[28px] bg-night">
      <div className={table}>
        <div className="bg-grad px-2 py-1.5 font-medium text-on-accent">user</div>
        <div className={row}>id</div>
        <div className={row}>email</div>
        <div className={row}>team_id</div>
      </div>
      <span className={link} />
      <div className={table}>
        <div className="bg-night-line px-2 py-1.5 font-medium text-white">team</div>
        <div className={row}>id</div>
        <div className={row}>plan</div>
      </div>
      <span className={link} />
      <div className={table}>
        <div className="bg-night-line px-2 py-1.5 font-medium text-white">project</div>
        <div className={row}>id</div>
        <div className={row}>team_id</div>
        <div className={row}>status</div>
      </div>
    </div>
  );
}

function LineCover() {
  return (
    <div aria-hidden="true" className="relative h-[240px] overflow-hidden rounded-[28px] bg-night">
      <div
        className="absolute -top-[40%] -right-[20%] h-[120%] w-[80%]"
        style={{ background: "radial-gradient(closest-side, var(--glow-soft), rgba(10,10,10,0))" }}
      />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute right-[8%] bottom-[18%] left-[8%] h-[56%] w-[84%] overflow-visible"
        style={{ filter: "drop-shadow(0 0 5px var(--g1))" }}
      >
        <defs>
          <linearGradient id="homePostLine" x1="0" y1="0" x2="1" y2="0">
            <GradStops mid={false} />
          </linearGradient>
        </defs>
        <polyline
          points="0,90 18,90 18,80 30,80 30,86 46,86 46,55 62,55 62,62 76,62 76,22 100,22"
          fill="none"
          stroke="url(#homePostLine)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="absolute top-6 left-[8%] inline-flex items-center gap-1.5 rounded-full border border-night-edge px-2.5 py-1.5 font-mono text-[11px] text-on-night">
        <GradDot size={6} pulse />
        real users: on
      </span>
    </div>
  );
}

function MarkCover() {
  return (
    <div aria-hidden="true" className="flex h-[240px] items-center justify-center gap-[18px] overflow-hidden rounded-[28px] bg-paper">
      <svg width="70" height="150" viewBox="0 0 21 27" className="overflow-visible">
        <defs>
          <linearGradient id="homePostMark" x1="0" y1="0" x2="1" y2="1">
            <GradStops mid={false} />
          </linearGradient>
        </defs>
        <path d={MARK_OURS} fill="url(#homePostMark)" />
      </svg>
      <span className="serif-accent text-[34px] text-dim">to</span>
      <svg width="70" height="150" viewBox="10 5 21 28" className="overflow-visible">
        <path d={MARK_YOURS} fill="#0A0A0A" />
      </svg>
    </div>
  );
}

const covers = [ErdCover, LineCover, MarkCover];

export async function InsightsPreview() {
  const posts = await getPublishedInsights();
  const latest = [...posts]
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section id="insights" className="wrap section-y">
      <Eyebrow index="07">Insights</Eyebrow>
      <div className="mt-[22px] flex flex-wrap items-end justify-between gap-6">
        <SectionTitle>
          Notes from <Serif>the studio.</Serif>
        </SectionTitle>
        <OutlineLink href="/insights" className="min-h-12">
          All insights
        </OutlineLink>
      </div>
      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {latest.map((post, i) => {
          const Cover = covers[i % covers.length];
          return (
            <Link key={post.slug} href={`/insights/${post.slug}`} className="lift flex flex-col gap-[18px] text-night!">
              <Cover />
              <div className="flex flex-col gap-2 px-1">
                <span className="font-mono text-[12px] text-dim uppercase">
                  {post.tag}
                  {post.date ? ` · ${post.date}` : ""}
                </span>
                <h3 className="m-0 text-[21px] leading-[1.3] font-semibold tracking-[-0.02em]">{post.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
