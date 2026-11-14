import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { UNITS } from "@/content/syllabus";
import { DISCORD_INVITE, SITE } from "@/site";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Home() {
  const half = Math.ceil(UNITS.length / 2);
  const cols = [UNITS.slice(0, half), UNITS.slice(half)];
  return (
    <>
      <Nav />
      <main className="wrap">
        <section className="hero">
          <div>
            <p className="kicker">{SITE.fullName}</p>
            <h1 className="display" style={{ marginTop: 16 }}>{SITE.h1}</h1>
            <p className="lede">{SITE.heroText}</p>
            <div className="btns">
              <Link href="/guide" className="btn">Start the course</Link>
              <a href={DISCORD_INVITE} className="btn-plain" target="_blank" rel="noopener noreferrer">
                Help write it
              </a>
            </div>
          </div>
          <div className="tile-xl" aria-hidden>
            <span className="n">4</span>
            <span className="ra">RA 05h 35m · Dec −05°</span>
            <span className="sym">As</span>
            <span className="x">USAAAO</span>
          </div>
        </section>

        <section className="sec">
          <h2 className="kicker">How {SITE.exam} works</h2>
          <ol className="steps">
            {SITE.rounds.map((r, i) => (
              <li key={r.name} className="step">
                <span className="coord">{pad(i + 1)}</span>
                <h3>{r.name}</h3>
                <p>{r.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="sec">
          <h2 className="kicker">Contents</h2>
          <div className="contents">
            {cols.map((col, ci) => (
              <ol key={ci} className="list-top">
                {col.map((unit, i) => {
                  const n = ci * half + i + 1;
                  return (
                    <li key={unit.slug}>
                      <Link href={`/guide/${unit.slug}`} className="row">
                        <span className="row-n">{pad(n)}</span>
                        <span className="row-t">{unit.title}</span>
                        <span className="row-c">{unit.lessons.length} lessons</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
