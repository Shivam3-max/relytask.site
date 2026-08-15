import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Where uploaded testimonial media goes.
 *
 * Vercel Blob when BLOB_READ_WRITE_TOKEN is set, the local filesystem
 * otherwise. Hosts with a read-only filesystem — Vercel, Netlify — cannot
 * write into public/, so the token is what decides, not an env-name guess.
 */

export type Stored = { url: string; backend: "blob" | "filesystem" };

export const usingBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export async function store(file: File, extension: string): Promise<Stored> {
  // The name is always generated. A client-supplied filename is a
  // path-traversal risk and nothing here needs the original.
  const name = `${randomUUID()}.${extension}`;

  if (usingBlob()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${name}`, file, {
      access: "public",
      contentType: file.type,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return { url: blob.url, backend: "blob" };
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return { url: `/uploads/${name}`, backend: "filesystem" };
}
