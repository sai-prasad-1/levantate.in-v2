import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { featuredPost, insightPosts } from "@/lib/data/insights";
import { siteConfig } from "@/lib/data/site";

const region = process.env.AWS_REGION ?? "ap-south-1";

function getSesClient() {
  return new SESClient({
    region,
    credentials:
      process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          }
        : undefined,
  });
}

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendEmailInput) {
  const from = process.env.SES_FROM_EMAIL;
  if (!from) {
    throw new Error("SES_FROM_EMAIL is not set");
  }

  const destinations = Array.isArray(to) ? to : [to];
  const client = getSesClient();

  await client.send(
    new SendEmailCommand({
      Source: `"${siteConfig.name}" <${from}>`,
      Destination: { ToAddresses: destinations },
      ReplyToAddresses: replyTo ? [replyTo] : undefined,
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: {
          Html: { Data: html, Charset: "UTF-8" },
          ...(text
            ? { Text: { Data: text, Charset: "UTF-8" } }
            : {
                Text: {
                  Data: html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
                  Charset: "UTF-8",
                },
              }),
        },
      },
    }),
  );
}

function siteUrl(path = "") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url).replace(
    /\/$/,
    "",
  );
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function firstName(fullName: string) {
  const part = fullName.trim().split(/\s+/)[0];
  return part || "there";
}

function emailShell({
  preview,
  body,
}: {
  preview: string;
  body: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(preview)}</title>
</head>
<body style="margin:0;padding:0;background:#F7F5F0;color:#16150F;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${escapeHtml(preview)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F5F0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid rgba(22,21,15,0.1);border-radius:20px;overflow:hidden;">
          <tr>
            <td style="padding:28px 32px 20px;border-bottom:1px solid rgba(22,21,15,0.08);">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:10px;height:10px;background:#C74A26;border-radius:2px;"></td>
                  <td style="padding-left:10px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;letter-spacing:-0.02em;color:#16150F;">
                    ${escapeHtml(siteConfig.name)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;font-family:Arial,Helvetica,sans-serif;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid rgba(22,21,15,0.08);font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.55;color:rgba(22,21,15,0.45);">
              ${escapeHtml(siteConfig.markline)} ·
              <a href="${siteUrl()}" style="color:#C74A26;text-decoration:none;">${escapeHtml(siteUrl().replace(/^https?:\/\//, ""))}</a>
              <br />
              ${escapeHtml(siteConfig.email)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function magicLinkEmailHtml(url: string) {
  return emailShell({
    preview: "Your Levantate Labs admin sign-in link",
    body: `
      <h1 style="font-size:28px;line-height:1.2;letter-spacing:-0.03em;margin:0 0 12px;color:#16150F;">Sign in to admin</h1>
      <p style="font-size:15px;line-height:1.65;color:rgba(22,21,15,0.65);margin:0 0 28px;">
        Use this one-time link to access the Levantate Labs admin. It expires shortly and can only be used once.
      </p>
      <a href="${escapeHtml(url)}" style="display:inline-block;background:#16150F;color:#F7F5F0;text-decoration:none;padding:14px 24px;border-radius:999px;font-size:15px;font-weight:500;">
        Sign in →
      </a>
      <p style="font-size:12px;line-height:1.5;color:rgba(22,21,15,0.45);margin:28px 0 0;">
        If you didn’t request this, you can ignore this email.
      </p>
    `,
  });
}

export function contactNotifyEmailHtml(input: {
  name: string;
  email: string;
  company?: string | null;
  needs: string[];
  message: string;
}) {
  const needs = input.needs.length ? input.needs.join(", ") : "—";
  return emailShell({
    preview: `New enquiry from ${input.name}`,
    body: `
      <h1 style="font-size:26px;line-height:1.2;letter-spacing:-0.03em;margin:0 0 8px;color:#16150F;">New project enquiry</h1>
      <p style="margin:0 0 24px;font-size:14px;color:rgba(22,21,15,0.55);">Submitted via levantate.in/contact</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14.5px;line-height:1.55;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(22,21,15,0.08);width:110px;color:rgba(22,21,15,0.5);">Name</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(22,21,15,0.08);color:#16150F;font-weight:600;">${escapeHtml(input.name)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(22,21,15,0.08);color:rgba(22,21,15,0.5);">Email</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(22,21,15,0.08);">
            <a href="mailto:${escapeHtml(input.email)}" style="color:#C74A26;text-decoration:none;">${escapeHtml(input.email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(22,21,15,0.08);color:rgba(22,21,15,0.5);">Company</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(22,21,15,0.08);color:#16150F;">${escapeHtml(input.company || "—")}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(22,21,15,0.08);color:rgba(22,21,15,0.5);">Needs</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(22,21,15,0.08);color:#16150F;">${escapeHtml(needs)}</td>
        </tr>
      </table>
      <p style="margin:24px 0 8px;font-size:13px;color:rgba(22,21,15,0.5);">Message</p>
      <div style="padding:16px 18px;background:#F7F5F0;border-radius:12px;font-size:15px;line-height:1.65;white-space:pre-wrap;color:#16150F;">${escapeHtml(input.message)}</div>
    `,
  });
}

export function contactAutoReplyEmailHtml(input: { name: string }) {
  const name = firstName(input.name);
  const insightsUrl = siteUrl("/insights");
  const productsUrl = siteUrl("/products");
  const featuredUrl = siteUrl(`/insights/${featuredPost.slug}`);
  const secondary = insightPosts.slice(0, 2);

  const insightRows = [
    {
      tag: featuredPost.tag,
      title: featuredPost.title,
      excerpt: featuredPost.excerpt,
      href: featuredUrl,
    },
    ...secondary.map((post) => ({
      tag: post.tag,
      title: post.title,
      excerpt: post.excerpt,
      href: siteUrl(`/insights/${post.slug}`),
    })),
  ]
    .map(
      (post) => `
      <tr>
        <td style="padding:0 0 14px;">
          <a href="${post.href}" style="display:block;text-decoration:none;border:1px solid rgba(22,21,15,0.1);border-radius:14px;padding:16px 18px;background:#F7F5F0;">
            <div style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:#C74A26;margin-bottom:6px;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(post.tag)}</div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:15.5px;font-weight:700;letter-spacing:-0.02em;color:#16150F;margin-bottom:6px;">${escapeHtml(post.title)}</div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:13.5px;line-height:1.55;color:rgba(22,21,15,0.6);">${escapeHtml(post.excerpt)}</div>
          </a>
        </td>
      </tr>
    `,
    )
    .join("");

  return emailShell({
    preview: `Thanks ${name} — we got your note and will reply within two working days.`,
    body: `
      <h1 style="font-size:28px;line-height:1.2;letter-spacing:-0.03em;margin:0 0 14px;color:#16150F;">
        Thanks, ${escapeHtml(name)}<span style="color:#C74A26;">.</span>
      </h1>
      <p style="font-size:15.5px;line-height:1.7;color:rgba(22,21,15,0.68);margin:0 0 16px;">
        We received your note and a human on our team will read it. Expect a reply within
        <strong style="color:#16150F;">two working days</strong>.
      </p>
      <p style="font-size:15.5px;line-height:1.7;color:rgba(22,21,15,0.68);margin:0 0 28px;">
        If anything is urgent, just reply to this email — it comes straight to us.
      </p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;background:#16150F;border-radius:16px;">
        <tr>
          <td style="padding:22px 24px;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#C74A26;margin-bottom:10px;">Product</div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;letter-spacing:-0.03em;color:#F7F5F0;margin-bottom:10px;">Maestro</div>
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:14.5px;line-height:1.65;color:rgba(247,245,240,0.68);margin:0 0 18px;">
              Our learning platform that teaches systems thinking — not just syntax — so people build software that actually scales.
            </p>
            <a href="${productsUrl}" style="display:inline-block;background:#C74A26;color:#F7F5F0;text-decoration:none;padding:11px 18px;border-radius:999px;font-family:Arial,Helvetica,sans-serif;font-size:13.5px;font-weight:600;">
              Explore Maestro →
            </a>
          </td>
        </tr>
      </table>

      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:rgba(22,21,15,0.45);margin:0 0 14px;">
        While you wait — from Insights
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${insightRows}
      </table>
      <p style="margin:8px 0 0;">
        <a href="${insightsUrl}" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#C74A26;text-decoration:none;font-weight:600;">
          Browse all insights →
        </a>
      </p>

      <p style="font-size:15px;line-height:1.65;color:rgba(22,21,15,0.68);margin:28px 0 0;">
        — The Levantate Labs team
      </p>
    `,
  });
}

export function contactAutoReplyEmailText(input: { name: string }) {
  const name = firstName(input.name);
  const insightsUrl = siteUrl("/insights");
  const productsUrl = siteUrl("/products");
  const featuredUrl = siteUrl(`/insights/${featuredPost.slug}`);

  return `Thanks, ${name}.

We received your note and a human on our team will read it. Expect a reply within two working days.

If anything is urgent, just reply to this email — it comes straight to us.

MAESTRO
Our learning platform that teaches systems thinking — not just syntax — so people build software that actually scales.
${productsUrl}

WHILE YOU WAIT — FROM INSIGHTS
• ${featuredPost.title}
  ${featuredUrl}
• ${insightPosts[0].title}
  ${siteUrl(`/insights/${insightPosts[0].slug}`)}
• ${insightPosts[1].title}
  ${siteUrl(`/insights/${insightPosts[1].slug}`)}

Browse all insights: ${insightsUrl}

— The Levantate Labs team
${siteConfig.email}
${siteUrl()}`;
}
