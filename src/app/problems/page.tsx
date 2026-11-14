import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DISCORD_INVITE } from "@/site";

export const metadata: Metadata = { title: "Problems" };

export default function Problems() {
  return (
    <>
      <Nav />
      <main className="wrap">
        <header className="head">
          <h1>Problem bank</h1>
          <p className="sub">Problems by unit and difficulty, each with a full solution.</p>
        </header>
        <p className="empty">
          No problems yet. <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">Help write them on Discord</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
