import { siteConfig } from "@/lib/data/site";

/*
 * Email templates for Levantate Labs.
 * Table layout and inline styles so they render in Gmail, Outlook and Apple Mail.
 * White card on a light grey page, black type, ultramarine for links and accents.
 */

const INK = "#0A0A0A";
const BODY = "#2E2E2E";
const DIM = "#5C5C5C";
const HAIR = "#E6E6E3";
const PAGE = "#F4F4F2";
const ACCENT = "#1F2FD6";
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export type EmailContent = { subject: string; html: string; text: string };

export function siteUrl(path = "") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url).replace(/\/$/, "");
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || "there";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Plain text to HTML paragraphs: blank lines split paragraphs, URLs become links. */
function paragraphs(text: string, color = BODY) {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const html = escapeHtml(block)
        .replace(/(https?:\/\/[^\s<]+)/g, `<a href="$1" style="color:${ACCENT};text-decoration:underline;">$1</a>`)
        .replace(/\n/g, "<br />");
      return `<p style="margin:0 0 16px;font-family:${FONT};font-size:16px;line-height:1.65;color:${color};">${html}</p>`;
    })
    .join("");
}

function button(href: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;"><tr>
    <td style="background:${INK};border-radius:999px;">
      <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 26px;font-family:${FONT};font-size:15px;font-weight:600;color:#FFFFFF;text-decoration:none;border-radius:999px;">${escapeHtml(label)} &rarr;</a>
    </td>
  </tr></table>`;
}

function label(text: string) {
  return `<p style="margin:0 0 10px;font-family:${FONT};font-size:13px;font-weight:600;color:${DIM};">${escapeHtml(text)}</p>`;
}

function quote(text: string) {
  return `<div style="margin:0 0 8px;padding:16px 18px;background:${PAGE};border-radius:12px;font-family:${FONT};font-size:15px;line-height:1.6;color:${BODY};white-space:pre-wrap;">${escapeHtml(text)}</div>`;
}

function layout({ preview, body, footer }: { preview: string; body: string; footer: string }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(preview)}</title>
</head>
<body style="margin:0;padding:0;background:${PAGE};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAGE};padding:32px 12px;">
  <tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">
      <tr><td style="padding:0 8px 18px;">
        <a href="${siteUrl()}" style="text-decoration:none;color:${INK};">
          <span style="font-family:${FONT};font-size:17px;font-weight:700;letter-spacing:-0.02em;color:${INK};">LEVANTATE</span>
          <span style="font-family:${FONT};font-size:10px;font-weight:600;letter-spacing:0.38em;color:${INK};padding-left:6px;">LABS</span>
        </a>
      </td></tr>
      <tr><td style="background:#FFFFFF;border:1px solid ${HAIR};border-radius:20px;padding:36px 32px 28px;">
        ${body}
      </td></tr>
      <tr><td style="padding:20px 8px 0;font-family:${FONT};font-size:12.5px;line-height:1.6;color:${DIM};">
        ${footer}
        <br /><a href="${siteUrl()}" style="color:${DIM};">levantate.in</a> &middot; ${escapeHtml(siteConfig.copyright)}
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function heading(text: string, accent?: string) {
  return `<h1 style="margin:0 0 18px;font-family:${FONT};font-size:28px;line-height:1.15;font-weight:700;letter-spacing:-0.03em;color:${INK};">${escapeHtml(text)}${
    accent ? `<span style="color:${ACCENT};">${escapeHtml(accent)}</span>` : ""
  }</h1>`;
}

/* ------------------------------------------------------------------ */
/* Admin sign-in                                                        */
/* ------------------------------------------------------------------ */

export function magicLinkEmail(url: string): EmailContent {
  const subject = "Your Levantate Labs admin sign-in link";
  const html = layout({
    preview: "Sign in to the Levantate Labs admin. The link expires in 15 minutes.",
    body: `${heading("Sign in to the admin", ".")}
      ${paragraphs("Use the button below to sign in. The link works once and expires in 15 minutes.")}
      ${button(url, "Sign in")}
      <p style="margin:20px 0 0;font-family:${FONT};font-size:13px;line-height:1.6;color:${DIM};">If you didn't ask for this, you can ignore this email. Nobody can sign in without the link.</p>`,
    footer: "You're getting this because someone requested an admin sign-in link for this address.",
  });
  const text = `Sign in to the Levantate Labs admin

Open this link to sign in. It works once and expires in 15 minutes:
${url}

If you didn't ask for this, you can ignore this email.`;
  return { subject, html, text };
}

/* ------------------------------------------------------------------ */
/* New enquiry: alert to the team                                       */
/* ------------------------------------------------------------------ */

export type EnquiryInput = {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  needs: string[];
  message: string;
};

export function enquiryAlertEmail(input: EnquiryInput): EmailContent {
  const adminUrl = siteUrl(`/admin/contacts/${input.id}`);
  const needs = input.needs.length ? input.needs.join(", ") : "Not specified";
  const subject = `New enquiry: ${input.name}${input.company ? ` (${input.company})` : ""}`;
  const row = (k: string, v: string) => `<tr>
      <td style="padding:10px 0;border-bottom:1px solid ${HAIR};width:110px;font-family:${FONT};font-size:14px;color:${DIM};vertical-align:top;">${k}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${HAIR};font-family:${FONT};font-size:14.5px;color:${INK};">${v}</td>
    </tr>`;

  const html = layout({
    preview: `${input.name} wrote in about: ${needs}`,
    body: `${heading("New enquiry", ".")}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 24px;">
        ${row("Name", `<strong>${escapeHtml(input.name)}</strong>`)}
        ${row("Email", `<a href="mailto:${escapeHtml(input.email)}" style="color:${ACCENT};text-decoration:none;">${escapeHtml(input.email)}</a>`)}
        ${row("Company", escapeHtml(input.company || "Not given"))}
        ${row("Needs", escapeHtml(needs))}
      </table>
      ${label("Message")}
      ${quote(input.message)}
      <div style="height:16px;"></div>
      ${button(adminUrl, "Open in admin")}
      <p style="margin:16px 0 0;font-family:${FONT};font-size:13px;line-height:1.6;color:${DIM};">Reply from the admin to keep a record, or just hit reply here to email ${escapeHtml(firstName(input.name))} directly.</p>`,
    footer: "Sent from the contact form on levantate.in.",
  });

  const text = `New enquiry from ${input.name}

Email: ${input.email}
Company: ${input.company || "Not given"}
Needs: ${needs}

Message:
${input.message}

Open in admin: ${adminUrl}`;
  return { subject, html, text };
}

/* ------------------------------------------------------------------ */
/* Auto-reply to the person who filled in the form                      */
/* ------------------------------------------------------------------ */

export function enquiryAutoReplyEmail(input: {
  name: string;
  message: string;
  calendlyUrl?: string | null;
}): EmailContent {
  const first = firstName(input.name);
  const subject = `Thanks, ${first}. We got your note`;
  const message = input.message.length > 700 ? `${input.message.slice(0, 700).trim()}…` : input.message;
  const steps = [
    ["We read it properly", "Someone who'd actually work on your project reads your note. You'll hear from us within two working days."],
    ["A call with the builders", "If it looks like a fit, we set up a call with the people who would build it. No account managers."],
    ["A plan and an honest answer", "You get a scope and a plan, or a straight answer if we're not the right team."],
  ];
  const stepsHtml = steps
    .map(
      ([title, body], i) => `<tr>
        <td style="width:34px;padding:0 0 16px;vertical-align:top;font-family:${FONT};font-size:13px;font-weight:600;color:${ACCENT};">0${i + 1}</td>
        <td style="padding:0 0 16px;font-family:${FONT};">
          <div style="font-size:15.5px;font-weight:600;color:${INK};margin:0 0 4px;">${title}</div>
          <div style="font-size:14.5px;line-height:1.6;color:${BODY};">${body}</div>
        </td>
      </tr>`,
    )
    .join("");

  const html = layout({
    preview: `We got your note, ${first}. Expect a reply within two working days.`,
    body: `${heading(`Thanks, ${first}`, ".")}
      ${paragraphs("We've received your note. You'll get a reply from a real person on the team within two working days. If anything is urgent, just reply to this email and it comes straight to us.")}
      <div style="height:8px;"></div>
      ${label("What happens next")}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">${stepsHtml}</table>
      ${
        input.calendlyUrl
          ? `${label("Rather talk sooner?")}${paragraphs("Pick a time that suits you and we'll come prepared.")}${button(input.calendlyUrl, "Book a call")}<div style="height:20px;"></div>`
          : ""
      }
      ${label("What you sent us")}
      ${quote(message)}
      <div style="height:20px;"></div>
      ${paragraphs(
        `While you wait, have a look at what we build and run ourselves: Maestro and Cronpay.\n${siteUrl("/products")}`,
      )}
      <p style="margin:8px 0 0;font-family:${FONT};font-size:16px;line-height:1.65;color:${INK};">The Levantate Labs team</p>`,
    footer: "You're getting this because you sent us a message through levantate.in. Reply to this email to reach us directly.",
  });

  const text = `Thanks, ${first}.

We've received your note. You'll get a reply from a real person on the team within two working days. If anything is urgent, just reply to this email and it comes straight to us.

WHAT HAPPENS NEXT
${steps.map(([t, b], i) => `0${i + 1}  ${t}\n    ${b}`).join("\n")}
${input.calendlyUrl ? `\nRather talk sooner? Book a call: ${input.calendlyUrl}\n` : ""}
WHAT YOU SENT US
${message}

See what we build and run ourselves: ${siteUrl("/products")}

The Levantate Labs team
${siteUrl()}`;
  return { subject, html, text };
}

/* ------------------------------------------------------------------ */
/* Reply written in the admin                                           */
/* ------------------------------------------------------------------ */

export function enquiryReplyEmail(input: {
  subject: string;
  body: string;
  originalMessage: string;
  originalDate: Date;
}): EmailContent {
  const when = input.originalDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const original = input.originalMessage.length > 1200 ? `${input.originalMessage.slice(0, 1200).trim()}…` : input.originalMessage;

  const html = layout({
    preview: input.body.trim().split("\n")[0]?.slice(0, 120) || input.subject,
    body: `${paragraphs(input.body, INK)}
      <div style="height:12px;border-bottom:1px solid ${HAIR};margin:0 0 20px;"></div>
      ${label(`Your message on ${when}`)}
      ${quote(original)}`,
    footer: "Reply to this email to continue the conversation.",
  });

  const text = `${input.body.trim()}

---
Your message on ${when}:
${original}`;
  return { subject: input.subject, html, text };
}
