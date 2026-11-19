import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrowserFrame } from "@/components/products/BrowserFrame";
import { StatusPill, type StatusDot } from "@/components/products/StatusPill";
import { ArrowLink, CtaBand, Eyebrow, Serif } from "@/components/site/ui";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Products",
  description:
    "Our own products, built and run by us: Maestro and its Simulation Lab, Cronpay, Elevox in development, and one more in stealth.",
  path: "/products",
  keywords: [
    "Maestro interview prep",
    "Maestro Simulation Lab",
    "Cronpay crypto checkout",
    "Elevox AI phone agent",
    "Levantate Labs products",
  ],
});

const index: { num: string; name: string; href: string; status: string; dot: StatusDot; dark?: boolean }[] = [
  { num: "01", name: "Maestro", href: "#maestro", status: "Live", dot: "live" },
  { num: "02", name: "Simulation Lab", href: "#simulation-lab", status: "Inside Maestro", dot: "solid" },
  { num: "03", name: "Cronpay", href: "#cronpay", status: "Early access", dot: "live" },
  { num: "04", name: "Elevox", href: "#elevox", status: "In development", dot: "ring" },
  { num: "05", name: "Name withheld", href: "#stealth", status: "Stealth", dot: "dashed", dark: true },
];

const maestroParts = [
  {
    label: "Learn",
    title: "Courses & learning paths",
    body: "Short lessons, real assignments and human grading, sequenced into paths that end interview-ready.",
    dark: true,
  },
  {
    label: "MockPrep",
    title: "Mock tests",
    body: "Timed, company-pattern tests with realistic question mixes, a real coding round and a detailed breakdown of results.",
  },
  {
    label: "MockPrep",
    title: "Company prep",
    body: "Test patterns, eligibility and syllabus breakdowns for the companies you’re targeting.",
  },
  {
    label: "MockPrep",
    title: "Practice questions",
    body: "Reviewed sample questions with step-by-step explanations and complexity analysis.",
  },
];

const maestroSteps = [
  { title: "Start interview prep", body: "One launch path: Interview Prep for Service Companies. Free to begin.", color: "var(--s0)" },
  { title: "Learn by doing", body: "Watch short lessons, then prove it with real assignments, not quizzes.", color: "var(--s1)" },
  { title: "Get graded by humans", body: "Real instructors review the work and give feedback that actually helps.", color: "var(--s2)" },
  { title: "Climb & get hired", body: "Top the monthly leaderboard, build the skills and walk into interviews ready.", color: "var(--s3)" },
];

const labStats = [
  { value: "167", label: "parts, from resistors to an Arduino Uno" },
  { value: "Live", label: "current and voltage as it runs" },
  { value: "Scope", label: "and Bode plots built in" },
];

const cronpayStats = [
  { value: "58", label: "Chains supported" },
  { value: "1%", label: "Per settled payment" },
  { value: "$0", label: "Monthly fees" },
];

const cronpayBeats = [
  {
    title: "One price, locked.",
    body: "The customer sees the dollar price and the exact token amount, with rate, fees and maximum slippage up front.",
    color: "var(--s0)",
  },
  {
    title: "Their wallet, their chain.",
    body: "Customers pay with the token they already hold, from a browser wallet or by scanning a QR code.",
    color: "var(--s1)",
  },
  {
    title: "Cronpay does the crossing.",
    body: "Cronpay quotes the route, swaps and bridges behind the scenes, and pays out in the token and chain you chose.",
    color: "var(--s2)",
  },
  {
    title: "Settled means in your wallet.",
    body: "Detected isn’t paid. Customers see real confirmations, and “settled” only when you have the funds.",
    color: "var(--s3)",
  },
];

const reasons = [
  {
    title: "We feel what users feel.",
    body: "Every slow page, confusing screen and 2am alert on our own products lands on us first.",
  },
  {
    title: "Same team, both sides.",
    body: "The people who build and run Maestro and Cronpay are the people who build client work.",
  },
  {
    title: "Lessons travel.",
    body: "What we learn shipping our own products goes straight into the ones we build with you.",
  },
];

function StepBar({ color }: { color: string }) {
  return <span aria-hidden="true" className="h-1.5 w-[18px] rounded-full" style={{ background: color }} />;
}

export default function ProductsPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <header className="wrap pt-[clamp(56px,8vw,112px)]">
        <Eyebrow className="up d1">Our products</Eyebrow>
        <h1 className="up d2 mt-7 mb-0 max-w-[1100px] text-[clamp(44px,6.4vw,96px)] leading-[0.94] font-semibold tracking-[-0.05em] uppercase">
          Our own products, <Serif>built and run by us.</Serif>
        </h1>
        <p className="up d3 mt-7 mb-0 max-w-[640px] text-[clamp(17px,1.5vw,20px)] leading-relaxed text-body">
          The same discipline we sell, applied to products we own. We find a problem worth solving, build the product, launch it
          and keep it running, with the same team that builds client work.
        </p>

        <nav
          aria-label="Our products"
          className="up d4 mt-[clamp(48px,6vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3"
        >
          {index.map((item) => (
            <a
              key={item.num}
              href={item.href}
              className={`lift flex min-h-[140px] flex-col gap-[18px] rounded-[24px] p-5 ${
                item.dark ? "bg-night text-white!" : "border border-hair bg-white text-night!"
              }`}
            >
              <span className={`flex justify-between font-mono text-[12px] ${item.dark ? "text-on-night-dim" : "text-dim"}`}>
                {item.num}
                <span aria-hidden="true">↓</span>
              </span>
              <span className="mt-auto text-[clamp(18px,1.8vw,24px)] font-semibold tracking-[-0.03em]">{item.name}</span>
              <StatusPill dot={item.dot} onNight={item.dark} className="px-[11px] py-[5px] text-[11px]!">
                {item.status}
              </StatusPill>
            </a>
          ))}
        </nav>
      </header>

      {/* ============ MAESTRO ============ */}
      <section id="maestro" className="wrap scroll-mt-28 pt-[clamp(96px,11vw,140px)]">
        <div className="flex flex-wrap items-end justify-between gap-7">
          <div className="min-w-0 flex-[1_1_560px]">
            <Eyebrow>01 · Maestro · Live</Eyebrow>
            <h2 className="mt-[22px] mb-0 text-[clamp(32px,4.6vw,60px)] leading-none font-semibold tracking-[-0.045em] uppercase">
              Interview prep that works <Serif>like the real round.</Serif>
            </h2>
            <p className="mt-5 mb-0 max-w-[600px] text-[18px] leading-relaxed text-body">
              Human-graded courses for service-company interviews, and timed mock tests in each company’s real pattern. Learn
              builds the skill. MockPrep checks it under real test conditions.
            </p>
          </div>
          <ArrowLink href="https://studywithmaestro.com/" external>
            Visit Maestro
          </ArrowLink>
        </div>

        <BrowserFrame
          className="mt-12"
          url="studywithmaestro.com"
          src="/images/maestro.jpg"
          alt="Maestro landing page: learn the skills, pass the mock, crack the interview"
          priority
        />

        <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {maestroParts.map((part) => (
            <div
              key={part.title}
              className={`lift flex flex-col gap-3 rounded-[28px] p-7 ${part.dark ? "bg-night text-white" : "border border-hair"}`}
            >
              <span className={`font-mono text-[12px] uppercase ${part.dark ? "text-on-night-dim" : "text-dim"}`}>
                {part.label}
              </span>
              <h3 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">{part.title}</h3>
              <p className={`m-0 text-[15px] leading-relaxed ${part.dark ? "text-on-night" : "text-body"}`}>{part.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-7 border-t border-hair pt-7">
          {maestroSteps.map((step, i) => (
            <div key={step.title} className="flex flex-col gap-2.5">
              <span className="flex items-center gap-2.5 font-mono text-[12px] text-dim">
                <StepBar color={step.color} />
                STEP {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 text-[20px] font-semibold tracking-[-0.02em]">{step.title}</h3>
              <p className="m-0 text-[15px] leading-relaxed text-body">{step.body}</p>
            </div>
          ))}
        </div>

        {/* Simulation Lab, part of Maestro (no public link) */}
        <article
          id="simulation-lab"
          className="mt-14 flex scroll-mt-28 flex-wrap overflow-hidden rounded-[32px] bg-night text-white"
        >
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px] p-[clamp(28px,4vw,52px)]">
            <StatusPill dot="solid" onNight>
              02 · Inside Maestro
            </StatusPill>
            <h3 className="m-0 text-[clamp(28px,3vw,40px)] leading-[1.05] font-semibold tracking-[-0.035em] uppercase">
              Maestro <Serif onNight>Simulation Lab.</Serif>
            </h3>
            <p className="m-0 text-[17px] leading-relaxed text-on-night">
              A circuit simulator in the browser. Build circuits and watch them run: moving dots show current and wire colours show
              voltage.
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2.5">
              {labStats.map((stat) => (
                <div key={stat.value} className="rounded-[20px] border border-night-line bg-night-card p-4">
                  <span className="block text-[28px] font-semibold tracking-[-0.04em]">{stat.value}</span>
                  <span className="text-[13px] text-on-night-dim">{stat.label}</span>
                </div>
              ))}
            </div>
            <span className="mt-auto font-mono text-[12px] text-on-night-dim">Available to Maestro learners</span>
          </div>
          <div className="relative min-h-[380px] min-w-0 flex-[1.3_1_520px] bg-[#111111] max-[820px]:min-h-[224px]">
            <Image
              src="/images/simulation-lab.jpg"
              alt="Maestro Simulation Lab running an LED matrix circuit in dark mode"
              fill
              sizes="(max-width: 820px) 100vw, 60vw"
              className="object-cover"
              style={{ objectPosition: "55% 10%" }}
            />
          </div>
        </article>
      </section>

      {/* ============ CRONPAY ============ */}
      <section
        id="cronpay"
        className="relative mt-[clamp(96px,11vw,140px)] scroll-mt-28 overflow-hidden bg-night text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-20%] right-[-15%] h-[70%] w-[70%]"
          style={{ background: "radial-gradient(closest-side, var(--glow-soft), rgba(10,10,10,0))" }}
        />
        <div className="wrap section-y relative">
          <div className="flex flex-wrap items-end justify-between gap-7">
            <div className="min-w-0 flex-[1_1_560px]">
              <Eyebrow onNight>03 · Cronpay · Early access</Eyebrow>
              <h2 className="mt-[22px] mb-0 text-[clamp(32px,4.6vw,60px)] leading-none font-semibold tracking-[-0.045em] uppercase">
                Get paid in any token. <Serif onNight>Settle in the one you want.</Serif>
              </h2>
              <p className="mt-5 mb-0 max-w-[600px] text-[18px] leading-relaxed text-on-night">
                Permissionless crypto checkout. Customers pay with the token they already hold, on the chain they already use. You
                receive your preferred token on your preferred chain. No swaps, no bridges, no lost sales.
              </p>
            </div>
            <ArrowLink href="https://cronpay.xyz/" external onNight>
              Visit Cronpay
            </ArrowLink>
          </div>

          <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] border-t border-night-line">
            {cronpayStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1.5 pt-6 pr-6">
                <span className="text-[clamp(40px,4.4vw,60px)] leading-none font-semibold tracking-[-0.05em]">{stat.value}</span>
                <span className="text-[14px] text-on-night-dim">{stat.label}</span>
              </div>
            ))}
          </div>

          <BrowserFrame
            className="mt-12"
            dark
            url="cronpay.xyz"
            src="/images/cronpay.jpg"
            alt="Cronpay landing page: get paid in any token, settle in the one you want"
          />

          <h3 className="mt-16 mb-0 text-[clamp(24px,2.6vw,34px)] leading-[1.05] font-semibold tracking-[-0.035em] uppercase">
            How a payment moves: <Serif onNight>four beats.</Serif>
          </h3>
          <ol className="m-0 mt-7 grid list-none grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4 p-0">
            {cronpayBeats.map((beat, i) => (
              <li
                key={beat.title}
                className="flex flex-col gap-3 rounded-[28px] border border-night-line bg-night-card p-[26px]"
              >
                <span className="flex items-center gap-2.5 font-mono text-[12px] text-on-night-dim">
                  <StepBar color={beat.color} />
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="m-0 text-[20px] font-semibold tracking-[-0.02em]">{beat.title}</h4>
                <p className="m-0 text-[15px] leading-relaxed text-on-night">{beat.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ IN THE WORKS ============ */}
      <section id="elevox" className="wrap scroll-mt-28 pt-[clamp(96px,11vw,140px)]">
        <Eyebrow>In the works</Eyebrow>
        <h2 className="mt-[22px] mb-0 text-[clamp(32px,4.6vw,60px)] leading-none font-semibold tracking-[-0.045em] uppercase">
          What we’re <Serif>building next.</Serif>
        </h2>
        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-4">
          <article className="flex flex-col overflow-hidden rounded-[32px] border border-hair">
            <div className="relative h-[300px] bg-paper">
              <Image
                src="/images/elevox.jpg"
                alt="Elevox AI phone agent landing page"
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: "0% 20%" }}
              />
            </div>
            <div className="flex flex-col gap-3.5 p-[clamp(26px,3vw,36px)]">
              <StatusPill dot="ring">04 · In development</StatusPill>
              <h3 className="m-0 text-[30px] font-semibold tracking-[-0.03em]">Elevox</h3>
              <p className="m-0 text-[16px] leading-relaxed text-body">
                An AI phone agent that answers every call in the caller’s language, books appointments, qualifies leads and hands
                off to your team when it matters.
              </p>
              <Link
                href="/contact"
                className="mt-1.5 self-start border-b border-accent-ink pb-0.5 text-[15px] font-medium text-night!"
              >
                Ask for early access
              </Link>
            </div>
          </article>

          <article id="stealth" className="flex scroll-mt-28 flex-col overflow-hidden rounded-[32px] bg-night text-white">
            <div
              aria-hidden="true"
              className="relative flex h-[300px] items-center justify-center bg-[#111111]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            >
              <div
                className="absolute h-60 w-60 rounded-full"
                style={{ background: "radial-gradient(closest-side, var(--glow-soft), rgba(17,17,17,0))" }}
              />
              <span className="relative font-mono text-[14px] tracking-[0.3em] text-on-night-dim">█████ ███</span>
            </div>
            <div className="flex flex-col gap-3.5 p-[clamp(26px,3vw,36px)]">
              <StatusPill dot="dashed" onNight>
                05 · Stealth
              </StatusPill>
              <h3 className="m-0 text-[30px] font-semibold tracking-[-0.03em]">Name withheld</h3>
              <p className="m-0 text-[16px] leading-relaxed text-on-night">
                Systems intelligence. Something we’re not ready to show yet. Ask us about it on a call.
              </p>
              <Link
                href="/contact"
                className="mt-1.5 self-start border-b border-[#555555] pb-0.5 text-[15px] font-medium text-white!"
              >
                Get notified
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ============ WHY WE BUILD OUR OWN ============ */}
      <section className="mt-[clamp(96px,11vw,140px)] bg-night text-white">
        <div className="wrap section-y">
          <Eyebrow onNight>Why we build our own</Eyebrow>
          <h2 className="mt-[22px] mb-0 text-[clamp(32px,4.6vw,60px)] leading-none font-semibold tracking-[-0.045em] uppercase">
            It keeps us <Serif onNight>honest.</Serif>
          </h2>
          <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
            {reasons.map((reason, i) => (
              <div key={reason.title} className="flex flex-col gap-3.5 border-t border-night-edge pt-[22px]">
                <span className="font-mono text-[12px] text-on-night-dim">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="m-0 text-[clamp(22px,2.4vw,30px)] leading-[1.1] font-semibold tracking-[-0.03em]">
                  {reason.title}
                </h3>
                <p className="m-0 text-[15px] leading-relaxed text-on-night">{reason.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-[clamp(80px,10vw,128px)]">
        <CtaBand
          title={
            <>
              Have a product <Serif>in mind?</Serif>
            </>
          }
          body="We build for clients with the same care we give our own. Tell us what you’re building; we reply within two working days."
        />
      </div>
    </>
  );
}
