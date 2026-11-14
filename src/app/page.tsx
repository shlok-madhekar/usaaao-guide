import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import OrbitLab from "@/components/OrbitLab";
import { UNITS, ALL_LESSONS, lessonCount } from "@/content/syllabus";
import { DISCORD_INVITE } from "@/site";

export default function Home() {
  const first = ALL_LESSONS[0];
  return (
    <>
      <Nav />
      <main className="wrap">
        <section className="hero">
          <div className="hero-copy">
            <h1>Free notes and problems for USAAAO and the IOAA</h1>
            <p>
              {lessonCount} lessons in {UNITS.length} units, from coordinates on the sky to the early universe.
              It&apos;s free, and the source is on GitHub. Most lessons are still being written.
            </p>
            <div className="btns">
              <Link href={`/guide/${first.unit.slug}/${first.slug}`} className="btn solid">Start with 1.1</Link>
              <Link href="/problems" className="btn">Problem bank</Link>
              <a href={DISCORD_INVITE} className="btn" target="_blank" rel="noopener noreferrer">Join the Discord</a>
            </div>
          </div>
          <OrbitLab />
        </section>

        <section className="contents">
          <h2>Contents</h2>
          <ol className="toc">
            {UNITS.map((unit, i) => (
              <li key={unit.slug} className="toc-u">
                <span className="n">{i + 1}</span>
                <div>
                  <div className="toc-head">
                    <Link href={`/guide/${unit.slug}`}>{unit.title}</Link>
                    <span className="dots" />
                    <span className="c">{unit.lessons.length}</span>
                  </div>
                  <p>{unit.blurb}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}
