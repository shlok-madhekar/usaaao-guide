import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DISCORD_INVITE } from "@/site";

export const metadata: Metadata = { title: "Problems" };

export default function Problems() {
  return (
    <>
      <Nav />
      <main className="wrap page">
        <h1 className="title">Problems</h1>
        <p className="sub">Practice by unit and difficulty, each with a full solution.</p>
        <div className="text"><p>Nothing here yet. <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">Help write the first set on Discord</a>.</p></div>
      </main>
      <Footer />
    </>
  );
}
