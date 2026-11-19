import Image from "next/image";

type BrowserFrameProps = {
  url: string;
  src: string;
  alt: string;
  /** Dark chrome for products that ship a dark UI (Cronpay). */
  dark?: boolean;
  /** object-position for the screenshot. */
  position?: string;
  className?: string;
  priority?: boolean;
};

/** A screenshot shown inside a minimal browser window. */
export function BrowserFrame({ url, src, alt, dark = false, position = "50% 0%", className = "", priority = false }: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-[24px] border ${
        dark
          ? "border-white/15 bg-[#0B0C0C] shadow-[0_40px_90px_rgba(0,0,0,0.5),0_0_80px_var(--glow-soft)]"
          : "border-hair bg-white shadow-[0_40px_90px_rgba(10,10,10,0.12)]"
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className={`flex items-center gap-1.5 border-b px-4 py-3 ${
          dark ? "border-[#232424] bg-[#141515]" : "border-[#EFEFEC] bg-[#FAFAF9]"
        }`}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-2 w-2 rounded-full ${dark ? "bg-[#3A3A3A]" : "bg-hair-strong"}`} />
        ))}
        <span
          className={`ml-2.5 h-[22px] min-w-0 shrink basis-[240px] overflow-hidden rounded-full px-3 font-mono text-[11px] leading-[22px] whitespace-nowrap ${
            dark ? "bg-[#1E1F1F] text-on-night-dim" : "bg-[#F1F1EF] text-dim"
          }`}
        >
          {url}
        </span>
      </div>
      <div className={`relative aspect-[16/9] ${dark ? "bg-[#0B0C0C]" : "bg-[#111111]"}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1280px) 100vw, 1216px"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}
