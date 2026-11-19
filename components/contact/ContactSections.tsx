import { Eyebrow, Serif } from "@/components/site/ui";

const steps = [
  {
    num: "01",
    color: "var(--s0)",
    title: "We read it and reply",
    body: "Every note is read by the team, not a sales inbox. You hear back within two working days.",
  },
  {
    num: "02",
    color: "var(--s2)",
    title: "A call with the people who’d build it",
    body: "No account managers. You talk to the engineers and designers who would do the work.",
  },
  {
    num: "03",
    color: "var(--s3)",
    title: "A plan and an honest answer",
    body: "Scope, sequence and what it takes. Including when we’re not the right fit, and who might be.",
    lit: true,
  },
];

/** Ink "what happens next" band: three steps on a rising line. */
export function ContactNextSteps() {
  return (
    <section aria-label="What happens next" className="relative overflow-hidden bg-night text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-45%] left-[-15%] h-[90%] w-[70%]"
        style={{ background: "radial-gradient(closest-side, var(--glow-soft), rgba(10,10,10,0))" }}
      />
      <div className="wrap section-y relative">
        <Eyebrow onNight>What happens next</Eyebrow>
        <h2 className="mt-[22px] mb-0 text-[clamp(32px,4.6vw,60px)] leading-none font-semibold tracking-[-0.045em] uppercase">
          Three steps, <Serif onNight>no runaround.</Serif>
        </h2>
        <svg
          aria-hidden="true"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          className="mt-14 block h-[22px] w-full overflow-visible max-[820px]:hidden"
          style={{ filter: "drop-shadow(0 0 5px var(--g1))" }}
        >
          <defs>
            <linearGradient id="contactNextLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--g0)" />
              <stop offset="0.5" stopColor="var(--g1)" />
              <stop offset="1" stopColor="var(--g2)" />
            </linearGradient>
          </defs>
          <polyline
            points="0,9 33.3,9 33.3,5 66.6,5 66.6,1 100,1"
            fill="none"
            stroke="url(#contactNextLine)"
            strokeWidth="2"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <ol className="m-0 mt-5 grid list-none grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 p-0">
          {steps.map((step) => (
            <li
              key={step.num}
              className={`flex flex-col gap-3.5 rounded-[28px] border bg-night-card p-[clamp(26px,3vw,36px)] ${
                step.lit ? "border-g1 shadow-[0_0_50px_var(--glow-soft)]" : "border-night-line"
              }`}
            >
              <span className="font-mono text-[12px]" style={{ color: step.color }}>
                STEP {step.num}
              </span>
              <h3 className="m-0 text-[clamp(22px,2vw,26px)] leading-[1.15] font-semibold tracking-[-0.025em]">
                {step.title}
              </h3>
              <p className="m-0 text-[15px] leading-relaxed text-on-night">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Do you build products of your own?",
    a: "Yes. Maestro is live, Cronpay is in early access, Elevox is in development, and one more is in stealth. Running our own products keeps us honest about what shipping takes.",
  },
  {
    q: "Do you stay after launch?",
    a: "Yes. We keep what we build healthy after launch: monitoring, iteration and the next release.",
  },
  {
    q: "What do you build?",
    a: "Product strategy and design, web and product engineering, AI and machine learning, AI for SaaS, enterprise software and blockchain.",
  },
  {
    q: "Who will I talk to?",
    a: "The people who would build it. The person on the first call stays on the project until launch.",
  },
];

/** Short FAQ, laid out as an always-open definition list. */
export function ContactFaq() {
  return (
    <section aria-label="Questions" className="wrap section-y">
      <div className="flex flex-wrap gap-[clamp(32px,6vw,88px)]">
        <div className="min-w-0 flex-[1_1_320px]">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-[22px] mb-0 text-[clamp(32px,4.2vw,56px)] leading-none font-semibold tracking-[-0.045em] uppercase">
            Asked <Serif>before.</Serif>
          </h2>
        </div>
        <dl className="m-0 flex min-w-0 flex-[2_1_560px] flex-col border-t border-hair">
          {faqs.map((item) => (
            <div key={item.q} className="flex flex-wrap gap-x-8 gap-y-2 border-b border-hair py-[26px]">
              <dt className="min-w-0 flex-[1_1_240px] text-[18px] font-semibold tracking-[-0.02em]">{item.q}</dt>
              <dd className="m-0 min-w-0 flex-[1.4_1_320px] text-[16px] leading-relaxed text-body">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
