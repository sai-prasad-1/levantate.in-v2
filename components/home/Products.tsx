import Image from "next/image";
import Link from "next/link";
import { ArrowLink, Eyebrow, SectionTitle, Serif, Status } from "@/components/site/ui";

function Points({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px] text-on-night">
      {items.map((item, i) => (
        <li key={item} className="flex gap-3 border-t border-night-line pt-2.5">
          <span className="font-mono text-on-night-dim">{String(i + 1).padStart(2, "0")}</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

const imageBox = "relative min-h-[340px] min-w-0 flex-[999_1_560px] max-[820px]:min-h-[224px]";
const textBox = "flex min-w-0 flex-[1_1_360px] flex-col gap-[18px] p-[clamp(28px,3.4vw,44px)]";

export function Products() {
  return (
    <section id="products" className="bg-night text-white">
      <div className="wrap section-y">
        <Eyebrow index="02" onNight>Our products</Eyebrow>
        <div className="mt-[22px] flex flex-wrap items-end justify-between gap-6">
          <SectionTitle>
            We ship <Serif onNight>our own bets.</Serif>
          </SectionTitle>
          <p className="m-0 max-w-[460px] text-[17px] leading-relaxed text-on-night">
            The same discipline we sell, applied to products we own and run. Built by the same people you would work
            with.
          </p>
        </div>

        {/* Maestro */}
        <article className="mt-12 flex flex-wrap overflow-hidden rounded-[32px] border border-night-line bg-night-card">
          <div className={`${imageBox} bg-[#111111]`}>
            <Image
              src="/images/maestro.jpg"
              alt="Maestro landing page with a live mock test preview"
              fill
              sizes="(max-width: 1280px) 100vw, 800px"
              className="object-cover"
              style={{ objectPosition: "50% 20%" }}
            />
          </div>
          <div className={textBox}>
            <Status kind="live" onNight>
              Live
            </Status>
            <h3 className="m-0 text-[clamp(30px,3vw,40px)] font-semibold tracking-[-0.035em]">Maestro</h3>
            <p className="m-0 text-[17px] leading-relaxed text-on-night">
              Interview prep that works like the real round. Human-graded courses for service-company interviews, and
              timed mock tests in each company&rsquo;s real pattern.
            </p>
            <Points
              items={[
                "Short lessons, real assignments, graded by humans",
                "Company-pattern mock tests with a real coding round",
                "Exam-day conditions and a report that coaches you",
              ]}
            />
            <ArrowLink href="https://studywithmaestro.com/" external onNight className="mt-auto self-start">
              Visit Maestro
            </ArrowLink>
          </div>
        </article>

        {/* Cronpay */}
        <article className="mt-4 flex flex-wrap-reverse overflow-hidden rounded-[32px] border border-night-line bg-night-card">
          <div className={textBox}>
            <Status kind="live" onNight>
              Early access
            </Status>
            <h3 className="m-0 text-[clamp(30px,3vw,40px)] font-semibold tracking-[-0.035em]">Cronpay</h3>
            <p className="m-0 text-[17px] leading-relaxed text-on-night">
              Permissionless crypto checkout. Customers pay with the token they already hold, on the chain they
              already use. You settle in the token and chain you want.
            </p>
            <Points
              items={[
                "58 chains, one locked price for the customer",
                "1% per settled payment, no monthly fees",
                "Honest status, from detected to settled",
              ]}
            />
            <ArrowLink href="https://cronpay.xyz/" external onNight className="mt-auto self-start">
              Visit Cronpay
            </ArrowLink>
          </div>
          <div className={`${imageBox} bg-[#0B0C0C]`}>
            <Image
              src="/images/cronpay.jpg"
              alt="Cronpay landing page: get paid in any token, settle in the one you want"
              fill
              sizes="(max-width: 1280px) 100vw, 800px"
              className="object-cover"
              style={{ objectPosition: "50% 15%" }}
            />
          </div>
        </article>

        <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {/* Maestro Simulation Lab: lives inside Maestro, no public link */}
          <article className="flex flex-col overflow-hidden rounded-[32px] border border-night-line bg-night-card">
            <div className="relative h-[280px] bg-[#111111]">
              <Image
                src="/images/simulation-lab.jpg"
                alt="Maestro Simulation Lab running an LED matrix circuit in dark mode"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
                style={{ objectPosition: "45% 20%" }}
              />
            </div>
            <div className="flex flex-col gap-3.5 p-[clamp(26px,3vw,36px)]">
              <Status onNight>Inside Maestro</Status>
              <h3 className="m-0 text-[30px] font-semibold tracking-[-0.03em]">Maestro Simulation Lab</h3>
              <p className="m-0 text-[16px] leading-relaxed text-on-night">
                A circuit simulator in the browser. Build from 167 parts, from resistors to an Arduino Uno, and watch
                current flow live, with a scope and Bode plots.
              </p>
              <span className="mt-1.5 font-mono text-[12px] text-on-night-dim">Available to Maestro learners</span>
            </div>
          </article>

          {/* Elevox */}
          <article className="flex flex-col overflow-hidden rounded-[32px] border border-night-line bg-night-card">
            <div className="relative h-[280px] bg-[#111111]">
              <Image
                src="/images/elevox.jpg"
                alt="Elevox AI phone agent landing page"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
                style={{ objectPosition: "0% 25%" }}
              />
            </div>
            <div className="flex flex-col gap-3.5 p-[clamp(26px,3vw,36px)]">
              <Status kind="ring" onNight>
                In development
              </Status>
              <h3 className="m-0 text-[30px] font-semibold tracking-[-0.03em]">Elevox</h3>
              <p className="m-0 text-[16px] leading-relaxed text-on-night">
                An AI phone agent that answers every call in your customer&rsquo;s language, books appointments,
                qualifies leads and hands off to your team when it matters.
              </p>
              <Link
                href="/contact"
                className="mt-1.5 self-start border-b pb-0.5 text-[15px] font-medium text-white!"
                style={{ borderColor: "var(--g1)" }}
              >
                Ask for early access
              </Link>
            </div>
          </article>

          {/* Stealth */}
          <article className="flex flex-col overflow-hidden rounded-[32px] border border-night-line bg-night-card">
            <div
              aria-hidden="true"
              className="relative flex h-[280px] items-center justify-center bg-[#111111]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            >
              <div
                className="absolute h-[220px] w-[220px] rounded-full"
                style={{ background: "radial-gradient(closest-side, var(--glow-soft), rgba(17,17,17,0))" }}
              />
              <span className="relative font-mono text-[13px] tracking-[0.3em] text-on-night-dim">█████ ███</span>
            </div>
            <div className="flex flex-col gap-3.5 p-[clamp(26px,3vw,36px)]">
              <Status kind="dashed" onNight>
                Stealth
              </Status>
              <h3 className="m-0 text-[30px] font-semibold tracking-[-0.03em]">Name withheld</h3>
              <p className="m-0 text-[16px] leading-relaxed text-on-night">
                Systems intelligence. Something we&rsquo;re not ready to show yet. Ask us about it on a call.
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
      </div>
    </section>
  );
}
