import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Privacy" };

export default function Privacy() {
  return (
    <>
      <Nav />
      <main className="wrap">
        <header className="head"><h1>Privacy</h1></header>
        <div className="prose">
          <p>This site has no accounts and does not ask for personal information.</p>
          <p>We use Vercel Web Analytics to count page views. It does not use cookies and does not track you across sites.</p>
          <p>Links to Discord and GitHub take you to those services, which have their own privacy policies.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
