import Link from "next/link";
import Logo from "./Logo";
import { DISCORD_INVITE, REPO_URL, SITE } from "@/site";

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-row">
        <Link href="/" className="brand">
          <Logo />
          <span>{SITE.name}</span>
        </Link>
        <nav className="nav-links mono">
          <Link href="/guide">Course</Link>
          <Link href="/problems">Problems</Link>
          <Link href="/contribute">Contribute</Link>
          <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">Discord</a>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </div>
    </header>
  );
}
