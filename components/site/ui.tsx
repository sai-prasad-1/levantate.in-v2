import Link from "next/link";
import type { ReactNode } from "react";

/** Small diagonal arrow used inside the gradient circle on main actions. */
export function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M4 10L10 4M10 4H5M10 4V9"
        style={{ stroke: "var(--on-accent)" }}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.5 6.2L5 8.5L9.5 3.5"
        style={{ stroke: "var(--on-accent)" }}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A gradient dot: opens eyebrows, marks live status. */
export function GradDot({ size = 8, pulse = false, className = "" }: { size?: number; pulse?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`bg-grad inline-block shrink-0 rounded-full ${pulse ? "pulse" : ""} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** The one serif italic phrase a headline gets. Teal-equivalent: accent ink on white, glow on ink. */
export function Serif({ children, onNight = false }: { children: ReactNode; onNight?: boolean }) {
  return (
    <span className={`serif-accent ${onNight ? "text-accent-glow" : "text-accent-ink"}`}>{children}</span>
  );
}

/**
 * Section label: an optional section number, a short rule, then the label in
 * plain sentence case. Editorial, not a badge.
 */
export function Eyebrow({
  children,
  index,
  onNight = false,
  className = "",
}: {
  children: ReactNode;
  index?: string;
  onNight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-3 text-[14px] leading-none font-medium tracking-[-0.005em] ${
        onNight ? "text-on-night" : "text-body"
      } ${className}`}
    >
      {index ? (
        <span className={`font-mono text-[12px] tabular-nums ${onNight ? "text-on-night-dim" : "text-dim"}`}>{index}</span>
      ) : null}
      <span aria-hidden="true" className="block h-px w-7 bg-current opacity-40" />
      <span>{children}</span>
    </div>
  );
}

/** Status line for products and projects: a small marker and plain text. */
export type StatusKind = "live" | "solid" | "ring" | "dashed";

export function StatusMark({ kind = "solid" }: { kind?: StatusKind }) {
  if (kind === "ring") {
    return <span aria-hidden="true" className="box-border h-[7px] w-[7px] shrink-0 rounded-full border-[1.5px] border-current opacity-70" />;
  }
  if (kind === "dashed") {
    return (
      <span aria-hidden="true" className="box-border h-[7px] w-[7px] shrink-0 rounded-full border-[1.5px] border-dashed border-current opacity-60" />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`h-[7px] w-[7px] shrink-0 rounded-full ${kind === "live" ? "pulse" : ""}`}
      style={{ background: "var(--g1)" }}
    />
  );
}

export function Status({
  children,
  kind = "solid",
  onNight = false,
  className = "",
}: {
  children: ReactNode;
  kind?: StatusKind;
  onNight?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 self-start text-[13px] leading-none font-medium tracking-[-0.005em] ${
        onNight ? "text-on-night" : "text-body"
      } ${className}`}
    >
      <StatusMark kind={kind} />
      {children}
    </span>
  );
}

/** Caps section heading with one serif phrase. */
export function SectionTitle({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      className={`m-0 text-[clamp(32px,4.6vw,60px)] leading-none font-semibold tracking-[-0.045em] uppercase ${className}`}
    >
      {children}
    </Tag>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  onNight?: boolean;
  className?: string;
  external?: boolean;
};

/** Main action: ink pill (white on ink sections) with the gradient arrow circle. */
export function ArrowLink({ href, children, onNight = false, className = "", external = false }: ButtonProps) {
  const cls = `go inline-flex min-h-[52px] items-center gap-3.5 rounded-full py-1.5 pr-1.5 pl-6 text-[15px] font-medium no-underline ${
    onNight ? "bg-white text-night!" : "bg-night text-white!"
  } ${className}`;
  const inner = (
    <>
      {children}
      <span className="arr bg-grad inline-flex h-10 w-10 items-center justify-center rounded-full">
        <ArrowIcon />
      </span>
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Second action: outline pill. */
export function OutlineLink({ href, children, onNight = false, className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[52px] items-center rounded-full border px-6 text-[15px] font-medium no-underline ${
        onNight
          ? "out border-white text-white! hover:bg-white hover:text-night!"
          : "out border-night text-night! hover:bg-night hover:text-white!"
      } ${className}`}
    >
      {children}
    </Link>
  );
}

/** Closing call to action used at the end of every page. */
export function CtaBand({
  title = (
    <>
      Have something <Serif>to build?</Serif>
    </>
  ),
  body = "Tell us the problem. We reply within two working days, and we'll tell you honestly what we'd build, and what we wouldn't.",
}: {
  title?: ReactNode;
  body?: string;
}) {
  return (
    <section className="wrap pb-[clamp(96px,11vw,140px)]">
      <div className="flex flex-wrap items-end justify-between gap-8 rounded-[32px] bg-paper p-[clamp(28px,5vw,64px)]">
        <div className="max-w-[640px]">
          <Eyebrow>Start a project</Eyebrow>
          <h2 className="mt-5 mb-0 text-[clamp(34px,4.8vw,64px)] leading-[0.96] font-semibold tracking-[-0.05em] uppercase">
            {title}
          </h2>
          <p className="mt-5 mb-0 max-w-[480px] text-[17px] leading-relaxed text-body">{body}</p>
        </div>
        <ArrowLink href="/contact">Start a project</ArrowLink>
      </div>
    </section>
  );
}
