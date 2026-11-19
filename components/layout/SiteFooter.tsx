"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Serif } from "@/components/site/ui";
import { siteConfig } from "@/lib/data/site";

const studioLinks = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Client work", href: "/work" },
  { label: "Insights", href: "/insights" },
];

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const linkedIn = siteConfig.social.find((s) => s.label === "LinkedIn")?.href;

  return (
    <footer className="overflow-hidden bg-night text-white">
      <div className="wrap pt-[clamp(72px,9vw,112px)] pb-8">
        <div className="flex flex-wrap justify-between gap-10">
          <p className="m-0 text-[clamp(28px,3.4vw,44px)] leading-[1.05] font-semibold tracking-[-0.04em] uppercase">
            Get up. <Serif onNight>Ship something.</Serif>
          </p>
          <div className="flex flex-wrap gap-12 text-[15px]">
            <div className="flex flex-col gap-2.5">
              <span className="text-[12px] font-semibold tracking-[0.14em] text-on-night-dim uppercase">Studio</span>
              {studioLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-white! hover:text-accent-glow!">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-[12px] font-semibold tracking-[0.14em] text-on-night-dim uppercase">Contact</span>
              <a href={`mailto:${siteConfig.email}`} className="text-white! hover:text-accent-glow!">
                {siteConfig.email}
              </a>
              {linkedIn ? (
                <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="text-white! hover:text-accent-glow!">
                  LinkedIn
                </a>
              ) : null}
              <Link href="/contact" className="text-white! hover:text-accent-glow!">
                Start a project
              </Link>
            </div>
          </div>
        </div>

        <div className="relative mt-[clamp(56px,8vw,96px)]">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            className="block h-[22px] w-full overflow-visible"
            style={{ filter: "drop-shadow(0 0 5px var(--g1))" }}
          >
            <defs>
              <linearGradient id="footLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" style={{ stopColor: "var(--g0)" }} />
                <stop offset="0.5" style={{ stopColor: "var(--g1)" }} />
                <stop offset="1" style={{ stopColor: "var(--g2)" }} />
              </linearGradient>
            </defs>
            <polyline
              points="0,9 20,9 20,7 40,7 40,5 60,5 60,3 80,3 80,1 100,1"
              fill="none"
              stroke="url(#footLine)"
              strokeWidth="2"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <p
            aria-hidden="true"
            className="mt-2 mb-0 text-[clamp(56px,15.6vw,222px)] leading-[0.82] font-bold tracking-[-0.045em] whitespace-nowrap"
          >
            LEVANTATE
          </p>
        </div>

        <div className="mt-9 flex flex-wrap justify-between gap-3 border-t border-night-line pt-5 text-[13px] text-on-night-dim">
          <span>{siteConfig.copyright}</span>
          <span>Levántate: Spanish for “get up”.</span>
        </div>
      </div>
    </footer>
  );
}
