"use client";

import { useRef, useState } from "react";
import { Label } from "./ui";

type Value = { url: string; type: string };

/**
 * Uploads straight to /api/upload and keeps the resulting path in hidden
 * fields, so the surrounding server action just reads it off the form.
 */
export default function MediaUpload({
  name,
  typeName,
  label,
  hint,
  defaultUrl,
  defaultType,
  accept = "video/mp4,video/webm,video/quicktime,image/jpeg,image/png,image/webp",
}: {
  name: string;
  typeName: string;
  label: string;
  hint?: string;
  defaultUrl?: string | null;
  defaultType?: string | null;
  accept?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<Value | null>(
    defaultUrl ? { url: defaultUrl, type: defaultType ?? "video" } : null,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  async function upload(file: File) {
    setBusy(true);
    setError("");
    setProgress(0);

    const body = new FormData();
    body.append("file", file);

    try {
      // XHR rather than fetch, because a 200MB video deserves a progress bar.
      const result = await new Promise<Value>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload");
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
        };
        xhr.onload = () => {
          try {
            const json = JSON.parse(xhr.responseText);
            if (xhr.status >= 200 && xhr.status < 300) resolve({ url: json.url, type: json.kind });
            else reject(new Error(json.error ?? "Upload failed."));
          } catch {
            reject(new Error("Upload failed."));
          }
        };
        xhr.onerror = () => reject(new Error("Upload failed — check your connection."));
        xhr.send(body);
      });

      setValue(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <Label hint={hint}>{label}</Label>

      <input type="hidden" name={name} value={value?.url ?? ""} />
      <input type="hidden" name={typeName} value={value?.type ?? ""} />

      {value ? (
        <div className="border border-line bg-paper-2 p-3">
          <div className="mx-auto max-w-sm overflow-hidden bg-ink" style={{ aspectRatio: "16 / 9" }}>
            {value.type === "video" ? (
              <video src={value.url} controls playsInline className="h-full w-full object-cover" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value.url} alt="" className="h-full w-full object-cover" />
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="t-mono truncate text-mist">{value.url}</span>
            <button
              type="button"
              onClick={() => {
                setValue(null);
                if (input.current) input.current.value = "";
              }}
              className="t-mono border border-line px-3 py-1.5 text-ink-3 transition-colors duration-200 hover:border-flame hover:text-flame"
            >
              Remove
            </button>
            <button
              type="button"
              onClick={() => input.current?.click()}
              className="t-mono border border-line px-3 py-1.5 text-ink-3 transition-colors duration-200 hover:border-ink hover:text-ink"
            >
              Replace
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => input.current?.click()}
          disabled={busy}
          className="flex w-full flex-col items-center justify-center border border-dashed border-line bg-paper-2 px-4 py-8 text-center transition-colors duration-200 hover:border-ink disabled:opacity-60"
        >
          <span className="t-mono text-ink-2">
            {busy ? `Uploading… ${progress}%` : "Choose a video or image"}
          </span>
          <span className="mt-2 text-[0.75rem] text-mist">
            MP4, WebM, MOV, JPG, PNG or WebP · up to 200MB · 16:9 looks best
          </span>
          {busy && (
            <span className="mt-3 block h-1 w-full max-w-xs bg-line">
              <span
                className="block h-full bg-flame transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </span>
          )}
        </button>
      )}

      <input
        ref={input}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
        }}
      />

      {error && (
        <p className="mt-2 border-l-2 border-flame bg-flame-soft px-3 py-2 text-[0.8125rem] text-ink-2">
          {error}
        </p>
      )}
    </div>
  );
}
