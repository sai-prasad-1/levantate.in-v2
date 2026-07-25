"use client";

import { FormEvent, useState } from "react";
import { contactNeeds } from "@/lib/data/contact";
import { siteConfig } from "@/lib/data/site";

export function ContactClient() {
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="page-x pt-[140px] pb-[100px] sm:pt-[170px] sm:pb-[120px] md:pt-[200px] md:pb-[150px]">
      <div className="rgrid mx-auto grid max-w-site grid-cols-[1fr_1.1fr] items-start gap-24">
        <div>
          <div
            data-reveal="1"
            className="mb-8 inline-flex items-center gap-3 font-mono text-[12px] tracking-[0.08em] text-smoke uppercase"
          >
            <span className="inline-block h-[6px] w-[6px] shrink-0 bg-ember" />
            {siteConfig.slotsNote}
          </div>
          <h1 className="m-0 text-[clamp(44px,5.6vw,84px)] font-semibold leading-[1.04] tracking-[-0.038em] max-[820px]:text-[clamp(40px,11.5vw,64px)]">
            <span className="mb-[-0.08em] block overflow-hidden pb-[0.08em]">
              <span data-line="1" className="block">
                Tell us what
              </span>
            </span>
            <span className="mb-[-0.08em] block overflow-hidden pb-[0.08em]">
              <span data-line="1" className="block">
                you&apos;re building<span className="text-ember">.</span>
              </span>
            </span>
          </h1>
          <p
            data-reveal="1"
            className="mt-10 mb-0 max-w-[400px] text-[17px] leading-[1.65] text-[rgba(22,21,15,0.6)]"
          >
            A few sentences is enough. We read everything ourselves and reply
            within two working days.
          </p>
          <div data-reveal="1" className="mt-14 flex flex-col gap-5">
            <div>
              <div className="mb-1.5 text-[12.5px] text-smoke">Email</div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="border-b border-[rgba(22,21,15,0.3)] pb-0.5 text-[17px] font-medium transition-colors hover:border-ember"
              >
                {siteConfig.email}
              </a>
            </div>
            <div>
              <div className="mb-1.5 text-[12.5px] text-smoke">Elsewhere</div>
              <div className="flex gap-5 text-[15px] font-medium">
                {siteConfig.social.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="border-b border-[rgba(22,21,15,0.3)] pb-0.5 transition-colors hover:border-ember"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          data-reveal="1"
          className="rounded-[24px] border border-[rgba(22,21,15,0.1)] bg-white p-12"
        >
          {sent ? (
            <div className="flex min-h-[400px] flex-col justify-center gap-4 text-center">
              <div className="text-[32px] font-semibold tracking-[-0.025em]">
                Thank you<span className="text-ember">.</span>
              </div>
              <p className="m-0 text-[15.5px] leading-[1.65] text-[rgba(22,21,15,0.6)]">
                We&apos;ve got your note and will reply within two working days.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-7">
              <div className="rgrid grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="c-name" className="text-[12.5px] text-muted">
                    Name
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="border-0 border-b border-[rgba(22,21,15,0.2)] bg-transparent px-0.5 py-2.5 text-[15.5px] text-ink focus:border-ember"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="c-email" className="text-[12.5px] text-muted">
                    Email
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="border-0 border-b border-[rgba(22,21,15,0.2)] bg-transparent px-0.5 py-2.5 text-[15.5px] text-ink focus:border-ember"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="c-company" className="text-[12.5px] text-muted">
                  Company
                </label>
                <input
                  id="c-company"
                  name="company"
                  type="text"
                  placeholder="Company or project name"
                  className="border-0 border-b border-[rgba(22,21,15,0.2)] bg-transparent px-0.5 py-2.5 text-[15.5px] text-ink focus:border-ember"
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="text-[12.5px] text-muted">What do you need?</div>
                <div className="flex flex-wrap gap-2">
                  {contactNeeds.map((label) => {
                    const on = Boolean(selected[label]);
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() =>
                          setSelected((s) => ({ ...s, [label]: !s[label] }))
                        }
                        className={`cursor-pointer rounded-full px-[18px] py-[9px] text-[13.5px] font-medium whitespace-nowrap transition-all duration-200 ${
                          on
                            ? "border border-ink bg-ink text-bone"
                            : "border border-[rgba(22,21,15,0.2)] bg-transparent text-[rgba(22,21,15,0.7)]"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="c-msg" className="text-[12.5px] text-muted">
                  The project
                </label>
                <textarea
                  id="c-msg"
                  name="message"
                  rows={4}
                  required
                  placeholder="A few sentences about what you're building, where it stands, and when you'd like to start."
                  className="resize-y border-0 border-b border-[rgba(22,21,15,0.2)] bg-transparent px-0.5 py-2.5 text-[15.5px] leading-[1.6] text-ink focus:border-ember"
                />
              </div>

              <button
                type="submit"
                data-magnetic="1"
                className="button-dark inline-flex cursor-pointer items-center justify-center gap-3 self-start rounded-full border-0 px-[34px] py-[17px] text-[15.5px] font-medium"
              >
                Send the note{" "}
                <span
                  data-btn-arrow="1"
                  className="inline-block text-base leading-none transition-transform duration-[240ms] ease-out"
                >
                  →
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
