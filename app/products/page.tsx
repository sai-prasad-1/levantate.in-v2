import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Products",
  description:
    "Maestro is live. Elevox — our Call AI — is in development. One more stays stealth — the same discipline Levantate Labs sells, applied to our own products.",
  path: "/products",
  keywords: [
    "Maestro learning platform",
    "Elevox",
    "Call AI",
    "Levantate Labs products",
    "engineering products",
  ],
});

export default function ProductsPage() {
  return (
    <>
      <section className="page-x pt-[140px] pb-16 sm:pt-[170px] sm:pb-24 md:pt-[200px] md:pb-[120px]">
        <div className="mx-auto max-w-site">
          <div data-reveal="1" className="mb-7 text-[13px] text-smoke">
            Products
          </div>
          <h1 className="m-0 max-w-[1050px] text-[clamp(48px,6.4vw,96px)] font-semibold leading-[1.04] tracking-[-0.038em] max-[820px]:text-[clamp(40px,11.5vw,64px)]">
            <span className="mb-[-0.08em] block overflow-hidden pb-[0.08em]">
              <span data-line="1" className="block">
                We ship for
              </span>
            </span>
            <span className="mb-[-0.08em] block overflow-hidden pb-[0.08em]">
              <span data-line="1" className="block">
                ourselves, too<span className="text-ember">.</span>
              </span>
            </span>
          </h1>
          <p
            data-reveal="1"
            className="mt-12 mb-0 max-w-[520px] text-[18px] leading-[1.6] text-[rgba(22,21,15,0.6)]"
          >
            The same discipline we sell, applied to our own bets. Maestro is
            live, Elevox is in development, and one more stays stealth.
          </p>
        </div>
      </section>

      {/* MAESTRO */}
      <section
        data-section-scale="1"
        className="mx-4 rounded-[28px] bg-ink px-10 py-[130px] text-bone will-change-transform"
      >
        <div className="mx-auto max-w-site">
          <div className="rgrid mb-16 grid grid-cols-2 items-end gap-16">
            <div>
              <div
                data-reveal="1"
                className="mb-7 inline-block rounded-full bg-ember px-3 py-[5px] text-[12.5px] font-medium text-bone"
              >
                Live
              </div>
              <h2
                data-reveal="1"
                className="m-0 text-[clamp(40px,5vw,72px)] font-semibold leading-[1.02] tracking-[-0.035em]"
              >
                Maestro
              </h2>
              <p
                data-reveal="1"
                className="mt-6 mb-0 max-w-[460px] text-[17px] leading-[1.65] text-[rgba(247,245,240,0.65)]"
              >
                A learning platform that doesn&apos;t teach you to code — it
                teaches you to think like an engineer and build systems that
                scale.
              </p>
            </div>
            <div
              data-reveal="1"
              className="flex flex-col border-t border-[rgba(247,245,240,0.16)]"
            >
              {[
                "Systems thinking over syntax — learn the why behind the code",
                "Built around real projects that scale, not toy exercises",
                "From first principles to production-grade engineering",
              ].map((item, i) => (
                <div
                  key={item}
                  className="flex items-baseline gap-4 border-b border-[rgba(247,245,240,0.16)] px-0.5 py-4 text-[15.5px] text-[rgba(247,245,240,0.8)]"
                >
                  <span className="text-[13px] text-ember">
                    0{i + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div
            data-reveal="1"
            data-media-frame="1"
            className="overflow-hidden rounded-[18px]"
          >
            <div
              data-parallax="0.06"
              className="relative h-[64vh] min-h-[420px] w-full overflow-hidden bg-[#f4522a] will-change-transform"
            >
              <Image
                src="/maestro-landing.gif"
                alt="Maestro learning platform landing page and dashboard"
                fill
                priority
                unoptimized
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="scale-[1.06] object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ELEVOX */}
      <section className="page-x pt-[100px] sm:pt-[150px]">
        <div className="rgrid mx-auto grid max-w-site grid-cols-2 items-center gap-16">
          <div
            data-reveal="1"
            data-media-frame="1"
            className="overflow-hidden rounded-[18px] border border-[rgba(22,21,15,0.1)] bg-[#f7f6fb]"
          >
            <Image
              src="/elevox.png"
              alt="Elevox — Call AI landing"
              width={1569}
              height={943}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full"
            />
          </div>
          <div>
            <div
              data-reveal="1"
              className="mb-7 inline-block rounded-full border border-[rgba(22,21,15,0.25)] px-3 py-[5px] text-[12.5px] font-medium"
            >
              In development
            </div>
            <h2
              data-reveal="1"
              className="m-0 text-[clamp(34px,4vw,56px)] font-semibold leading-[1.06] tracking-[-0.03em]"
            >
              Elevox — Call AI for sales.
            </h2>
            <p
              data-reveal="1"
              className="mt-6 mb-0 max-w-[440px] text-[16.5px] leading-[1.7] text-[rgba(22,21,15,0.6)]"
            >
              An AI that handles calls, qualifies leads and works alongside
              sales teams in real time — trained on how your team actually sells,
              not a generic script.
            </p>
            <p
              data-reveal="1"
              className="mt-6 mb-0 text-sm leading-[1.7] text-smoke"
            >
              Currently in build. Reach out if you want a walkthrough or early
              access.
            </p>
            <Link
              data-reveal="1"
              href="/contact"
              className="mt-7 inline-block border-b border-[rgba(22,21,15,0.3)] pb-[3px] text-[15px] font-medium transition-colors hover:border-ember"
            >
              Talk to us about Elevox
            </Link>
          </div>
        </div>
      </section>

      {/* STEALTH */}
      <section className="page-x py-[100px] sm:py-[150px]">
        <div className="mx-auto max-w-site">
          <div
            data-reveal="1"
            className="flex flex-wrap items-end justify-between gap-12 rounded-[24px] bg-ink px-10 py-16 text-bone sm:px-16 sm:py-20"
          >
            <div>
              <div className="mb-6 inline-block rounded-full border border-[rgba(247,245,240,0.28)] px-3 py-[5px] text-[12.5px] font-medium text-[rgba(247,245,240,0.75)]">
                Stealth
              </div>
              <div className="text-[clamp(30px,3.6vw,48px)] font-semibold leading-[1.08] tracking-[-0.028em]">
                Inside the stack
              </div>
              <p className="mt-4 mb-0 max-w-[460px] text-[15.5px] leading-[1.65] text-[rgba(247,245,240,0.55)]">
                Not another chatbot on top of your product. An AI system that
                learns how your infrastructure behaves — and steps in before a
                human has to. Name and details stay sealed until they&apos;re
                ready.
              </p>
            </div>
            <Link
              href="/contact"
              data-magnetic="1"
              className="button-light inline-flex items-center gap-3 rounded-full px-[30px] py-4 text-[15px] font-medium"
            >
              Ask us in person{" "}
              <span
                data-btn-arrow="1"
                className="inline-block text-base leading-none transition-transform duration-[240ms] ease-out"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
