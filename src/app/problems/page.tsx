import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { UNITS } from "@/content/syllabus";
import { DISCORD_INVITE } from "@/site";

export const metadata: Metadata = { title: "Problems" };

export default function Problems() {
  return (
    <>
      <Nav />
      <main className="wrap">
        <header className="head">
          <p className="crumbs">Problems</p>
          <h1 className="display">Practice problems</h1>
          <p className="lede">Problems sorted by unit and difficulty, each with a full solution.</p>
        </header>
        <div className="filters">
          <span className="chip on">All units</span>
          {UNITS.map((u) => <span key={u.slug} className="chip">{u.title}</span>)}
        </div>
        <div className="filters" style={{ marginTop: 0 }}>
          {["Any difficulty", "Easy", "Medium", "Hard"].map((d, i) => (
            <span key={d} className={`chip${i === 0 ? " on" : ""}`}>{d}</span>
          ))}
        </div>
        <div className="empty">
          <p style={{ color: "var(--ink-strong)" }}>No problems yet.</p>
          <p>
            The problem bank is being written.{" "}
            <a href={DISCORD_INVITE} style={{ color: "var(--accent)" }} target="_blank" rel="noopener noreferrer">Help write it on Discord</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
