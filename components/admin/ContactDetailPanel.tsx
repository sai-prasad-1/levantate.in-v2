"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  createTaskFromContact,
  deleteContactMessage,
  updateContactNotes,
  updateContactStatus,
} from "@/app/admin/crm-actions";

type ContactDetail = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  needs: string[];
  message: string;
  status: "new" | "in_progress" | "done";
  adminNotes: string | null;
  createdAt: string;
  emailedAt: string | null;
};

const statusOptions = [
  { value: "new", label: "New" },
  { value: "in_progress", label: "In progress" },
  { value: "done", label: "Done" },
] as const;

export function ContactDetailPanel({ contact }: { contact: ContactDetail }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState(contact.status);
  const [notes, setNotes] = useState(contact.adminNotes ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function run(action: () => Promise<void>, success?: string) {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        await action();
        if (success) setMessage(success);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <article className="rounded-[20px] border border-[rgba(22,21,15,0.1)] bg-white p-7 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="m-0 text-[28px] font-semibold tracking-[-0.03em]">
              {contact.name}
            </h2>
            <a
              href={`mailto:${contact.email}`}
              className="mt-2 inline-block border-b border-[rgba(22,21,15,0.25)] pb-0.5 text-[15px] hover:border-ember"
            >
              {contact.email}
            </a>
            {contact.company ? (
              <p className="mt-2 mb-0 text-[14.5px] text-smoke">
                {contact.company}
              </p>
            ) : null}
          </div>
          <time
            dateTime={contact.createdAt}
            className="text-[13px] text-smoke"
          >
            {new Date(contact.createdAt).toLocaleString()}
          </time>
        </div>

        {contact.needs.length > 0 ? (
          <div className="mt-6">
            <div className="mb-2 text-[12.5px] text-smoke">Needs</div>
            <div className="flex flex-wrap gap-2">
              {contact.needs.map((need) => (
                <span
                  key={need}
                  className="rounded-full border border-[rgba(22,21,15,0.12)] bg-panel-warm px-3 py-1 text-[13px]"
                >
                  {need}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-7">
          <div className="mb-2 text-[12.5px] text-smoke">Message</div>
          <p className="m-0 whitespace-pre-wrap text-[15.5px] leading-[1.7]">
            {contact.message}
          </p>
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-3 border-t border-[rgba(22,21,15,0.08)] pt-6 text-[13.5px] sm:grid-cols-2">
          <div>
            <dt className="text-smoke">Email notification</dt>
            <dd className="m-0 mt-1">
              {contact.emailedAt
                ? `Sent ${new Date(contact.emailedAt).toLocaleString()}`
                : "Not sent / failed"}
            </dd>
          </div>
          <div>
            <dt className="text-smoke">Submission id</dt>
            <dd className="m-0 mt-1 font-mono text-[12px]">{contact.id}</dd>
          </div>
        </dl>
      </article>

      <aside className="flex h-fit flex-col gap-5 rounded-[20px] border border-[rgba(22,21,15,0.1)] bg-panel-warm p-6">
        <label className="flex flex-col gap-2">
          <span className="text-[13px] text-smoke">Status</span>
          <select
            value={status}
            onChange={(e) => {
              const next = e.target.value as ContactDetail["status"];
              setStatus(next);
              run(
                async () => {
                  await updateContactStatus(contact.id, next);
                },
                "Status updated",
              );
            }}
            disabled={pending}
            className="rounded-[10px] border border-[rgba(22,21,15,0.12)] bg-white px-3 py-2.5 text-[14px] outline-none focus:border-ink"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[13px] text-smoke">Admin notes</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            placeholder="Internal notes about this lead…"
            className="resize-y rounded-[10px] border border-[rgba(22,21,15,0.12)] bg-white px-3 py-2.5 text-[14px] leading-[1.55] outline-none focus:border-ink"
          />
        </label>

        <button
          type="button"
          disabled={pending}
          onClick={() =>
            run(async () => {
              await updateContactNotes(contact.id, notes);
            }, "Notes saved")
          }
          className="button-dark rounded-full px-5 py-2.5 text-[14px] font-medium disabled:opacity-60"
        >
          Save notes
        </button>

        <button
          type="button"
          disabled={pending}
          onClick={() =>
            run(async () => {
              const task = await createTaskFromContact(contact.id);
              router.push(`/admin/tasks?highlight=${task.id}`);
            })
          }
          className="button-outline-dark rounded-full px-5 py-2.5 text-[14px] font-medium hover:bg-ink disabled:opacity-60"
        >
          Create follow-up task
        </button>

        <button
          type="button"
          disabled={pending}
          onClick={() => {
            if (!window.confirm("Delete this contact submission?")) return;
            run(async () => {
              await deleteContactMessage(contact.id);
              router.push("/admin/contacts");
            });
          }}
          className="text-left text-[13.5px] text-ember underline-offset-2 hover:underline disabled:opacity-60"
        >
          Delete submission
        </button>

        {message ? (
          <p className="m-0 text-[13px] text-[rgba(22,21,15,0.65)]" role="status">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="m-0 text-[13px] text-ember" role="alert">
            {error}
          </p>
        ) : null}

        <Link
          href="/admin/contacts"
          className="border-b border-[rgba(22,21,15,0.25)] pb-0.5 self-start text-[13.5px] hover:border-ember"
        >
          ← Back to inbox
        </Link>
      </aside>
    </div>
  );
}
