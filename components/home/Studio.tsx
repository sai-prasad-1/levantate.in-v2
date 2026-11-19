import { Eyebrow, SectionTitle, Serif } from "@/components/site/ui";
import { GradStops, MARK_OURS, MARK_YOURS } from "./svg";

const ours = ["Maestro", "Cronpay", "Simulation Lab", "Elevox", "Stealth"];
const yours = ["AI interview platform", "Exploitless", "Vertin", "Crestline"];

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="m-0 mt-auto flex list-none flex-wrap gap-2 p-0 pt-2">
      {items.map((item) => (
        <li key={item} className="rounded-full border border-hair px-3.5 py-[7px] text-[13px]">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Studio() {
  return (
    <section id="studio" className="wrap section-y">
      <Eyebrow>The studio</Eyebrow>
      <SectionTitle className="mt-[22px]">
        Two kinds of work, <Serif>one standard.</Serif>
      </SectionTitle>
      <p className="mt-5 mb-0 max-w-[640px] text-[18px] leading-relaxed text-body">
        We split our time between products we own and products we build with clients. Each keeps the other honest:
        running our own products teaches us what it takes to ship, and to stay shipped.
      </p>

      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        <div className="lift flex flex-col gap-4 rounded-[28px] border border-hair bg-white p-8">
          <span className="text-[12px] font-semibold tracking-[0.14em] text-dim uppercase">Ours</span>
          <h3 className="m-0 text-[26px] font-semibold tracking-[-0.02em]">Products we own</h3>
          <p className="m-0 text-[16px] leading-relaxed text-body">
            We find a problem worth solving, build the product and run it. Maestro is live, Cronpay is in early
            access, Elevox is in development, and one more is in stealth.
          </p>
          <Chips items={ours} />
        </div>

        <div className="flex flex-col items-center justify-center gap-[22px] rounded-[28px] bg-paper p-8">
          <svg
            width="132"
            height="140"
            viewBox="0 0 31 33"
            role="img"
            aria-label="The Levantate mark: two pieces that lock together"
          >
            <defs>
              <linearGradient id="studioMark" x1="0" y1="0" x2="1" y2="1">
                <GradStops />
              </linearGradient>
            </defs>
            <path d={MARK_OURS} fill="url(#studioMark)" />
            <path d={MARK_YOURS} fill="#0A0A0A" />
          </svg>
          <p className="m-0 max-w-[260px] text-center text-[14px] leading-relaxed text-dim">
            The mark is two pieces that lock together: what we build for ourselves, and what we build with you.
          </p>
        </div>

        <div className="lift flex flex-col gap-4 rounded-[28px] border border-hair bg-white p-8">
          <span className="text-[12px] font-semibold tracking-[0.14em] text-dim uppercase">Yours</span>
          <h3 className="m-0 text-[26px] font-semibold tracking-[-0.02em]">Products we build with you</h3>
          <p className="m-0 text-[16px] leading-relaxed text-body">
            You bring the problem. We bring one senior team for all of it: architecture, design, build, launch and
            what comes after.
          </p>
          <Chips items={yours} />
        </div>
      </div>
    </section>
  );
}
