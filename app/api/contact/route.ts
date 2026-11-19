import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { checkLoginRateLimit, clientIpFromHeaders } from "@/lib/auth/admin";
import { getDb } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { contactNeeds } from "@/lib/data/contact";
import { getCalendlyUrl } from "@/lib/data/settings";
import { sendEmail, teamInbox } from "@/lib/mail/send";
import { enquiryAlertEmail, enquiryAutoReplyEmail } from "@/lib/mail/templates";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().nullable(),
  needs: z.array(z.enum(contactNeeds)).max(contactNeeds.length).default([]),
  message: z.string().trim().min(1).max(5000),
});

export async function POST(request: Request) {
  const ip = clientIpFromHeaders(request.headers);
  const rate = checkLoginRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many messages from this connection. Try again in a few minutes, or email us directly." },
      { status: 429 },
    );
  }

  try {
    const data = contactSchema.parse(await request.json());

    if (!process.env.DATABASE_URL) {
      console.error("Contact form: DATABASE_URL is not set, enquiry not saved");
      return NextResponse.json(
        { error: "The form isn't connected yet. Please email us at the address on this page." },
        { status: 503 },
      );
    }

    const db = getDb();
    const [row] = await db
      .insert(contactMessages)
      .values({
        name: data.name,
        email: data.email,
        company: data.company || null,
        needs: data.needs,
        message: data.message,
      })
      .returning();

    const calendlyUrl = await getCalendlyUrl();

    // The enquiry is saved either way; email problems are logged, not shown to the visitor.
    const [alert, autoReply] = await Promise.allSettled([
      sendEmail({
        to: teamInbox(),
        replyTo: data.email,
        ...enquiryAlertEmail({ ...row, needs: data.needs }),
      }),
      sendEmail({
        to: data.email,
        replyTo: teamInbox(),
        ...enquiryAutoReplyEmail({ name: data.name, message: data.message, calendlyUrl }),
      }),
    ]);

    if (alert.status === "rejected") console.error("Enquiry alert email failed", alert.reason);
    if (autoReply.status === "rejected") console.error("Enquiry auto-reply email failed", autoReply.reason);

    if (alert.status === "fulfilled") {
      await db.update(contactMessages).set({ emailedAt: new Date() }).where(eq(contactMessages.id, row.id));
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
    }
    console.error("Contact form failed", error);
    return NextResponse.json(
      { error: "Something went wrong on our side. Please try again, or email us directly." },
      { status: 500 },
    );
  }
}
