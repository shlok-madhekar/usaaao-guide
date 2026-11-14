import Link from "next/link";
import { DISCORD_INVITE, REPO_URL, SITE } from "@/site";

/** Small orbit mark: a star and one elliptical orbit. */
function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
      <ellipse cx="11" cy="11" rx="9.5" ry="4.2" transform="rotate(-24 11 11)" fill="none" stroke="#8db8ff" strokeWidth="1.2" />
      <circle cx="8.6" cy="12" r="2.6" fill="#f2d48a" />
      <circle cx="19" cy="7.4" r="1.4" fill="#8db8ff" />
    </svg>
  );
}

export default function Nav({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={`nav${overlay ? " over" : ""}`}>
      <div className="nav-row">
        <Link href="/" className="brand"><Mark /><span>{SITE.name}</span></Link>
        <nav className="nav-links">
          <Link href="/guide">Lessons</Link>
          <Link href="/problems">Problems</Link>
          <Link href="/contribute">Contribute</Link>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">Discord</a>
        </nav>
      </div>
    </header>
  );
}
