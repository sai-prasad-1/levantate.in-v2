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
      <section className="page-x pt-[100px] sm:pt-[140px]">
        <div className="mx-auto max-w-site overflow-hidden rounded-[22px] bg-panel-warm">
          <div className="rgrid grid grid-cols-2 items-stretch gap-0">
            <div
              data-reveal="1"
              data-media-frame="1"
              className="relative min-h-[280px] overflow-hidden sm:min-h-[360px]"
            >
              <Image
                src="/elevox.png"
                alt="Elevox — Call AI landing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[rgba(22,21,15,0.2)] mix-blend-multiply"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_55%,rgba(239,234,224,0.55)_100%)] max-[820px]:bg-[linear-gradient(180deg,transparent_45%,rgba(239,234,224,0.7)_100%)]"
              />
            </div>
            <div className="flex flex-col justify-center px-8 py-12 sm:px-12 sm:py-16 md:px-14">
              <div
                data-reveal="1"
                className="mb-4 text-[13.5px] text-smoke"
              >
                In development
              </div>
              <h2
                data-reveal="1"
                className="m-0 text-[clamp(30px,3.6vw,48px)] font-semibold leading-[1.08] tracking-[-0.03em]"
              >
                Elevox
              </h2>
              <p
                data-reveal="1"
                className="mt-2 mb-0 text-[15px] font-medium text-[rgba(22,21,15,0.7)]"
              >
                Call AI for sales
              </p>
              <p
                data-reveal="1"
                className="mt-5 mb-0 max-w-[400px] text-[15px] leading-[1.7] text-[rgba(22,21,15,0.6)]"
              >
                Handles calls, qualifies leads and works alongside sales teams
                in real time — trained on how your team actually sells, not a
                generic script.
              </p>
              <p
                data-reveal="1"
                className="mt-4 mb-0 text-[13.5px] leading-[1.6] text-smoke"
              >
                Currently in build. Reach out for a walkthrough or early access.
              </p>
              <Link
                data-reveal="1"
                href="/contact"
                className="mt-7 inline-block w-fit border-b border-[rgba(22,21,15,0.3)] pb-[3px] text-[15px] font-medium transition-colors hover:border-ember"
              >
                Talk to us about Elevox
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STEALTH */}
      <section className="page-x py-[80px] sm:py-[120px]">
        <div className="mx-auto max-w-site overflow-hidden rounded-[22px] bg-panel-sage">
          <div className="rgrid grid grid-cols-2 items-stretch gap-0">
            <div className="relative flex min-h-[240px] flex-col justify-end overflow-hidden bg-ink px-8 py-10 sm:min-h-[320px] sm:px-12 sm:py-14">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-45"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 70% 30%, rgba(199,74,38,0.32), transparent 40%), linear-gradient(145deg, rgba(247,245,240,0.06), transparent 50%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.1]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(247,245,240,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(247,245,240,0.55) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage:
                    "radial-gradient(circle at 65% 35%, black, transparent 72%)",
                }}
              />
              <div className="relative">
                <div className="h-[3px] w-9 bg-ember" />
                <p className="mt-4 mb-0 max-w-[220px] text-[13.5px] leading-[1.55] text-[rgba(247,245,240,0.45)]">
                  Name withheld · systems intelligence
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-8 py-12 sm:px-12 sm:py-16 md:px-14">
              <div data-reveal="1" className="mb-4 text-[13.5px] text-smoke">
                Stealth
              </div>
              <h2
                data-reveal="1"
                className="m-0 text-[clamp(30px,3.6vw,48px)] font-semibold leading-[1.08] tracking-[-0.03em]"
              >
                Inside the stack
              </h2>
              <p
                data-reveal="1"
                className="mt-5 mb-0 max-w-[420px] text-[15px] leading-[1.7] text-[rgba(22,21,15,0.6)]"
              >
                Not another chatbot on top of your product. An AI system that
                learns how your infrastructure behaves — and steps in before a
                human has to.
              </p>
              <Link
                data-reveal="1"
                href="/contact"
                className="mt-7 inline-block w-fit border-b border-[rgba(22,21,15,0.3)] pb-[3px] text-[15px] font-medium transition-colors hover:border-ember"
              >
                Ask us in person
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
