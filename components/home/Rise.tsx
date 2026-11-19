import Image from "next/image";
import { Mark } from "@/components/site/Mark";
import { GradDot } from "@/components/site/ui";
import { GradStops } from "./svg";

const frameBase =
  "flex min-w-0 flex-1 basis-0 flex-col gap-2 overflow-hidden rounded-[18px] border border-night-line bg-night-card p-3";
const stepLabel = "font-mono text-[11px] text-on-night-dim max-[820px]:hidden";
const nameStrip =
  "absolute inset-x-0 bottom-0 px-3 pt-7 pb-3 text-[clamp(11px,1.25vw,17px)] font-semibold tracking-[-0.02em] text-white max-[820px]:hidden";
const nameFade = { background: "linear-gradient(rgba(10,10,10,0), rgba(10,10,10,0.92))" };
const chip =
  "absolute top-2.5 left-2.5 rounded-full bg-[rgba(10,10,10,0.78)] px-2 py-1 font-mono text-[11px] text-white max-[820px]:hidden";

const logLines = [
  "problem understood, scope signed off",
  "prototype tested with real users",
  "v0.1 in your hands",
  "v1.0 deployed",
];

export function Rise() {
  return (
    <section aria-label="From idea to production" className="wrap pt-[clamp(48px,6vw,72px)]">
      <div className="relative overflow-hidden rounded-[32px] bg-night p-[clamp(22px,4vw,52px)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[45%] -right-[12%] h-[130%] w-[72%]"
          style={{ background: "radial-gradient(closest-side, var(--glow-soft), rgba(10,10,10,0))" }}
        />
        <div className="relative flex flex-wrap justify-between gap-3 font-mono text-[12px] tracking-[0.08em] text-on-night-dim uppercase">
          <span className="inline-flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="bg-grad inline-block h-2 w-2 rounded-full"
              style={{ boxShadow: "0 0 12px var(--g1)" }}
            />
            The rise
          </span>
          <span>Idea → production</span>
        </div>

        <div className="relative mt-7 h-[clamp(300px,36vw,470px)] max-[820px]:mt-[76px]">
          <div className="absolute inset-0 flex items-end gap-[clamp(8px,1.4vw,18px)]">
            <div className={frameBase} style={{ height: "26%" }} aria-hidden="true">
              <span className={stepLabel}>01 · Idea</span>
              <span className="block h-1 w-[70%] rounded bg-[#2A2A2A]" />
              <span className="block h-1 w-[45%] rounded bg-[#2A2A2A]" />
            </div>
            <div className={frameBase} style={{ height: "39%" }} aria-hidden="true">
              <span className={stepLabel}>02 · Prototype</span>
              <span className="block flex-auto rounded-[10px] border border-dashed border-[#3A3A3A]" />
              <span className="flex gap-1.5">
                <span className="h-[18px] flex-1 rounded-md border border-dashed border-[#3A3A3A]" />
                <span className="h-[18px] flex-1 rounded-md border border-dashed border-[#3A3A3A]" />
              </span>
            </div>
            <div className={frameBase} style={{ height: "52%" }} aria-hidden="true">
              <span className={stepLabel}>03 · MVP</span>
              <span className="block h-3.5 w-[55%] rounded-md bg-[#2E2E2E]" />
              <span className="block flex-auto rounded-[10px] bg-[#222222]" />
              <span className="flex gap-1.5">
                <span className="h-[22px] flex-[2] rounded-full bg-[#F2F2F2]" />
                <span className="h-[22px] flex-1 rounded-full border border-[#3A3A3A]" />
              </span>
            </div>
            <div
              className="relative min-w-0 flex-1 basis-0 overflow-hidden rounded-[18px] border border-night-edge bg-[#0B0C0C]"
              style={{ height: "65%" }}
            >
              <Image
                src="/images/cronpay.jpg"
                alt="Cronpay landing page"
                fill
                sizes="(max-width: 820px) 20vw, 240px"
                className="object-cover"
                style={{ objectPosition: "30% 22%" }}
              />
              <span className={chip}>04 · Launch</span>
              <span className={nameStrip} style={nameFade}>
                Cronpay
              </span>
            </div>
            <div
              className="relative min-w-0 flex-1 basis-0 overflow-hidden rounded-[18px] border bg-night-card"
              style={{ height: "78%", borderColor: "var(--g1)", boxShadow: "0 0 50px var(--glow-soft)" }}
            >
              <Image
                src="/images/maestro.jpg"
                alt="Maestro interview prep platform"
                fill
                sizes="(max-width: 820px) 20vw, 240px"
                className="object-cover"
                style={{ objectPosition: "50% 25%" }}
              />
              <span className={`${chip} inline-flex items-center gap-1.5`}>
                <GradDot size={6} pulse />
                05 · Live
              </span>
              <span className={nameStrip} style={nameFade}>
                Maestro
              </span>
            </div>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            style={{ filter: "drop-shadow(0 0 6px var(--g1))" }}
          >
            <defs>
              <linearGradient id="riseLine" x1="0" y1="0" x2="1" y2="0">
                <GradStops />
              </linearGradient>
            </defs>
            <polyline
              points="0,70 20,70 20,57 40,57 40,44 60,44 60,31 80,31 80,18 100,18"
              fill="none"
              stroke="url(#riseLine)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* ship.log terminal */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-[min(390px,44%)] overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[rgba(22,22,22,0.94)] font-mono text-[12px] leading-[1.9] shadow-[0_24px_60px_rgba(0,0,0,0.55)] max-[820px]:hidden"
          >
            <div className="flex items-center gap-1.5 border-b border-night-line px-3.5 py-2.5 text-on-night-dim">
              <span className="h-2 w-2 rounded-full bg-[#3A3A3A]" />
              <span className="h-2 w-2 rounded-full bg-[#3A3A3A]" />
              <span className="h-2 w-2 rounded-full bg-[#3A3A3A]" />
              <span className="ml-2">ship.log</span>
            </div>
            <div className="flex flex-col px-4 pt-3 pb-3.5 text-on-night">
              <span>
                <span className="text-on-night-dim">$</span> levantate ship --to production
              </span>
              {logLines.map((line) => (
                <span key={line}>
                  <span className="text-accent-glow">✓</span> {line}
                </span>
              ))}
              <span className="flex items-center gap-2 text-white">
                <GradDot size={7} pulse />
                live, and we&rsquo;re still here
                <span className="caret inline-block h-3.5 w-[7px] bg-on-night" />
              </span>
            </div>
          </div>

          {/* The mark rises over the last step like the sun */}
          <div
            className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-white"
            style={{
              left: "90%",
              top: "18%",
              margin: "-78px 0 0 -32px",
              boxShadow: "0 0 0 10px rgba(255,255,255,0.08), 0 0 60px var(--g1)",
            }}
          >
            <Mark className="h-[30px] w-7" ours="#0A0A0A" yours="#0A0A0A" title="Levantate mark" />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative mt-3 hidden grid-cols-5 gap-2 text-center font-mono text-[10px] text-on-night-dim max-[820px]:grid"
        >
          <span>Idea</span>
          <span>Proto</span>
          <span>MVP</span>
          <span>Cronpay</span>
          <span className="text-white">Maestro</span>
        </div>
      </div>
      <p className="mx-1 mt-4 mb-0 text-[14px] leading-relaxed text-dim">
        The rise: every product we make climbs the same five steps, from a rough idea to something people use every
        day.
      </p>
    </section>
  );
}
