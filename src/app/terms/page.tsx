import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Terms" };

export default function Terms() {
  return (
    <>
      <Nav />
      <main className="wrap page">
        <h1 className="title">Terms</h1>
        <div className="text">
          <p>The guide is free to use for studying. It is written by volunteers and may contain mistakes.</p>
          <p>This site is not affiliated with any olympiad organizer.</p>
          <p>Contributions are welcome through GitHub and stay open source.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
