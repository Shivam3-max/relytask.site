"use client";

import { useEffect, useRef } from "react";
import {
  ORIGIN,
  DESTINATIONS,
  arcPoints,
  landPoints,
  orient,
  toVec3,
  type Vec3,
} from "@/lib/globe";

const DEG = Math.PI / 180;
const TILT = 0.3;
const BASE_SPIN = -ORIGIN.lon * DEG;
const SWEEP = 0.34; // radians the globe rocks either side of India
const LIFT = 0.42;
const STEPS = 56;

type Route = { points: Vec3[]; dest: (typeof DESTINATIONS)[number] };

/** Hidden when the point sits behind the sphere's silhouette. */
function occluded(p: Vec3) {
  return p.z < 0 && Math.hypot(p.x, p.y) < 1;
}

export default function Globe({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const box = wrap.current;
    if (!el || !box) return;

    const ctx = el.getContext("2d");
    if (!ctx) return;

    const origin = toVec3(ORIGIN.lon, ORIGIN.lat);
    const land = landPoints();
    const routes: Route[] = DESTINATIONS.map((dest) => ({
      dest,
      points: arcPoints(origin, toVec3(dest.lon, dest.lat), STEPS, LIFT),
    }));

    // Graticule: meridians every 30°, parallels every 30°.
    const graticule: Vec3[][] = [];
    for (let lon = -180; lon < 180; lon += 30) {
      const line: Vec3[] = [];
      for (let lat = -90; lat <= 90; lat += 4) line.push(toVec3(lon, lat));
      graticule.push(line);
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      const line: Vec3[] = [];
      for (let lon = -180; lon <= 180; lon += 4) line.push(toVec3(lon, lat));
      graticule.push(line);
    }

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let R = 0;
    // The canvas is deliberately wider than its frame so the globe bleeds off
    // the edge. Labels must stay inside the part that survives the crop.
    let visL = 0;
    let visR = 0;

    const clipper = (() => {
      let n: HTMLElement | null = box.parentElement;
      while (n) {
        if (getComputedStyle(n).overflowX !== "visible") return n;
        n = n.parentElement;
      }
      return null;
    })();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.clientWidth;
      h = box.clientHeight;
      if (!w || !h) return;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // The sphere sits inside the frame with a little breathing room rather
      // than filling it edge to edge.
      R = Math.min(w, h) * 0.42;
      cx = w * 0.5;
      cy = h * 0.5;

      visL = 0;
      visR = w;
      if (clipper) {
        const a = el.getBoundingClientRect();
        const b = clipper.getBoundingClientRect();
        visL = Math.max(0, b.left - a.left);
        visR = Math.min(w, b.right - a.left);
      }
    };

    const px = (p: Vec3) => [cx + p.x * R, cy - p.y * R] as const;

    /** Labels flip to the left of their node before they can run off frame. */
    const label = (text: string, x: number, y: number, dx: number, dy: number) => {
      const width = ctx.measureText(text).width;
      const flip = x + dx + width > visR - 10;
      if (flip && x - dx - width < visL + 10) return; // no room either side
      ctx.textAlign = flip ? "right" : "left";
      ctx.fillText(text, flip ? x - dx : x + dx, y + dy);
      ctx.textAlign = "left";
    };

    const draw = (t: number) => {
      if (!w || !h) return;
      const spin = BASE_SPIN + Math.sin(t * 0.16) * SWEEP;
      const o = (v: Vec3) => orient(v, spin, TILT);

      ctx.clearRect(0, 0, w, h);

      // ── Ocean body ────────────────────────────────────────────
      const g = ctx.createRadialGradient(
        cx - R * 0.35,
        cy - R * 0.4,
        R * 0.1,
        cx,
        cy,
        R,
      );
      g.addColorStop(0, "#242c52");
      g.addColorStop(0.55, "#181e3c");
      g.addColorStop(1, "#0d1128");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // Rim light
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R - 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // ── Graticule ─────────────────────────────────────────────
      ctx.strokeStyle = "rgba(255,255,255,0.055)";
      ctx.lineWidth = 1;
      for (const line of graticule) {
        let pen = false;
        ctx.beginPath();
        for (const raw of line) {
          const p = o(raw);
          if (p.z <= 0) {
            pen = false;
            continue;
          }
          const [x, y] = px(p);
          if (pen) ctx.lineTo(x, y);
          else {
            ctx.moveTo(x, y);
            pen = true;
          }
        }
        ctx.stroke();
      }

      // ── Land ──────────────────────────────────────────────────
      for (const raw of land) {
        const p = o(raw);
        if (p.z <= 0.01) continue;
        const [x, y] = px(p);
        // Front-lit: dots near the centre read brighter and larger.
        const d = Math.pow(p.z, 0.75);
        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.35, R * 0.0062 * (0.45 + d * 0.75)), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,218,244,${0.13 + d * 0.57})`;
        ctx.fill();
      }

      // ── Routes ────────────────────────────────────────────────
      for (let i = 0; i < routes.length; i++) {
        const { points, dest } = routes[i];
        const projected = points.map(o);

        ctx.lineWidth = Math.max(1, R * 0.0055);
        ctx.lineCap = "round";
        for (let k = 0; k < projected.length - 1; k++) {
          const a = projected[k];
          const b = projected[k + 1];
          if (occluded(a) || occluded(b)) continue;
          const [ax, ay] = px(a);
          const [bx, by] = px(b);
          // Fade the far half of every arc so the sphere still reads as solid.
          const depth = Math.max(0, Math.min(1, (a.z + 0.35) / 1.1));
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = `rgba(255,122,24,${0.12 + depth * 0.62})`;
          ctx.stroke();
        }

        // Two-way traffic: work goes out of Mohali, results come back.
        const pulse = (u: number, core: string, edge: string, size: number) => {
          if (u < 0 || u > 1) return;
          const p = projected[Math.min(Math.round(u * STEPS), projected.length - 1)];
          if (occluded(p)) return;
          const [x, y] = px(p);
          const halo = ctx.createRadialGradient(x, y, 0, x, y, R * size);
          halo.addColorStop(0, core);
          halo.addColorStop(1, edge);
          ctx.beginPath();
          ctx.arc(x, y, R * size, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();
        };

        // Outbound — India to the world.
        pulse(
          (t * 0.17 + i * 0.117) % 1.35,
          "rgba(255,186,120,0.95)",
          "rgba(255,122,24,0)",
          0.05,
        );
        // Inbound — the world back to India.
        pulse(
          1 - ((t * 0.13 + i * 0.163 + 0.5) % 1.55),
          "rgba(196,222,255,0.85)",
          "rgba(120,170,255,0)",
          0.038,
        );

        // Destination node + label
        const dp = o(toVec3(dest.lon, dest.lat));
        if (dp.z > 0.02) {
          const [x, y] = px(dp);
          const a = Math.min(1, dp.z * 2.2);
          ctx.beginPath();
          ctx.arc(x, y, Math.max(1.6, R * 0.011), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.35 + a * 0.55})`;
          ctx.fill();

          if (R > 130 && dp.z > 0.3) {
            ctx.font = `${Math.round(R * 0.046)}px ui-monospace, monospace`;
            ctx.fillStyle = `rgba(255,255,255,${a * 0.55})`;
            ctx.textBaseline = "middle";
            label(dest.label, x, y, R * 0.03, dest.below ? R * 0.042 : -R * 0.032);
          }
        }
      }

      // ── Origin: India ─────────────────────────────────────────
      const op = o(origin);
      if (op.z > -0.05) {
        const [x, y] = px(op);
        const pulse = (t * 0.55) % 1;
        ctx.beginPath();
        ctx.arc(x, y, R * (0.02 + pulse * 0.11), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(244,96,11,${(1 - pulse) * 0.55})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const halo = ctx.createRadialGradient(x, y, 0, x, y, R * 0.09);
        halo.addColorStop(0, "rgba(244,96,11,0.55)");
        halo.addColorStop(1, "rgba(244,96,11,0)");
        ctx.beginPath();
        ctx.arc(x, y, R * 0.09, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, Math.max(2.5, R * 0.019), 0, Math.PI * 2);
        ctx.fillStyle = "#ff7a18";
        ctx.fill();

        if (R > 130) {
          ctx.font = `600 ${Math.round(R * 0.062)}px ui-monospace, monospace`;
          ctx.fillStyle = "rgba(255,255,255,0.94)";
          ctx.textBaseline = "middle";
          label("INDIA", x, y, R * 0.05, R * 0.05);
        }
      }
    };

    resize();

    const isStatic =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      new URLSearchParams(window.location.search).has("static");

    let raf = 0;
    let start = 0;
    let running = true;

    const loop = (now: number) => {
      if (!running) return;
      if (!start) start = now;
      draw((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    if (isStatic) {
      draw(1.6);
    } else {
      raf = requestAnimationFrame(loop);
    }

    // Stop burning frames when the section is off screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (isStatic) return;
        if (entry.isIntersecting && !running) {
          running = true;
          start = 0;
          raf = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(box);

    const ro = new ResizeObserver(() => {
      resize();
      if (isStatic) draw(1.6);
    });
    ro.observe(box);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <canvas ref={canvas} className="block h-full w-full" aria-hidden="true" />
      <span className="sr-only">
        A globe showing delivery routes from India to{" "}
        {[...new Set(DESTINATIONS.map((d) => d.region))].join(", ")}.
      </span>
    </div>
  );
}
