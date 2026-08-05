"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export function AdminLoginForm({ sent }: { sent?: boolean }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(Boolean(sent));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const normalized = email.trim().toLowerCase();

    try {
      // Always show the same success state — never reveal whether the email
      // is authorized or whether a message was actually sent.
      await signIn("email", {
        email: normalized,
        redirect: false,
        callbackUrl: "/admin",
      });
    } catch {
      // Ignore — success UI is intentional for anti-enumeration.
    } finally {
      setDone(true);
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-[20px] border border-[rgba(22,21,15,0.1)] bg-white p-8 sm:p-10">
        <h1 className="m-0 text-[28px] font-semibold tracking-[-0.03em]">
          Check your inbox
        </h1>
        <p className="mt-4 mb-0 text-[15px] leading-[1.65] text-[rgba(22,21,15,0.6)]">
          If that address can access admin, a one-time link is on its way. It
          expires in 15 minutes.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[20px] border border-[rgba(22,21,15,0.1)] bg-white p-8 sm:p-10"
    >
      <div className="mb-2 inline-flex items-center gap-2 text-[13px] text-smoke">
        <span className="inline-block h-[6px] w-[6px] bg-ember" />
        Levantate Labs
      </div>
      <h1 className="m-0 text-[32px] font-semibold tracking-[-0.03em]">
        Admin sign in
      </h1>
      <p className="mt-3 mb-8 text-[15px] leading-[1.65] text-[rgba(22,21,15,0.6)]">
        Type in your admin email. We&apos;ll send a one-time sign-in link — no
        password.
      </p>
      <label className="flex flex-col gap-2">
        <span className="text-[13px] text-smoke">Email</span>
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@levantate.in"
          className="rounded-[12px] border border-[rgba(22,21,15,0.12)] px-4 py-3 text-[15px] outline-none focus:border-ink"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="button-dark mt-6 w-full rounded-full py-3.5 text-[15px] font-medium disabled:opacity-60"
      >
        {loading ? "Sending…" : "Email me a link"}
      </button>
    </form>
  );
}
