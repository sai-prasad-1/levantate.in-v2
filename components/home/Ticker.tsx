const items = ["Product strategy", "Design", "Web platforms", "AI systems", "Enterprise software", "Blockchain"];

export function Ticker() {
  return (
    <section
      aria-label="What we build"
      className="mt-[clamp(72px,9vw,120px)] overflow-hidden border-y border-hair py-[26px]"
    >
      <p className="sr-only">{items.join(", ")}</p>
      <div aria-hidden="true" className="tick flex w-max">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-[30px] pr-[30px] text-[clamp(22px,2.6vw,34px)] font-semibold tracking-[-0.035em] whitespace-nowrap uppercase"
          >
            {item}
            <span className="bg-grad inline-block h-2.5 w-2.5 rounded-full" />
          </span>
        ))}
      </div>
    </section>
  );
}
