import type { Metadata } from "next";
import Image from "next/image";
import { StatusPill } from "@/components/products/StatusPill";
import { ArrowLink, Eyebrow, GradDot, OutlineLink, Serif } from "@/components/site/ui";
import { ExploitlessCover, InterviewCover } from "@/components/work/CaseCovers";
import { caseStudies, clientQuotes, type CaseStudy } from "@/lib/data/work";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { createPageMetadata, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Client work",
  description:
    "Products, platforms and sites we have built with our clients, from an enterprise AI interview platform to brand sites for security, recruitment and film studios.",
  path: "/work",
  keywords: [
    "Levantate Labs client work",
    "AI interview platform",
    "Exploitless website",
    "Vertin Recruitment website",
    "Crestline Creatives",
    "product studio case studies",
  ],
});

const stats = [
  { value: "100+", label: "Enterprises served" },
  { value: "12+", label: "Systems shipped" },
  { value: "2", label: "Slots open this quarter", live: true },
];

function CaseCoverFor({ study }: { study: CaseStudy }) {
  if (study.cover === "interview") return <InterviewCover />;
  if (study.cover === "exploitless") return <ExploitlessCover />;
  if (!study.image) return null;
  return (
    <div
      className={`relative min-h-[clamp(260px,34vw,480px)] min-w-0 flex-[1.6_1_560px] ${
        study.image.bordered ? "border-l border-hair bg-white max-[820px]:border-b max-[820px]:border-l-0" : "bg-night"
      }`}
    >
      <Image
        src={study.image.src}
        alt={study.image.alt}
        fill
        sizes="(max-width: 1100px) 100vw, 62vw"
        className="object-cover"
        style={{ objectPosition: study.image.position }}
      />
    </div>
  );
}

export default function WorkPage() {
  return (
    <>
      <JsonLdScript data={[webPageJsonLd({ type: "CollectionPage", name: "Client work", description: "Products, platforms and sites Levantate Labs has built with clients.", path: "/work" }), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Client work", path: "/work" }])]} />
      {/* ============ HERO ============ */}
      <header className="wrap pt-[clamp(56px,8vw,112px)]">
        <Eyebrow className="up d1">Client work</Eyebrow>
        <div className="mt-7 flex flex-wrap items-end justify-between gap-10">
          <div className="min-w-0 flex-[1_1_560px]">
            <h1 className="m-0 text-[clamp(46px,7.4vw,108px)] leading-[0.94] font-semibold tracking-[-0.05em] uppercase">
              <span className="mt-[-0.06em] mb-[-0.02em] block overflow-hidden pt-[0.06em] pb-[0.02em]">
                <span className="lineup d1 block">Built with</span>
              </span>
              <span className="mt-[-0.04em] mb-[-0.16em] block overflow-hidden pt-[0.04em] pr-[0.12em] pb-[0.16em]">
                <span className="lineup d2 block">
                  <Serif>our clients.</Serif>
                </span>
              </span>
            </h1>
            <p className="up d4 mt-7 mb-0 max-w-[600px] text-[clamp(17px,1.5vw,20px)] leading-relaxed text-body">
              Products, platforms and sites we’ve designed and engineered with other teams. One senior team from the first
              architecture diagram to launch, and the running after.
            </p>
          </div>
          <nav aria-label="Projects on this page" className="up d5 flex min-w-0 flex-[0_1_380px] flex-col border-t border-hair">
            {caseStudies.map((study) => (
              <a
                key={study.id}
                href={`#${study.id}`}
                className="flex min-h-[52px] items-center gap-4 border-b border-hair px-2 text-[15px] font-medium text-night! hover:bg-paper"
              >
                <span className="font-mono text-[12px] text-dim">{study.num}</span>
                {study.name}
                <span className="ml-auto text-[13px] font-normal text-dim">{study.kind}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ============ CASES ============ */}
      <section aria-label="Case studies" className="wrap flex flex-col gap-5 pt-[clamp(64px,8vw,104px)]">
        {caseStudies.map((study, i) => (
          <article
            key={study.id}
            id={study.id}
            className={`flex scroll-mt-28 flex-wrap overflow-hidden rounded-[32px] border border-hair ${
              i % 2 === 1 ? "flex-row-reverse" : ""
            }`}
          >
            <CaseCoverFor study={study} />
            <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3.5 p-[clamp(28px,3.6vw,48px)]">
              <span className="flex items-center justify-between gap-3">
                <span className="font-mono text-[13px] text-dim">{study.num}</span>
                {study.status ? (
                  <StatusPill dot="ring" className="px-3 py-1.5 text-[11px]!">
                    {study.status}
                  </StatusPill>
                ) : null}
              </span>
              <span className="text-[12px] font-semibold tracking-[0.14em] text-dim uppercase">
                {study.name} · {study.kind}
              </span>
              <h2 className="m-0 text-[clamp(26px,2.8vw,38px)] leading-[1.08] font-semibold tracking-[-0.035em]">
                {study.title}
              </h2>
              <p className="m-0 text-[16px] leading-relaxed text-body">{study.body}</p>
              <p className="m-0 text-[15px] leading-relaxed text-dim">{study.detail}</p>
              <div className="mt-auto flex flex-col gap-2.5 pt-3.5">
                <span className="font-mono text-[11px] tracking-[0.08em] text-dim uppercase">What we did</span>
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {study.did.map((item) => (
                    <li key={item} className="rounded-full border border-hair px-3.5 py-[7px] text-[13px]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ============ STATS ============ */}
      <section aria-label="In numbers" className="wrap pt-[clamp(64px,8vw,104px)] pb-[clamp(96px,11vw,140px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] border-t border-hair">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1.5 pt-7 pr-6">
              <span className="inline-flex items-center gap-3 text-[clamp(40px,4.4vw,60px)] leading-none font-semibold tracking-[-0.05em]">
                {stat.value}
                {stat.live ? <GradDot size={10} pulse /> : null}
              </span>
              <span className="text-[14px] text-dim">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section aria-label="What clients say" className="relative overflow-hidden bg-night text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-40%] right-[-15%] h-[90%] w-[70%]"
          style={{ background: "radial-gradient(closest-side, var(--glow-soft), rgba(10,10,10,0))" }}
        />
        <div className="wrap section-y relative">
          <Eyebrow onNight>In their words</Eyebrow>
          <h2 className="mt-[22px] mb-0 text-[clamp(32px,4.6vw,60px)] leading-none font-semibold tracking-[-0.045em] uppercase">
            What clients <Serif onNight>tell us.</Serif>
          </h2>
          <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-4">
            {clientQuotes.map((q) => (
              <figure
                key={q.name}
                className="m-0 flex flex-col gap-7 rounded-[32px] border border-night-line bg-night-card p-[clamp(28px,3.6vw,44px)]"
              >
                <span aria-hidden="true" className="serif-accent text-[72px] leading-[0.6] text-accent-glow">
                  “
                </span>
                <blockquote className="m-0 text-[clamp(18px,1.7vw,22px)] leading-normal font-medium tracking-[-0.015em] text-white">
                  {q.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3.5 border-t border-night-line pt-[22px]">
                  <span aria-hidden="true" className="bg-grad box-border inline-flex h-12 w-12 rounded-full p-0.5">
                    <span className="flex flex-1 items-center justify-center rounded-full bg-night-card text-[15px] font-semibold">
                      {q.initials}
                    </span>
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <strong className="text-[15px] font-semibold">{q.name}</strong>
                    <span className="text-[14px] text-on-night-dim">{q.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section aria-label="Start a project" className="wrap section-y">
        <div className="flex flex-wrap items-end justify-between gap-8 rounded-[32px] bg-paper p-[clamp(32px,5vw,64px)]">
          <div className="min-w-0 flex-[1_1_520px]">
            <h2 className="m-0 text-[clamp(36px,5vw,72px)] leading-[0.96] font-semibold tracking-[-0.05em] uppercase">
              Have something <Serif>to build?</Serif>
            </h2>
            <p className="mt-[18px] mb-0 max-w-[480px] text-[17px] leading-relaxed text-body">
              Tell us where it is today. We reply within two working days, and you talk to the people who would build it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ArrowLink href="/contact">Start a project</ArrowLink>
            <OutlineLink href="/products">See our products</OutlineLink>
          </div>
        </div>
      </section>
    </>
  );
}
