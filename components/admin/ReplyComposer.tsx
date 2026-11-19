"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { sendContactReply } from "@/app/admin/crm-actions";
import { fillTemplate, replyTemplates } from "@/lib/data/reply-templates";

export type SentReply = {
  id: string;
  subject: string;
  body: string;
  sentAt: string;
  sentByEmail: string | null;
};

type Props = {
  contactId: string;
  name: string;
  email: string;
  needs: string[];
  bookingUrl: string | null;
  emailReady: boolean;
  replies: SentReply[];
};

export function ReplyComposer({ contactId, name, email, needs, bookingUrl, emailReady, replies }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const values = {
    firstName: name.trim().split(/\s+/)[0] || "there",
    topic: needs[0] ? needs[0].toLowerCase() : "your project",
    bookingUrl,
  };
  const initial = replyTemplates[0];
  const [templateId, setTemplateId] = useState(initial.id);
  const [subject, setSubject] = useState(fillTemplate(initial.subject, values));
  const [body, setBody] = useState(fillTemplate(initial.body, values));
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function pick(id: string) {
    const template = replyTemplates.find((t) => t.id === id);
    if (!template) return;
    const edited = body.trim() !== fillTemplate(replyTemplates.find((t) => t.id === templateId)?.body ?? "", values).trim();
    if (edited && !window.confirm("Replace your edits with this template?")) return;
    setTemplateId(id);
    setSubject(fillTemplate(template.subject, values));
    setBody(fillTemplate(template.body, values));
    setStatus(null);
    setError(null);
  }

  function send() {
    if (!window.confirm(`Send this reply to ${email}?`)) return;
    setStatus(null);
    setError(null);
    startTransition(async () => {
      try {
        await sendContactReply({ contactId, subject, body, template: templateId });
        setStatus(`Sent to ${email}`);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "The reply couldn't be sent");
      }
    });
  }

  return (
    <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[20px] border border-[rgba(22,21,15,0.1)] bg-white p-7 sm:p-8">
        <h2 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">Reply to {values.firstName}</h2>
        <p className="mt-2 mb-0 text-[14px] text-smoke">
          Sent to {email} from the no-reply address. The email asks them to write back to the studio inbox.
        </p>

        {!emailReady ? (
          <p className="mt-5 mb-0 rounded-[12px] bg-panel-warm px-4 py-3 text-[14px]" role="status">
            Email isn&apos;t connected yet, so replies can&apos;t be sent. Add <code>RESEND_API_KEY</code> in Vercel to switch this on.
          </p>
        ) : null}

        <div className="mt-6">
          <div className="mb-2 text-[12.5px] text-smoke">Start from a template</div>
          <div className="flex flex-wrap gap-2">
            {replyTemplates.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => pick(t.id)}
                aria-pressed={templateId === t.id}
                className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[13.5px] ${
                  templateId === t.id
                    ? "border-ink bg-ink text-bone"
                    : "border-[rgba(22,21,15,0.15)] bg-white text-ink hover:border-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <label className="mt-6 flex flex-col gap-2">
          <span className="text-[13px] text-smoke">Subject</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={200}
            className="rounded-[10px] border border-[rgba(22,21,15,0.12)] bg-white px-3 py-2.5 text-[15px] outline-none focus:border-ink"
          />
        </label>

        <label className="mt-4 flex flex-col gap-2">
          <span className="text-[13px] text-smoke">Message</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={14}
            className="resize-y rounded-[10px] border border-[rgba(22,21,15,0.12)] bg-white px-3 py-3 text-[15px] leading-[1.6] outline-none focus:border-ink"
          />
        </label>
        <p className="mt-2 mb-0 text-[12.5px] text-smoke">Their original message is quoted under your reply automatically.</p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={send}
            disabled={pending || !emailReady || !subject.trim() || !body.trim()}
            className="button-dark rounded-full px-6 py-3 text-[14.5px] font-medium disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Sending…" : "Send reply"}
          </button>
          {status ? (
            <span className="text-[14px] text-[rgba(22,21,15,0.7)]" role="status">
              {status}
            </span>
          ) : null}
          {error ? (
            <span className="text-[14px] text-ember" role="alert">
              {error}
            </span>
          ) : null}
        </div>
      </div>

      <aside className="h-fit rounded-[20px] border border-[rgba(22,21,15,0.1)] bg-white p-6">
        <h2 className="m-0 text-[17px] font-semibold tracking-[-0.01em]">Sent replies</h2>
        {replies.length === 0 ? (
          <p className="mt-3 mb-0 text-[14px] text-smoke">Nothing sent from the admin yet.</p>
        ) : (
          <ol className="m-0 mt-4 flex list-none flex-col gap-4 p-0">
            {replies
              .slice()
              .reverse()
              .map((reply) => (
                <li key={reply.id} className="border-t border-[rgba(22,21,15,0.08)] pt-4">
                  <div className="text-[14.5px] font-medium">{reply.subject}</div>
                  <div className="mt-1 text-[12.5px] text-smoke">
                    {new Date(reply.sentAt).toLocaleString()}
                    {reply.sentByEmail ? ` · ${reply.sentByEmail}` : ""}
                  </div>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-[13px] text-[rgba(22,21,15,0.7)]">Show message</summary>
                    <p className="mt-2 mb-0 whitespace-pre-wrap text-[13.5px] leading-[1.6]">{reply.body}</p>
                  </details>
                </li>
              ))}
          </ol>
        )}
      </aside>
    </section>
  );
}
