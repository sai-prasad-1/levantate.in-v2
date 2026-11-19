import type { Metadata } from "next";
import { ArrowLink, Eyebrow, Serif } from "@/components/site/ui";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Page not found",
  description: "The page you’re looking for doesn’t exist or has moved.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70vh] flex-col justify-center py-32">
      <Eyebrow className="self-start">404</Eyebrow>
      <h1 className="mt-6 mb-0 text-[clamp(40px,6vw,80px)] leading-[0.95] font-semibold tracking-[-0.05em] uppercase">
        This page <Serif>isn&apos;t here.</Serif>
      </h1>
      <p className="mt-6 mb-0 max-w-[440px] text-[17px] leading-relaxed text-body">
        The link may be broken, or the page may have moved. Head home and start again.
      </p>
      <ArrowLink href="/" className="mt-10 self-start">
        Back home
      </ArrowLink>
    </section>
  );
}
