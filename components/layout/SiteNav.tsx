"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Mark } from "@/components/site/Mark";
import { ArrowIcon, GradDot } from "@/components/site/ui";
import { navLinks } from "@/lib/data/site";

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const close = () => setOpen(false);

  return (
    <header className="wrap sticky top-0 z-[100] pt-4 sm:pt-6">
      <nav
        aria-label="Main"
        className="flex items-center justify-between gap-4 rounded-full border border-hair bg-white/90 py-2 pr-2 pl-[22px] shadow-[0_10px_30px_rgba(10,10,10,0.05)] backdrop-blur-[14px]"
      >
        <Link
          href="/"
          onClick={close}
          aria-label="Levantate Labs home"
          className="flex items-center gap-3 text-night!"
        >
          <Mark className="h-7 w-[26px]" />
          <span className="flex flex-col leading-none">
            <span className="text-[16px] font-bold tracking-[-0.02em]">LEVANTATE</span>
            <span className="mt-1 text-[9px] font-semibold tracking-[0.42em]">LABS</span>
          </span>
        </Link>

        <div className="flex items-center gap-[30px] text-[14px] font-medium whitespace-nowrap max-[1080px]:hidden">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-2 text-night! ${active ? "font-semibold" : ""}`}
              >
                {active ? <GradDot size={6} /> : null}
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 max-[1080px]:ml-auto">
          <Link
            href="/contact"
            onClick={close}
            aria-label="Start a project"
            className="go inline-flex min-h-[46px] items-center gap-3 rounded-full bg-night py-[5px] pr-[5px] pl-5 text-[14px] font-medium whitespace-nowrap text-white! max-[520px]:p-[5px]"
          >
            <span className="max-[520px]:hidden">Start a project</span>
            <span className="arr bg-grad inline-flex h-9 w-9 items-center justify-center rounded-full">
              <ArrowIcon />
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="site-menu"
            className="hidden h-[46px] w-[46px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-hair bg-white p-0 max-[1080px]:inline-flex"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {open ? (
                <path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="#0A0A0A" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 6.5H15M3 11.5H15" stroke="#0A0A0A" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="site-menu"
          className="mt-2 flex flex-col rounded-[28px] border border-hair bg-white p-2 shadow-[0_20px_40px_rgba(10,10,10,0.08)] min-[1081px]:hidden"
        >
          {navLinks.map((link, i) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                aria-current={active ? "page" : undefined}
                className={`menulink flex min-h-[52px] items-center justify-between rounded-[20px] px-[18px] text-[17px] font-medium text-night! ${
                  active ? "bg-paper" : ""
                }`}
              >
                <span className="inline-flex items-center gap-2.5">
                  {active ? <GradDot size={6} /> : null}
                  {link.label}
                </span>
                <span className="font-mono text-[11px] text-dim">{String(i + 1).padStart(2, "0")}</span>
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={close}
            className="go mt-1.5 flex min-h-[56px] items-center justify-between rounded-full bg-night py-[5px] pr-[5px] pl-5 text-[16px] font-medium text-white!"
          >
            Start a project
            <span className="arr bg-grad inline-flex h-11 w-11 items-center justify-center rounded-full">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      ) : null}
    </header>
  );
}
