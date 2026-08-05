"use client";

import { FormEvent, useState } from "react";
import { contactNeeds } from "@/lib/data/contact";
import { siteConfig } from "@/lib/data/site";

export function ContactClient({ calendlyUrl }: { calendlyUrl?: string }) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const bookingUrl = calendlyUrl?.trim() || "";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") || ""),
          email: String(formData.get("email") || ""),
          company: String(formData.get("company") || "") || null,
          needs: contactNeeds.filter((label) => selected[label]),
          message: String(formData.get("message") || ""),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not send your note");
      }

      setSent(true);
      form.reset();
      setSelected({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your note");
    } finally {
      setSubmitting(false);
    }
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
            {bookingUrl ? (
              <div>
                <div className="mb-1.5 text-[12.5px] text-smoke">Book a call</div>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-[rgba(22,21,15,0.3)] pb-0.5 text-[17px] font-medium transition-colors hover:border-ember"
                >
                  Schedule on Calendly
                </a>
              </div>
            ) : null}
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
              {bookingUrl ? (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex self-center border-b border-[rgba(22,21,15,0.3)] pb-0.5 text-[15px] font-medium hover:border-ember"
                >
                  Or book a call →
                </a>
              ) : null}
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-7">
              {bookingUrl ? (
                <div className="rounded-[14px] bg-panel-warm px-4 py-3.5 text-[13.5px] leading-[1.55] text-[rgba(22,21,15,0.7)]">
                  Prefer a call?{" "}
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-[rgba(22,21,15,0.3)] pb-0.5 font-medium text-ink hover:border-ember"
                  >
                    Book time on Calendly
                  </a>
                </div>
              ) : null}

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
                <div className="text-[12.5px] text-muted" id="c-needs-label">
                  What do you need?
                </div>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-labelledby="c-needs-label"
                >
                  {contactNeeds.map((label) => {
                    const on = Boolean(selected[label]);
                    return (
                      <button
                        key={label}
                        type="button"
                        aria-pressed={on}
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
                disabled={submitting}
                className="button-dark inline-flex cursor-pointer items-center justify-center gap-3 self-start rounded-full border-0 px-[34px] py-[17px] text-[15.5px] font-medium disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send the note"}{" "}
                <span
                  data-btn-arrow="1"
                  className="inline-block text-base leading-none transition-transform duration-[240ms] ease-out"
                >
                  →
                </span>
              </button>
              {error ? (
                <p className="m-0 text-[13.5px] text-ember" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
