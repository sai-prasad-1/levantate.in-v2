# levantate.in

The Levantate Labs website: a Next.js 16 app with a small admin for enquiries, replies and
insights posts.

- **Public site:** pages in `app/` (products, services, work, insights, contact), components in `components/`.
- **Admin:** `/admin`: enquiries (status, notes, reply by email), tasks, insights editor, settings.
- **Backend:** Neon Postgres via Drizzle, Auth.js magic-link sign-in, Resend email, Vercel Blob uploads.

## Run it

```bash
bun install
bun dev
```

The site works with no environment variables. To switch on the contact form, admin and email,
follow [docs/SETUP.md](docs/SETUP.md) and copy [.env.example](.env.example) to `.env.local`.

## Scripts

| Command | Does |
| --- | --- |
| `bun run build` | Applies DB migrations (if `DATABASE_URL` is set), then builds |
| `bun run db:deploy` | Applies migrations and seeds insights on an empty DB |
| `bun run db:generate` | Creates a migration after editing `lib/db/schema.ts` |
| `bun run db:push` | Syncs the schema directly (for databases made with push) |
