import { Resend } from "resend";
import { siteConfig } from "@/lib/data/site";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type SendEmailResult = { id: string | null };

let client: Resend | null = null;

function getClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("Email is not configured: set RESEND_API_KEY");
  }
  client ??= new Resend(key);
  return client;
}

/** Sending address on the Resend-verified subdomain. Replies are routed to the team with Reply-To. */
export const DEFAULT_MAIL_FROM = `${siteConfig.name} <noreply@communications.levantate.in>`;

export function mailFrom() {
  return process.env.MAIL_FROM?.trim() || DEFAULT_MAIL_FROM;
}

/** Where new enquiries are announced, and where client replies land. */
export function teamInbox() {
  return process.env.CONTACT_NOTIFY_EMAIL?.trim() || siteConfig.email;
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendEmail({ to, subject, html, text, replyTo }: SendEmailInput): Promise<SendEmailResult> {
  const { data, error } = await getClient().emails.send({
    from: mailFrom(),
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text,
    replyTo,
  });

  if (error) {
    throw new Error(`Email not sent: ${error.message}`);
  }
  return { id: data?.id ?? null };
}
