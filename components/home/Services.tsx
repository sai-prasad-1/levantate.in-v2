import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon, Eyebrow, SectionTitle, Serif } from "@/components/site/ui";
import { GradStops } from "./svg";

/* ---------- Small illustrations, one per service ---------- */

function StrategyArt() {
  const screen = "h-[118px] min-w-0 max-w-[82px] flex-1 basis-0 rounded-xl p-2 flex flex-col gap-1.5";
  return (
    <div aria-hidden="true" className="mb-1.5 flex h-[136px] items-center gap-2.5">
      <div className={`${screen} border border-dashed border-[#444444]`}>
        <span className="h-1.5 w-[60%] rounded bg-night-edge" />
        <span className="flex-1 rounded-md border border-dashed border-[#3A3A3A]" />
        <span className="h-3 rounded-full border border-dashed border-[#3A3A3A]" />
      </div>
      <span className="flex-[0_0_22px] border-t border-dashed border-[#555555]" />
      <div className={`${screen} border border-night-edge bg-night-card`}>
        <span className="h-1.5 w-1/2 rounded bg-[#444444]" />
        <span className="h-3.5 rounded-[5px] bg-night-line" />
        <span className="h-3.5 rounded-[5px] bg-night-line" />
        <span className="h-3.5 rounded-[5px] bg-night-line" />
        <span className="mt-auto h-3 rounded-full bg-[#F2F2F2]" />
      </div>
      <span className="flex-[0_0_22px] border-t border-dashed border-[#555555]" />
      <div className={`${screen} border border-night-edge bg-night-card`}>
        <span className="h-1.5 w-[70%] rounded bg-[#444444]" />
        <span className="flex flex-1 items-end gap-1">
          <span className="h-[30%] flex-1 rounded-[3px] bg-night-edge" />
          <span className="h-1/2 flex-1 rounded-[3px] bg-night-edge" />
          <span className="h-[70%] flex-1 rounded-[3px] bg-night-edge" />
          <span className="bg-grad h-[95%] flex-1 rounded-[3px]" />
        </span>
      </div>
      <div className="float bg-grad ml-auto w-[132px] rounded-[10px] px-3.5 py-3 text-[12px] leading-[1.35] font-semibold text-night shadow-[0_12px_30px_rgba(0,0,0,0.4)] max-[820px]:hidden">
        Who is this for? What does &ldquo;done&rdquo; look like?
      </div>
    </div>
  );
}

function WebArt() {
  return (
    <div aria-hidden="true" className="mb-1.5 h-[124px] overflow-hidden rounded-[14px] border border-hair bg-paper">
      <div className="flex items-center gap-[5px] border-b border-hair bg-white px-2.5 py-2">
        <span className="h-[7px] w-[7px] rounded-full bg-hair-strong" />
        <span className="h-[7px] w-[7px] rounded-full bg-hair-strong" />
        <span className="h-[7px] w-[7px] rounded-full bg-hair-strong" />
        <span className="ml-2 h-4 flex-1 rounded-full bg-paper pl-2.5 font-mono text-[10px] leading-4 text-dim">
          yourproduct.com
        </span>
      </div>
      <div className="flex gap-2.5 p-3">
        <div className="flex flex-[2] flex-col gap-1.5">
          <span className="h-2.5 w-[85%] rounded-[3px] bg-night" />
          <span className="h-2.5 w-[60%] rounded-[3px] bg-night" />
          <span className="h-1.5 w-[70%] rounded-[3px] bg-[#CFCFCB]" />
          <span className="mt-1 h-4 w-14 rounded-full bg-night" />
        </div>
        <div className="bg-grad h-[62px] flex-1 rounded-[10px]" />
      </div>
    </div>
  );
}

function AiArt() {
  const inputs = [25, 55, 85];
  const hidden = [20, 55, 90];
  return (
    <svg aria-hidden="true" viewBox="0 0 240 110" className="mb-1.5 block h-[124px] w-full">
      <defs>
        <linearGradient id="homeNodeGrad" x1="0" y1="0" x2="1" y2="1">
          <GradStops mid={false} />
        </linearGradient>
      </defs>
      <g stroke="#D4D4D0" strokeWidth="1">
        {inputs.flatMap((y1) => hidden.map((y2) => <line key={`${y1}-${y2}`} x1="24" y1={y1} x2="120" y2={y2} />))}
      </g>
      <g stroke="#0A0A0A" strokeWidth="1.5">
        {hidden.map((y) => (
          <line key={y} x1="120" y1={y} x2="214" y2="55" />
        ))}
      </g>
      <g fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="1.5">
        {inputs.map((y) => (
          <circle key={y} cx="24" cy={y} r="7" />
        ))}
      </g>
      <g fill="#0A0A0A">
        {hidden.map((y) => (
          <circle key={y} cx="120" cy={y} r="8" />
        ))}
      </g>
      <circle cx="214" cy="55" r="14" fill="url(#homeNodeGrad)" />
      <circle cx="214" cy="55" r="20" fill="none" strokeOpacity="0.35" strokeWidth="1.5" style={{ stroke: "var(--g1)" }} />
    </svg>
  );
}

function SaasArt() {
  return (
    <div aria-hidden="true" className="mb-1.5 flex h-[124px] flex-col justify-center gap-2">
      <span className="max-w-[78%] self-end rounded-[14px_14px_4px_14px] bg-paper px-3 py-2 text-[12px] leading-[1.4] text-body">
        Summarise this account for me
      </span>
      <span className="flex max-w-[88%] items-start gap-2 self-start rounded-[14px_14px_14px_4px] bg-night px-3 py-2 text-[12px] leading-[1.4] text-white">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-px shrink-0">
          <path
            d="M8 1.5L9.4 6.6L14.5 8L9.4 9.4L8 14.5L6.6 9.4L1.5 8L6.6 6.6L8 1.5Z"
            strokeWidth="1.3"
            strokeLinejoin="round"
            style={{ stroke: "var(--accent-glow)" }}
          />
        </svg>
        Usage is up, two tickets are open, renewal is next month.
      </span>
    </div>
  );
}

function EnterpriseArt() {
  // 1 = ink tile, 0 = outline tile, 2 = the lit tile
  const tiles = [1, 1, 0, 1, 0, 1, 0, 1, 2, 1, 1, 0, 1, 0, 1, 0, 1, 1];
  return (
    <div aria-hidden="true" className="mb-1.5 grid h-[124px] grid-cols-6 content-center gap-1.5">
      {tiles.map((t, i) => (
        <span
          key={i}
          className={`h-8 rounded-lg ${t === 1 ? "bg-night" : t === 2 ? "bg-grad" : "border border-hair-strong"}`}
        />
      ))}
    </div>
  );
}

function ChainArt() {
  const block = "flex h-[66px] min-w-0 flex-1 flex-col justify-between rounded-xl p-2 font-mono text-[10px]";
  return (
    <div aria-hidden="true" className="mb-1.5 flex h-[124px] items-center">
      <span className={`${block} border border-night text-dim`}>
        #01
        <span className="h-1.5 rounded-[3px] bg-hair" />
      </span>
      <span className="flex-[0_0_12px] border-t-2 border-night" />
      <span className={`${block} border border-night text-dim`}>
        #02
        <span className="h-1.5 rounded-[3px] bg-hair" />
      </span>
      <span className="flex-[0_0_12px] border-t-2 border-night" />
      <span className={`${block} bg-night text-on-night-dim`}>
        #03
        <span className="h-1.5 rounded-[3px] bg-night-edge" />
      </span>
      <span className="flex-[0_0_12px] border-t-2 border-dashed border-night" />
      <span className={`${block} bg-grad text-night`}>
        #04
        <span className="h-1.5 rounded-[3px] bg-[rgba(10,10,10,0.25)]" />
      </span>
    </div>
  );
}

/* ---------- Cards ---------- */

function Card({
  num,
  title,
  body,
  art,
  minH = "min-h-[280px]",
}: {
  num: string;
  title: string;
  body: string;
  art: ReactNode;
  minH?: string;
}) {
  return (
    <div className={`lift flex min-w-0 flex-[1_1_300px] flex-col gap-3.5 rounded-[28px] border border-hair p-8 ${minH}`}>
      {art}
      <span className="font-mono text-[13px] text-dim">{num}</span>
      <h3 className="m-0 text-[24px] font-semibold tracking-[-0.02em]">{title}</h3>
      <p className="m-0 text-[16px] leading-relaxed text-body">{body}</p>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="wrap section-y">
      <Eyebrow>What we build</Eyebrow>
      <div className="mt-[22px] flex flex-wrap items-end justify-between gap-6">
        <SectionTitle>
          One team, <Serif>start to finish.</Serif>
        </SectionTitle>
        <p className="m-0 max-w-[460px] text-[17px] leading-relaxed text-body">
          Strategy, design, engineering and operations under one roof. No hand-offs between agencies, no gap between
          the deck and the deploy.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <div className="lift flex min-h-[300px] min-w-0 flex-[2_1_560px] flex-col gap-4 rounded-[28px] bg-night p-9 text-white">
          <StrategyArt />
          <span className="font-mono text-[13px] text-on-night-dim">01</span>
          <h3 className="m-0 text-[clamp(24px,2.4vw,30px)] font-semibold tracking-[-0.025em]">
            Product strategy &amp; design
          </h3>
          <p className="m-0 max-w-[520px] text-[16px] leading-relaxed text-on-night">
            We work out what to build before we build it: research, scoping, UX and interface design, so the
            expensive decisions get made on purpose.
          </p>
          <ul className="m-0 mt-auto flex list-none flex-wrap gap-2 p-0">
            {["Discovery", "Product architecture", "UX & interface", "Prototypes"].map((chip) => (
              <li key={chip} className="rounded-full border border-night-edge px-3.5 py-[7px] text-[13px] text-on-night">
                {chip}
              </li>
            ))}
          </ul>
        </div>
        <Card
          num="02"
          title="Web & product engineering"
          body="Full platforms: architecture, build, launch and the iteration after. Frontend to infrastructure."
          art={<WebArt />}
          minH="min-h-[300px]"
        />
        <Card
          num="03"
          title="AI & machine learning"
          body="Automation, agents, voice systems and ML pipelines built for production, not demos."
          art={<AiArt />}
        />
        <Card
          num="04"
          title="AI for SaaS"
          body="Intelligence inside products people already use: RAG, model choice, cost and latency."
          art={<SaasArt />}
        />
        <Card
          num="05"
          title="Enterprise software"
          body="Multi-tenant platforms that survive procurement, compliance and real scale."
          art={<EnterpriseArt />}
        />
        <Card
          num="06"
          title="Blockchain"
          body="Smart contracts, infrastructure and the product layer that makes them usable."
          art={<ChainArt />}
          minH="min-h-[260px]"
        />
        <Link
          href="/contact"
          className="go lift flex min-h-[260px] min-w-0 flex-[2_1_560px] flex-wrap items-center justify-between gap-5 rounded-[28px] bg-paper p-8 text-night!"
        >
          <span className="flex max-w-[420px] flex-col gap-2.5">
            <span className="text-[clamp(24px,2.4vw,30px)] font-semibold tracking-[-0.025em]">
              Not sure where you fit?
            </span>
            <span className="text-[16px] leading-relaxed text-body">
              Tell us the problem. We&rsquo;ll tell you honestly what we&rsquo;d build, and what we wouldn&rsquo;t.
            </span>
          </span>
          <span className="arr bg-grad inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full">
            <ArrowIcon size={20} />
          </span>
        </Link>
      </div>
    </section>
  );
}
