"use client";
import { useEffect, useRef, useState } from "react";

/**
 * A working Kepler orbit around a one-solar-mass star.
 * The view rescales to fit the orbit; the dashed ring is Earth's orbit (1 AU) for scale.
 * Animation: one year of orbit = 2 seconds.
 */
const SWEEP = 0.1; // fraction of the period shaded, to show equal areas

function solveE(M: number, e: number) {
  let E = e < 0.8 ? M : Math.PI;
  for (let i = 0; i < 12; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  return E;
}

export default function OrbitLab() {
  const [a, setA] = useState(1.5);
  const [e, setE] = useState(0.4);
  const [t, setT] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      if (start.current === null) start.current = now;
      setT((now - start.current) / 2000); // years
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const T = Math.pow(a, 1.5);
  const b = a * Math.sqrt(1 - e * e);
  const PX = Math.min(520 / (2 * a), 250 / (2 * b), 120);
  const SUN = { x: 300 + a * e * PX, y: 150 };
  const pos = (phase: number) => {
    const E = solveE(2 * Math.PI * phase, e);
    return { x: SUN.x + a * (Math.cos(E) - e) * PX, y: SUN.y - b * Math.sin(E) * PX };
  };
  const phase = (t / T) % 1;
  const p = pos(phase);
  const wedge = Array.from({ length: 24 }, (_, i) => pos(phase - SWEEP + (SWEEP * i) / 23));
  const wedgePath = `M ${SUN.x} ${SUN.y} ` + wedge.map((q) => `L ${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(" ") + " Z";
  const vPeri = 29.78 * Math.sqrt((1 + e) / (a * (1 - e)));
  const vAph = 29.78 * Math.sqrt((1 - e) / (a * (1 + e)));

  return (
    <div className="lab">
      <div className="lab-top">
        <span>Orbit lab</span>
        <span className="r">period {T.toFixed(2)} yr, perihelion {(a * (1 - e)).toFixed(2)} AU, speed {vAph.toFixed(1)} to {vPeri.toFixed(1)} km/s</span>
      </div>
      <svg viewBox="0 0 600 300" style={{ overflow: "hidden" }} role="img" aria-label="An elliptical orbit around the Sun">
        <circle cx={SUN.x} cy={SUN.y} r={PX} fill="none" stroke="#3a3a3a" strokeDasharray="3 5" />
        <text x={SUN.x + PX * 0.74} y={SUN.y + PX * 0.74 + 14} fill="#6a6a6a" fontSize="12">1 AU</text>
        <ellipse cx={SUN.x - a * e * PX} cy={SUN.y} rx={a * PX} ry={b * PX} fill="none" stroke="#8db8ff" strokeOpacity="0.55" />
        <path d={wedgePath} fill="#8db8ff" fillOpacity="0.12" />
        <circle cx={SUN.x} cy={SUN.y} r="7" fill="#f2d48a" />
        <circle cx={p.x} cy={p.y} r="5" fill="#8db8ff" />
      </svg>
      <div className="lab-sliders">
        <div>
          <label>Semi-major axis <b>{a.toFixed(2)} AU</b></label>
          <input type="range" min={0.4} max={3.5} step={0.05} value={a} onChange={(ev) => setA(+ev.target.value)} />
        </div>
        <div>
          <label>Eccentricity <b>{e.toFixed(2)}</b></label>
          <input type="range" min={0} max={0.85} step={0.01} value={e} onChange={(ev) => setE(+ev.target.value)} />
        </div>
      </div>
      <p className="lab-note">
        <strong>Try it.</strong> The shaded wedge is always the same area: that&apos;s Kepler&apos;s second law. Lesson 2.2 shows why.
      </p>
    </div>
  );
}
