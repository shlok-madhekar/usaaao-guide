import { ImageResponse } from "next/og";

export const alt = "USAAAO Guide: the universe, one scale at a time";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link preview: the zoom's rings, with the title on the left. */
export default function Image() {
  const rings = [520, 380, 250, 140, 56];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#05070d", color: "#e9edf5", position: "relative" }}>
        {rings.map((d, i) => (
          <div
            key={d}
            style={{
              position: "absolute", left: 900 - d / 2, top: 315 - d / 2, width: d, height: d,
              borderRadius: d, border: `2px solid ${i === 0 ? "#e2804e" : "#2a3a5e"}`, display: "flex",
            }}
          />
        ))}
        <div style={{ position: "absolute", left: 900 - 9, top: 315 - 9, width: 18, height: 18, borderRadius: 9, background: "#8db8ff", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", width: 720 }}>
          <div style={{ fontSize: 26, color: "#8db8ff", marginBottom: 24, display: "flex" }}>USAAAO Guide</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, display: "flex" }}>The universe, one scale at a time.</div>
          <div style={{ fontSize: 28, color: "#a3adc2", marginTop: 28, display: "flex" }}>Free notes and problems for the USAAAO and the IOAA</div>
        </div>
      </div>
    ),
    size
  );
}
