"use client";

import { FormEvent, useState } from "react";
import { ArrowIcon, CheckIcon, Eyebrow, GradDot, Serif } from "@/components/site/ui";
import { contactNeeds } from "@/lib/data/contact";
import { siteConfig } from "@/lib/data/site";

const fieldClass =
  "h-[50px] rounded-[14px] border border-hair bg-paper px-4 text-[15px] font-normal text-night transition-colors placeholder:text-dim focus:border-night focus:bg-white focus:ring-2 focus:ring-[rgba(194,65,12,0.22)]";

function ContactRow({
  label,
  value,
  href,
  external = false,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="go flex min-h-[72px] items-center gap-4 border-b border-hair px-2 text-night! transition-colors hover:bg-paper"
    >
      <span className="w-[72px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-dim uppercase">{label}</span>
      <span className="min-w-0 flex-1 truncate text-[clamp(17px,1.6vw,20px)] font-medium tracking-[-0.01em]">{value}</span>
      <span className="arr inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hair">
        <ArrowIcon />
      </span>
    </a>
  );
}

export function ContactClient({ calendlyUrl }: { calendlyUrl?: string }) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const bookingUrl = calendlyUrl?.trim() || "";
  const linkedIn = siteConfig.social.find((s) => s.label === "LinkedIn")?.href;

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
    <section className="wrap pt-[clamp(56px,8vw,104px)] pb-[clamp(96px,11vw,140px)]">
      <div className="flex flex-wrap items-start gap-[clamp(40px,6vw,88px)]">
        {/* Left: the pitch and direct lines */}
        <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-6">
          <Eyebrow className="up d1 self-start">Start a project</Eyebrow>
          <h1 className="m-0 text-[clamp(44px,5vw,72px)] leading-[0.94] font-semibold tracking-[-0.05em] uppercase">
            <span className="-mt-[0.06em] -mb-[0.02em] block overflow-hidden pt-[0.06em] pb-[0.02em]">
              <span className="lineup d1 block">Tell us what</span>
            </span>
            <span className="-mt-[0.04em] -mb-[0.16em] block overflow-hidden pt-[0.04em] pr-[0.12em] pb-[0.16em]">
              <span className="lineup d2 block">
                <Serif>you&apos;re building.</Serif>
              </span>
            </span>
          </h1>
          <p className="up d4 m-0 max-w-[460px] text-[clamp(17px,1.5vw,20px)] leading-relaxed text-body">
            We reply within two working days. The person on the first call stays on the project until launch, and
            after.
          </p>
          <span className="up d5 inline-flex items-center gap-2.5 self-start rounded-full bg-paper px-4 py-2.5 text-[14px] font-medium">
            <GradDot pulse />
            {siteConfig.slotsNote}
          </span>
          <div className="up d6 mt-3 flex flex-col border-t border-hair">
            <ContactRow label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            {bookingUrl ? <ContactRow label="Call" value="Book a call" href={bookingUrl} external /> : null}
            {linkedIn ? <ContactRow label="Social" value="LinkedIn" href={linkedIn} external /> : null}
          </div>
        </div>

        {/* Right: the form */}
        <div className="up d4 relative min-w-0 flex-[1_1_480px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[-8%] right-0 h-[60%] w-[70%]"
            style={{ background: "radial-gradient(closest-side, var(--glow-soft), rgba(255,255,255,0))" }}
          />
          {sent ? (
            <div
              role="status"
              className="relative flex flex-col items-start gap-[18px] overflow-hidden rounded-[32px] bg-night p-[clamp(28px,4vw,48px)] text-white shadow-[0_40px_80px_rgba(10,10,10,0.18)]"
            >
              <div
                aria-hidden="true"
                className="absolute top-[-40%] right-[-20%] h-full w-[80%]"
                style={{ background: "radial-gradient(closest-side, var(--glow-soft), rgba(10,10,10,0))" }}
              />
              <span className="bg-grad relative inline-flex h-14 w-14 items-center justify-center rounded-full">
                <CheckIcon size={22} />
              </span>
              <h2 className="relative m-0 text-[clamp(30px,3.4vw,44px)] leading-none font-semibold tracking-[-0.04em] uppercase">
                Got it. <Serif onNight>Talk soon.</Serif>
              </h2>
              <p className="relative m-0 max-w-[420px] text-[16px] leading-relaxed text-on-night">
                Your note is with the team. You&apos;ll hear back within two working days, from someone who would
                build it.
              </p>
              <div className="relative flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="min-h-[48px] cursor-pointer rounded-full border border-night-edge bg-transparent px-[22px] text-[14px] text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-glow"
                >
                  Send another
                </button>
                {bookingUrl ? (
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center rounded-full bg-white px-[22px] text-[14px] font-medium text-night!"
                  >
                    Or book a call
                  </a>
                ) : null}
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              aria-label="Project enquiry"
              className="relative flex flex-col gap-[18px] rounded-[32px] border border-hair bg-white p-[clamp(24px,3.4vw,40px)] shadow-[0_40px_80px_rgba(10,10,10,0.08)]"
            >
              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
                <label className="flex flex-col gap-2 text-[13px] font-medium">
                  Name
                  <input
                    className={fieldClass}
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                    maxLength={120}
                  />
                </label>
                <label className="flex flex-col gap-2 text-[13px] font-medium">
                  Email
                  <input
                    className={fieldClass}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                    maxLength={200}
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-[13px] font-medium">
                <span>
                  Company <span className="font-normal text-dim">(optional)</span>
                </span>
                <input
                  className={fieldClass}
                  type="text"
                  name="company"
                  autoComplete="organization"
                  placeholder="Where you work"
                  maxLength={160}
                />
              </label>
              <fieldset className="m-0 border-0 p-0">
                <legend className="mb-2.5 p-0 text-[13px] font-medium">What do you need?</legend>
                <div className="flex flex-wrap gap-2">
                  {contactNeeds.map((label) => {
                    const on = !!selected[label];
                    return (
                      <button
                        key={label}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setSelected((prev) => ({ ...prev, [label]: !prev[label] }))}
                        className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border px-[18px] text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink ${
                          on ? "border-night bg-night text-white" : "border-hair-strong bg-white text-night hover:border-night"
                        }`}
                      >
                        {on ? <GradDot size={6} /> : null}
                        {label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <label className="flex flex-col gap-2 text-[13px] font-medium">
                Tell us about it
                <textarea
                  className={`${fieldClass} h-auto resize-y py-3.5 leading-normal`}
                  name="message"
                  rows={5}
                  placeholder="What are you building, and where is it today?"
                  required
                  maxLength={5000}
                />
              </label>
              {error ? (
                <p role="alert" className="m-0 rounded-[14px] bg-[rgba(194,65,12,0.08)] px-4 py-3 text-[14px] text-accent-ink">
                  {error}
                </p>
              ) : null}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <span className="max-w-[260px] text-[13px] text-dim">We only use your details to reply to you.</span>
                <button
                  type="submit"
                  disabled={submitting}
                  className="go inline-flex min-h-[52px] cursor-pointer items-center gap-3.5 rounded-full border-0 bg-night py-1.5 pr-1.5 pl-6 text-[15px] font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-ink disabled:cursor-wait disabled:opacity-70"
                >
                  {submitting ? "Sending…" : "Send it over"}
                  <span className="arr bg-grad inline-flex h-10 w-10 items-center justify-center rounded-full">
                    <ArrowIcon />
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
