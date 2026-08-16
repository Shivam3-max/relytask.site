import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { countAdminUsers, getAdminByEmail } from "./db";
import { verifyPassword } from "./password";

/**
 * Admin gate: email + password checked against the AdminUser table, a
 * signed httpOnly session cookie on top. Accounts are created directly in
 * the database (see README for the SQL, or `npm run seed:admin` on hosts
 * with shell access) — there is no signup flow and no env-var shared
 * password.
 */

const COOKIE = "relytask_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

const DEV_SECRET = "insecure-development-secret-change-me";

/**
 * Signing key for the session cookie. In production a missing or trivially
 * short secret is refused outright: falling back to a value published in this
 * repository would let anyone forge an admin session.
 */
function secret() {
  const configured = process.env.ADMIN_SECRET;
  if (configured && configured.length >= 16) return configured;
  if (process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_SECRET is missing or too short (needs 16+ characters).");
  }
  return DEV_SECRET;
}

/**
 * What is stopping the admin panel from working, if anything. Returned to the
 * login screen so a missing environment variable or an empty AdminUser table
 * does not masquerade as a wrong password — which is exactly what it looked
 * like on first deploy.
 */
export async function adminConfigError(): Promise<string | null> {
  const configuredSecret = process.env.ADMIN_SECRET;
  if (!configuredSecret) {
    return process.env.NODE_ENV === "production"
      ? "ADMIN_SECRET is not set on this server. Generate one with `openssl rand -hex 32`, add it to your environment variables and redeploy."
      : null;
  }
  if (configuredSecret.length < 16) {
    return "ADMIN_SECRET is too short — it needs at least 16 characters.";
  }
  if ((await countAdminUsers()) === 0) {
    return "No admin account exists yet. Insert one into the AdminUser table — see README.";
  }
  return null;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** Verify a submitted email/password pair against the AdminUser table. */
export async function verifyCredentials(email: string, password: string) {
  const user = await getAdminByEmail(email.trim().toLowerCase());
  if (!user) return false;
  return verifyPassword(password, user.passwordHash);
}

export function makeToken() {
  const expires = Date.now() + MAX_AGE * 1000;
  return `${expires}.${sign(String(expires))}`;
}

export function verifyToken(token: string | undefined) {
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (Number(expires) < Date.now()) return false;
  return safeEqual(signature, sign(expires));
}

export async function isAuthed() {
  const jar = await cookies();
  return verifyToken(jar.get(COOKIE)?.value);
}

/** Use at the top of every admin server component. */
export async function requireAdmin() {
  if (!(await isAuthed())) redirect("/admin/login");
}

export async function setSession() {
  const jar = await cookies();
  jar.set(COOKIE, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
