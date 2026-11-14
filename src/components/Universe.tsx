"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { UNITS } from "@/content/syllabus";
import { DISCORD_INVITE } from "@/site";

/*
 * The homepage: scrolling zooms out from Earth to the edge of the observable
 * universe, drawn to true scale. `z` is the width of the view in meters.
 * Each stop holds for a moment and shows the unit that covers that scale.
 */

const AU = 1.496e11;
const LY = 9.461e15;

type Stop = { logz: number; place: string; units?: { slug: string; only?: number[] }[]; note?: string };
const STOPS: Stop[] = [
  { logz: 7.4, place: "Earth" },
  { logz: 7.95, place: "Earth and its sky", units: [{ slug: "positional" }, { slug: "instruments" }] },
  { logz: 12.4, place: "The solar system", units: [{ slug: "mechanics" }] },
  { logz: 17.45, place: "The nearest stars", units: [{ slug: "radiation" }] },
  { logz: 19.5, place: "Star clusters", units: [{ slug: "stars" }] },
  { logz: 21.15, place: "The Milky Way", units: [{ slug: "cosmology", only: [0] }] },
  { logz: 27.0, place: "The observable universe", units: [{ slug: "cosmology", only: [1, 2] }] },
];

/* ---------- data, to scale ---------- */

const PLANETS = [
  { n: "Mercury", a: 0.387, p: 0.241, th: 1.2 },
  { n: "Venus", a: 0.723, p: 0.615, th: 4.1 },
  { n: "Earth", a: 1, p: 1, th: 0.6 },
  { n: "Mars", a: 1.524, p: 1.881, th: 2.6 },
  { n: "Jupiter", a: 5.203, p: 11.86, th: 3.7 },
  { n: "Saturn", a: 9.537, p: 29.45, th: 5.6 },
  { n: "Uranus", a: 19.19, p: 84.0, th: 1.9 },
  { n: "Neptune", a: 30.07, p: 164.8, th: 0.3 },
];

// name, distance (ly), RA (h), Dec (deg), color
const NEAR: [string, number, number, number, string][] = [
  ["Alpha Centauri", 4.37, 14.66, -60.8, "#fff1c9"],
  ["Barnard's Star", 5.96, 17.96, 4.7, "#ff9c6b"],
  ["Wolf 359", 7.9, 10.94, 7.0, "#ff8a5c"],
  ["Lalande 21185", 8.3, 11.05, 36.0, "#ff9c6b"],
  ["Sirius", 8.6, 6.75, -16.7, "#cfe0ff"],
  ["Luyten 726-8", 8.7, 1.65, -17.9, "#ff8a5c"],
  ["Ross 154", 9.7, 18.83, -23.8, "#ff8a5c"],
  ["Ross 248", 10.3, 23.7, 44.2, "#ff8a5c"],
  ["Epsilon Eridani", 10.5, 3.55, -9.5, "#ffd2a1"],
  ["Lacaille 9352", 10.7, 23.1, -35.9, "#ff9c6b"],
  ["Ross 128", 11.0, 11.8, 0.8, "#ff8a5c"],
  ["61 Cygni", 11.4, 21.12, 38.7, "#ffc48a"],
  ["Procyon", 11.5, 7.65, 5.2, "#fff6e0"],
  ["Epsilon Indi", 11.9, 22.05, -56.8, "#ffc48a"],
  ["Tau Ceti", 11.9, 1.73, -15.9, "#fff1c9"],
  ["Groombridge 34", 11.6, 0.3, 44.0, "#ff9c6b"],
];

// stylised continents: lon, lat, half-width, half-height (degrees)
const LAND: [number, number, number, number][] = [
  [-100, 45, 28, 17], [-60, -14, 13, 24], [-42, 72, 11, 6], [15, 50, 20, 10], [75, 52, 45, 14],
  [20, 5, 20, 27], [78, 22, 8, 9], [112, 2, 10, 6], [134, -25, 14, 9], [0, -82, 60, 7],
];
const D2R = Math.PI / 180;

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
function gauss(r: () => number) {
  return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r());
}
// sky position (RA, Dec, distance) to a flat map, in meters
function skyXY(ra: number, dec: number, d: number) {
  const a = (ra / 24) * 2 * Math.PI;
  const r = d * Math.cos((dec * Math.PI) / 180);
  return [r * Math.cos(a), r * Math.sin(a)];
}

type Pt = { x: number; y: number; c: string; s: number };

function buildWorld() {
  const r = rng(7);
  // field stars within ~1500 ly
  const field: Pt[] = [];
  const cols = ["#ff9c6b", "#ffc48a", "#fff1c9", "#cfe0ff", "#ff8a5c", "#ff9c6b"];
  for (let i = 0; i < 1400; i++) {
    const d = Math.sqrt(r()) * 1600 * LY;
    const a = r() * Math.PI * 2;
    field.push({ x: d * Math.cos(a), y: d * Math.sin(a), c: cols[Math.floor(r() * cols.length)], s: r() < 0.08 ? 1.6 : 1 });
  }
  const clump = (n: number, ra: number, dec: number, dist: number, rad: number, c: string) => {
    const [cx, cy] = skyXY(ra, dec, dist * LY);
    for (let i = 0; i < n; i++) field.push({ x: cx + gauss(r) * rad * LY, y: cy + gauss(r) * rad * LY, c, s: r() < 0.15 ? 1.8 : 1.1 });
  };
  clump(140, 3.79, 24.1, 444, 6, "#bcd4ff"); // Pleiades
  clump(80, 4.45, 15.9, 153, 8, "#ffd9a8"); // Hyades

  // Milky Way, centered on the galactic center; the Sun sits 26,000 ly out
  const gal: Pt[] = [];
  const GR = 50000 * LY;
  for (let i = 0; i < 6500; i++) {
    let x: number, y: number, c: string;
    if (i < 1300) {
      const rr = Math.abs(gauss(r)) * 4500 * LY;
      const a = r() * Math.PI * 2;
      x = rr * Math.cos(a) * 1.35;
      y = rr * Math.sin(a);
      c = r() < 0.5 ? "#ffe2b0" : "#ffd08a";
    } else {
      const arm = i % 4;
      const t = Math.pow(r(), 0.8);
      const rr = (0.12 + t * 0.88) * GR;
      const a = arm * (Math.PI / 2) + Math.log(rr / (0.12 * GR)) / 0.28 + gauss(r) * 0.22;
      x = rr * Math.cos(a) + gauss(r) * 1200 * LY;
      y = rr * Math.sin(a) + gauss(r) * 1200 * LY;
      c = r() < 0.35 ? "#bcd4ff" : r() < 0.6 ? "#fff1c9" : "#9fb6dd";
    }
    gal.push({ x, y, c, s: r() < 0.04 ? 1.6 : 0.9 });
  }

  // Andromeda and Triangulum, relative to the galactic center
  const local: Pt[] = [];
  const blob = (n: number, cx: number, cy: number, rx: number, ry: number, rot: number, c: string) => {
    for (let i = 0; i < n; i++) {
      const u = gauss(r) * rx, v = gauss(r) * ry;
      local.push({ x: cx + u * Math.cos(rot) - v * Math.sin(rot), y: cy + u * Math.sin(rot) + v * Math.cos(rot), c, s: 0.9 });
    }
  };
  blob(700, 1.7e22, 1.65e22, 3.2e20, 1.0e20, 0.6, "#e9dcc2");
  blob(220, 2.1e22, 1.2e22, 1.0e20, 0.6e20, -0.4, "#cbd6ee");
  blob(160, -1.0e21, -1.2e21, 9e19, 6e19, 0.2, "#cbd6ee"); // LMC
  blob(90, -0.4e21, -1.75e21, 5e19, 3e19, 0.5, "#cbd6ee"); // SMC

  // cosmic web: galaxies strung along filaments between nodes
  const web: Pt[] = [];
  const R = 4.4e26;
  const nodes: [number, number][] = [[0, 0]];
  for (let i = 0; i < 70; i++) {
    const d = Math.sqrt(r()) * R * 0.97;
    const a = r() * Math.PI * 2;
    nodes.push([d * Math.cos(a), d * Math.sin(a)]);
  }
  nodes.forEach(([nx, ny], i) => {
    const near = nodes
      .map(([x, y], j) => ({ j, d: Math.hypot(x - nx, y - ny) }))
      .filter((o) => o.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 3);
    for (const { j } of near) {
      const [mx, my] = nodes[j];
      for (let k = 0; k < 55; k++) {
        const t = r();
        web.push({ x: nx + (mx - nx) * t + gauss(r) * 6e24, y: ny + (my - ny) * t + gauss(r) * 6e24, c: "#a9bde0", s: 0.8 });
      }
    }
    for (let k = 0; k < 40; k++) web.push({ x: nx + gauss(r) * 5e24, y: ny + gauss(r) * 5e24, c: "#d8e2f5", s: 1 });
  });
  // near the Milky Way, a few hundred galaxies so the Local Group is not alone
  for (let i = 0; i < 400; i++) web.push({ x: gauss(r) * 4e23, y: gauss(r) * 4e23, c: "#a9bde0", s: 0.8 });

  // CMB shell: a mottled ring at the edge
  const cmb: { a: number; c: string }[] = [];
  const lerp = (p: number[], q: number[], t: number) => p.map((v, i) => Math.round(v + (q[i] - v) * t));
  const BLUE = [63, 111, 179], MID = [176, 150, 112], ORANGE = [226, 128, 78];
  const ph = [r() * 6, r() * 6, r() * 6, r() * 6];
  for (let i = 0; i < 1440; i++) {
    const a = (i / 1440) * Math.PI * 2;
    const v = 0.45 * Math.sin(a * 7 + ph[0]) + 0.3 * Math.sin(a * 13 + ph[1]) + 0.18 * Math.sin(a * 29 + ph[2]) + 0.1 * Math.sin(a * 53 + ph[3]);
    const t = clamp((v + 1) / 2);
    const rgb = t < 0.5 ? lerp(BLUE, MID, t * 2) : lerp(MID, ORANGE, (t - 0.5) * 2);
    cmb.push({ a, c: `rgb(${rgb.join(",")})` });
  }

  // Earth: dots scattered over each continent; some double as city lights on the night side
  const land: { lon: number; lat: number; city: boolean }[] = [];
  for (const [clon, clat, rx, ry] of LAND) {
    const n = Math.round(rx * ry * 1.0);
    for (let i = 0; i < n; i++) {
      const lon = clon + Math.max(-1, Math.min(1, gauss(r) * 0.5)) * rx;
      const lat = clat + Math.max(-1, Math.min(1, gauss(r) * 0.5)) * ry;
      land.push({ lon, lat, city: clat > -60 && r() < 0.16 });
    }
  }

  const bg: { x: number; y: number; o: number }[] = [];
  for (let i = 0; i < 260; i++) bg.push({ x: r(), y: r(), o: 0.15 + r() * 0.35 });

  return { field, gal, local, web, cmb, bg, land };
}

/* ---------- helpers ---------- */

function clamp(v: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, v));
}
const smooth = (v: number) => v * v * (3 - 2 * v);
/** 0 outside [a, d], 1 inside [b, c], linear ramps between. */
function win(x: number, a: number, b: number, c: number, d: number) {
  if (x <= a || x >= d) return 0;
  if (x < b) return (x - a) / (b - a);
  if (x > c) return (d - x) / (d - c);
  return 1;
}
function lightTime(m: number) {
  const s = m / 2.998e8;
  if (s < 1) return `${s.toFixed(2)} seconds`;
  if (s < 90) return `${s.toFixed(0)} seconds`;
  if (s < 5400) return `${(s / 60).toFixed(0)} minutes`;
  if (s < 172800) return `${(s / 3600).toFixed(0)} hours`;
  const y = s / 3.156e7;
  if (y < 1) return `${(s / 86400).toFixed(0)} days`;
  if (y < 1e3) return `${y.toFixed(0)} years`;
  if (y < 1e6) return `${(y / 1e3).toFixed(0)} thousand years`;
  if (y < 1e9) return `${(y / 1e6).toFixed(0)} million years`;
  return `${(y / 1e9).toFixed(0)} billion years`;
}

/* ---------- component ---------- */

export default function Universe() {
  const box = useRef<HTMLDivElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const hudExp = useRef<HTMLSpanElement>(null);
  const hudLight = useRef<HTMLSpanElement>(null);
  const hudPlace = useRef<HTMLSpanElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const rail = useRef<(HTMLButtonElement | null)[]>([]);

  /** Scroll to the point where stop i is held. */
  const jump = (i: number) => {
    const el = box.current!;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top + (span * i) / (STOPS.length - 1), behavior: calm ? "auto" : "smooth" });
  };

  useEffect(() => {
    const canvas = cvs.current!;
    const ctx = canvas.getContext("2d")!;
    const world = buildWorld();
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace";
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0;
    const t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const progress = () => {
      const el = box.current!;
      const top = el.getBoundingClientRect().top;
      const span = el.offsetHeight - window.innerHeight;
      return clamp(-top / span) * (STOPS.length - 1);
    };

    const frame = (now: number) => {
      const p = progress();
      const k = Math.min(Math.floor(p), STOPS.length - 2);
      const f = clamp((p - k - 0.22) / 0.56);
      const logz = STOPS[k].logz + (STOPS[k + 1].logz - STOPS[k].logz) * smooth(f);
      const z = Math.pow(10, logz);
      const years = still ? 0 : (now - t0) / 1000 / 30; // one year every 30 s

      const wide = W > 820;
      const side = wide ? Math.min(W, H) : Math.min(W * 0.9, H * 0.36); // size of the picture
      const cx = wide ? W * 0.64 : W * 0.5;
      const cy = wide ? H * 0.5 : 150 + side * 0.5;
      const s = (side * 1.05) / z; // px per meter

      // Earth's place in its orbit
      const ea = PLANETS[2].th + (2 * Math.PI * years) / PLANETS[2].p;
      const E = [AU * Math.cos(ea), AU * Math.sin(ea)];
      const GC = [-2.46e20, 0.4e20]; // galactic center, from the Sun
      const w1 = smooth(clamp((logz - 9) / 2));
      const w2 = smooth(clamp((logz - 21.4) / 1.6));
      const C = [E[0] * (1 - w1) + GC[0] * w2, E[1] * (1 - w1) + GC[1] * w2];
      const X = (x: number) => cx + (x - C[0]) * s;
      const Y = (y: number) => cy - (y - C[1]) * s;

      ctx.clearRect(0, 0, W, H);

      // faint background sky, screen space
      ctx.fillStyle = "#dfe7f7";
      const bgA = 1 - 0.7 * win(logz, 22, 24, 40, 41);
      for (const b of world.bg) {
        ctx.globalAlpha = b.o * bgA;
        ctx.fillRect(b.x * W, b.y * H, 1, 1);
      }

      const label = (txt: string, x: number, y: number, a: number, color = "#9aa6bf") => {
        if (a <= 0) return;
        ctx.globalAlpha = a;
        ctx.fillStyle = color;
        ctx.font = `12px ${mono}`;
        ctx.fillText(txt, Math.min(x, W - 12 - ctx.measureText(txt).width), y);
      };
      const dots = (pts: Pt[], ox: number, oy: number, a: number, rot = 0) => {
        if (a <= 0) return;
        const c = Math.cos(rot), sn = Math.sin(rot);
        for (const q of pts) {
          const x = X(ox + q.x * c - q.y * sn), y = Y(oy + q.x * sn + q.y * c);
          if (x < -4 || y < -4 || x > W + 4 || y > H + 4) continue;
          ctx.globalAlpha = a * (q.s > 1 ? 1 : 0.75);
          ctx.fillStyle = q.c;
          ctx.fillRect(x, y, q.s * 1.4, q.s * 1.4);
        }
      };

      // CMB shell
      const aC = win(logz, 25.6, 26.4, 40, 41);
      if (aC > 0) {
        const R = 4.4e26 * s;
        ctx.lineWidth = Math.max(3, R * 0.022);
        for (let i = 0; i < world.cmb.length; i++) {
          const seg = world.cmb[i];
          ctx.globalAlpha = aC * 0.8;
          ctx.strokeStyle = seg.c;
          ctx.beginPath();
          ctx.arc(X(0), Y(0), R, seg.a, seg.a + (Math.PI * 2) / world.cmb.length + 0.003);
          ctx.stroke();
        }
        label("cosmic microwave background", X(0) + R * 0.72 + 14, Y(0) - R * 0.72, win(logz, 26.4, 26.8, 40, 41));
      }

      // cosmic web, centered on the Milky Way
      dots(world.web, GC[0], GC[1], win(logz, 22.8, 24.2, 40, 41));

      // Local Group
      const aL = win(logz, 21.4, 22.2, 23.8, 24.8);
      dots(world.local, GC[0], GC[1], aL);
      label("Andromeda", X(GC[0] + 1.7e22) + 16, Y(GC[1] + 1.65e22), win(logz, 22.3, 22.6, 23.2, 23.6));

      // Milky Way, slowly turning
      const aG = win(logz, 19.9, 20.7, 23.2, 24.4);
      dots(world.gal, GC[0], GC[1], aG, still ? 0 : -years * 0.004);
      const lg = win(logz, 20.8, 21.0, 21.35, 21.6);
      if (lg > 0) {
        const sx = X(0), sy = Y(0);
        ctx.globalAlpha = lg;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(sx, sy, 6, 0, Math.PI * 2);
        ctx.stroke();
        label("you are here", sx + 12, sy + 4, lg, "#ffffff");
        label("galactic center", X(GC[0]) - 7000 * LY * s - 120, Y(GC[1]) + 4, lg);
      }

      // local stars and clusters
      const aF = win(logz, 17.7, 18.7, 20.3, 21.1);
      dots(world.field, 0, 0, aF);
      const lc = win(logz, 19.1, 19.35, 19.75, 20.1);
      if (lc > 0) {
        const [px, py] = skyXY(3.79, 24.1, 444 * LY);
        const [hx, hy] = skyXY(4.45, 15.9, 153 * LY);
        label("Pleiades, 444 ly", X(px) + 14, Y(py), lc);
        label("Hyades, 153 ly", X(hx) + 14, Y(hy) + 14, lc);
        const [ox, oy] = skyXY(5.59, -5.4, 1344 * LY);
        const g = ctx.createRadialGradient(X(ox), Y(oy), 0, X(ox), Y(oy), Math.max(10, 24 * LY * s));
        g.addColorStop(0, "rgba(255,120,170,0.55)");
        g.addColorStop(1, "rgba(255,120,170,0)");
        ctx.globalAlpha = lc;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(X(ox), Y(oy), Math.max(10, 24 * LY * s), 0, Math.PI * 2);
        ctx.fill();
        label("Orion Nebula, 1,344 ly", X(ox) + 16, Y(oy) + 4, lc);
      }

      // nearest stars
      const aN = win(logz, 15.6, 16.6, 18.8, 19.8);
      if (aN > 0) {
        const ln = win(logz, 16.9, 17.2, 17.75, 18.1);
        for (const [n, d, ra, dec, c] of NEAR) {
          const [x, y] = skyXY(ra, dec, d * LY);
          ctx.globalAlpha = aN;
          ctx.fillStyle = c;
          ctx.beginPath();
          ctx.arc(X(x), Y(y), n === "Sirius" || n === "Alpha Centauri" || n === "Procyon" ? 3 : 2, 0, Math.PI * 2);
          ctx.fill();
          if ((W > 820 ? ["Alpha Centauri", "Sirius", "Barnard's Star", "Procyon", "Tau Ceti", "Epsilon Eridani", "61 Cygni", "Wolf 359"] : ["Alpha Centauri", "Sirius", "Barnard's Star", "Procyon"]).includes(n))
            label(`${n}, ${d} ly`, X(x) + 9, Y(y) + 4, ln);
        }
        if (ln > 0) {
          ctx.globalAlpha = ln * 0.5;
          ctx.strokeStyle = "#5c6b8a";
          ctx.setLineDash([2, 5]);
          for (const ly of [5, 10]) {
            ctx.beginPath();
            ctx.arc(X(0), Y(0), ly * LY * s, 0, Math.PI * 2);
            ctx.stroke();
            label(`${ly} ly`, X(0) + ly * LY * s * 0.71 + 4, Y(0) - ly * LY * s * 0.71, ln * 0.8);
          }
          ctx.setLineDash([]);
        }
      }

      // planets
      const aP = win(logz, 9.6, 10.6, 13.6, 14.6);
      if (aP > 0) {
        const lp = win(logz, 11.7, 12.1, 12.7, 13.1);
        for (const pl of PLANETS) {
          const r = pl.a * AU * s;
          ctx.globalAlpha = aP * 0.4;
          ctx.strokeStyle = "#6f86b3";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(X(0), Y(0), r, 0, Math.PI * 2);
          ctx.stroke();
          const a = pl.th + (2 * Math.PI * years) / pl.p;
          const x = X(pl.a * AU * Math.cos(a)), y = Y(pl.a * AU * Math.sin(a));
          ctx.globalAlpha = aP;
          ctx.fillStyle = pl.n === "Earth" ? "#8db8ff" : "#d9dfeb";
          ctx.beginPath();
          ctx.arc(x, y, pl.n === "Jupiter" || pl.n === "Saturn" ? 3 : 2.2, 0, Math.PI * 2);
          ctx.fill();
          if (r > 45) label(pl.n, x + 8, y - 6, lp);
        }
      }

      // Sun
      {
        const rs = 6.96e8 * s;
        const sx = X(0), sy = Y(0);
        const glow = win(logz, 9.0, 10.2, 14.5, 16.5);
        if (sx > -200 && sx < W + 200 && sy > -200 && sy < H + 200) {
          const gr = Math.max(rs * 5, 22);
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, gr);
          g.addColorStop(0, "rgba(255,214,140,0.55)");
          g.addColorStop(1, "rgba(255,214,140,0)");
          ctx.globalAlpha = glow;
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(sx, sy, gr, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = Math.max(glow, win(logz, 14, 15, 20.6, 21.2));
          ctx.fillStyle = "#ffe0a0";
          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(rs, 2.6), 0, Math.PI * 2);
          ctx.fill();
          label("Sun", sx + 10, sy + 16, win(logz, 16.9, 17.2, 17.75, 18.1) + win(logz, 11.7, 12.1, 12.7, 13.1));
        }
      }

      // Moon and its orbit
      const aM = win(logz, 7.6, 8.4, 10.0, 10.8);
      if (aM > 0) {
        const ma = years * 2 * Math.PI * 13.37 + 1;
        const mx = E[0] + 3.844e8 * Math.cos(ma), my = E[1] + 3.844e8 * Math.sin(ma);
        ctx.globalAlpha = aM * 0.35;
        ctx.strokeStyle = "#6f86b3";
        ctx.beginPath();
        ctx.arc(X(E[0]), Y(E[1]), 3.844e8 * s, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = aM;
        ctx.fillStyle = "#c9ccd3";
        ctx.beginPath();
        ctx.arc(X(mx), Y(my), Math.max(1.737e6 * s, 1.8), 0, Math.PI * 2);
        ctx.fill();
        label("Moon", X(mx) + 8, Y(my) - 6, win(logz, 8.6, 8.9, 9.4, 9.8));
      }

      // Earth, lit from the Sun's side
      {
        const re = 6.371e6 * s;
        const ex = X(E[0]), ey = Y(E[1]);
        const a = win(logz, 0, 1, 9.3, 10.3);
        if (a > 0 && re > 0.3) {
          const dx = -Math.cos(ea), dy = Math.sin(ea); // toward the Sun, screen space
          const r = Math.max(re, 1.8);
          if (re > 20) {
            const halo = ctx.createRadialGradient(ex, ey, r * 0.96, ex, ey, r * 1.16);
            halo.addColorStop(0, "rgba(120,170,255,0.32)");
            halo.addColorStop(1, "rgba(120,170,255,0)");
            ctx.globalAlpha = a;
            ctx.fillStyle = halo;
            ctx.beginPath();
            ctx.arc(ex, ey, r * 1.16, 0, Math.PI * 2);
            ctx.fill();
          }
          // day side toward the Sun, a soft terminator, then limb darkening
          const lg2 = ctx.createLinearGradient(ex + dx * r, ey + dy * r, ex - dx * r, ey - dy * r);
          lg2.addColorStop(0, "#8fb9ea");
          lg2.addColorStop(0.46, "#3f6da8");
          lg2.addColorStop(0.53, "#0c1629");
          lg2.addColorStop(1, "#070c18");
          ctx.globalAlpha = a;
          ctx.fillStyle = lg2;
          ctx.beginPath();
          ctx.arc(ex, ey, r, 0, Math.PI * 2);
          ctx.fill();
          if (re > 26) {
            const spin = still ? 0.9 : (now / 1000) * 0.05; // a slow turn
            const sz = Math.max(1.6, r * 0.021);
            for (const q of world.land) {
              const lon = q.lon * D2R + spin, lat = q.lat * D2R;
              const cz = Math.cos(lat) * Math.cos(lon); // toward the viewer
              if (cz <= 0.03) continue;
              const u = Math.cos(lat) * Math.sin(lon), v = Math.sin(lat);
              const day = clamp((u * dx - v * dy) * 2.2 + 0.5); // 1 on the lit side
              const px = ex + u * r, py = ey - v * r;
              if (day > 0.05) {
                ctx.globalAlpha = a * day * 0.95 * Math.min(1, cz * 3);
                ctx.fillStyle = "#9bc58c";
                ctx.fillRect(px - sz / 2, py - sz / 2, sz, sz * Math.max(cz, 0.4));
              } else if (q.city) {
                ctx.globalAlpha = a * 0.7 * Math.min(1, cz * 3);
                ctx.fillStyle = "#ffd58a";
                ctx.fillRect(px, py, 1.3, 1.3);
              }
            }
          }
          const limb = ctx.createRadialGradient(ex, ey, r * 0.6, ex, ey, r);
          limb.addColorStop(0, "rgba(5,7,13,0)");
          limb.addColorStop(1, "rgba(5,7,13,0.55)");
          ctx.fillStyle = limb;
          ctx.beginPath();
          ctx.arc(ex, ey, r, 0, Math.PI * 2);
          ctx.fill();
          if (re > 20) {
            ctx.globalAlpha = a * 0.35;
            ctx.strokeStyle = "#9cc3f0";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(ex, ey, r + 3, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // the celestial sphere around Earth
        const aS = win(logz, 7.45, 7.8, 8.15, 8.55);
        if (aS > 0) {
          const R = side * 0.34;
          ctx.lineWidth = 1;
          ctx.globalAlpha = aS * 0.55;
          ctx.strokeStyle = "#8db8ff";
          ctx.beginPath();
          ctx.ellipse(ex, ey, R, R * 0.26, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.strokeStyle = "#f2d48a";
          ctx.beginPath();
          ctx.ellipse(ex, ey, R, R * 0.26, (-23.4 * Math.PI) / 180, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = aS * 0.25;
          ctx.strokeStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(ex, ey, R, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(ex, ey - R - 14);
          ctx.lineTo(ex, ey + R + 14);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = aS;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(ex, ey - R, 2.4, 0, Math.PI * 2);
          ctx.fill();
          label("Polaris", ex + 10, ey - R + 4, aS, "#ffffff");
          label("celestial equator", ex + R * 0.62, ey + R * 0.26 + 18, aS, "#8db8ff");
          label("ecliptic, 23.4°", ex + R * 0.6, ey - R * 0.5, aS, "#f2d48a");
        }
      }

      ctx.globalAlpha = 1;

      // overlays
      STOPS.forEach((_, i) => {
        const el = panels.current[i];
        if (!el) return;
        const d = Math.abs(p - i);
        const o = d < 0.2 ? 1 : d > 0.34 ? 0 : 1 - (d - 0.2) / 0.14;
        el.style.opacity = String(o);
        el.style.visibility = o < 0.02 ? "hidden" : "visible";
        el.style.transform = `translateY(${(p - i) * -40}px)`;
        el.style.pointerEvents = o > 0.5 ? "auto" : "none";
      });
      const near = Math.round(p);
      if (hudExp.current) hudExp.current.innerHTML = `10<sup>${Math.round(logz)}</sup> m`;
      if (hudLight.current) hudLight.current.textContent = `light crosses this view in ${lightTime(z)}`;
      if (hudPlace.current) hudPlace.current.textContent = STOPS[near].place;
      if (hint.current) {
        const ho = clamp(1 - p * 4);
        hint.current.style.opacity = String(ho);
        hint.current.style.visibility = ho < 0.02 ? "hidden" : "visible";
      }
      rail.current.forEach((b, i) => b && b.setAttribute("aria-current", i === near ? "step" : "false"));

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    // no point drawing 10,000 stars nobody can see
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!raf) raf = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(box.current!);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={box} className="zoom" style={{ height: `${STOPS.length * 110}vh` }}>
      <a className="skip" href="#lessons">Skip to all lessons</a>
      <div className="zoom-stage">
        <canvas ref={cvs} className="zoom-canvas" role="img" aria-label="Zooming out from Earth to the observable universe, to scale" />

        <nav className="rail mono" aria-label="Jump to a scale">
          {STOPS.map((st, i) => (
            <button key={st.place} type="button" ref={(el) => { rail.current[i] = el; }} onClick={() => jump(i)} aria-label={st.place}>
              <span>{st.place}</span>
              <i />
            </button>
          ))}
        </nav>

        <div className="hud mono">
          <span ref={hudExp} className="hud-exp" />
          <span ref={hudPlace} className="hud-place" />
          <span ref={hudLight} className="hud-light" />
        </div>

        <div className="panel intro" ref={(el) => { panels.current[0] = el; }}>
          <h1>The universe, one scale at a time.</h1>
          <p>A free course for the USA Astronomy and Astrophysics Olympiad. It starts at Earth and ends at the edge of what we can see.</p>
          <div className="cta">
            <Link href="/guide/positional/positional-1" className="go">Start with lesson 1.1</Link>
            <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer" className="go ghost">Help write it</a>
          </div>
        </div>

        {STOPS.slice(1).map((st, j) => (
          <div key={st.place} className={`panel${st.units!.length > 1 ? " dense" : ""}`} ref={(el) => { panels.current[j + 1] = el; }}>
            {st.units!.map(({ slug, only }) => {
              const ui = UNITS.findIndex((u) => u.slug === slug);
              const unit = UNITS[ui];
              const ls = unit.lessons.map((l, li) => ({ l, li })).filter(({ li }) => !only || only.includes(li));
              return (
                <div key={slug} className="panel-unit">
                  <Link href={`/guide/${slug}`} className="panel-h">
                    <span className="mono">Unit {ui + 1}</span>
                    {unit.title}
                  </Link>
                  <p className="panel-n mono">{ls.length} lessons</p>
                  <ol>
                    {ls.map(({ l, li }) => (
                      <li key={l.slug}>
                        <Link href={`/guide/${slug}/${l.slug}`}>
                          <span className="mono">{ui + 1}.{li + 1}</span>
                          {l.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        ))}

        <div ref={hint} className="hint mono">scroll to zoom out · <a href="#lessons">skip to the lessons</a></div>
      </div>
    </div>
  );
}
