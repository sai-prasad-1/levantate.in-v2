import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Page not found",
  description: "The page you’re looking for doesn’t exist or has moved.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="page-x flex min-h-[70vh] flex-col justify-center py-32">
      <div className="mx-auto max-w-site">
        <p className="mb-5 font-mono text-[12px] tracking-[0.08em] text-smoke uppercase">
          404
        </p>
        <h1 className="m-0 text-[clamp(40px,6vw,72px)] font-semibold leading-[1.05] tracking-[-0.035em]">
          This page isn&apos;t here
          <span className="text-ember">.</span>
        </h1>
        <p className="mt-6 max-w-[420px] text-[16px] leading-[1.65] text-[rgba(22,21,15,0.6)]">
          The link may be broken, or the page may have moved. Head home and
          start again.
        </p>
        <Link
          href="/"
          className="button-dark mt-10 inline-flex items-center gap-3 rounded-full px-7 py-4 text-[15px] font-medium"
        >
          Back home →
        </Link>
      </div>
    </section>
  );
}
