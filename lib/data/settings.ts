import { unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";

export const SETTING_KEYS = {
  calendlyUrl: "calendly_url",
} as const;

export type SettingKey = (typeof SETTING_KEYS)[keyof typeof SETTING_KEYS];

const DEFAULT_SETTING_META: Record<
  SettingKey,
  { label: string; placeholder: string }
> = {
  [SETTING_KEYS.calendlyUrl]: {
    label: "Calendly link",
    placeholder: "https://calendly.com/your-team/intro",
  },
};

export function getSettingMeta(key: SettingKey) {
  return DEFAULT_SETTING_META[key];
}

export async function getSetting(key: string) {
  return unstable_cache(
    async () => {
      if (!process.env.DATABASE_URL) return "";
      try {
        const { getDb } = await import("@/lib/db");
        const { siteSettings } = await import("@/lib/db/schema");
        const db = getDb();
        const rows = await db
          .select()
          .from(siteSettings)
          .where(eq(siteSettings.key, key))
          .limit(1);
        return rows[0]?.value?.trim() ?? "";
      } catch (error) {
        console.error("Failed to load setting", key, error);
        return "";
      }
    },
    [`setting-${key}`],
    { tags: ["settings", `setting:${key}`], revalidate: 3600 },
  )();
}

export async function getCalendlyUrl() {
  return getSetting(SETTING_KEYS.calendlyUrl);
}

export async function getAllSettings() {
  if (!process.env.DATABASE_URL) {
    return Object.entries(DEFAULT_SETTING_META).map(([key, meta]) => ({
      key,
      value: "",
      label: meta.label,
      placeholder: meta.placeholder,
      known: true,
    }));
  }

  const { getDb } = await import("@/lib/db");
  const { siteSettings } = await import("@/lib/db/schema");
  const db = getDb();
  const rows = await db.select().from(siteSettings);
  const byKey = new Map(rows.map((row) => [row.key, row]));

  const known = Object.entries(DEFAULT_SETTING_META).map(([key, meta]) => {
    const row = byKey.get(key);
    return {
      key,
      value: row?.value ?? "",
      label: row?.label ?? meta.label,
      placeholder: meta.placeholder,
      known: true,
    };
  });

  const knownKeys = new Set(Object.values(SETTING_KEYS));
  const custom = rows
    .filter((row) => !knownKeys.has(row.key as SettingKey))
    .map((row) => ({
      key: row.key,
      value: row.value,
      label: row.label ?? row.key,
      placeholder: "",
      known: false,
    }));

  return [...known, ...custom];
}
