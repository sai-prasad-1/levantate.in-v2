import { desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { contactMessages, tasks } from "@/lib/db/schema";

export async function getContactMessages() {
  const db = getDb();
  return db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));
}

export async function getContactMessageById(id: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(contactMessages)
    .where(eq(contactMessages.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function getTasks() {
  const db = getDb();
  return db.select().from(tasks).orderBy(desc(tasks.createdAt));
}

export async function getOpenTaskCount() {
  const db = getDb();
  const rows = await db.select().from(tasks).where(eq(tasks.status, "open"));
  return rows.length;
}

export async function getNewContactCount() {
  const db = getDb();
  const rows = await db
    .select()
    .from(contactMessages)
    .where(eq(contactMessages.status, "new"));
  return rows.length;
}
