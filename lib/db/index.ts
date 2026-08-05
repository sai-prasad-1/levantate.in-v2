import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as {
  __levDb?: Db;
};

export function getDb(): Db {
  if (globalForDb.__levDb) return globalForDb.__levDb;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(url);
  const instance = drizzle(sql, { schema });
  if (process.env.NODE_ENV !== "production") {
    globalForDb.__levDb = instance;
  }
  return instance;
}
