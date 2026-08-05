"use server";

import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { contactMessages, siteSettings, tasks } from "@/lib/db/schema";
import {
  SETTING_KEYS,
  getSettingMeta,
  type SettingKey,
} from "@/lib/data/settings";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session;
}

export async function updateContactStatus(
  id: string,
  status: "new" | "in_progress" | "done",
) {
  await requireAdmin();
  const db = getDb();
  await db
    .update(contactMessages)
    .set({ status, updatedAt: new Date() })
    .where(eq(contactMessages.id, id));
  return { ok: true };
}

export async function updateContactNotes(id: string, adminNotes: string) {
  await requireAdmin();
  const db = getDb();
  await db
    .update(contactMessages)
    .set({ adminNotes: adminNotes.trim() || null, updatedAt: new Date() })
    .where(eq(contactMessages.id, id));
  return { ok: true };
}

export async function deleteContactMessage(id: string) {
  await requireAdmin();
  const db = getDb();
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
  return { ok: true };
}

export async function createTaskFromContact(contactId: string) {
  await requireAdmin();
  const db = getDb();
  const rows = await db
    .select()
    .from(contactMessages)
    .where(eq(contactMessages.id, contactId))
    .limit(1);
  const contact = rows[0];
  if (!contact) throw new Error("Contact not found");

  const [task] = await db
    .insert(tasks)
    .values({
      title: `Follow up: ${contact.name}`,
      body: `${contact.email}${contact.company ? ` · ${contact.company}` : ""}\n\n${contact.message}`,
      status: "open",
      contactMessageId: contact.id,
    })
    .returning();

  await db
    .update(contactMessages)
    .set({ status: "in_progress", updatedAt: new Date() })
    .where(eq(contactMessages.id, contactId));

  return { id: task.id };
}

const taskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  body: z.string().trim().max(5000).optional().nullable(),
  dueAt: z.string().optional().nullable(),
});

export async function createTask(input: z.infer<typeof taskSchema>) {
  await requireAdmin();
  const data = taskSchema.parse(input);
  const db = getDb();
  const [task] = await db
    .insert(tasks)
    .values({
      title: data.title,
      body: data.body || null,
      dueAt: data.dueAt ? new Date(data.dueAt) : null,
      status: "open",
    })
    .returning();
  return { id: task.id };
}

export async function setTaskStatus(id: string, status: "open" | "done") {
  await requireAdmin();
  const db = getDb();
  await db
    .update(tasks)
    .set({ status, updatedAt: new Date() })
    .where(eq(tasks.id, id));
  return { ok: true };
}

export async function deleteTask(id: string) {
  await requireAdmin();
  const db = getDb();
  await db.delete(tasks).where(eq(tasks.id, id));
  return { ok: true };
}

const settingsSchema = z.record(z.string(), z.string());

export async function saveSiteSettings(values: Record<string, string>) {
  await requireAdmin();
  const data = settingsSchema.parse(values);
  const db = getDb();

  for (const [key, value] of Object.entries(data)) {
    const meta =
      key in SETTING_KEYS
        ? getSettingMeta(key as SettingKey)
        : { label: key, placeholder: "" };

    await db
      .insert(siteSettings)
      .values({
        key,
        value: value.trim(),
        label: meta.label,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: {
          value: value.trim(),
          label: meta.label,
          updatedAt: new Date(),
        },
      });

    revalidateTag("settings", "max");
    revalidateTag(`setting:${key}`, "max");
  }

  return { ok: true };
}

export async function upsertCustomSetting(key: string, value: string, label?: string) {
  await requireAdmin();
  const normalized = key
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_|_$/g, "");
  if (!normalized) throw new Error("Invalid setting key");

  const db = getDb();
  await db
    .insert(siteSettings)
    .values({
      key: normalized,
      value: value.trim(),
      label: label?.trim() || normalized,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: {
        value: value.trim(),
        label: label?.trim() || normalized,
        updatedAt: new Date(),
      },
    });

  revalidateTag("settings", "max");
  revalidateTag(`setting:${normalized}`, "max");
  return { key: normalized };
}
