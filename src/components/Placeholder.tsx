/** A few grey bars standing in for text that has not been written yet. */
export default function Placeholder({ lines = 3, label }: { lines?: number; label?: string }) {
  const widths = [100, 94, 97, 72, 88, 60];
  return (
    <div className="ph">
      {label && <p className="ph-label mono">{label}</p>}
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className="ph-bar" style={{ width: `${widths[i % widths.length]}%` }} />
      ))}
    </div>
  );
}
