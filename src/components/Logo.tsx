/** An element tile: number 7, symbol As. Matches the Olympiad Commons table. */
export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="tile" aria-hidden style={{ width: size, height: size }}>
      <span className="tile-n" style={{ fontSize: size * 0.24 }}>7</span>
      <span className="tile-sym" style={{ fontSize: size * 0.5 }}>As</span>
    </span>
  );
}
