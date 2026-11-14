/** 10^n meters, with a real superscript. */
export default function Pow({ n, unit = "m" }: { n: number; unit?: string }) {
  return <>10<sup>{n}</sup>{unit ? ` ${unit}` : ""}</>;
}
