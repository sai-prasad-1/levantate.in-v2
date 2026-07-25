"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/lib/data/site";

export function SiteNav() {
  const pathname = usePathname();
  const isContact = pathname === "/contact";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-[100] border-b border-line-soft bg-[rgba(247,245,240,0.82)] text-ink backdrop-blur-[14px]">
      <div className="mx-auto flex max-w-site items-center justify-between px-5 py-4 sm:px-8 sm:py-[22px] md:px-10">
        <Link
          href="/"
          onClick={close}
          className="flex items-center gap-[11px] text-ink transition-colors hover:text-ink"
        >
          <Image
            src="/brand/logo-dark.svg"
            alt="Levantate Labs"
            width={22}
            height={22}
            className="block"
            priority
          />
          <span className="text-[15px] font-semibold tracking-[-0.015em] sm:text-[16px]">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="rhide flex gap-[34px] text-[14.5px] font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "font-medium text-ink"
                    : "text-[rgba(22,21,15,0.65)] transition-colors hover:text-ink"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            data-magnetic={isContact || open ? undefined : "1"}
            className={
              isContact
                ? "button-dark hidden items-center gap-[9px] rounded-full border border-ink px-[22px] py-[10px] text-[14.5px] font-medium hover:border-ember sm:inline-flex"
                : "button-outline-dark hidden items-center gap-[9px] rounded-full border border-[rgba(22,21,15,0.25)] px-[22px] py-[10px] text-[14.5px] font-medium sm:inline-flex"
            }
          >
            Contact
            <span className="text-[15px] leading-none">→</span>
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(22,21,15,0.2)] text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 block h-px w-full bg-ink transition-transform duration-200 ${
                  open ? "top-1.5 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute top-1.5 left-0 block h-px w-full bg-ink transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-ink transition-transform duration-200 ${
                  open ? "top-1.5 -rotate-45" : "top-2.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line-soft bg-bone px-5 py-8 md:hidden">
          <nav className="flex flex-col gap-5 text-[18px] font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className={
                  pathname === link.href
                    ? "text-ink"
                    : "text-[rgba(22,21,15,0.65)]"
                }
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={close}
              className="button-dark mt-2 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium"
            >
              Contact <span>→</span>
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
