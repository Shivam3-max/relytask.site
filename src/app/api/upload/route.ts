import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { store } from "@/lib/storage";

export const runtime = "nodejs";

/** Kept deliberately narrow — these are the formats browsers play natively. */
const ALLOWED: Record<string, { ext: string; kind: "video" | "image" }> = {
  "video/mp4": { ext: "mp4", kind: "video" },
  "video/webm": { ext: "webm", kind: "video" },
  "video/quicktime": { ext: "mov", kind: "video" },
  "image/jpeg": { ext: "jpg", kind: "image" },
  "image/png": { ext: "png", kind: "image" },
  "image/webp": { ext: "webp", kind: "image" },
};

const MAX_BYTES = 200 * 1024 * 1024; // 200MB

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Could not read the upload." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  const allowed = ALLOWED[file.type];
  if (!allowed) {
    return NextResponse.json(
      { error: `${file.type || "That file type"} is not supported. Use MP4, WebM, MOV, JPG, PNG or WebP.` },
      { status: 415 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `That file is ${(file.size / 1024 / 1024).toFixed(0)}MB. The limit is 200MB.` },
      { status: 413 },
    );
  }

  try {
    const stored = await store(file, allowed.ext);
    return NextResponse.json({
      ok: true,
      url: stored.url,
      kind: allowed.kind,
      bytes: file.size,
      backend: stored.backend,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Could not save the file. On a read-only host, set BLOB_READ_WRITE_TOKEN so uploads go to blob storage.",
      },
      { status: 500 },
    );
  }
}
