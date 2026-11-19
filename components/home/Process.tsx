import { Eyebrow, SectionTitle, Serif } from "@/components/site/ui";

const phases = [
  {
    num: "01",
    span: "Weeks 1–2",
    title: "Understand",
    body: "We sit with the problem until we can explain it back better than we heard it.",
    color: "var(--s0)",
    left: "0%",
    width: "17%",
  },
  {
    num: "02",
    span: "Weeks 2–4",
    title: "Design",
    body: "Data models, boundaries, interfaces and screens. The costly decisions, made deliberately.",
    color: "var(--s1)",
    left: "9%",
    width: "25%",
  },
  {
    num: "03",
    span: "The long middle",
    title: "Ship",
    body: "Small releases from early on, so you’re using real software while it’s still being built.",
    color: "var(--s2)",
    left: "25%",
    width: "58%",
  },
  {
    num: "04",
    span: "Ongoing",
    title: "Run",
    body: "We stay after launch: monitoring, iteration and keeping the system healthy.",
    color: "var(--s3)",
    left: "66%",
    width: "34%",
  },
];

const weeks = Array.from({ length: 12 }, (_, i) => `W${i + 1}`);
const runFade = "linear-gradient(90deg, var(--s3), rgba(22,22,22,0.2))";
const runFadePhone = "linear-gradient(90deg, var(--s3), rgba(38,38,38,0.4))";

function Marker({ left, label, accent }: { left: string; label: string; accent?: boolean }) {
  return (
    <>
      <div aria-hidden="true" className="absolute top-[26px] bottom-0 border-l border-dashed border-[#555555]" style={{ left }} />
      <span
        className="absolute top-[18px] -translate-x-1/2 rounded-full border bg-night px-2 py-0.5 font-mono text-[11px] whitespace-nowrap text-white"
        style={{ left, borderColor: accent ? "var(--g1)" : "var(--night-edge)" }}
      >
        {label}
      </span>
    </>
  );
}

export function Process() {
  return (
    <section id="process" className="bg-night text-white">
      <div className="wrap section-y">
        <Eyebrow index="04" onNight>How we work</Eyebrow>
        <div className="mt-[22px] flex flex-wrap items-end justify-between gap-6">
          <SectionTitle>
            Small releases, <Serif onNight>from week one.</Serif>
          </SectionTitle>
          <p className="m-0 max-w-[460px] text-[17px] leading-relaxed text-on-night">
            Working software in weeks, not a big reveal at the end. A typical first quarter, laid out like a release
            plan.
          </p>
        </div>

        {/* Desktop: release plan */}
        <div
          role="img"
          aria-label="A typical first quarter: Understand in weeks 1 to 2, Design in weeks 2 to 4, Ship through the middle with v0.1 around week 4 and v1.0 launch around week 9, then Run ongoing."
          className="mt-12 overflow-x-auto rounded-[28px] border border-night-line bg-night-card p-[clamp(20px,3vw,36px)] max-[820px]:hidden"
        >
          <div className="grid min-w-[640px] grid-cols-[130px_minmax(0,1fr)] gap-x-5">
            <div className="flex flex-col">
              <span className="h-10" />
              {phases.map((p) => (
                <span key={p.title} className="flex h-[52px] items-center text-[15px] font-medium">
                  {p.title}
                </span>
              ))}
            </div>
            <div className="relative">
              <div className="flex h-10 items-start justify-between font-mono text-[11px] text-on-night-dim">
                {weeks.map((w) => (
                  <span key={w} className="flex w-0 justify-center">
                    {w}
                  </span>
                ))}
              </div>
              {phases.map((p, i) => (
                <div
                  key={p.title}
                  className={`relative h-[52px] border-t border-night-line ${i === phases.length - 1 ? "border-b" : ""}`}
                >
                  <div
                    className={`absolute top-3.5 bottom-3.5 ${i === phases.length - 1 ? "rounded-l-full" : "rounded-full"}`}
                    style={{
                      left: p.left,
                      width: p.width,
                      background: i === phases.length - 1 ? runFade : p.color,
                    }}
                  />
                </div>
              ))}
              <Marker left="33%" label="v0.1 in your hands" />
              <Marker left="75%" label="v1.0 launch" accent />
            </div>
          </div>
        </div>

        {/* Phone: one track per phase */}
        <div className="mt-10 hidden max-[820px]:block">
          <div className="flex flex-col gap-[18px] rounded-3xl border border-night-line bg-night-card p-5">
            <div aria-hidden="true" className="relative h-3.5 font-mono text-[11px] text-on-night-dim">
              <span className="absolute left-0">W1</span>
              <span className="absolute left-1/4">W4</span>
              <span className="absolute left-[58%]">W8</span>
              <span className="absolute right-0">W12</span>
            </div>
            {phases.map((p, i) => (
              <div key={p.title} className="flex flex-col gap-2">
                <div className="flex justify-between text-[15px] font-medium">
                  {p.title}
                  <span className="font-mono text-[11px] text-on-night-dim">{p.span}</span>
                </div>
                <div aria-hidden="true" className="relative h-2.5 rounded-full bg-night-line">
                  <div
                    className={`absolute inset-y-0 ${i === phases.length - 1 ? "right-0 rounded-l-full" : "rounded-full"}`}
                    style={
                      i === phases.length - 1
                        ? { left: p.left, background: runFadePhone }
                        : { left: p.left, width: p.width, background: p.color }
                    }
                  />
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 border-t border-night-line pt-3.5 font-mono text-[11px]">
              <span className="rounded-full border border-night-edge px-2.5 py-1 text-white">v0.1 in your hands · ~W4</span>
              <span className="rounded-full border px-2.5 py-1 text-white" style={{ borderColor: "var(--g1)" }}>
                v1.0 launch · ~W9
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-7">
          {phases.map((p) => (
            <div key={p.title} className="flex flex-col gap-2.5">
              <span className="flex items-center gap-2.5 font-mono text-[12px] text-on-night-dim uppercase">
                <span aria-hidden="true" className="h-1.5 w-[18px] rounded-full" style={{ background: p.color }} />
                {p.num} · {p.span}
              </span>
              <h3 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">{p.title}</h3>
              <p className="m-0 text-[15px] leading-relaxed text-on-night">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
