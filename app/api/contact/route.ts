import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { contactNeeds } from "@/lib/data/contact";
import {
  contactAutoReplyEmailHtml,
  contactAutoReplyEmailText,
  contactNotifyEmailHtml,
  sendEmail,
} from "@/lib/mail/ses";
import { siteConfig } from "@/lib/data/site";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().nullable(),
  needs: z.array(z.enum(contactNeeds)).max(contactNeeds.length).default([]),
  message: z.string().trim().min(1).max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);
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

    const first =
      data.name.trim().split(/\s+/).filter(Boolean)[0] || "there";

    const mailJobs: Promise<void>[] = [
      sendEmail({
        to: siteConfig.email,
        replyTo: data.email,
        subject: `New enquiry from ${data.name}`,
        html: contactNotifyEmailHtml({
          name: data.name,
          email: data.email,
          company: data.company,
          needs: data.needs,
          message: data.message,
        }),
      }),
      sendEmail({
        to: data.email,
        replyTo: siteConfig.email,
        subject: `Thanks, ${first} — we got your note`,
        html: contactAutoReplyEmailHtml({ name: data.name }),
        text: contactAutoReplyEmailText({ name: data.name }),
      }),
    ];

    const results = await Promise.allSettled(mailJobs);
    const teamMailOk = results[0]?.status === "fulfilled";

    for (const [index, result] of results.entries()) {
      if (result.status === "rejected") {
        console.error(
          index === 0 ? "Contact team notify failed" : "Contact auto-reply failed",
          result.reason,
        );
      }
    }

    if (teamMailOk) {
      await db
        .update(contactMessages)
        .set({ emailedAt: new Date() })
        .where(eq(contactMessages.id, row.id));
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.flatten() },
        { status: 400 },
      );
    }
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
