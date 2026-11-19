const coverFrame =
  "relative box-border flex min-h-[clamp(320px,34vw,480px)] min-w-0 flex-[1.6_1_560px] items-center justify-center overflow-hidden p-[clamp(24px,4vw,48px)]";

/** AI interview platform: a hiring pipeline card on a lit ink grid. */
export function InterviewCover() {
  const stages = [
    { label: "Applied", note: "screened", width: "100%", color: "#3A3A3A" },
    { label: "Assessed", note: "auto-graded", width: "68%", color: "var(--s1)" },
    { label: "Interviewed", note: "scheduled", width: "38%", color: "var(--s2)" },
    { label: "Offer", note: "evaluated", width: "16%", color: "var(--s3)" },
  ];
  return (
    <div aria-hidden="true" className={`${coverFrame} grid-night`}>
      <div
        className="absolute top-[-35%] right-[-15%] h-[110%] w-[75%]"
        style={{ background: "radial-gradient(closest-side, var(--glow-soft), rgba(10,10,10,0))" }}
      />
      <div className="bob relative w-[min(440px,100%)] overflow-hidden rounded-[20px] border border-[#2A2A2A] bg-night-card shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between border-b border-night-line px-4 py-3 font-mono text-[11px] text-on-night-dim">
          <span className="inline-flex items-center gap-2 text-white">
            <span className="bg-grad pulse h-[7px] w-[7px] rounded-full" />
            Hiring pipeline
          </span>
          <span>Backend role</span>
        </div>
        <div className="flex flex-col gap-3.5 p-4 text-[13px] text-on-night">
          {stages.map((stage) => (
            <div key={stage.label} className="flex flex-col gap-1.5">
              <span className="flex justify-between">
                <span>{stage.label}</span>
                <span className="font-mono text-[11px] text-on-night-dim">{stage.note}</span>
              </span>
              <span className="h-2 overflow-hidden rounded-full bg-night-line">
                <span className="block h-full rounded-full" style={{ width: stage.width, background: stage.color }} />
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 px-4 pb-4 font-mono text-[11px]">
          <span className="rounded-full border border-night-edge px-2.5 py-1 text-on-night">Assessment engine</span>
          <span className="rounded-full border border-night-edge px-2.5 py-1 text-on-night">Admin tools</span>
        </div>
      </div>
    </div>
  );
}

/** Exploitless: being found, by people and by AI search. */
export function ExploitlessCover() {
  return (
    <div aria-hidden="true" className={`${coverFrame} bg-paper`}>
      <div className="relative flex w-[min(460px,100%)] flex-col gap-3">
        <div className="flex items-center gap-2.5 rounded-full border border-hair bg-white px-[18px] py-3 text-[14px] text-body shadow-[0_12px_30px_rgba(10,10,10,0.06)]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <circle cx="7" cy="7" r="5" stroke="#5C5C5C" strokeWidth="1.5" />
            <path d="M11 11L14 14" stroke="#5C5C5C" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">smart contract audit firm</span>
        </div>
        <div className="bob flex flex-col gap-2 rounded-[20px] border border-hair bg-white px-5 py-[18px] shadow-[0_24px_60px_rgba(10,10,10,0.1)]">
          <span className="flex items-center gap-2.5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-night">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <path d="M7 1L13 3.5V8C13 11.2 10.4 13.9 7 15C3.6 13.9 1 11.2 1 8V3.5L7 1Z" stroke="#FFFFFF" strokeWidth="1.4" strokeLinejoin="round" />
                <path
                  d="M4.5 8L6.3 9.8L9.8 6.2"
                  stroke="var(--accent-glow)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[13px] font-semibold">Exploitless</span>
              <span className="font-mono text-[11px] text-dim">exploitless.com</span>
            </span>
          </span>
          <span className="text-[18px] font-semibold tracking-[-0.02em] text-night">Cybersecurity &amp; contract auditing</span>
          <span className="text-[13px] leading-normal text-dim">
            Audits, security reviews and a site built to be found, by people and by AI search.
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {["SEO", "AI search ready"].map((tag) => (
            <span key={tag} className="inline-flex items-center gap-2 rounded-full bg-night px-3.5 py-[7px] text-[12px] text-white">
              <span className="bg-grad h-1.5 w-1.5 rounded-full" />
              {tag}
            </span>
          ))}
          <span className="inline-flex items-center rounded-full border border-hair bg-white px-3.5 py-[7px] text-[12px]">
            Google Business Profile
          </span>
        </div>
      </div>
    </div>
  );
}
