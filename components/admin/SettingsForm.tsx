"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  saveSiteSettings,
  upsertCustomSetting,
} from "@/app/admin/crm-actions";

type SettingRow = {
  key: string;
  value: string;
  label: string;
  placeholder?: string;
  known: boolean;
};

export function SettingsForm({ settings }: { settings: SettingRow[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(settings.map((s) => [s.key, s.value])),
  );

  useEffect(() => {
    setValues(Object.fromEntries(settings.map((s) => [s.key, s.value])));
  }, [settings]);
  const [customKey, setCustomKey] = useState("");
  const [customLabel, setCustomLabel] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSaveKnown(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        const knownKeys = settings.filter((s) => s.known).map((s) => s.key);
        const payload = Object.fromEntries(
          knownKeys.map((key) => [key, values[key] ?? ""]),
        );
        // Also persist edited custom values
        for (const row of settings.filter((s) => !s.known)) {
          payload[row.key] = values[row.key] ?? "";
        }
        await saveSiteSettings(payload);
        setMessage("Settings saved");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not save");
      }
    });
  }

  function onAddCustom(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        await upsertCustomSetting(customKey, customValue, customLabel);
        setCustomKey("");
        setCustomLabel("");
        setCustomValue("");
        setMessage("Custom setting added");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not add setting");
      }
    });
  }

  return (
    <div className="flex flex-col gap-10">
      <form
        onSubmit={onSaveKnown}
        className="rounded-[20px] border border-[rgba(22,21,15,0.1)] bg-white p-7 sm:p-8"
      >
        <h2 className="m-0 text-[20px] font-semibold tracking-[-0.02em]">
          Site settings
        </h2>
        <p className="mt-2 mb-7 max-w-[520px] text-[14.5px] leading-[1.6] text-[rgba(22,21,15,0.6)]">
          Key–value values used across the public site. Start with the Calendly
          booking link for the contact page.
        </p>

        <div className="flex flex-col gap-5">
          {settings.map((row) => (
            <label key={row.key} className="flex flex-col gap-2">
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-[13px] font-medium">{row.label}</span>
                <span className="font-mono text-[11.5px] text-smoke">
                  {row.key}
                </span>
              </span>
              <input
                type="text"
                inputMode={row.key.includes("url") ? "url" : undefined}
                value={values[row.key] ?? ""}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [row.key]: e.target.value }))
                }
                placeholder={row.placeholder || undefined}
                className="rounded-[10px] border border-[rgba(22,21,15,0.12)] bg-bone px-3.5 py-2.5 text-[14.5px] outline-none focus:border-ink"
              />
            </label>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={pending}
            className="button-dark rounded-full px-5 py-2.5 text-[14px] font-medium disabled:opacity-60"
          >
            {pending ? "Saving…" : "Save settings"}
          </button>
          {message ? (
            <p className="m-0 text-[13.5px] text-[rgba(22,21,15,0.65)]" role="status">
              {message}
            </p>
          ) : null}
          {error ? (
            <p className="m-0 text-[13.5px] text-ember" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </form>

      <form
        onSubmit={onAddCustom}
        className="rounded-[20px] border border-[rgba(22,21,15,0.1)] bg-panel-warm p-7 sm:p-8"
      >
        <h2 className="m-0 text-[20px] font-semibold tracking-[-0.02em]">
          Add custom key
        </h2>
        <p className="mt-2 mb-6 max-w-[480px] text-[14.5px] leading-[1.6] text-[rgba(22,21,15,0.6)]">
          Store any extra site value as a key–value pair. Keys are normalized to
          lowercase snake_case.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-2">
            <span className="text-[13px] text-smoke">Key</span>
            <input
              value={customKey}
              onChange={(e) => setCustomKey(e.target.value)}
              required
              placeholder="booking_url"
              className="rounded-[10px] border border-[rgba(22,21,15,0.12)] bg-white px-3 py-2.5 font-mono text-[13px] outline-none focus:border-ink"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[13px] text-smoke">Label</span>
            <input
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              placeholder="Optional display label"
              className="rounded-[10px] border border-[rgba(22,21,15,0.12)] bg-white px-3 py-2.5 text-[14px] outline-none focus:border-ink"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[13px] text-smoke">Value</span>
            <input
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              required
              placeholder="https://…"
              className="rounded-[10px] border border-[rgba(22,21,15,0.12)] bg-white px-3 py-2.5 text-[14px] outline-none focus:border-ink"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="button-outline-dark mt-5 rounded-full px-5 py-2.5 text-[14px] font-medium disabled:opacity-60"
        >
          Add setting
        </button>
      </form>
    </div>
  );
}
