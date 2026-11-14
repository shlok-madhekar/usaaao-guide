import Link from "next/link";
import { COMMONS_URL, REPO_URL } from "@/site";

export default function Footer() {
  return (
    <footer className="footer mono">
      <div className="footer-row">
        <span>Part of <a href={COMMONS_URL}>Olympiad Commons</a> · not affiliated with the USAAAO</span>
        <span className="footer-links">
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}
