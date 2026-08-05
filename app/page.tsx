import Image from "next/image";
import Link from "next/link";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { ImageSlot } from "@/components/ui/ImageSlot";
import {
  homeChips,
  homePosts,
  homeServices,
  homeStats,
  marqueeItems,
} from "@/lib/data/home";
import { siteConfig } from "@/lib/data/site";
import { selectedWork, testimonials } from "@/lib/data/work";
import { createPageMetadata } from "@/lib/seo";
import { WorkPhases } from "@/components/ui/WorkPhases";

export const metadata = createPageMetadata({
  title: "Software your company can stand on",
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* HERO — original light UI */}
      <section className="relative px-5 pt-[120px] sm:px-8 sm:pt-[150px] md:px-10 md:pt-[180px]">
        <div className="mx-auto max-w-site">
          <div
            data-hero-item="1"
            className="mb-7 inline-flex items-center gap-3 font-mono text-[12px] tracking-[0.08em] text-smoke uppercase sm:mb-9"
          >
            <span className="inline-block h-[6px] w-[6px] shrink-0 bg-ember" />
            {siteConfig.slotsNote}
          </div>

          <h1 className="hero-headline m-0 max-w-[1160px] text-[clamp(40px,8.5vw,96px)] font-semibold leading-[1.05] tracking-[-0.038em] sm:text-[clamp(48px,7vw,104px)] sm:leading-[1.02] lg:text-[clamp(56px,6.4vw,110px)]">
            <span className="hero-line mb-[-0.06em] block overflow-hidden pb-[0.08em]">
              <span data-chars="1" className="inline">
                Software your company
              </span>
            </span>
            <span className="hero-line mb-[-0.06em] block overflow-hidden pb-[0.08em]">
              <span data-chars="1" className="inline">
                can <em className="font-medium italic">stand</em> on
                <span className="text-ember">.</span>
              </span>
            </span>
          </h1>

          <div className="rgrid mt-10 grid grid-cols-1 items-end gap-8 sm:mt-12 md:mt-[52px] md:grid-cols-[1fr_auto] md:gap-12">
            <div>
              <p
                data-hero-item="1"
                className="m-0 max-w-[480px] text-[16px] leading-[1.6] font-normal text-[rgba(22,21,15,0.6)] sm:text-[18px]"
              >
                We design and build web platforms, AI systems and enterprise
                software — end to end, as one accountable team.
              </p>
              <div
                data-hero-item="1"
                className="mt-6 flex flex-wrap gap-2 sm:mt-7 sm:gap-[10px]"
              >
                {homeChips.map((chip) => (
                  <span
                    key={chip}
                    data-chip="1"
                    className="rounded-full border border-[rgba(22,21,15,0.18)] px-3.5 py-2 text-[12.5px] font-medium text-[rgba(22,21,15,0.7)] sm:px-4 sm:text-[13px]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div
              data-hero-item="1"
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <Link
                href="/contact"
                data-magnetic="1"
                className="button-dark inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[14.5px] font-medium whitespace-nowrap sm:px-[30px] sm:py-4 sm:text-[15px]"
              >
                Start a project{" "}
                <span
                  data-btn-arrow="1"
                  className="inline-block text-base leading-none transition-transform duration-[240ms] ease-out"
                >
                  →
                </span>
              </Link>
              <Link
                href="/services"
                className="border-b border-[rgba(22,21,15,0.3)] pb-[3px] text-[15px] font-medium whitespace-nowrap transition-colors hover:border-ember"
              >
                What we do
              </Link>
            </div>
          </div>

          <div
            data-hero-media="1"
            className="relative mt-12 overflow-hidden rounded-[16px] sm:mt-16 sm:rounded-[20px] md:mt-20"
          >
            <div
              data-parallax="0.08"
              className="relative h-[48vh] min-h-[280px] w-full will-change-transform sm:h-[56vh] sm:min-h-[360px] md:h-[62vh] md:min-h-[420px]"
            >
              <HeroMedia />
            </div>
          </div>

          <div
            data-hero-item="1"
            className="flex flex-wrap items-center justify-between gap-4 px-1 pt-5 text-[13px] text-[rgba(22,21,15,0.5)] sm:gap-8 sm:pt-[22px] sm:text-[13.5px]"
          >
            <span>Working with startups and the enterprise</span>
            <span className="inline-flex items-center gap-[10px]">
              Scroll{" "}
              <span
                data-scroll-cue="1"
                className="inline-block h-px w-9 origin-left bg-[rgba(22,21,15,0.4)]"
              />
            </span>
          </div>
        </div>
      </section>

      {/* ── PROOF STRIP ── */}
      <section className="page-x border-b border-line bg-white">
        <div className="rgrid mx-auto grid max-w-site grid-cols-2 gap-0 md:grid-cols-4">
          {homeStats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal="1"
              className={`flex flex-col gap-2 py-10 sm:py-14 ${
                i % 2 === 1 ? "md:border-l md:border-line md:pl-8" : "md:pl-0"
              } ${i > 1 ? "border-t border-line md:border-t-0" : ""} ${
                i === 2 ? "md:border-l md:border-line md:pl-8" : ""
              } ${i === 3 ? "md:border-l md:border-line md:pl-8" : ""} ${
                i % 2 === 1 ? "pl-6 sm:pl-8" : "pr-4"
              }`}
            >
              <div className="text-[clamp(36px,4vw,56px)] font-semibold tracking-[-0.04em]">
                <span data-count={String(stat.value)}>{stat.value}</span>
                <span className="text-ember">{stat.suffix}</span>
              </div>
              <div className="font-mono text-[11px] tracking-[0.06em] text-smoke uppercase sm:text-[12px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden border-b border-line py-6 sm:py-8">
        <div
          data-marquee="1"
          className="flex w-max gap-12 whitespace-nowrap will-change-transform sm:gap-[64px]"
        >
          {marqueeItems.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center gap-12 text-[28px] font-semibold tracking-[-0.03em] text-ink uppercase sm:gap-[64px] sm:text-[40px]"
            >
              {item}
              <span className="text-[18px] text-ember sm:text-[22px]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES: numbered stack, no sidebar labels ── */}
      <section className="page-x py-20 sm:py-28 md:py-32">
        <div className="mx-auto max-w-site">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
            <div>
              <div
                data-reveal="1"
                className="mb-4 font-mono text-[12px] tracking-[0.08em] text-smoke uppercase"
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-ember" />
                01 — Capabilities
              </div>
              <h2
                data-reveal="1"
                className="m-0 max-w-[640px] text-[clamp(32px,4.2vw,56px)] font-semibold leading-[1.08] tracking-[-0.03em]"
              >
                Everything between the idea and production
                <span className="text-ember">.</span>
              </h2>
            </div>
            <Link
              data-reveal="1"
              href="/services"
              className="border-b border-ember pb-1 text-[15px] font-medium whitespace-nowrap transition-colors hover:text-ember"
            >
              All services ↗
            </Link>
          </div>

          <div className="border-t border-line">
            {homeServices.map((s) => (
              <Link
                key={s.num}
                href="/services"
                data-reveal="1"
                className="group grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-line py-7 transition-colors sm:grid-cols-[72px_1fr_1.1fr] sm:gap-10 sm:py-9 md:gap-14"
              >
                <span className="font-mono text-[13px] text-smoke">
                  {s.num}
                </span>
                <span className="text-[clamp(22px,2.4vw,32px)] font-semibold tracking-[-0.022em] transition-colors group-hover:text-ember">
                  {s.title}
                </span>
                <span className="col-span-2 text-[14.5px] leading-[1.6] text-[rgba(22,21,15,0.55)] sm:col-span-1 sm:justify-self-end sm:text-right md:max-w-[360px]">
                  {s.sub}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ── */}
      <section
        data-section-scale="1"
        className="mx-3 overflow-hidden rounded-[24px] bg-ink text-bone will-change-transform sm:mx-4 sm:rounded-[28px]"
      >
        <div className="page-x py-16 sm:py-24 md:py-[120px]">
          <div className="mx-auto max-w-site">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
              <div>
                <div
                  data-reveal="1"
                  className="mb-4 font-mono text-[12px] tracking-[0.08em] text-[rgba(247,245,240,0.45)] uppercase"
                >
                  02 — Selected work
                </div>
                <h2
                  data-reveal="1"
                  className="m-0 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em]"
                >
                  Built for production,
                  <br />
                  not the pitch deck
                  <span className="text-ember">.</span>
                </h2>
              </div>
              <p
                data-reveal="1"
                className="m-0 max-w-[300px] text-[14.5px] leading-[1.65] text-[rgba(247,245,240,0.55)]"
              >
                Three recent builds — an AI hiring platform, a cybersecurity
                firm site, and a top-tier recruitment agency.
              </p>
            </div>

            <div className="flex flex-col gap-16 sm:gap-20">
              {selectedWork.map((work, index) => {
                const mediaFirst = index % 2 === 0;
                return (
                  <div
                    key={work.num}
                    data-reveal="1"
                    className={`grid grid-cols-1 items-center gap-8 lg:gap-14 ${
                      mediaFirst
                        ? "lg:grid-cols-[1.15fr_0.85fr]"
                        : "lg:grid-cols-[0.85fr_1.15fr]"
                    }`}
                  >
                    <div
                      data-media-frame="1"
                      className={`overflow-hidden rounded-[16px] sm:rounded-[20px] ${
                        mediaFirst ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div className="relative h-[42vh] min-h-[260px] w-full sm:h-[48vh] sm:min-h-[320px]">
                        {"imgSrc" in work && work.imgSrc ? (
                          <Image
                            src={work.imgSrc}
                            alt={work.imgHint}
                            fill
                            sizes="(max-width: 1024px) 100vw, 55vw"
                            className="object-cover object-top"
                          />
                        ) : (
                          <ImageSlot
                            id={work.imgId}
                            label={work.imgHint}
                            className="absolute inset-0"
                          />
                        )}
                      </div>
                    </div>

                    <div
                      className={`flex flex-col gap-5 ${
                        mediaFirst ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div className="flex items-center gap-3 font-mono text-[12px] tracking-[0.06em] text-[rgba(247,245,240,0.45)] uppercase">
                        <span>{work.num}</span>
                        <span className="h-px w-6 bg-[rgba(247,245,240,0.25)]" />
                        <span>{work.tag}</span>
                      </div>
                      <h3 className="m-0 text-[clamp(26px,3vw,36px)] font-semibold leading-[1.12] tracking-[-0.025em]">
                        {work.title}
                      </h3>
                      <p className="m-0 text-[15px] leading-[1.7] text-[rgba(247,245,240,0.62)]">
                        {work.body}
                      </p>
                      <p className="m-0 text-[14px] leading-[1.65] text-[rgba(247,245,240,0.45)]">
                        {work.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              data-reveal="1"
              className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-[rgba(247,245,240,0.14)] pt-8"
            >
              <p className="m-0 max-w-[480px] text-[15px] leading-[1.7] text-[rgba(247,245,240,0.55)]">
                Full builds — product, engineering, presence and launch. One
                accountable team the whole way through.
              </p>
              <Link
                href="/contact"
                className="border-b border-[rgba(247,245,240,0.4)] pb-[3px] text-[15px] font-medium text-bone transition-colors hover:border-ember"
              >
                Discuss a similar build
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="page-x py-20 sm:py-28 md:py-32">
        <WorkPhases />
      </section>

      {/* ── PRODUCTS: stacked bands ── */}
      <section className="page-x pb-20 sm:pb-28 md:pb-32">
        <div className="mx-auto max-w-site">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
            <div>
              <div
                data-reveal="1"
                className="mb-4 font-mono text-[12px] tracking-[0.08em] text-smoke uppercase"
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-ember" />
                04 — Products
              </div>
              <h2
                data-reveal="1"
                className="m-0 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em]"
              >
                We ship for ourselves, too
                <span className="text-ember">.</span>
              </h2>
            </div>
            <Link
              data-reveal="1"
              href="/products"
              className="border-b border-[rgba(22,21,15,0.3)] pb-[3px] text-[15px] font-medium transition-colors hover:border-ember"
            >
              All products
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="/products"
              data-reveal="1"
              className="group grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[20px] bg-ink p-6 transition-transform duration-300 ease-out hover:-translate-y-1 sm:gap-10 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10"
            >
              <div className="order-2 flex flex-col gap-5 lg:order-1">
                <span className="w-fit rounded-full bg-ember px-3 py-1 text-[12px] font-medium text-bone">
                  Live
                </span>
                <div>
                  <h3 className="m-0 text-[28px] font-semibold tracking-[-0.025em] text-bone sm:text-[34px]">
                    Maestro
                  </h3>
                  <p className="mt-3 mb-0 max-w-[380px] text-[14.5px] leading-[1.65] text-[rgba(247,245,240,0.62)]">
                    A learning platform that teaches you to think like an
                    engineer — and build systems that scale.
                  </p>
                </div>
                <span className="w-fit border-b border-[rgba(247,245,240,0.35)] pb-0.5 text-sm font-medium text-bone transition-colors group-hover:border-ember">
                  About Maestro →
                </span>
              </div>

              <div className="order-1 overflow-hidden rounded-[14px] border border-[rgba(247,245,240,0.12)] bg-[#f4522a] lg:order-2">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src="/maestro-landing.gif"
                    alt="Maestro learning platform interface"
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="scale-[1.08] object-cover object-top"
                  />
                </div>
              </div>
            </Link>

            <div className="rgrid grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {/* Elevox */}
              <Link
                href="/products"
                data-reveal="1"
                className="group flex flex-col overflow-hidden rounded-[18px] bg-panel-warm transition-transform duration-300 ease-out hover:-translate-y-0.5"
              >
                <div className="relative mx-4 mt-4 aspect-[16/9] overflow-hidden rounded-[12px] bg-[#ddd9d0] sm:mx-5 sm:mt-5">
                  <Image
                    src="/elevox.png"
                    alt="Elevox — Call AI landing"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[rgba(22,21,15,0.22)] mix-blend-multiply"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(239,234,224,0.05)_0%,rgba(239,234,224,0.45)_100%)]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 px-5 py-5 sm:px-6 sm:py-6">
                  <span className="text-[13px] text-smoke">In development</span>
                  <h3 className="m-0 text-[22px] font-semibold tracking-[-0.022em] sm:text-[24px]">
                    Elevox
                  </h3>
                  <p className="m-0 text-[14px] leading-[1.6] text-[rgba(22,21,15,0.6)]">
                    Call AI for sales — answers, qualifies, and works alongside
                    your team in real time.
                  </p>
                </div>
              </Link>

              {/* Stealth */}
              <div
                data-reveal="1"
                className="group flex flex-col overflow-hidden rounded-[18px] bg-panel-sage"
              >
                <div className="relative mx-4 mt-4 flex aspect-[16/9] items-end overflow-hidden rounded-[12px] bg-ink p-5 sm:mx-5 sm:mt-5 sm:p-6">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 78% 28%, rgba(199,74,38,0.35), transparent 42%), linear-gradient(135deg, rgba(247,245,240,0.06) 0%, transparent 55%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(247,245,240,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(247,245,240,0.5) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                      maskImage:
                        "radial-gradient(circle at 70% 40%, black, transparent 70%)",
                    }}
                  />
                  <div className="relative">
                    <div className="h-[3px] w-8 bg-ember" />
                    <p className="mt-3 mb-0 max-w-[200px] text-[13px] leading-[1.5] text-[rgba(247,245,240,0.45)]">
                      Name withheld · systems intelligence
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 px-5 py-5 sm:px-6 sm:py-6">
                  <span className="text-[13px] text-smoke">Stealth</span>
                  <h3 className="m-0 text-[22px] font-semibold tracking-[-0.022em] sm:text-[24px]">
                    Inside the stack
                  </h3>
                  <p className="m-0 text-[14px] leading-[1.6] text-[rgba(22,21,15,0.6)]">
                    An AI system that watches how things run — and acts before
                    someone has to.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="page-x py-20 sm:py-28 md:py-32">
        <div className="mx-auto max-w-site">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
            <div>
              <div
                data-reveal="1"
                className="mb-4 font-mono text-[12px] tracking-[0.08em] text-smoke uppercase"
              >
                <span className="mr-2 inline-block h-[6px] w-[6px] bg-ember" />
                From clients
              </div>
              <h2
                data-reveal="1"
                className="m-0 max-w-[520px] text-[clamp(32px,4vw,48px)] font-semibold leading-[1.08] tracking-[-0.03em]"
              >
                Words from people
                <br />
                we&apos;ve built with
                <span className="text-ember">.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                data-reveal="1"
                className={`flex flex-col rounded-[20px] p-6 sm:p-8 ${
                  i === 0 ? "bg-panel-warm" : "bg-panel-sand"
                }`}
              >
                <div className="mb-5 text-[13.5px] text-smoke">
                  {i === 0 ? "Exploitless" : "Hospitality"}
                </div>
                <blockquote className="m-0 text-[15.5px] leading-[1.65] tracking-[-0.01em] text-[rgba(22,21,15,0.78)] sm:text-[16px]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[rgba(22,21,15,0.1)] pt-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-[13px] font-semibold text-bone">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[14.5px] font-semibold tracking-[-0.01em]">
                      {t.name}
                    </div>
                    <div className="mt-0.5 text-[13px] text-[rgba(22,21,15,0.5)]">
                      {t.role}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS: list rows, not about-style cards ── */}
      <section className="page-x py-20 sm:py-28 md:py-32">
        <div className="mx-auto max-w-site">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
            <div>
              <div
                data-reveal="1"
                className="mb-4 font-mono text-[12px] tracking-[0.08em] text-smoke uppercase"
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-ember" />
                05 — Insights
              </div>
              <h2
                data-reveal="1"
                className="m-0 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em]"
              >
                Notes from the studio
                <span className="text-ember">.</span>
              </h2>
            </div>
            <Link
              data-reveal="1"
              href="/insights"
              className="border-b border-[rgba(22,21,15,0.3)] pb-[3px] text-[15px] font-medium transition-colors hover:border-ember"
            >
              All writing
            </Link>
          </div>

          <div className="border-t border-line">
            {homePosts.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                data-reveal="1"
                className="group grid grid-cols-1 items-center gap-4 border-b border-line py-7 sm:grid-cols-[140px_1fr_auto] sm:gap-8 sm:py-8"
              >
                <span className="font-mono text-[12px] text-smoke">
                  {post.tag} · {post.date}
                </span>
                <span className="text-[18px] font-medium tracking-[-0.015em] transition-colors group-hover:text-ember sm:text-[20px]">
                  {post.title}
                </span>
                <span className="text-ember opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-40">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
