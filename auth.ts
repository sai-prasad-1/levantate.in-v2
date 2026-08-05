import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { Provider } from "next-auth/providers";
import { getDb } from "@/lib/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/lib/db/schema";
import { checkLoginRateLimit, isAdminEmail } from "@/lib/auth/admin";
import { magicLinkEmailHtml, sendEmail } from "@/lib/mail/ses";

const emailProvider: Provider = {
  id: "email",
  type: "email",
  name: "Email",
  maxAge: 60 * 15,
  async sendVerificationRequest({ identifier, url }) {
    const email = identifier.trim().toLowerCase();

    // Rate-limit every attempt (authorized or not) to slow brute force / spam.
    const rate = checkLoginRateLimit(`email:${email}`);
    if (!rate.ok) {
      // Fail closed without revealing why — client always shows the same UI.
      return;
    }

    // Do not email or throw for non-admin addresses (prevents enumeration).
    if (!isAdminEmail(email)) {
      return;
    }

    await sendEmail({
      to: email,
      subject: "Sign in to Levantate Labs admin",
      html: magicLinkEmailHtml(url),
      text: `Sign in to Levantate Labs admin: ${url}`,
    });
  },
};

const hasDatabase = Boolean(process.env.DATABASE_URL);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: hasDatabase
    ? DrizzleAdapter(getDb(), {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
      })
    : undefined,
  providers: [emailProvider],
  session: {
    strategy: hasDatabase ? "database" : "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: "/admin/login",
    verifyRequest: "/admin/login?sent=1",
    error: "/admin/login",
  },
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.trim().toLowerCase();
      // Final gate: magic links for unknown addresses cannot create a session.
      if (!email || !isAdminEmail(email)) return false;
      return true;
    },
    async session({ session, user, token }) {
      if (session.user) {
        session.user.id = user?.id ?? (token.sub as string) ?? "";
      }
      return session;
    },
  },
  trustHost: true,
});
