import type { ReactNode } from "react";
import { Eyebrow, SectionTitle, Serif } from "@/components/site/ui";

const principles: { num: string; title: ReactNode; body: string }[] = [
  {
    num: "01",
    title: (
      <>
        Own the <Serif onNight>outcome.</Serif>
      </>
    ),
    body: "If it breaks at 2am, it’s our problem too. So we build like it will.",
  },
  {
    num: "02",
    title: (
      <>
        Boring where <Serif onNight>it counts.</Serif>
      </>
    ),
    body: "New technology where it earns its place, proven technology everywhere else.",
  },
  {
    num: "03",
    title: (
      <>
        Say the hard <Serif onNight>thing early.</Serif>
      </>
    ),
    body: "If a scope, deadline or architecture is wrong, you hear it in week one, not month six.",
  },
];

export function Principles() {
  return (
    <section id="principles" className="relative overflow-hidden bg-night text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[35%] -left-[15%] h-[80%] w-[70%]"
        style={{ background: "radial-gradient(closest-side, var(--glow-soft), rgba(10,10,10,0))" }}
      />
      <div className="wrap section-y relative">
        <Eyebrow onNight>How we think</Eyebrow>
        <div className="mt-[22px] flex flex-wrap items-end justify-between gap-6">
          <SectionTitle>
            Three rules we <Serif onNight>don&rsquo;t bend.</Serif>
          </SectionTitle>
          <p className="m-0 max-w-[460px] text-[17px] leading-relaxed text-on-night">
            The same rules on the products we own and the ones we build with you.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
          {principles.map((p) => (
            <div key={p.num} className="flex flex-col gap-3.5 border-t border-night-edge pt-[22px]">
              <span className="font-mono text-[12px] text-on-night-dim">PRINCIPLE {p.num}</span>
              <h3 className="m-0 text-[clamp(24px,2.6vw,34px)] leading-[1.05] font-semibold tracking-[-0.035em] uppercase">
                {p.title}
              </h3>
              <p className="m-0 text-[15px] leading-relaxed text-on-night">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
