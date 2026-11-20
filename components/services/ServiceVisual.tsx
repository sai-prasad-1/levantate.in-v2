import type { ServiceVisualKind } from "@/lib/data/services";

const panel =
  "relative flex min-h-[340px] min-w-0 flex-[1_1_440px] overflow-hidden rounded-[32px] p-[clamp(24px,4vw,48px)]";

function Strategy() {
  return (
    <div aria-hidden="true" className={`${panel} items-center justify-center gap-3 bg-night`}>
      <div className="box-border flex h-[180px] max-w-[120px] min-w-0 flex-1 flex-col gap-2 rounded-[14px] border border-dashed border-[#444444] p-2.5">
        <span className="h-[7px] w-[60%] rounded bg-night-edge" />
        <span className="flex-1 rounded-lg border border-dashed border-[#3A3A3A]" />
        <span className="h-3.5 rounded-full border border-dashed border-[#3A3A3A]" />
      </div>
      <span className="flex-[0_0_18px] border-t border-dashed border-[#555555]" />
      <div className="box-border flex h-[180px] max-w-[120px] min-w-0 flex-1 flex-col gap-2 rounded-[14px] border border-night-edge bg-night-card p-2.5">
        <span className="h-[7px] w-1/2 rounded bg-[#444444]" />
        <span className="h-[18px] rounded-md bg-night-line" />
        <span className="h-[18px] rounded-md bg-night-line" />
        <span className="h-[18px] rounded-md bg-night-line" />
        <span className="mt-auto h-3.5 rounded-full bg-[#F2F2F2]" />
      </div>
      <span className="flex-[0_0_18px] border-t border-dashed border-[#555555]" />
      <div className="box-border flex h-[180px] max-w-[120px] min-w-0 flex-1 flex-col gap-2 rounded-[14px] border border-night-edge bg-night-card p-2.5">
        <span className="h-[7px] w-[70%] rounded bg-[#444444]" />
        <span className="flex flex-1 items-end gap-[5px]">
          <span className="h-[30%] flex-1 rounded-[3px] bg-night-edge" />
          <span className="h-1/2 flex-1 rounded-[3px] bg-night-edge" />
          <span className="h-[70%] flex-1 rounded-[3px] bg-night-edge" />
          <span className="bg-grad h-[95%] flex-1 rounded-[3px]" />
        </span>
      </div>
      <div className="float bg-grad absolute top-6 right-6 box-border w-[140px] rounded-[10px] px-3.5 py-3 text-[12px] leading-[1.35] font-semibold text-on-accent shadow-[0_12px_30px_rgba(0,0,0,0.4)] max-[820px]:hidden">
        Who is this for? What does “done” look like?
      </div>
    </div>
  );
}

function Web() {
  return (
    <div aria-hidden="true" className={`${panel} items-center justify-center bg-paper`}>
      <div className="w-full max-w-[440px] overflow-hidden rounded-2xl border border-hair bg-white shadow-[0_24px_50px_rgba(10,10,10,0.08)]">
        <div className="flex items-center gap-1.5 border-b border-[#EFEFEC] px-3 py-2.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-hair-strong" />
          ))}
          <span className="ml-2 h-[18px] flex-1 rounded-full bg-paper pl-2.5 font-mono text-[10px] leading-[18px] text-dim">
            yourproduct.com
          </span>
        </div>
        <div className="flex gap-3.5 p-[18px]">
          <div className="flex flex-[2] flex-col gap-[9px]">
            <span className="h-3.5 w-[85%] rounded bg-night" />
            <span className="h-3.5 w-[62%] rounded bg-night" />
            <span className="h-2 w-[72%] rounded bg-[#CFCFCB]" />
            <span className="h-2 w-[55%] rounded bg-[#CFCFCB]" />
            <span className="mt-1.5 h-[22px] w-[76px] rounded-full bg-night" />
          </div>
          <div className="bg-grad h-28 flex-1 rounded-xl" />
        </div>
        <div className="grid grid-cols-3 gap-2.5 px-[18px] pb-[18px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-12 rounded-[10px] bg-paper" />
          ))}
        </div>
      </div>
    </div>
  );
}

function Ai() {
  const inputs = [25, 55, 85];
  const hidden = [20, 55, 90];
  return (
    <div aria-hidden="true" className={`${panel} items-center justify-center bg-night`}>
      <div
        className="absolute top-[-20%] right-[-10%] h-[80%] w-[60%]"
        style={{ background: "radial-gradient(closest-side, var(--glow-soft), rgba(10,10,10,0))" }}
      />
      <svg viewBox="0 0 240 110" className="relative block h-auto w-full max-w-[440px]">
        <defs>
          <linearGradient id="svcNode" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--g0)" />
            <stop offset="1" stopColor="var(--g2)" />
          </linearGradient>
        </defs>
        <g stroke="#333333" strokeWidth="1">
          {inputs.map((y1) => hidden.map((y2) => <line key={`${y1}-${y2}`} x1="24" y1={y1} x2="120" y2={y2} />))}
        </g>
        <g stroke="#9A9A9A" strokeWidth="1.5">
          {hidden.map((y) => (
            <line key={y} x1="120" y1={y} x2="214" y2="55" />
          ))}
        </g>
        <g fill="#0A0A0A" stroke="#FFFFFF" strokeWidth="1.5">
          {inputs.map((y) => (
            <circle key={y} cx="24" cy={y} r="7" />
          ))}
        </g>
        <g fill="#FFFFFF">
          {hidden.map((y) => (
            <circle key={y} cx="120" cy={y} r="8" />
          ))}
        </g>
        <circle cx="214" cy="55" r="14" fill="url(#svcNode)" />
        <circle cx="214" cy="55" r="20" fill="none" stroke="var(--g1)" strokeOpacity="0.4" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function Saas() {
  return (
    <div aria-hidden="true" className={`${panel} flex-col justify-center gap-3 bg-paper`}>
      <span className="max-w-[78%] self-end rounded-[18px_18px_4px_18px] border border-hair bg-white px-4 py-3 text-[14px] leading-[1.45] text-body">
        Summarise this account for me
      </span>
      <span className="flex max-w-[88%] items-start gap-2.5 self-start rounded-[18px_18px_18px_4px] bg-night px-4 py-3 text-[14px] leading-[1.45] text-white">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
          <path
            d="M8 1.5L9.4 6.6L14.5 8L9.4 9.4L8 14.5L6.6 9.4L1.5 8L6.6 6.6L8 1.5Z"
            stroke="var(--accent-glow)"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
        Usage is up, two tickets are open, renewal is next month.
      </span>
    </div>
  );
}

function Enterprise() {
  // 1 = filled tile, 0 = outlined tile, 2 = the lit tenant
  const tiles = [1, 1, 0, 1, 0, 1, 0, 1, 2, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1];
  return (
    <div aria-hidden="true" className={`${panel} flex-col justify-center gap-[18px] bg-night`}>
      <div className="grid grid-cols-6 gap-2">
        {tiles.map((t, i) => (
          <span
            key={i}
            className={`h-10 rounded-[10px] ${t === 2 ? "bg-grad" : t === 1 ? "bg-night-line" : "border border-night-edge"}`}
          />
        ))}
      </div>
      <div className="flex justify-between gap-3 font-mono text-[12px] text-on-night-dim">
        <span>tenants</span>
        <span className="text-white">25+ enterprises</span>
      </div>
    </div>
  );
}

function Blockchain() {
  const block = "box-border flex h-24 min-w-0 flex-1 flex-col justify-between rounded-[14px] p-2.5 font-mono text-[11px]";
  return (
    <div aria-hidden="true" className={`${panel} items-center bg-paper`}>
      <div className="flex flex-1 items-center">
        <span className={`${block} border border-night bg-white text-dim`}>
          <span>#01</span>
          <span className="h-[7px] rounded bg-hair" />
        </span>
        <span className="flex-[0_0_14px] border-t-2 border-night" />
        <span className={`${block} border border-night bg-white text-dim`}>
          <span>#02</span>
          <span className="h-[7px] rounded bg-hair" />
        </span>
        <span className="flex-[0_0_14px] border-t-2 border-night" />
        <span className={`${block} bg-night text-on-night-dim`}>
          <span>#03</span>
          <span className="h-[7px] rounded bg-night-edge" />
        </span>
        <span className="flex-[0_0_14px] border-t-2 border-dashed border-night" />
        <span className={`${block} bg-grad text-on-accent`}>
          <span>#04</span>
          <span className="h-[7px] rounded bg-[rgba(10,10,10,0.25)]" />
        </span>
      </div>
    </div>
  );
}

export function ServiceVisual({ kind }: { kind: ServiceVisualKind }) {
  switch (kind) {
    case "strategy":
      return <Strategy />;
    case "web":
      return <Web />;
    case "ai":
      return <Ai />;
    case "saas":
      return <Saas />;
    case "enterprise":
      return <Enterprise />;
    case "blockchain":
      return <Blockchain />;
  }
}
