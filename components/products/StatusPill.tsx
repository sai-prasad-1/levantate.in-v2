import type { ReactNode } from "react";

export type StatusDot = "live" | "solid" | "ring" | "dashed";

/** Mono, uppercase status chip: Live, Early access, In development, Stealth. */
export function StatusPill({
  children,
  dot = "solid",
  onNight = false,
  className = "",
}: {
  children: ReactNode;
  dot?: StatusDot;
  onNight?: boolean;
  className?: string;
}) {
  const dotEl =
    dot === "live" || dot === "solid" ? (
      <span aria-hidden="true" className={`bg-grad h-[7px] w-[7px] shrink-0 rounded-full ${dot === "live" ? "pulse" : ""}`} />
    ) : dot === "ring" ? (
      <span aria-hidden="true" className="box-border h-[7px] w-[7px] shrink-0 rounded-full border-[1.5px] border-accent-ink" />
    ) : (
      <span aria-hidden="true" className="box-border h-[7px] w-[7px] shrink-0 rounded-full border-[1.5px] border-dashed border-on-night-dim" />
    );

  return (
    <span
      className={`inline-flex items-center gap-2 self-start rounded-full border px-3 py-1.5 font-mono text-[12px] tracking-[0.06em] uppercase ${
        onNight ? "border-night-edge text-on-night" : "border-hair text-body"
      } ${className}`}
    >
      {dotEl}
      {children}
    </span>
  );
}
