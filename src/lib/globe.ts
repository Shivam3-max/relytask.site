/**
 * Data + maths for the dotted globe in the "Reach" section.
 *
 * The landmass is a bitmask over a Fibonacci-sphere point set, sampled offline
 * from Natural Earth's 110m land polygons. Storing indices rather than
 * coordinates keeps real continent shapes inside ~900 bytes of source, with no
 * runtime fetch and no map library.
 */

export const LAND_N = 5200;

const LAND_MASK =
  "AACAgLAEEhJCgkrIABgZAAdiZlLce5t/feVt772dt73zVv7+ztv9eytvZ2Wl3J2VmTNzWu5OyM+5OTE7J+bm3Jycm1Nzem5Ozc25OTknp+bm3Jyak1Nzem5OzcmJOTU3p+ZknIya01MzKk5GzKk5OTEnp+ZUjJyYURNyIkZOzKkZOTkjJ2TEjJiaExMyakZMyegJMTWjpmTUhJiSU1Nyak5MySkoMSWnpGSUlJKSU1JiKkpJySkoNSWlpMAUlJKCUlIqSkpJgSkpJQWlpMCQkJICUlIoCEpJhSEhNQSkpvIQkJoCQlIoCEhNASEoBQSEppAQkBICQlFICAgBASEoBQSEppAQkIIKQlFJCAgJBSEgJRSEgLJQkJIKQkBJKAgBBSGgJBQFgIJQUIAKAkBBKCoABQGgABUEgIJQVIAKAlABKCoABYGoABUUgAJQVIAKClEBKCgCBYSoCBQVgwJSUIQKiEEBKShCBcSggBQUoQJCUAQKCEEBKSgABcSgABQVgAJSUAAKCEEBKCgCBYSgABQUgCJQUACKCEERKCgCRaWgABQRgKJQUASKCEARKCICRSGgCBQRgSJQRASKAlARKCICRaCICBQBoSJQBASKghARKAJCRaAICBQBoSJQBASKgBERKAJCRaAICBQBISJQBASKABEQKABCRKAACAAAAiBAAAQAAIEQIAAGAIBACAAAAgAAAAAAAIEAAAAEAAAACAAAAgAAAAAEAAEAAAAEAAAAEAAAAgAAAAgAAAAAAAAEAAAAEAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

export type Vec3 = { x: number; y: number; z: number };

const DEG = Math.PI / 180;

/** Lon/lat (degrees) to a unit vector. +x right, +y up, +z toward the viewer. */
export function toVec3(lon: number, lat: number): Vec3 {
  const p = lat * DEG;
  const l = lon * DEG;
  return {
    x: Math.cos(p) * Math.sin(l),
    y: Math.sin(p),
    z: Math.cos(p) * Math.cos(l),
  };
}

/** Spin about the polar axis, then tilt the pole away from the viewer. */
export function orient(v: Vec3, spin: number, tilt: number): Vec3 {
  const cs = Math.cos(spin);
  const ss = Math.sin(spin);
  const x = v.x * cs + v.z * ss;
  const z = -v.x * ss + v.z * cs;
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  return { x, y: v.y * ct - z * st, z: v.y * st + z * ct };
}

let cachedLand: Vec3[] | null = null;

/** The land points of the Fibonacci sphere, as unit vectors. */
export function landPoints(): Vec3[] {
  if (cachedLand) return cachedLand;

  const bin = atob(LAND_MASK);
  const gold = Math.PI * (3 - Math.sqrt(5));
  const pts: Vec3[] = [];

  for (let i = 0; i < LAND_N; i++) {
    if (!(bin.charCodeAt(i >> 3) & (1 << (i & 7)))) continue;
    const y = 1 - (i / (LAND_N - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const a = i * gold;
    pts.push({ x: r * Math.sin(a), y, z: r * Math.cos(a) });
  }

  cachedLand = pts;
  return pts;
}

/** Great-circle interpolation, lifted off the surface into an arc. */
export function arcPoints(a: Vec3, b: Vec3, steps: number, lift: number): Vec3[] {
  const dot = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z));
  const omega = Math.acos(dot);
  const sin = Math.sin(omega);
  const out: Vec3[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    let k1: number;
    let k2: number;
    if (sin < 1e-6) {
      k1 = 1 - t;
      k2 = t;
    } else {
      k1 = Math.sin((1 - t) * omega) / sin;
      k2 = Math.sin(t * omega) / sin;
    }
    // Height peaks mid-arc and scales with how far apart the two ends are.
    const h = 1 + lift * (omega / Math.PI) * Math.sin(Math.PI * t);
    out.push({
      x: (a.x * k1 + b.x * k2) * h,
      y: (a.y * k1 + b.y * k2) * h,
      z: (a.z * k1 + b.z * k2) * h,
    });
  }
  return out;
}

// ── Where the work goes ──────────────────────────────────────────

export const ORIGIN = {
  label: "Mohali, India",
  lon: 76.72,
  lat: 30.7,
};

export type Destination = {
  id: string;
  label: string;
  region: string;
  lon: number;
  lat: number;
  /** Hours ahead of / behind IST, for the overlap note. */
  offset: string;
  /** Nudge the map label off its node to dodge a neighbour. */
  below?: boolean;
};

export const DESTINATIONS: Destination[] = [
  { id: "uk", label: "London", region: "United Kingdom", lon: -0.13, lat: 51.5, offset: "IST −4:30" },
  { id: "us-e", label: "New York", region: "United States", lon: -74.0, lat: 40.7, offset: "IST −9:30" },
  { id: "us-w", label: "San Francisco", region: "United States", lon: -122.4, lat: 37.8, offset: "IST −12:30" },
  { id: "ca", label: "Toronto", region: "Canada", lon: -79.4, lat: 43.7, offset: "IST −9:30" },
  { id: "de", label: "Berlin", region: "Germany", lon: 13.4, lat: 52.5, offset: "IST −3:30", below: true },
  { id: "ae", label: "Dubai", region: "United Arab Emirates", lon: 55.3, lat: 25.2, offset: "IST −1:30" },
  { id: "sa", label: "Riyadh", region: "Saudi Arabia", lon: 46.7, lat: 24.7, offset: "IST −2:30", below: true },
  { id: "sg", label: "Singapore", region: "Singapore", lon: 103.8, lat: 1.35, offset: "IST +2:30" },
  { id: "au", label: "Sydney", region: "Australia", lon: 151.2, lat: -33.9, offset: "IST +4:30" },
  { id: "za", label: "Cape Town", region: "South Africa", lon: 18.4, lat: -33.9, offset: "IST −3:30" },
];
