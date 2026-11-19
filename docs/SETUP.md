# Backend setup

The public site builds and runs with no configuration. The contact form, the admin
panel and all email need the services below. Everything is configured with
environment variables in **Vercel → Project → Settings → Environment Variables**.
After changing any of them, redeploy.

| What | Needs |
| --- | --- |
| Contact form saves enquiries | `DATABASE_URL` |
| Admin sign-in at `/admin` | `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAILS`, `RESEND_API_KEY` |
| Enquiry alert + auto-reply emails | `RESEND_API_KEY`, `MAIL_FROM` |
| Replying from the admin | `RESEND_API_KEY` |
| Image uploads in the insights editor | `BLOB_READ_WRITE_TOKEN` |

## 1. Database: Neon Postgres

1. Vercel → your project → **Storage** → **Create Database** → **Neon** (Serverless Postgres).
2. Connect it to the project for Production (and Preview if you want previews to work).
   Vercel adds `DATABASE_URL` for you.
3. Nothing else to run. Every deploy runs `scripts/migrate.ts` before `next build`, which
   creates or updates the tables and, on an empty database, adds the existing insights posts.

Preview deployments use whichever database is connected to the Preview environment. If that
is the production database, previews apply migrations to it too.

If the database was created earlier with `drizzle-kit push`, the build skips migrations and
prints a warning. Bring it up to date once from your machine:

```bash
bun run db:push
```

## 2. File uploads: Vercel Blob

Vercel → **Storage** → **Create** → **Blob**, connect it to the project. Vercel adds
`BLOB_READ_WRITE_TOKEN`. Uploaded images are public and served from
`*.public.blob.vercel-storage.com`.

## 3. Email: Resend

Mail goes out from `noreply@communications.levantate.in`. Replies to any email are routed
to the team inbox with Reply-To, so the people who write in can still answer.

1. Create an account at resend.com.
2. **Domains** → **Add domain** → `communications.levantate.in`.
3. Add the DNS records Resend shows (SPF/MX on `send.communications`, a DKIM TXT record,
   optionally DMARC) at the DNS provider for levantate.in, then click **Verify**.
   Using a subdomain keeps the main levantate.in mailbox settings untouched.
4. **API Keys** → create a key with "Sending access" for that domain.
5. In Vercel add:
   - `RESEND_API_KEY` = the key
   - `MAIL_FROM` = `Levantate Labs <noreply@communications.levantate.in>`
   - `CONTACT_NOTIFY_EMAIL` = the inbox that should get new enquiries (defaults to `contact@levantate.in`)

Emails sent:

| Email | To | When |
| --- | --- | --- |
| New enquiry alert | `CONTACT_NOTIFY_EMAIL` | Someone submits the contact form. Reply-To is the visitor. |
| "We've got your message" | The visitor | Same moment. Includes the booking link if one is set in Admin → Settings. |
| Your reply | The visitor | You send it from Admin → Contacts → an enquiry. Their message is quoted below it. |
| Sign-in link | Admin | Someone on `ADMIN_EMAILS` signs in. |

The templates live in `lib/mail/templates.ts`. Reply starting points (intro call, ask for more
detail, not a fit, blank) live in `lib/data/reply-templates.ts`.

## 4. Admin sign-in

1. Generate a secret: `npx auth secret` (or `openssl rand -base64 32`) and add it as `AUTH_SECRET`.
2. Add `ADMIN_EMAILS`, comma-separated, e.g. `you@levantate.in,partner@levantate.in`.
3. Set `NEXT_PUBLIC_SITE_URL` to `https://www.levantate.in`.
4. Redeploy, open `/admin/login` and enter an allowed email. A sign-in link arrives by email.
5. In **Admin → Settings**, add the Calendly (booking) link. It's used in the auto-reply and
   the "Book an intro call" reply.

## Local development

```bash
cp .env.example .env.local   # fill in the values, or `vercel env pull .env.local`
bun install
bun run db:deploy            # apply migrations + seed against DATABASE_URL
bun dev
```
