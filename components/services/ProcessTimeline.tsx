import { Eyebrow, Serif } from "@/components/site/ui";
import { processPhases } from "@/lib/data/services";

const weeks = Array.from({ length: 12 }, (_, i) => `W${i + 1}`);

/** "How we work": a typical first quarter, laid out like a release plan. */
export function ProcessTimeline({ id = "process" }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-28 bg-night text-white">
      <div className="wrap section-y">
        <Eyebrow onNight>How we work</Eyebrow>
        <div className="mt-[22px] flex flex-wrap items-end justify-between gap-6">
          <h2 className="m-0 text-[clamp(32px,4.6vw,60px)] leading-none font-semibold tracking-[-0.045em] uppercase">
            Small releases, <Serif onNight>from week one.</Serif>
          </h2>
          <p className="m-0 max-w-[460px] text-[17px] leading-relaxed text-on-night">
            Working software in weeks, not a big reveal at the end. A typical first quarter, laid out like a release plan.
          </p>
        </div>

        {/* Desktop: release plan */}
        <div className="mt-12 overflow-x-auto rounded-[28px] border border-night-line bg-night-card p-[clamp(20px,3vw,36px)] max-[820px]:hidden">
          <div className="grid min-w-[640px] grid-cols-[130px_minmax(0,1fr)] gap-x-5">
            <div className="flex flex-col">
              <span className="h-10" />
              {processPhases.map((phase) => (
                <span key={phase.title} className="flex h-[52px] items-center text-[15px] font-medium">
                  {phase.title}
                </span>
              ))}
            </div>
            <div className="relative">
              <div aria-hidden="true" className="flex h-10 items-start justify-between font-mono text-[11px] text-on-night-dim">
                {weeks.map((w) => (
                  <span key={w} className="flex w-0 justify-center">
                    {w}
                  </span>
                ))}
              </div>
              {processPhases.map((phase, i) => (
                <div
                  key={phase.title}
                  className={`relative h-[52px] border-t border-night-line ${i === processPhases.length - 1 ? "border-b" : ""}`}
                >
                  <div
                    className={`absolute top-3.5 bottom-3.5 ${i === processPhases.length - 1 ? "rounded-l-full" : "rounded-full"}`}
                    style={{
                      left: phase.left,
                      width: phase.width,
                      background:
                        i === processPhases.length - 1
                          ? `linear-gradient(90deg, ${phase.color}, rgba(22,22,22,0.2))`
                          : phase.color,
                    }}
                  />
                </div>
              ))}
              <div aria-hidden="true" className="absolute top-[26px] bottom-0 left-[33%] border-l border-dashed border-[#555555]" />
              <span className="absolute top-[18px] left-[33%] -translate-x-1/2 rounded-full border border-night-edge bg-night px-2 py-0.5 font-mono text-[11px] whitespace-nowrap text-white">
                v0.1 in your hands
              </span>
              <div aria-hidden="true" className="absolute top-[26px] bottom-0 left-[75%] border-l border-dashed border-[#555555]" />
              <span
                className="absolute top-[18px] left-[75%] -translate-x-1/2 rounded-full border bg-night px-2 py-0.5 font-mono text-[11px] whitespace-nowrap text-white"
                style={{ borderColor: "var(--g1)" }}
              >
                v1.0 launch
              </span>
            </div>
          </div>
        </div>

        {/* Phone: one track per phase */}
        <div className="mt-10 hidden max-[820px]:block">
          <div className="flex flex-col gap-[18px] rounded-[24px] border border-night-line bg-night-card p-5">
            <div aria-hidden="true" className="relative h-3.5 font-mono text-[11px] text-on-night-dim">
              <span className="absolute left-0">W1</span>
              <span className="absolute left-[25%]">W4</span>
              <span className="absolute left-[58%]">W8</span>
              <span className="absolute right-0">W12</span>
            </div>
            {processPhases.map((phase, i) => {
              const last = i === processPhases.length - 1;
              return (
                <div key={phase.title} className="flex flex-col gap-2">
                  <div className="flex justify-between text-[15px] font-medium">
                    {phase.title}
                    <span className="font-mono text-[11px] text-on-night-dim">{phase.span}</span>
                  </div>
                  <div className="relative h-2.5 rounded-full bg-night-line">
                    <div
                      className={`absolute inset-y-0 ${last ? "right-0 rounded-l-full" : "rounded-full"}`}
                      style={{
                        left: phase.left,
                        width: last ? undefined : phase.width,
                        background: last ? `linear-gradient(90deg, ${phase.color}, rgba(38,38,38,0.4))` : phase.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="flex flex-wrap gap-2 border-t border-night-line pt-3.5 font-mono text-[11px]">
              <span className="rounded-full border border-night-edge px-2.5 py-1 text-white">v0.1 in your hands · ~W4</span>
              <span className="rounded-full border px-2.5 py-1 text-white" style={{ borderColor: "var(--g1)" }}>
                v1.0 launch · ~W9
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-7">
          {processPhases.map((phase) => (
            <div key={phase.title} className="flex flex-col gap-2.5">
              <span className="flex items-center gap-2.5 font-mono text-[12px] text-on-night-dim uppercase">
                <span aria-hidden="true" className="h-1.5 w-[18px] rounded-full" style={{ background: phase.color }} />
                {phase.num} · {phase.span}
              </span>
              <h3 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">{phase.title}</h3>
              <p className="m-0 text-[15px] leading-relaxed text-on-night">{phase.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
