export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string) {
  const allowlist = getAdminEmails();
  if (!allowlist.length) return false;
  return allowlist.includes(email.trim().toLowerCase());
}

/** Simple in-memory rate limit for magic-link requests (per process). */
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

export function checkLoginRateLimit(
  key: string,
  limit = 5,
  windowMs = 15 * 60 * 1000,
) {
  const now = Date.now();
  const entry = loginAttempts.get(key);

  if (!entry || entry.resetAt < now) {
    loginAttempts.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true as const, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return {
      ok: false as const,
      retryAfterSec: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { ok: true as const, remaining: limit - entry.count };
}

export function clientIpFromHeaders(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headers.get("x-real-ip")?.trim() || "unknown";
}
