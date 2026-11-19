import type { Metadata } from "next";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { ServiceVisual } from "@/components/services/ServiceVisual";
import { ArrowLink, CtaBand, Eyebrow, GradDot, Serif } from "@/components/site/ui";
import { services } from "@/lib/data/services";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Product strategy and design, web and product engineering, AI and machine learning, AI for SaaS, enterprise software and blockchain, built end to end by one team.",
  path: "/services",
  keywords: [
    "product strategy and design",
    "web and product engineering",
    "AI and machine learning development",
    "AI for SaaS",
    "enterprise software development",
    "blockchain development",
    "Levantate Labs services",
  ],
});

const proof = [
  { value: "100+", label: "Enterprises served" },
  { value: "12+", label: "Systems shipped" },
  { value: "5", label: "Products of our own" },
];

export default function ServicesPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <header className="wrap pt-[clamp(56px,8vw,112px)]">
        <Eyebrow className="up d1">Services</Eyebrow>
        <h1 className="up d2 mt-7 mb-0 text-[clamp(46px,7.2vw,108px)] leading-[0.94] font-semibold tracking-[-0.05em] uppercase">
          One team, <Serif>start to finish.</Serif>
        </h1>
        <div className="up d3 mt-8 flex flex-wrap items-end justify-between gap-8">
          <p className="m-0 max-w-[620px] text-[clamp(17px,1.5vw,20px)] leading-relaxed text-body">
            Strategy, design, engineering and operations under one roof. No hand-offs between agencies, no gap between the deck
            and the deploy. The same senior people from the first call to production, and after.
          </p>
          <ArrowLink href="/contact">Start a project</ArrowLink>
        </div>
        <nav
          aria-label="Services on this page"
          className="up d4 mt-10 flex flex-wrap gap-2 border-t border-hair pt-6"
        >
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="out group inline-flex min-h-11 items-center gap-2 rounded-full border border-hair px-4 text-[14px] text-night! hover:bg-night hover:text-white!"
            >
              <span className="font-mono text-[11px] text-dim group-hover:text-on-night-dim">{service.num}</span>
              {service.short}
            </a>
          ))}
        </nav>
      </header>

      {/* ============ SERVICES ============ */}
      <section className="wrap pt-[clamp(64px,8vw,96px)]">
        {services.map((service, i) => (
          <article
            key={service.id}
            id={service.id}
            className={`flex scroll-mt-28 flex-wrap items-center gap-[clamp(32px,5vw,72px)] border-t border-hair py-[clamp(48px,6vw,72px)] ${
              i % 2 === 1 ? "flex-row-reverse" : ""
            }`}
          >
            <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-[18px]">
              <span className="font-mono text-[13px] text-dim">
                {service.num} / {String(services.length).padStart(2, "0")}
              </span>
              <h2 className="m-0 text-[clamp(30px,3.6vw,48px)] leading-none font-semibold tracking-[-0.04em] uppercase">
                {service.title} <Serif>{service.accent}</Serif>
              </h2>
              <p className="m-0 max-w-[520px] text-[17px] leading-relaxed text-body">{service.body}</p>
              <ul className="m-0 mt-2 grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-6 p-0">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 border-t border-hair py-[13px] text-[15px]">
                    <GradDot size={6} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <ServiceVisual kind={service.visual} />
          </article>
        ))}
      </section>

      {/* ============ HOW WE WORK ============ */}
      <div className="mt-[clamp(64px,8vw,96px)]">
        <ProcessTimeline />
      </div>

      {/* ============ PROOF ============ */}
      <section className="wrap pt-[clamp(96px,11vw,140px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] border-t border-hair">
          {proof.map((item) => (
            <div key={item.label} className="flex flex-col gap-1.5 pt-7 pr-6">
              <span className="text-[clamp(44px,5vw,72px)] leading-none font-semibold tracking-[-0.05em]">{item.value}</span>
              <span className="text-[14px] text-dim">{item.label}</span>
            </div>
          ))}
        </div>
        <figure className="mt-12 mb-0 flex flex-wrap items-end justify-between gap-8 rounded-[32px] border border-hair p-[clamp(32px,5vw,64px)]">
          <blockquote className="m-0 min-w-0 flex-[999_1_560px] text-[clamp(22px,2.4vw,32px)] leading-[1.35] font-medium tracking-[-0.02em]">
            <span className="serif-accent text-accent-ink">“</span>
            They developed a great platform for us, made sure it’s SEO optimised, tuned it for AI search engines, and set up our
            Google Business Profile.
            <span className="serif-accent text-accent-ink">”</span>
          </blockquote>
          <figcaption className="flex flex-[1_1_220px] flex-col gap-1 text-[15px]">
            <strong className="font-semibold">Kiril Veretin</strong>
            <span className="text-dim">CEO, Exploitless &amp; Vertin Recruitment</span>
          </figcaption>
        </figure>
      </section>

      <div className="pt-[clamp(80px,10vw,128px)]">
        <CtaBand
          title={
            <>
              Not sure where <Serif>you fit?</Serif>
            </>
          }
          body="Tell us the problem. We’ll tell you honestly what we’d build, and what we wouldn’t. We reply within two working days."
        />
      </div>
    </>
  );
}
