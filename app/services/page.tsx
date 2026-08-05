import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { WorkPhases } from "@/components/ui/WorkPhases";
import { servicesPage } from "@/lib/data/services";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "AI & machine learning, web & product engineering, enterprise software, blockchain and AI for SaaS — built end to end by one Levantate Labs team.",
  path: "/services",
  keywords: [
    "software development services",
    "AI engineering",
    "web product engineering",
    "enterprise software",
    "blockchain development",
    "Levantate Labs",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <section className="page-x pt-[140px] pb-16 sm:pt-[170px] sm:pb-24 md:pt-[200px] md:pb-[100px]">
        <div className="mx-auto max-w-site">
          <div
            data-reveal="1"
            className="mb-7 font-mono text-[12px] tracking-[0.08em] text-smoke uppercase"
          >
            <span className="mr-2 inline-block h-[6px] w-[6px] bg-ember" />
            Services
          </div>
          <h1 className="m-0 max-w-[1050px] text-[clamp(48px,6.4vw,96px)] font-semibold leading-[1.04] tracking-[-0.038em] max-[820px]:text-[clamp(40px,11.5vw,64px)]">
            <span className="mb-[-0.08em] block overflow-hidden pb-[0.08em]">
              <span data-line="1" className="block">
                Everything between the idea
              </span>
            </span>
            <span className="mb-[-0.08em] block overflow-hidden pb-[0.08em]">
              <span data-line="1" className="block">
                and production<span className="text-ember">.</span>
              </span>
            </span>
          </h1>
          <p
            data-reveal="1"
            className="mt-12 mb-0 max-w-[520px] text-[18px] leading-[1.6] text-[rgba(22,21,15,0.6)]"
          >
            Five disciplines, one team. We don&apos;t hand your project between
            departments — the people who design the architecture are the people
            who ship it.
          </p>
        </div>
      </section>

      <section className="page-x pb-10 sm:pb-16">
        <div className="mx-auto flex max-w-site flex-col gap-20 sm:gap-28 md:gap-36">
          {servicesPage.map((s, index) => {
            const mediaLeft = index % 2 === 1;
            const panelBg = [
              "#EFEAE0",
              "#E9E0D2",
              "#E3E6DC",
              "#EDE6DC",
              "#EFEAE0",
            ][index];

            return (
              <article
                key={s.num}
                className="border-t border-line pt-12 sm:pt-16 md:pt-20"
              >
                <div
                  className={`grid grid-cols-1 items-center gap-10 lg:gap-16 ${
                    mediaLeft
                      ? "lg:grid-cols-[1.05fr_0.95fr]"
                      : "lg:grid-cols-[0.95fr_1.05fr]"
                  }`}
                >
                  <div
                    className={`flex flex-col ${
                      mediaLeft ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div
                      data-reveal="1"
                      className="mb-5 flex items-center gap-3 font-mono text-[12px] tracking-[0.08em] text-smoke uppercase"
                    >
                      <span>{s.num}</span>
                      <span className="h-px w-8 bg-line" />
                      <span>Capability</span>
                    </div>

                    <h2
                      data-reveal="1"
                      className="m-0 text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.028em]"
                    >
                      {s.title}
                    </h2>
                    <p
                      data-reveal="1"
                      className="mt-6 mb-0 max-w-[480px] text-base leading-[1.7] text-[rgba(22,21,15,0.6)]"
                    >
                      {s.body}
                    </p>

                    <div
                      data-reveal="1"
                      className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2"
                    >
                      {s.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-[14px] px-4 py-4"
                          style={{ background: panelBg }}
                        >
                          <span className="mt-1.5 h-[6px] w-[6px] shrink-0 bg-ember" />
                          <span className="text-[14.5px] leading-[1.5]">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    data-reveal="1"
                    data-media-frame="1"
                    className={`relative h-[320px] overflow-hidden rounded-[20px] sm:h-[400px] lg:h-[460px] ${
                      mediaLeft ? "lg:order-1" : "lg:order-2"
                    }`}
                    style={{ background: panelBg }}
                  >
                    <ImageSlot id={s.imgId} label={s.imgHint} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="page-x py-16 sm:py-24 md:py-32">
        <WorkPhases eyebrow="How we work" />
        <div className="mx-auto mt-12 max-w-site sm:mt-14">
          <Link
            data-reveal="1"
            href="/contact"
            className="button-dark inline-flex items-center gap-3 rounded-full px-8 py-4 text-[15px] font-medium"
          >
            Start a conversation{" "}
            <span
              data-btn-arrow="1"
              className="inline-block text-base leading-none transition-transform duration-[240ms] ease-out"
            >
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
