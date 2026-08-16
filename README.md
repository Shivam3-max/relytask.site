# RelyTask

Marketing site, lead capture, six calculators and an admin panel for
[RelyTask](https://relytask.com) — Mohali, India.

Next.js 16 · Tailwind v4 · MySQL (via `mysql2`) · GSAP + Lenis.

---

## Running it locally

```bash
npm install
cp .env.example .env      # then edit ADMIN_SECRET
npm run dev                # http://localhost:3630
npm run seed:admin -- --email you@example.com --password "a strong password"
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

The admin panel is at `/admin`. Login is email + password, checked against the
`AdminUser` table — there is no shared env-var password. Passwords are hashed
with Node's built-in `scrypt` (see `src/lib/password.ts`) — never stored in
plain text, and no compiled dependency (bcrypt etc.) to break on constrained
hosts.

Three ways to create the first account:
- **Set-and-restart, no shell needed:** set `SEED_ADMIN_EMAIL` and
  `SEED_ADMIN_PASSWORD` in the host's environment-variable UI and restart
  the app. `server.js` syncs that account on every boot — this is the
  option for hosts with no SSH (Hostinger without shell access). Leaving
  these set means the password stays pinned to this value on every
  restart, so unset them again once you're in if you'll change the
  password some other way later.
- **No shell, one-time instead of always-synced:** visit `/admin/setup`.
  It only works while the `AdminUser` table is empty, and requires typing in
  your `ADMIN_SECRET` as a one-time "setup token" — so only whoever can set
  environment variables on the host can use it. Once an account exists the
  page just points to `/admin/login`. Locked out later? Delete the row from
  `AdminUser` (phpMyAdmin or similar) and `/admin/setup` opens back up.
- **Shell access:** `npm run seed:admin -- --email you@example.com --password "..."`
  (safe to re-run; an existing email just gets a new password).

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
| `ADMIN_SECRET` | `openssl rand -hex 32`. No admin password env var — accounts live in the `AdminUser` table, seeded separately (below) |
| `BLOB_READ_WRITE_TOKEN` | Only needed on a read-only filesystem (Vercel, Netlify) — supplied when you create a Blob store |

Deploy, then optionally run `DATABASE_URL="<production url>" npm run seed`
once to load the built-in projects and testimonials, and run
`DATABASE_URL="<production url>" npm run seed:admin -- --email you@example.com --password "a strong password"`
to create your admin login.

### Hostinger (shared/Business hosting, Node.js App)

Hostinger's Node.js App Manager runs on Phusion Passenger, which expects a
plain JS **startup file** that listens on the port it assigns via
`process.env.PORT` — `next start` doesn't read that on its own, so the repo
includes `server.js` for exactly this.

1. **Database.** hPanel → **Databases → MySQL Databases** → create a database
   and user (Hostinger prefixes both, e.g. `u123456789_relytask` /
   `u123456789_dbuser`) and attach the user to the database. Note the host it
   shows you — usually `localhost`.
2. **Get the code onto the server.** Either:
   - hPanel → **Advanced → SSH Access** (included on Business plans) and
     `git clone` the repo, or `scp`/upload a zip and extract it, or
   - hPanel's Node.js screen has a Git/file-manager based deploy — either
     way, land the repo in the application root folder you pick below.
3. **Create the app.** hPanel → **Advanced → Node.js** → **Create
   Application**:
   - Node.js version: 20 or newer
   - Application root: the folder you deployed into
   - Application URL: the domain/subdomain for the site
   - Application startup file: `server.js`
4. **Install and build.** If you have SSH, `cd` into the app folder and run:
   ```bash
   npm install
   npm run build
   ```
   (Hostinger's Node.js screen also has an "NPM Install" button and often a
   way to run a custom command — use that if SSH isn't available. Either
   way, `npm run build` must complete before the app is started; there is no
   build step baked into `server.js` itself.)
5. **Environment variables.** On the Node.js app's config screen, add:
   `DATABASE_HOST`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME`
   (from step 1), and `ADMIN_SECRET` (`openssl rand -hex 32`, or generate one
   any other way — it just needs to be random and 16+ characters). Leave
   `BLOB_READ_WRITE_TOKEN` unset.
6. **Admin login, no SSH needed.** Also add `SEED_ADMIN_EMAIL` and
   `SEED_ADMIN_PASSWORD` alongside the vars from step 5, then start/restart
   the app from the Node.js screen. `server.js` creates that admin account
   on boot automatically. (Alternatively, skip these two vars and use
   `/admin/setup` after starting the app instead — see "Admin panel" above.)
7. Tables are created automatically on first request — no separate
   migration step. Optionally run `npm run seed` once (over SSH, if you
   have it) to load the six built-in projects and three testimonials into
   the database.
8. Uploads go to `public/uploads` and persist normally — Hostinger's
   filesystem is writable and not wiped between requests, unlike Vercel.

To redeploy after a code change: pull the new code, `npm install` (if
dependencies changed), `npm run build`, then restart the app from the
Node.js screen.

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
