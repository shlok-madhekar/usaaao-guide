import Link from "next/link";
import { DISCORD_INVITE, REPO_URL, SITE } from "@/site";

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-row">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden>☉</span>
          <span>{SITE.name}</span>
        </Link>
        <nav className="nav-links">
          <Link href="/guide">Course</Link>
          <Link href="/problems">Problems</Link>
          <Link href="/contribute">Contribute</Link>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={DISCORD_INVITE} className="hl" target="_blank" rel="noopener noreferrer">Discord</a>
        </nav>
      </div>
    </header>
  );
}
