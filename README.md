# RelyTask

Marketing site, lead capture, six calculators and an admin panel for
[RelyTask](https://relytask.com) — Mohali, India.

Next.js 16 · Tailwind v4 · MySQL (via `mysql2`) · GSAP + Lenis.

---

## Running it locally

```bash
npm install
cp .env.example .env      # then edit ADMIN_PASSWORD and ADMIN_SECRET
npm run dev                # http://localhost:3630
```

The app needs a MySQL server reachable at `127.0.0.1:3306` — Laragon, XAMPP,
or `docker run -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=yes mysql`. With no
`DATABASE_*` vars set, it connects as `root` with no password, matching most
local installs out of the box. Create the database once:

```sql
CREATE DATABASE relytask_site CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Tables are created automatically on first request — there is no migration
step. To also load the six built-in projects and testimonials into the
database (so they're editable from the admin panel), run `npm run seed`.

The admin panel is at `/admin`.

---

## Deploying

The app needs a **MySQL database** and, on hosts with a read-only
filesystem, **blob storage** for testimonial videos. It talks to MySQL
directly via `mysql2` — no ORM, no query-engine binary — so it runs on
constrained hosts (shared/Node hosting, Hostinger, a plain VPS) as well as
serverless platforms.

### Environment variables

| Variable | Notes |
| --- | --- |
| `DATABASE_URL` | A full `mysql://user:password@host:3306/dbname` connection string, **or** use the four vars below |
| `DATABASE_HOST` / `DATABASE_PORT` / `DATABASE_USER` / `DATABASE_PASSWORD` / `DATABASE_NAME` | Discrete connection parts — handy when your host gives you these separately |
| `DATABASE_POOL_MAX` | Max connections per instance (default `5`). Keep this low on shared hosting — see below |
| `DATABASE_SSL` / `DATABASE_SSL_REJECT_UNAUTHORIZED` | Set `DATABASE_SSL=true` if the host requires SSL for remote connections; add `DATABASE_SSL_REJECT_UNAUTHORIZED=false` if it presents a self-signed certificate |
| `ADMIN_PASSWORD` | What you type at `/admin/login` |
| `ADMIN_SECRET` | `openssl rand -hex 32` |
| `BLOB_READ_WRITE_TOKEN` | Only needed on a read-only filesystem (Vercel, Netlify) — supplied when you create a Blob store |

Deploy, then optionally run `DATABASE_URL="<production url>" npm run seed`
once to load the built-in projects and testimonials.

### Hostinger (shared/Node hosting)

1. Create a MySQL database in hPanel → Databases. Hostinger prefixes
   database/user names, e.g. `u123456789_relytask`.
2. Set `DATABASE_HOST`/`DATABASE_USER`/`DATABASE_PASSWORD`/`DATABASE_NAME`
   from hPanel → Databases → Management. `DATABASE_HOST` is usually
   `localhost` when the app and database share the same server.
3. Set `ADMIN_PASSWORD` and `ADMIN_SECRET`.
4. Deploy and start with `npm run build && npm start`. Tables are created
   automatically on first request.
5. Leave `BLOB_READ_WRITE_TOKEN` unset — Hostinger's filesystem is writable,
   so uploads go to `public/uploads`.

### Vercel + a remote MySQL (Hostinger, PlanetScale, RDS...)

1. If using Hostinger's MySQL from Vercel: in hPanel → Databases → Remote
   MySQL, add host `%` (Any Host) — Vercel's serverless functions don't have
   a fixed outbound IP, so an IP allowlist won't work.
2. Set the environment variables above in Project Settings.
3. Keep `DATABASE_POOL_MAX` low (default `5`). Shared MySQL plans cap total
   concurrent connections (often 20-30), and every warm serverless instance
   opens its own pool — a high per-instance limit can exhaust that cap
   under real traffic.
4. Create a Blob store (Project Settings → Storage) so
   `BLOB_READ_WRITE_TOKEN` is set — Vercel's filesystem is read-only.
5. If this turns out to be too limiting under real traffic (connection
   errors, slow queries), a serverless-native MySQL host (e.g. PlanetScale)
   is a drop-in swap — same `mysql2` pool code, just point `DATABASE_URL`
   at it instead.

### A normal server or VPS

Everything works with no extra services. Point `DATABASE_*` at your MySQL,
leave `BLOB_READ_WRITE_TOKEN` unset, and uploads go to `public/uploads`.

---

## How it fits together

| Path | What it is |
| --- | --- |
| `src/app/` | Routes. `(site)` pages are static or dynamic per page. |
| `src/app/admin/` | Password-gated panel. `actions.ts` holds every mutation. |
| `src/lib/db.ts` | The MySQL data layer: pool, schema, and every query. |
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
| `npm run seed` | Creates tables if needed, imports the built-in projects and testimonials |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

Add `?static` to any URL to freeze animation — useful for screenshots.
