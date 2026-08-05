import { homePhases } from "@/lib/data/home";

type WorkPhasesProps = {
  eyebrow?: string;
  supporting?: string;
};

export function WorkPhases({
  eyebrow = "03 — How we work",
  supporting = "No handoffs between departments. The people who design the system are the people who ship it.",
}: WorkPhasesProps) {
  return (
    <div className="mx-auto max-w-site">
      <div className="mb-14 grid grid-cols-1 gap-8 lg:mb-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
        <div className="max-w-[760px]">
          <div
            data-reveal="1"
            className="mb-4 font-mono text-[12px] tracking-[0.08em] text-smoke uppercase"
          >
            <span className="mr-2 inline-block h-[6px] w-[6px] bg-ember" />
            {eyebrow}
          </div>
          <h2
            data-reveal="1"
            className="m-0 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.08] tracking-[-0.03em]"
          >
            Four phases. One team,
            <br className="hidden sm:block" /> the whole way through
            <span className="text-ember">.</span>
          </h2>
        </div>
        {supporting ? (
          <p
            data-reveal="1"
            className="m-0 max-w-[360px] text-[15px] leading-[1.7] text-[rgba(22,21,15,0.55)] lg:justify-self-end"
          >
            {supporting}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 border-t border-line md:grid-cols-2">
        {homePhases.map((p, index) => (
          <article
            key={p.num}
            data-reveal="1"
            className={`group grid grid-cols-[44px_1fr] gap-5 border-b border-line py-9 sm:grid-cols-[56px_1fr] sm:gap-7 sm:py-12 ${
              index % 2 === 1
                ? "md:border-l md:pl-10 lg:pl-14"
                : "md:pr-10 lg:pr-14"
            }`}
          >
            <div className="pt-1">
              <span className="font-mono text-[11px] tracking-[0.06em] text-smoke">
                /{p.num}
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="m-0 text-[clamp(26px,3vw,36px)] font-semibold tracking-[-0.028em]">
                  {p.title}
                </h3>
                <span className="text-[13px] text-smoke">{p.span}</span>
              </div>
              <p className="mt-4 mb-0 max-w-[440px] text-[15px] leading-[1.7] text-[rgba(22,21,15,0.58)]">
                {p.body}
              </p>
              <div className="mt-7 h-[3px] w-8 bg-ember transition-[width] duration-300 group-hover:w-14" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
