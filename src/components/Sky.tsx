/**
 * The fixed backdrop: a faint star field and a hairline RA/Dec grid.
 * Stars are generated from a seeded random so the server and client match.
 */
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function Sky() {
  const r = rand(42);
  const stars = Array.from({ length: 220 }, () => ({
    x: r() * 1600,
    y: r() * 1000,
    s: r() < 0.06 ? 1.3 : r() < 0.3 ? 0.8 : 0.5,
    o: 0.25 + r() * 0.55,
  }));
  return (
    <div className="sky" aria-hidden>
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <g className="sky-grid">
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`v${i}`} x1={i * 133.3} y1={0} x2={i * 133.3} y2={1000} />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 125} x2={1600} y2={i * 125} />
          ))}
          <path d="M -50 760 Q 800 380 1650 640" className="sky-ecliptic" />
        </g>
        <g className="sky-stars">
          {stars.map((st, i) => (
            <circle key={i} cx={st.x.toFixed(1)} cy={st.y.toFixed(1)} r={st.s} opacity={st.o.toFixed(2)} />
          ))}
        </g>
      </svg>
    </div>
  );
}
