"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/lib/data/site";

type SiteFooterProps = {
  variant?: "cta" | "minimal";
};

export function SiteFooter({ variant }: SiteFooterProps) {
  const pathname = usePathname();
  const isContact = pathname === "/contact";
  const showCta = variant === "cta" || (!variant && !isContact);
  const isHome = pathname === "/";

  return (
    <footer
      data-section-scale="1"
      className="mx-0 mb-0 overflow-hidden rounded-none bg-ink text-bone will-change-transform sm:mx-4 sm:mb-4 sm:rounded-[28px]"
    >
      <div
        className={`mx-auto max-w-site px-5 sm:px-8 md:px-10 ${
          isHome
            ? "pt-16 sm:pt-24 md:pt-[150px]"
            : showCta
              ? "pt-14 sm:pt-20 md:pt-[120px]"
              : "pt-12 sm:pt-16 md:pt-[100px]"
        }`}
      >
        {isHome ? (
          <HomeCtaBlock />
        ) : showCta ? (
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-12">
            <h2
              data-reveal="1"
              className="m-0 text-[clamp(36px,8vw,80px)] font-semibold leading-[1.04] tracking-[-0.035em]"
            >
              Tell us what
              <br />
              you&apos;re building<span className="text-ember">.</span>
            </h2>
            <Link
              data-reveal="1"
              href="/contact"
              data-magnetic="1"
              className="button-light inline-flex items-center gap-3 rounded-full px-7 py-4 text-[15px] font-medium sm:px-9 sm:py-[18px] sm:text-[15.5px]"
            >
              Get in touch{" "}
              <span
                data-btn-arrow="1"
                className="inline-block text-base leading-none transition-transform duration-[240ms] ease-out"
              >
                →
              </span>
            </Link>
          </div>
        ) : null}

        <div
          className={`grid grid-cols-1 gap-10 border-t border-[rgba(247,245,240,0.14)] sm:grid-cols-2 sm:gap-12 lg:grid-cols-[2fr_1fr_1fr] ${
            isHome
              ? "mt-12 pt-8 sm:mt-16 sm:pt-10 md:mt-[130px]"
              : showCta
                ? "mt-12 pt-8 sm:mt-16 sm:pt-10 md:mt-[110px]"
                : "mt-0 pt-8"
          }`}
        >
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-[11px]">
              <Image
                src="/brand/logo-light.svg"
                alt=""
                width={22}
                height={22}
              />
              <span className="text-[15.5px] font-semibold tracking-[-0.015em]">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-4 mb-0 max-w-[320px] text-[13.5px] leading-[1.65] text-[rgba(247,245,240,0.45)] sm:mt-[18px]">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:contents">
            <div className="flex flex-col gap-3 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[rgba(247,245,240,0.65)] transition-colors hover:text-bone"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/contact"
                className="text-[rgba(247,245,240,0.65)] transition-colors hover:text-bone"
              >
                Contact
              </Link>
              {siteConfig.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[rgba(247,245,240,0.65)] transition-colors hover:text-bone"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-[2] mt-10 flex flex-col gap-2 pb-6 text-[12.5px] text-[rgba(247,245,240,0.35)] sm:mt-14 sm:flex-row sm:justify-between sm:gap-6 sm:pb-2">
          <span>{siteConfig.copyright}</span>
          <span>{siteConfig.markline}</span>
        </div>
      </div>

      <div className="overflow-hidden leading-[0]">
        <div
          data-wordmark="1"
          className="pointer-events-none select-none bg-[linear-gradient(180deg,rgba(247,245,240,0.16)_0%,rgba(247,245,240,0.05)_62%,rgba(247,245,240,0)_96%)] bg-clip-text text-center text-[clamp(72px,18vw,320px)] font-bold leading-[0.78] tracking-[-0.045em] text-transparent"
          style={{ transform: "translateY(8%)" }}
        >
          Levantate
        </div>
      </div>
    </footer>
  );
}

function HomeCtaBlock() {
  return (
    <div className="max-w-[960px] text-left">
      <div
        data-reveal="1"
        className="mb-5 font-mono text-[12px] tracking-[0.06em] text-[rgba(247,245,240,0.45)] uppercase sm:mb-7"
      >
        New projects — two slots open this quarter
      </div>
      <h2 className="m-0 text-[clamp(40px,9vw,100px)] font-semibold leading-[1.02] tracking-[-0.038em]">
        <span className="block overflow-hidden">
          <span data-line="1" className="block">
            Tell us what
          </span>
        </span>
        <span className="block overflow-hidden">
          <span data-line="1" className="block">
            you&apos;re building<span className="text-ember">.</span>
          </span>
        </span>
      </h2>
      <div
        data-reveal="1"
        className="mt-8 flex flex-col items-start gap-5 sm:mt-14 sm:flex-row sm:flex-wrap sm:items-center sm:gap-7"
      >
        <Link
          href="/contact"
          data-magnetic="1"
          className="button-light inline-flex items-center gap-3 rounded-full px-7 py-4 text-[15px] font-medium sm:px-9 sm:py-[18px] sm:text-[15.5px]"
        >
          Get in touch{" "}
          <span
            data-btn-arrow="1"
            className="inline-block text-base leading-none transition-transform duration-[240ms] ease-out"
          >
            →
          </span>
        </Link>
        <a
          href={`mailto:${siteConfig.email}`}
          className="border-b border-[rgba(247,245,240,0.3)] pb-[3px] text-[15px] text-[rgba(247,245,240,0.75)] transition-colors hover:border-ember hover:text-bone sm:text-[15.5px]"
        >
          {siteConfig.email}
        </a>
      </div>
      <p
        data-reveal="1"
        className="mt-8 mb-0 max-w-[420px] text-[14.5px] leading-[1.65] text-[rgba(247,245,240,0.5)] sm:mt-10 sm:text-[15px]"
      >
        We take on a small number of projects at a time, and we stay from the
        first diagram to production.
      </p>
    </div>
  );
}
