import { siteConfig } from "@/lib/data/site";

/*
 * Email templates for Levantate Labs, built from the website's design system:
 * the logo lockup, uppercase headlines with one serif italic phrase, numbered
 * eyebrows, the ink pill with the gradient arrow, and the night band with the
 * ultramarine glow for the products.
 *
 * Table layout and inline styles so they hold up in Gmail, Outlook and Apple Mail.
 * Images live in /public/email and are loaded from the live site.
 */

const INK = "#0A0A0A";
const BODY = "#2E2E2E";
const DIM = "#5C5C5C";
const HAIR = "#E6E6E3";
const PAPER = "#F4F4F2";
const ACCENT = "#1F2FD6";
const G1 = "#3D55FF";
const GLOW = "#8C9BFF";
const NIGHT = "#0A0A0A";
const NIGHT_CARD = "#161616";
const NIGHT_LINE = "#262626";
const ON_NIGHT = "#D4D4D4";
const ON_NIGHT_DIM = "#9A9A9A";

const SANS = "Geist, 'Helvetica Neue', Helvetica, Arial, sans-serif";
const MONO = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";

export type EmailContent = { subject: string; html: string; text: string };

export function siteUrl(path = "") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url).replace(/\/$/, "");
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

const asset = (name: string) => siteUrl(`/email/${name}`);

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

/**
 * Invisible text that differs in every email. Gmail hides content it has seen in an
 * earlier email from the same sender (the quoted message, the footer) behind "•••";
 * a unique token inside those blocks keeps them visible.
 */
function uniqueMark() {
  return `<span style="display:none;font-size:0;line-height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${crypto.randomUUID()}</span>`;
}

/* ------------------------------------------------------------------ */
/* Building blocks                                                      */
/* ------------------------------------------------------------------ */

const contactLink = (color = ACCENT) =>
  `<a href="mailto:${siteConfig.email}" style="color:${color};text-decoration:underline;">${siteConfig.email}</a>`;

/** Plain text to HTML paragraphs: blank lines split paragraphs, URLs and emails become links. */
function paragraphs(text: string, color = BODY, size = 16) {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const html = escapeHtml(block)
        .replace(/(https?:\/\/[^\s<]+)/g, `<a href="$1" style="color:${ACCENT};text-decoration:underline;">$1</a>`)
        .replace(
          /(^|[\s(])([\w.+-]+@[\w-]+\.[\w.-]+\w)/g,
          `$1<a href="mailto:$2" style="color:${ACCENT};text-decoration:underline;">$2</a>`,
        )
        .replace(/\n/g, "<br />");
      return `<p style="margin:0 0 16px;font-family:${SANS};font-size:${size}px;line-height:1.65;color:${color};">${html}</p>`;
    })
    .join("");
}

/** Uppercase headline with one serif italic phrase, as on the site. */
function headline(plain: string, serif?: string, onNight = false) {
  const color = onNight ? "#FFFFFF" : INK;
  const accent = onNight ? GLOW : ACCENT;
  return `<h1 class="h1" style="margin:0 0 20px;font-family:${SANS};font-size:40px;line-height:1.02;font-weight:600;letter-spacing:-0.045em;text-transform:uppercase;color:${color};">${escapeHtml(plain)}${
    serif
      ? ` <span style="font-family:${SERIF};font-style:italic;font-weight:400;text-transform:none;letter-spacing:-0.015em;color:${accent};">${escapeHtml(serif)}</span>`
      : ""
  }</h1>`;
}

/** Section label: optional number, a short rule, then the label. */
function eyebrow(text: string, index?: string, onNight = false) {
  const color = onNight ? ON_NIGHT : BODY;
  const dim = onNight ? ON_NIGHT_DIM : DIM;
  const rule = onNight ? "#4A4A4A" : "#B9B9B5";
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 16px;"><tr>
    ${index ? `<td style="padding:0 12px 0 0;font-family:${MONO};font-size:12px;line-height:1;color:${dim};">${index}</td>` : ""}
    <td style="padding:0 12px 0 0;"><div style="width:28px;height:1px;line-height:1px;font-size:0;background:${rule};">&nbsp;</div></td>
    <td style="font-family:${SANS};font-size:14px;line-height:1;font-weight:500;letter-spacing:-0.005em;color:${color};">${escapeHtml(text)}</td>
  </tr></table>`;
}

/** Status line: the ultramarine dot and plain text. */
function status(text: string, onNight = false) {
  return `<table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td style="padding:0 8px 0 0;line-height:0;"><img src="${asset("dot.png")}" width="7" height="7" alt="" style="display:block;border:0;" /></td>
    <td style="font-family:${SANS};font-size:13px;line-height:1;font-weight:500;color:${onNight ? ON_NIGHT : BODY};">${escapeHtml(text)}</td>
  </tr></table>`;
}

/** Main action: ink pill (white on night) with the gradient arrow circle. */
function button(href: string, text: string, onNight = false) {
  const bg = onNight ? "#FFFFFF" : INK;
  const fg = onNight ? INK : "#FFFFFF";
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 0;"><tr>
    <td style="background:${bg};border-radius:999px;padding:6px 6px 6px 24px;">
      <a href="${escapeHtml(href)}" style="text-decoration:none;color:${fg};display:block;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td style="font-family:${SANS};font-size:15px;font-weight:500;color:${fg};padding:0 14px 0 0;white-space:nowrap;">${escapeHtml(text)}</td>
          <td style="line-height:0;"><img src="${asset("arrow.png")}" width="40" height="40" alt="" style="display:block;border:0;" /></td>
        </tr></table>
      </a>
    </td>
  </tr></table>`;
}

function quote(text: string, label: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0;"><tr>
    <td style="background:${PAPER};border-radius:16px;padding:18px 20px;">
      <div style="font-family:${MONO};font-size:11.5px;line-height:1;letter-spacing:0.04em;text-transform:uppercase;color:${DIM};margin:0 0 12px;">${escapeHtml(label)}</div>
      <div style="font-family:${SANS};font-size:15px;line-height:1.6;color:${BODY};white-space:pre-wrap;">${escapeHtml(text)}</div>
      ${uniqueMark()}
    </td>
  </tr></table>`;
}

const spacer = (h: number) => `<div style="height:${h}px;line-height:${h}px;font-size:0;">&nbsp;</div>`;
const hairline = (color = HAIR) =>
  `<div style="height:1px;line-height:1px;font-size:0;background:${color};margin:0;">&nbsp;</div>`;

/** Numbered list with hairlines, like the product points on the site. */
function steps(items: [string, string][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${items
    .map(
      ([title, body], i) => `<tr>
        <td style="width:36px;padding:14px 0 14px;border-top:1px solid ${HAIR};vertical-align:top;font-family:${MONO};font-size:12.5px;line-height:1.5;color:${DIM};">${String(i + 1).padStart(2, "0")}</td>
        <td style="padding:14px 0 14px;border-top:1px solid ${HAIR};font-family:${SANS};">
          <div style="font-size:15.5px;line-height:1.4;font-weight:600;color:${INK};margin:0 0 4px;">${title}</div>
          <div style="font-size:14.5px;line-height:1.6;color:${BODY};">${body}</div>
        </td>
      </tr>`,
    )
    .join("")}</table>`;
}

/* ------------------------------------------------------------------ */
/* Products band: night with the ultramarine glow                       */
/* ------------------------------------------------------------------ */

const products = [
  {
    name: "Maestro",
    status: "Live",
    image: "maestro.jpg",
    alt: "Maestro landing page",
    body: "Interview prep that works like the real round. Human-graded courses and timed mock tests in each company's real pattern.",
    href: "https://studywithmaestro.com/",
    cta: "Visit Maestro",
  },
  {
    name: "Cronpay",
    status: "Early access",
    image: "cronpay.jpg",
    alt: "Cronpay landing page",
    body: "Permissionless crypto checkout. Customers pay with the token they hold, on the chain they use. You settle in the one you want.",
    href: "https://cronpay.xyz/",
    cta: "Visit Cronpay",
  },
];

function productCard(p: (typeof products)[number]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${NIGHT_CARD};border:1px solid ${NIGHT_LINE};border-radius:20px;border-collapse:separate;">
    <tr><td style="padding:0;line-height:0;">
      <a href="${p.href}" style="text-decoration:none;"><img src="${asset(p.image)}" width="250" alt="${escapeHtml(p.alt)}" style="display:block;width:100%;height:auto;border:0;border-radius:19px 19px 0 0;" /></a>
    </td></tr>
    <tr><td style="padding:20px 20px 22px;">
      ${status(p.status, true)}
      <div style="font-family:${SANS};font-size:24px;line-height:1.1;font-weight:600;letter-spacing:-0.035em;color:#FFFFFF;margin:12px 0 8px;">${p.name}</div>
      <div style="font-family:${SANS};font-size:14px;line-height:1.6;color:${ON_NIGHT};margin:0 0 16px;">${escapeHtml(p.body)}</div>
      <a href="${p.href}" style="font-family:${SANS};font-size:14px;font-weight:500;color:#FFFFFF;text-decoration:none;border-bottom:1px solid ${G1};padding-bottom:2px;">${p.cta} &rarr;</a>
    </td></tr>
  </table>`;
}

function productsBand() {
  const col = (html: string) =>
    `<div class="col" style="display:inline-block;width:100%;max-width:260px;vertical-align:top;text-align:left;font-size:16px;"><div style="padding:6px;">${html}</div></div>`;
  return `<tr><td class="px night" bgcolor="${NIGHT}" background="${asset("glow.jpg")}" style="background-color:${NIGHT};background-image:url('${asset("glow.jpg")}');background-size:cover;background-position:top right;background-repeat:no-repeat;padding:40px 36px 36px;">
    ${eyebrow("While you wait", undefined, true)}
    ${headline("We ship", "our own bets.", true)}
    <p style="margin:0 0 24px;font-family:${SANS};font-size:15.5px;line-height:1.65;color:${ON_NIGHT};">The same discipline we'd bring to your project, applied to products we own and run. Built by the people you'd work with.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" ><tr><td style="font-size:0;text-align:center;">
      <!--[if mso]><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td width="50%" valign="top"><![endif]-->
      ${col(productCard(products[0]))}
      <!--[if mso]></td><td width="50%" valign="top"><![endif]-->
      ${col(productCard(products[1]))}
      <!--[if mso]></td></tr></table><![endif]-->
    </td></tr></table>
    ${spacer(20)}
    ${button(siteUrl("/products"), "See all our products", true)}
  </td></tr>`;
}

/* ------------------------------------------------------------------ */
/* Layout                                                               */
/* ------------------------------------------------------------------ */

function layout({
  preview,
  kicker,
  body,
  band = "",
  footer,
}: {
  preview: string;
  kicker: string;
  body: string;
  band?: string;
  footer: string;
}) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light only" />
<title>${escapeHtml(preview)}</title>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&amp;family=Geist+Mono:wght@500&amp;family=Instrument+Serif:ital@1&amp;display=swap" rel="stylesheet" />
<style>
  a { color: ${ACCENT}; }
  @media (max-width: 620px) {
    .px { padding-left: 22px !important; padding-right: 22px !important; }
    .h1 { font-size: 32px !important; }
    .col { max-width: 100% !important; }
    .kicker { display: none !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${PAPER};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${escapeHtml(preview)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${PAPER}" style="background:${PAPER};">
  <tr><td align="center" style="padding:28px 12px 40px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

      <tr><td style="padding:0 6px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="line-height:0;">
            <a href="${siteUrl()}" style="text-decoration:none;"><img src="${asset("logo.png")}" width="124" height="29" alt="Levantate Labs" style="display:block;border:0;" /></a>
          </td>
          <td class="kicker" align="right" style="font-family:${MONO};font-size:11.5px;letter-spacing:0.04em;text-transform:uppercase;color:${DIM};">${escapeHtml(kicker)}</td>
        </tr></table>
      </td></tr>

      <tr><td>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid ${HAIR};border-radius:28px;border-collapse:separate;overflow:hidden;">
          <tr><td class="px" style="padding:40px 36px 36px;">
            ${body}
          </td></tr>
          ${band}
        </table>
      </td></tr>

      <tr><td style="padding:24px 10px 0;font-family:${SANS};font-size:12.5px;line-height:1.65;color:${DIM};">
        <p style="margin:0 0 12px;">${footer}</p>
        <p style="margin:0 0 12px;">
          <a href="${siteUrl("/products")}" style="color:${INK};text-decoration:none;">Products</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a href="${siteUrl("/work")}" style="color:${INK};text-decoration:none;">Work</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a href="${siteUrl("/insights")}" style="color:${INK};text-decoration:none;">Insights</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a href="${siteUrl("/contact")}" style="color:${INK};text-decoration:none;">Contact</a>
        </p>
        <p style="margin:0;">${escapeHtml(siteConfig.copyright)} &middot; ${escapeHtml(siteConfig.markline)}</p>
        ${uniqueMark()}
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

const NO_REPLY_FOOTER = `This email comes from a no-reply address, so replies to it aren't read. To reach us, write to ${contactLink(DIM)}.`;

/* ------------------------------------------------------------------ */
/* Admin sign-in                                                        */
/* ------------------------------------------------------------------ */

export function magicLinkEmail(url: string): EmailContent {
  const subject = "Your Levantate Labs admin sign-in link";
  const html = layout({
    preview: "Sign in to the Levantate Labs admin. The link expires in 15 minutes.",
    kicker: "Admin sign-in",
    body: `${headline("Sign in to", "the admin.")}
      ${paragraphs("Use the button below to sign in. The link works once and expires in 15 minutes.")}
      ${button(url, "Sign in")}
      ${spacer(24)}
      <p style="margin:0;font-family:${SANS};font-size:13px;line-height:1.6;color:${DIM};">If you didn't ask for this, you can ignore this email. Nobody can sign in without the link.</p>`,
    footer: "You're getting this because someone asked for an admin sign-in link for this address.",
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
      <td style="padding:12px 0;border-top:1px solid ${HAIR};width:96px;font-family:${MONO};font-size:11.5px;letter-spacing:0.04em;text-transform:uppercase;color:${DIM};vertical-align:top;">${k}</td>
      <td style="padding:12px 0;border-top:1px solid ${HAIR};font-family:${SANS};font-size:15px;color:${INK};">${v}</td>
    </tr>`;

  const html = layout({
    preview: `${input.name} wrote in about: ${needs}`,
    kicker: "New enquiry",
    body: `${status("New")}
      ${spacer(16)}
      ${headline(input.name, input.company ? `at ${input.company}` : "wrote in.")}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 24px;">
        ${row("Email", `<a href="mailto:${escapeHtml(input.email)}" style="color:${ACCENT};text-decoration:none;">${escapeHtml(input.email)}</a>`)}
        ${row("Company", escapeHtml(input.company || "Not given"))}
        ${row("Needs", escapeHtml(needs))}
      </table>
      ${quote(input.message, "Message")}
      ${spacer(24)}
      ${button(adminUrl, "Open in admin")}
      ${spacer(18)}
      <p style="margin:0;font-family:${SANS};font-size:13px;line-height:1.6;color:${DIM};">Reply from the admin to keep a record, or hit reply here to email ${escapeHtml(firstName(input.name))} directly.</p>`,
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
  const next: [string, string][] = [
    ["We read it properly", "Someone who'd actually work on your project reads your note. You'll hear from us within two working days."],
    ["A call with the builders", "If it looks like a fit, we set up a call with the people who would build it. No account managers."],
    ["A plan and an honest answer", "You get a scope and a plan, or a straight answer if we're not the right team."],
  ];
  const intro = `We've received your note, and a real person on the team will get back to you within two working days. This address doesn't take replies, so if anything is urgent, write to ${siteConfig.email}.`;

  const html = layout({
    preview: `We got your note, ${first}. Expect a reply within two working days.`,
    kicker: "Enquiry received",
    body: `${headline(`Thanks, ${first}.`, "We've got your note.")}
      ${paragraphs(intro)}
      ${spacer(12)}
      ${eyebrow("What happens next")}
      ${steps(next)}
      ${
        input.calendlyUrl
          ? `${spacer(20)}${eyebrow("Rather talk sooner?")}${paragraphs("Pick a time that suits you and we'll come prepared.", BODY, 15.5)}${button(input.calendlyUrl, "Book a call")}`
          : ""
      }
      ${spacer(32)}
      ${quote(message, "What you sent us")}
      ${spacer(28)}
      <p style="margin:0;font-family:${SANS};font-size:16px;line-height:1.5;color:${INK};">Talk soon,<br /><strong style="font-weight:600;">The Levantate Labs team</strong></p>`,
    band: productsBand(),
    footer: `You're getting this because you sent us a message through levantate.in. ${NO_REPLY_FOOTER}`,
  });

  const text = `Thanks, ${first}. We've got your note.

${intro}

WHAT HAPPENS NEXT
${next.map(([t, b], i) => `0${i + 1}  ${t}\n    ${b}`).join("\n")}
${input.calendlyUrl ? `\nRather talk sooner? Book a call: ${input.calendlyUrl}\n` : ""}
WHAT YOU SENT US
${message
  .split("\n")
  .map((line) => `> ${line}`)
  .join("\n")}

Talk soon,
The Levantate Labs team

While you wait, see what we build and run ourselves:
Maestro: https://studywithmaestro.com/
Cronpay: https://cronpay.xyz/

This email comes from a no-reply address. To reach us, write to ${siteConfig.email}.
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
    kicker: "Re: your enquiry",
    body: `${eyebrow("A reply from the team")}
      ${spacer(4)}
      ${paragraphs(input.body, INK)}
      ${spacer(8)}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;"><tr>
        <td style="background:${PAPER};border-radius:14px;padding:14px 18px;font-family:${SANS};font-size:14px;line-height:1.55;color:${BODY};">
          To reply, write to ${contactLink()}. This address doesn't take replies.
        </td>
      </tr></table>
      ${hairline()}
      ${spacer(24)}
      ${quote(original, `Your message · ${when}`)}`,
    band: productsBand(),
    footer: `You're getting this because you got in touch with us through levantate.in. ${NO_REPLY_FOOTER}`,
  });

  const text = `${input.body.trim()}

To reply, write to ${siteConfig.email}. This address doesn't take replies.

---
Your message on ${when}:
${original
  .split("\n")
  .map((line) => `> ${line}`)
  .join("\n")}`;
  return { subject: input.subject, html, text };
}
