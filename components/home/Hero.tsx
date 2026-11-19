import type { CSSProperties } from "react";
import { ArrowLink, GradDot, OutlineLink } from "@/components/site/ui";
import { GradStops } from "./svg";

const words = ["products", "platforms", "AI systems", "products"];

const underline: CSSProperties = {
  backgroundImage: "var(--grad)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "0 calc(100% - 0.04em)",
  backgroundSize: "100% 0.055em",
};

const steps = [
  { label: "Understand", left: "0%", rise: 0.06, delay: "0.9s" },
  { label: "Design", left: "20.4%", rise: 0.29, delay: "1.1s" },
  { label: "Build", left: "40.4%", rise: 0.52, delay: "1.3s" },
  { label: "Launch", left: "60.4%", rise: 0.76, delay: "1.5s" },
  { label: "Run", left: "80.4%", rise: 0.99, delay: "1.7s", accent: true },
];

export function Hero() {
  return (
    <header id="top" className="wrap pt-[clamp(40px,6vw,80px)]">
      <div className="up d1 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-hair py-2 pr-4 pl-3 text-[12px] font-semibold tracking-[0.14em] uppercase">
          <GradDot />
          Product studio
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-[12px] text-dim">
          <GradDot size={7} pulse />2 project slots open this quarter
        </span>
      </div>

      <h1 className="mt-[clamp(28px,3.4vw,48px)] mb-0 text-[clamp(40px,7.6vw,118px)] leading-[0.9] font-semibold tracking-[-0.055em] uppercase">
        <span className="sr-only">We build products like they&apos;re our own.</span>
        <span aria-hidden="true" className="block">
          <span className="-mt-[0.08em] -mb-[0.05em] block overflow-hidden pt-[0.08em] pb-[0.05em]">
            <span className="lineup d1 block">
              We build{" "}
              <span className="inline-block h-[0.9em] overflow-hidden align-top">
                <span className="words block">
                  {words.map((word, i) => (
                    <span key={`${word}-${i}`} className="block h-[0.9em]">
                      <span className="inline-block h-[0.9em] leading-[0.9em]" style={underline}>
                        {word}
                      </span>
                    </span>
                  ))}
                </span>
              </span>
            </span>
          </span>
          <span className="-mt-[0.02em] -mb-[0.2em] block overflow-hidden pt-[0.02em] pr-[0.1em] pb-[0.2em]">
            <span className="lineup d2 serif-accent block text-right text-[1.1em] tracking-[-0.02em] text-accent-ink max-[820px]:text-left">
              like they&rsquo;re our own.
            </span>
          </span>
        </span>
      </h1>

      {/* The rise line, drawn across the page */}
      <div aria-hidden="true" className="relative mt-[clamp(28px,3.4vw,48px)] pt-[22px]">
        <svg
          viewBox="0 0 1200 64"
          preserveAspectRatio="none"
          className="block h-[clamp(40px,5vw,64px)] w-full overflow-visible"
          style={{ filter: "drop-shadow(0 0 6px var(--glow-soft))" }}
        >
          <defs>
            <linearGradient id="heroRise" x1="0" y1="0" x2="1" y2="0">
              <GradStops />
            </linearGradient>
          </defs>
          <polyline
            className="draw"
            pathLength={1}
            points="0,62 240,62 240,47 480,47 480,32 720,32 720,17 960,17 960,2 1200,2"
            fill="none"
            stroke="url(#heroRise)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <span
          className="lp absolute top-[13px] -right-[9px] h-[18px] w-[18px] rounded-full border"
          style={{ borderColor: "var(--g2)" }}
        />
        <span
          className="fadein absolute top-[17px] -right-[5px] h-2.5 w-2.5 rounded-full"
          style={{ background: "var(--g2)", boxShadow: "0 0 14px var(--g2)", animationDelay: "2s" }}
        />
        <div className="absolute inset-0 font-mono text-[11px] tracking-[0.06em] text-dim uppercase max-[820px]:hidden">
          {steps.map((step) => (
            <span
              key={step.label}
              className={`up absolute ${step.accent ? "text-accent-ink" : ""}`}
              style={{
                left: step.left,
                bottom: `calc(clamp(40px, 5vw, 64px) * ${step.rise} + 10px)`,
                animationDelay: step.delay,
              }}
            >
              {step.label}
            </span>
          ))}
        </div>
      </div>

      <div className="up d4 mt-[clamp(32px,4vw,52px)] flex flex-wrap items-end justify-between gap-7">
        <p className="m-0 max-w-[560px] text-[clamp(17px,1.5vw,20px)] leading-relaxed text-body">
          Levantate Labs is a product studio. We take products from first idea to running in production for our
          clients, and we build and run our own: Maestro and Cronpay.
        </p>
        <div className="flex flex-wrap gap-3">
          <ArrowLink href="/contact">Start a project</ArrowLink>
          <OutlineLink href="/products">See our products</OutlineLink>
        </div>
      </div>

      <div className="up d6 mt-[clamp(32px,4vw,48px)] flex flex-wrap gap-x-8 gap-y-2.5 border-t border-hair pt-5 text-[14px] text-dim">
        <span>
          <strong className="font-semibold text-night">100+</strong> enterprises served
        </span>
        <span>
          <strong className="font-semibold text-night">5</strong> products of our own
        </span>
        <span>
          <strong className="font-semibold text-night">One team</strong>, idea to production
        </span>
      </div>
    </header>
  );
}
