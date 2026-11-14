import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DISCORD_INVITE, REPO_URL } from "@/site";

export const metadata: Metadata = { title: "Contribute" };

export default function Contribute() {
  return (
    <>
      <Nav />
      <main className="wrap page">
        
          
          <h1 className="title">Help write the guide</h1>
          <p className="sub">The guide is free and open source. Anyone can write a lesson, add a problem or fix a mistake.</p>
        
        <div className="text">
          <h2>Start on Discord</h2>
          <p>
            Join the <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">Discord</a> and say which unit you want.
            That way two people do not write the same lesson.
          </p>
          <h2>Write a lesson</h2>
          <ol>
            <li>Fork the <a href={REPO_URL} target="_blank" rel="noopener noreferrer">repo on GitHub</a>.</li>
            <li>Find the lesson slug in <code>src/content/syllabus.ts</code>.</li>
            <li>Write it as <code>src/content/lessons/&lt;slug&gt;.mdx</code>.</li>
            <li>Register it in <code>src/content/lessons/index.ts</code>.</li>
            <li>Open a pull request.</li>
          </ol>
          <h2>Fix something</h2>
          <p>Found a mistake? Open an issue or a pull request on GitHub.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
