import type { Metadata } from "next";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { aboutTeam, aboutValues } from "@/lib/data/about";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "A studio run by engineers, not account managers. Small team, senior hands only — from first architecture diagram to production.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="page-x pt-[140px] pb-16 sm:pt-[170px] sm:pb-20 md:pt-[200px] md:pb-[100px]">
        <div className="mx-auto max-w-site">
          <div data-reveal="1" className="mb-7 text-[13px] text-smoke">
            About
          </div>
          <h1 className="m-0 max-w-[1100px] text-[clamp(48px,6.4vw,96px)] font-semibold leading-[1.04] tracking-[-0.038em] max-[820px]:text-[clamp(40px,11.5vw,64px)]">
            <span className="mb-[-0.08em] block overflow-hidden pb-[0.08em]">
              <span data-line="1" className="block">
                A studio run by engineers,
              </span>
            </span>
            <span className="mb-[-0.08em] block overflow-hidden pb-[0.08em]">
              <span data-line="1" className="block">
                not account managers<span className="text-ember">.</span>
              </span>
            </span>
          </h1>
        </div>
      </section>

      <section className="page-x pb-[80px] sm:pb-[130px]">
        <div className="mx-auto max-w-site">
          <div
            data-reveal="1"
            data-media-frame="1"
            className="overflow-hidden rounded-[20px]"
          >
            <div
              data-parallax="0.07"
              className="relative h-[60vh] min-h-[400px] w-full will-change-transform"
            >
              <ImageSlot
                id="about-studio"
                label="The studio — team at work"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="page-x pb-[100px] sm:pb-[140px]">
        <div className="rgrid mx-auto grid max-w-site grid-cols-[220px_1fr] items-start gap-12">
          <div data-reveal="1" className="pt-[10px] text-[13px] text-smoke">
            The story
          </div>
          <div>
            <p
              data-words="1"
              className="m-0 max-w-[900px] text-[clamp(26px,3vw,40px)] font-medium leading-[1.32] tracking-[-0.025em]"
            >
              Levantate Labs started with a simple frustration: too much
              software is built to be sold, not to be run. We build the other
              kind — and we put our name on it, from the{" "}
              <span className="border-b-2 border-ember">
                first architecture diagram to production
              </span>
              .
            </p>
            <div className="rgrid mt-[72px] grid grid-cols-2 gap-14">
              <p
                data-reveal="1"
                className="m-0 text-base leading-[1.75] text-[rgba(22,21,15,0.6)]"
              >
                We&apos;re a small team on purpose. Every project gets senior
                engineers — the people you talk to in the first call are the
                people writing the code. That&apos;s how an interview platform
                we built ended up quietly serving more than a hundred enterprise
                clients.
              </p>
              <p
                data-reveal="1"
                className="m-0 text-base leading-[1.75] text-[rgba(22,21,15,0.6)]"
              >
                And because we ship our own products — Maestro, Elevox, and one
                we&apos;re not talking about yet — we feel the consequences of
                engineering decisions the same way our clients do. It keeps us
                honest.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-x pb-[100px] sm:pb-[140px]">
        <div className="rgrid mx-auto grid max-w-site grid-cols-[220px_1fr] items-start gap-12">
          <div data-reveal="1" className="pt-3 text-[13px] text-smoke">
            What we believe
          </div>
          <div className="rgrid grid grid-cols-3 gap-5">
            {aboutValues.map((v) => (
              <div
                key={v.num}
                data-reveal="1"
                className="flex min-h-[280px] flex-col gap-6 rounded-[20px] p-9"
                style={{ background: v.bg }}
              >
                <div className="text-[13px] font-medium text-smoke">
                  {v.num}
                </div>
                <div className="mt-auto">
                  <div className="text-2xl font-semibold tracking-[-0.02em]">
                    {v.title}
                  </div>
                  <p className="mt-3 mb-0 text-[14.5px] leading-[1.65] text-[rgba(22,21,15,0.6)]">
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-x pb-[100px] sm:pb-[150px]">
        <div className="rgrid mx-auto grid max-w-site grid-cols-[220px_1fr] items-start gap-12">
          <div data-reveal="1" className="pt-3 text-[13px] text-smoke">
            The team
          </div>
          <div>
            <h2
              data-reveal="1"
              className="mb-14 text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-[-0.03em]"
            >
              Small team.
              <br />
              Senior hands only.
            </h2>
            <div className="rgrid grid grid-cols-4 gap-6">
              {aboutTeam.map((t) => (
                <div key={t.imgId} data-reveal="1">
                  <div className="relative h-80 overflow-hidden rounded-2xl bg-panel-warm">
                    <ImageSlot id={t.imgId} label={t.imgHint} />
                  </div>
                  <div className="mt-4 text-[16.5px] font-semibold">
                    {t.name}
                  </div>
                  <div className="mt-[3px] text-[13.5px] text-muted">
                    {t.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
