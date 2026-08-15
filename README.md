# RelyTask

Marketing site, lead capture, six calculators and an admin panel for
[RelyTask](https://relytask.com) — Mohali, India.

Next.js 16 · Tailwind v4 · Prisma 7 on Postgres · GSAP + Lenis.

---

## Running it locally

```bash
npm install
cp .env.example .env      # then edit ADMIN_PASSWORD and ADMIN_SECRET
npm run db                # starts Postgres on :5432, leave it running
npm run migrate           # creates the tables
npm run seed              # loads the built-in projects and testimonials
npm run dev               # http://localhost:3630
```

`npm run db` starts a real Postgres compiled to WebAssembly (PGlite), so there
is nothing to install and no container to run. Data lives in `.pglite/`. If you
already have a Postgres, skip it and point `DATABASE_URL` at yours.

The admin panel is at `/admin`.

---

## Deploying

The app needs a **Postgres database** and, on hosts with a read-only
filesystem, **blob storage** for testimonial videos.

### Vercel

1. Create a Postgres database (Vercel Postgres, or Neon) and a Blob store.
2. Set the environment variables:

   | Variable | Notes |
   | --- | --- |
   | `DATABASE_URL` | Postgres connection string |
   | `ADMIN_PASSWORD` | What you type at `/admin/login` |
   | `ADMIN_SECRET` | `openssl rand -hex 32` |
   | `BLOB_READ_WRITE_TOKEN` | Supplied when you create the Blob store |

3. Deploy. `prisma generate` runs on install and before the build.
4. Run the migration once against the production database:

   ```bash
   DATABASE_URL="<production url>" npm run migrate
   DATABASE_URL="<production url>" npm run seed   # optional
   ```

Without `BLOB_READ_WRITE_TOKEN`, uploads fall back to writing into
`public/uploads` — fine on a VPS, but it fails on Vercel, and the upload error
says so.

### A normal server or VPS

Everything works with no extra services. Point `DATABASE_URL` at your Postgres,
leave `BLOB_READ_WRITE_TOKEN` unset, and uploads go to `public/uploads`.

---

## How it fits together

| Path | What it is |
| --- | --- |
| `src/app/` | Routes. `(site)` pages are static or dynamic per page. |
| `src/app/admin/` | Password-gated panel. `actions.ts` holds every mutation. |
| `src/lib/services.ts` | The 28 services and 3 pillars. |
| `src/lib/details/` | Long-form copy for each service page, with sources. |
| `src/lib/pricing.ts` | Default rate card for the cost estimator. |
| `src/lib/benchmarks.ts` | Published 2026 figures the calculators use. |
| `src/lib/settings.ts` | Merges those defaults with admin overrides. |
| `src/lib/content.ts` | Projects and testimonials, database-first. |
| `src/lib/storage.ts` | Uploads: blob storage or filesystem. |

### Two things worth knowing

**Content falls back rather than failing.** If the database is empty or
unreachable, projects and testimonials render from the files in `src/lib/`, and
the calculators use their code-defined defaults. The public site stays up; only
lead capture and the admin panel need the database.

**Numbers are editable without a deploy.** The rate card, the outreach and paid
benchmarks, exchange rates and the home page counters are all stored as
settings and edited in the admin panel. The files are the defaults; the
database holds overrides; each screen has a reset.

---

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Development server on :3630 |
| `npm run db` | Local Postgres on :5432 |
| `npm run migrate` | Applies migrations |
| `npm run seed` | Imports the built-in projects and testimonials |
| `npm run build` | Generates the Prisma client, then builds |
| `npm run lint` | ESLint |

Add `?static` to any URL to freeze animation — useful for screenshots.
