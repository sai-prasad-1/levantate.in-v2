import Image from "next/image";
import { MARK_PATH_OURS, MARK_PATH_YOURS } from "@/components/site/Mark";

/** The generated cover motifs, one per known note, chosen by slug and falling back by tag. */
export type CoverMotif = "erd" | "chat" | "mark" | "tenant" | "wave" | "board" | "rise";

const MOTIF_BY_SLUG: Record<string, CoverMotif> = {
  "why-we-design-the-data-model-before-anything-else": "erd",
  "shipping-ai-features-that-survive-real-users": "chat",
  "what-end-to-end-actually-means": "mark",
  "lessons-from-scaling-to-100-enterprise-tenants": "tenant",
  "building-a-voice-agent-that-knows-when-to-shut-up": "wave",
  "teaching-systems-thinking-not-syntax": "board",
  "the-case-for-boring-technology": "rise",
};

const MOTIF_BY_TAG: Record<string, CoverMotif> = {
  engineering: "tenant",
  ai: "chat",
  studio: "mark",
  maestro: "board",
};

export function motifFor(slug: string, tag: string): CoverMotif {
  return MOTIF_BY_SLUG[slug] ?? MOTIF_BY_TAG[tag.trim().toLowerCase()] ?? "rise";
}

/** The serif phrase each known title gets; unknown titles render plain. */
const ACCENT_BY_SLUG: Record<string, string> = {
  "why-we-design-the-data-model-before-anything-else": "data model",
  "shipping-ai-features-that-survive-real-users": "real users",
  "what-end-to-end-actually-means": "end to end",
  "lessons-from-scaling-to-100-enterprise-tenants": "enterprise tenants",
  "building-a-voice-agent-that-knows-when-to-shut-up": "shut up",
  "teaching-systems-thinking-not-syntax": "systems thinking",
  "the-case-for-boring-technology": "boring technology",
};

export function TitleWithAccent({ slug, title }: { slug: string; title: string }) {
  const phrase = ACCENT_BY_SLUG[slug];
  const at = phrase ? title.toLowerCase().indexOf(phrase) : -1;
  if (!phrase || at < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <span className="serif-accent text-accent-ink">{title.slice(at, at + phrase.length)}</span>
      {title.slice(at + phrase.length)}
    </>
  );
}

type CoverSize = "card" | "feature" | "hero";

type InsightCoverProps = {
  slug: string;
  tag: string;
  title: string;
  coverImageUrl?: string | null;
  size?: CoverSize;
  /** Sizing and rounding of the box, e.g. "h-[240px] rounded-[24px]". */
  className?: string;
  priority?: boolean;
};

const glow = "radial-gradient(closest-side, var(--glow-soft), rgba(10,10,10,0))";

export function InsightCover({
  slug,
  tag,
  title,
  coverImageUrl,
  size = "card",
  className = "",
  priority = false,
}: InsightCoverProps) {
  // Callers may place the cover absolutely; otherwise it is its own positioning context.
  const position = /\babsolute\b/.test(className) ? "" : "relative";

  if (coverImageUrl) {
    return (
      <div className={`${position} overflow-hidden bg-night ${className}`}>
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          priority={priority}
          className="object-cover"
          sizes={size === "card" ? "(max-width: 768px) 100vw, 420px" : "(max-width: 1280px) 100vw, 1280px"}
        />
      </div>
    );
  }

  const motif = motifFor(slug, tag);
  const isPaper = motif === "mark";

  return (
    <div
      aria-hidden="true"
      className={`${position} overflow-hidden ${isPaper ? "bg-paper" : "bg-night"} ${className}`}
    >
      {motif === "erd" ? <ErdMotif size={size} /> : null}
      {motif === "chat" ? <ChatMotif /> : null}
      {motif === "mark" ? <MarkMotif /> : null}
      {motif === "tenant" ? <TenantMotif /> : null}
      {motif === "wave" ? <WaveMotif /> : null}
      {motif === "board" ? <BoardMotif /> : null}
      {motif === "rise" ? <RiseMotif /> : null}
      {size === "hero" && motif !== "erd" && motif !== "rise" && !isPaper ? <HeroStair /> : null}
    </div>
  );
}

function ErdTable({
  name,
  rows,
  lit = false,
  size,
}: {
  name: string;
  rows: string[];
  lit?: boolean;
  size: CoverSize;
}) {
  const width =
    size === "hero"
      ? "w-[clamp(92px,13vw,168px)] text-[clamp(9px,1vw,12px)]"
      : size === "feature"
        ? "w-[clamp(84px,11vw,136px)] text-[clamp(9px,0.9vw,11px)]"
        : "w-[clamp(72px,7vw,92px)] text-[9px]";
  return (
    <div className={`${width} shrink-0 overflow-hidden rounded-xl border border-night-edge bg-night-card font-mono text-on-night-dim`}>
      <div className={`px-2.5 py-2 font-medium ${lit ? "bg-grad text-on-accent" : "bg-night-line text-white"}`}>{name}</div>
      {rows.map((row) => (
        <div key={row} className="border-t border-night-line px-2.5 py-1.5">
          {row}
        </div>
      ))}
    </div>
  );
}

function ErdMotif({ size }: { size: CoverSize }) {
  const link =
    size === "hero"
      ? "w-[clamp(18px,4vw,64px)]"
      : size === "feature"
        ? "w-[clamp(14px,3vw,44px)]"
        : "w-[clamp(10px,2vw,24px)]";
  const tables =
    size === "hero"
      ? [
          { name: "team", rows: ["id", "name", "plan"], lit: true },
          { name: "member", rows: ["team_id", "user_id", "role"] },
          { name: "project", rows: ["id", "team_id", "status"] },
        ]
      : [
          { name: "team", rows: ["id", "name", "plan"], lit: true },
          { name: "project", rows: ["id", "team_id", "status", "created_at"] },
          { name: "invoice", rows: ["id", "project_id", "total"] },
        ];
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: size === "hero" ? "40px 40px" : "32px 32px",
        }}
      />
      <div className="absolute top-[-40%] right-[-12%] h-[125%] w-[75%]" style={{ background: glow }} />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        {tables.map((t, i) => (
          <div key={t.name} className="flex items-center">
            {i > 0 ? <span className={`${link} border-t border-[#555555]`} /> : null}
            <ErdTable name={t.name} rows={t.rows} lit={t.lit} size={size} />
          </div>
        ))}
      </div>
      {size === "hero" ? <HeroStair /> : null}
    </>
  );
}

function HeroStair() {
  return (
    <svg
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      className="absolute right-[6%] bottom-7 left-[6%] h-[18px] w-[88%] overflow-visible"
      style={{ filter: "drop-shadow(0 0 5px var(--g1))" }}
    >
      <polyline
        points="0,9 20,9 20,7 40,7 40,5 60,5 60,3 80,3 80,1 100,1"
        fill="none"
        stroke="var(--g1)"
        strokeWidth="2"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function ChatMotif() {
  return (
    <>
      <div className="absolute bottom-[-50%] left-[-20%] h-full w-[70%]" style={{ background: glow }} />
      <div className="absolute inset-0 flex flex-col justify-center gap-2.5 px-7">
        <span className="relative max-w-[80%] self-end rounded-[16px_16px_4px_16px] bg-night-line px-3.5 py-2 text-[13px] leading-snug text-on-night">
          What if I type something you never expected?
        </span>
        <span className="relative flex max-w-[84%] items-start gap-2 self-start rounded-[16px_16px_16px_4px] bg-white px-3.5 py-2 text-[13px] leading-snug text-night">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
            <path
              d="M8 1.5L9.4 6.6L14.5 8L9.4 9.4L8 14.5L6.6 9.4L1.5 8L6.6 6.6L8 1.5Z"
              stroke="var(--accent-ink)"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          Then I stay on task, and the team sees it in the logs.
        </span>
        <span className="relative mt-1 inline-flex items-center gap-1.5 self-start rounded-full border border-night-edge px-2.5 py-1 font-mono text-[11px] text-on-night-dim">
          <span className="bg-grad h-1.5 w-1.5 rounded-full" />
          eval: pass
        </span>
      </div>
    </>
  );
}

function MarkMotif() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[18px]">
      <svg width="60" height="128" viewBox="0 0 21 27" className="overflow-visible">
        <path d={MARK_PATH_OURS} fill="var(--g1)" />
      </svg>
      <span className="serif-accent text-[30px] text-dim">to</span>
      <svg width="60" height="128" viewBox="10 5 21 28" className="overflow-visible">
        <path d={MARK_PATH_YOURS} fill="var(--night)" />
      </svg>
    </div>
  );
}

const TENANT_CELLS = [
  "f", "f", "o", "f", "f", "o", "f", "f",
  "o", "f", "f", "f", "g", "f", "o", "f",
  "f", "f", "f", "o", "f", "f", "f", "o",
];

function TenantMotif() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3.5 px-7">
      <div className="grid grid-cols-8 gap-1.5">
        {TENANT_CELLS.map((cell, i) => (
          <span
            key={i}
            className={`h-[26px] rounded-md ${
              cell === "g"
                ? "bg-grad shadow-[0_0_20px_var(--glow-soft)]"
                : cell === "o"
                  ? "border border-night-edge"
                  : "bg-night-line"
            }`}
          />
        ))}
      </div>
      <span className="font-mono text-[11px] text-on-night-dim">tenant_id on every row</span>
    </div>
  );
}

function WaveMotif() {
  const before = [20, 45, 70, 35, 60, 25];
  const after = [
    { h: 30, c: "var(--g0)" },
    { h: 65, c: "var(--g1)" },
    { h: 90, c: "var(--g1)" },
    { h: 50, c: "var(--g2)" },
    { h: 75, c: "var(--g2)" },
    { h: 40, c: "var(--g2)" },
    { h: 20, c: "var(--g2)" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-4 px-7">
      <div className="flex h-20 items-center gap-1">
        {before.map((h, i) => (
          <span key={`b${i}`} className="flex-1 rounded-[3px] bg-[#3a3a3a]" style={{ height: `${h}%` }} />
        ))}
        <span className="h-0.5 flex-[2] border-t-2 border-dashed border-[#555555]" />
        {after.map((bar, i) => (
          <span key={`a${i}`} className="flex-1 rounded-[3px]" style={{ height: `${bar.h}%`, background: bar.c }} />
        ))}
      </div>
      <div className="flex justify-between font-mono text-[11px] text-on-night-dim">
        <span>caller</span>
        <span>pause</span>
        <span className="text-white">agent</span>
      </div>
    </div>
  );
}

function BoardMotif() {
  const node = "rounded-xl border-[1.5px] border-dashed border-[#555555] px-3 py-2.5 font-mono text-[11px] text-on-night";
  const dash = "w-[clamp(10px,2vw,22px)] border-t-[1.5px] border-dashed border-[#555555]";
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center px-5">
        <span className={node}>client</span>
        <span className={dash} />
        <span className={node}>api</span>
        <span className={dash} />
        <span className="bg-grad rounded-xl px-3 py-2.5 font-mono text-[11px] font-medium text-on-accent">queue</span>
        <span className={dash} />
        <span className={node}>db</span>
      </div>
      <span className="serif-accent absolute top-5 left-5 text-[22px] text-accent-glow">why, not how</span>
    </>
  );
}

function RiseMotif() {
  return (
    <>
      <div className="absolute top-[-40%] right-[-20%] h-[110%] w-[80%]" style={{ background: glow }} />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute bottom-[22%] left-[8%] h-1/2 w-[84%] overflow-visible"
        style={{ filter: "drop-shadow(0 0 5px var(--g1))" }}
      >
        <polyline
          points="0,95 25,95 25,72 50,72 50,48 75,48 75,22 100,22"
          fill="none"
          stroke="var(--g1)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute top-[22px] right-[8%] left-[8%] flex flex-col gap-1.5">
        <span className="font-mono text-[11px] text-on-night-dim">novelty budget</span>
        <span className="block h-1.5 overflow-hidden rounded-full bg-night-line">
          <span className="bg-grad block h-full w-[28%] rounded-full" />
        </span>
      </div>
    </>
  );
}
