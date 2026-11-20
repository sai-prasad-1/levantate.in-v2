import Image from "next/image";
import Link from "next/link";
import { Eyebrow, OutlineLink, SectionTitle, Serif, Status } from "@/components/site/ui";

const stats = [
  { value: "25+", label: "Enterprises served" },
  { value: "12+", label: "Systems shipped" },
  { value: "5", label: "Products of our own" },
  { value: "2", label: "Slots open this quarter" },
];

const kicker = "text-[12px] font-semibold tracking-[0.14em] uppercase";

export function ClientWork() {
  return (
    <section id="work" className="wrap section-y">
      <Eyebrow index="05">Client work</Eyebrow>
      <div className="mt-[22px] flex flex-wrap items-end justify-between gap-6">
        <SectionTitle>
          Built with <Serif>our clients.</Serif>
        </SectionTitle>
        <OutlineLink href="/work" className="min-h-12">
          All client work
        </OutlineLink>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/work"
          className="lift flex min-w-0 flex-[2_1_560px] flex-col overflow-hidden rounded-[32px] border border-hair text-night!"
        >
          <div className="relative h-[clamp(240px,26vw,360px)] bg-night">
            <Image
              src="/images/vertin.jpg"
              alt="Vertin Recruitment website"
              fill
              sizes="(max-width: 1024px) 100vw, 820px"
              className="object-cover"
              style={{ objectPosition: "50% 20%" }}
            />
          </div>
          <div className="flex flex-col gap-2.5 px-8 pt-7 pb-8">
            <span className={`${kicker} text-dim`}>Vertin Recruitment · Website</span>
            <h3 className="m-0 text-[clamp(22px,2.2vw,28px)] font-semibold tracking-[-0.025em]">
              A site for a top-tier recruitment agency
            </h3>
            <p className="m-0 text-[16px] leading-relaxed text-body">
              Clear positioning, candidate and client journeys, and a presence that matches a premium hiring brand.
            </p>
          </div>
        </Link>

        <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
          <Link href="/work" className="lift flex flex-auto flex-col gap-2.5 rounded-[32px] bg-night p-8 text-white!">
            <span className={`${kicker} text-on-night-dim`}>AI interview platform · Product</span>
            <h3 className="m-0 text-[24px] font-semibold tracking-[-0.02em]">Hiring systems at enterprise scale</h3>
            <p className="m-0 text-[15px] leading-relaxed text-on-night">
              Assessment engine, scheduling, evaluation pipelines and admin tooling, now used across a large
              enterprise client base.
            </p>
          </Link>
          <Link href="/work" className="lift flex flex-auto flex-col gap-2.5 rounded-[32px] bg-paper p-8 text-night!">
            <span className={`${kicker} text-dim`}>Exploitless · Website &amp; SEO</span>
            <h3 className="m-0 text-[24px] font-semibold tracking-[-0.02em]">A home for a cybersecurity firm</h3>
            <p className="m-0 text-[15px] leading-relaxed text-body">
              Positioning, structure, SEO, AI search readiness and Google Business Profile setup.
            </p>
          </Link>
        </div>
      </div>

      {/* Crestline Creatives */}
      <Link
        href="/work"
        className="lift mt-4 flex flex-wrap overflow-hidden rounded-[32px] border border-hair text-night!"
      >
        <div className="relative min-h-[clamp(240px,26vw,380px)] min-w-0 flex-[999_1_560px] border-r border-hair bg-white max-[900px]:border-r-0 max-[900px]:border-b">
          <Image
            src="/images/crestline.jpg"
            alt="Crestline Creatives website: every video format standing side by side as a lit ridge"
            fill
            sizes="(max-width: 1024px) 100vw, 820px"
            className="object-cover"
            style={{ objectPosition: "50% 45%" }}
          />
        </div>
        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-3 p-[clamp(28px,3.4vw,40px)]">
          <Status kind="ring">In development</Status>
          <span className={`${kicker} text-dim`}>Crestline Creatives · Brand &amp; website</span>
          <h3 className="m-0 text-[clamp(22px,2.2vw,28px)] font-semibold tracking-[-0.025em]">
            A brand and website for a film-first creative studio
          </h3>
          <p className="m-0 text-[16px] leading-relaxed text-body">
            A full visual system and site for a studio that plans, shoots, edits and grows Instagram and YouTube
            channels. Every format stands side by side, and their tops form the ridge. The design is done; content
            goes in next.
          </p>
        </div>
      </Link>

      <figure className="mt-4 mb-0 flex flex-wrap items-end justify-between gap-8 rounded-[32px] border border-hair p-[clamp(32px,5vw,64px)]">
        <blockquote className="m-0 min-w-0 flex-[999_1_560px] text-[clamp(22px,2.4vw,32px)] leading-[1.35] font-medium tracking-[-0.02em]">
          <span className="serif-accent text-accent-ink">&ldquo;</span>
          They developed a great platform for us, made sure it&rsquo;s SEO optimised, tuned it for AI search engines,
          and set up our Google Business Profile.
          <span className="serif-accent text-accent-ink">&rdquo;</span>
        </blockquote>
        <figcaption className="flex flex-[1_1_220px] flex-col gap-1 text-[15px]">
          <strong className="font-semibold">Kiril Veretin</strong>
          <span className="text-dim">CEO, Exploitless &amp; Vertin Recruitment</span>
        </figcaption>
      </figure>

      <dl className="mt-14 mb-0 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] border-t border-hair">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse gap-1.5 pt-7 pr-6">
            <dt className="text-[14px] text-dim">{s.label}</dt>
            <dd className="m-0 text-[clamp(40px,4.4vw,60px)] leading-none font-semibold tracking-[-0.05em]">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
