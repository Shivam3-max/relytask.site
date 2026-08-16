import "server-only";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

/**
 * scrypt, not bcrypt: bcrypt needs a native binary, and this app already
 * fights native-binding issues on shared hosting (see next.config.mjs,
 * db.ts). scrypt is built into Node — no compiled dependency to break.
 */
const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const hashBuf = Buffer.from(hash, "hex");
  if (hashBuf.length !== KEY_LENGTH) return false;
  const candidate = scryptSync(password, salt, KEY_LENGTH);
  return timingSafeEqual(candidate, hashBuf);
}
