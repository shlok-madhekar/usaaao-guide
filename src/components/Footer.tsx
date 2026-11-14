import Link from "next/link";
import { COMMONS_URL, REPO_URL } from "@/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row" style={{ maxWidth: 1100, margin: "0 auto" }}>
        <span>Part of <a href={COMMONS_URL} style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>Olympiad Commons</a>. Not affiliated with the USAAAO.</span>
        <span className="footer-links">
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}
