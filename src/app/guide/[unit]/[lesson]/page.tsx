import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Placeholder from "@/components/Placeholder";
import { ALL_LESSONS, UNITS, findLesson } from "@/content/syllabus";
import { LESSON_BODIES } from "@/content/lessons";
import { DISCORD_INVITE, REPO_URL } from "@/site";

type P = { params: { unit: string; lesson: string } };

export function generateStaticParams() {
  return ALL_LESSONS.map((l) => ({ unit: l.unit.slug, lesson: l.slug }));
}

export function generateMetadata({ params }: P): Metadata {
  return { title: findLesson(params.unit, params.lesson)?.lesson.title ?? "Lesson" };
}

export default async function LessonPage({ params }: P) {
  const found = findLesson(params.unit, params.lesson);
  if (!found) notFound();
  const { lesson, prev, next } = found;
  const unit = lesson.unit;
  const ui = UNITS.indexOf(unit);
  const li = unit.lessons.findIndex((l) => l.slug === lesson.slug);
  const load = LESSON_BODIES[lesson.slug];
  const Body = load ? (await load()).default : null;

  return (
    <>
      <Nav />
      <main className="wrap">
        <div className="lesson">
          <aside className="side">
            <h4 className="kicker">Unit {ui + 1}</h4>
            <Link href={`/guide/${unit.slug}`} style={{ border: 0, padding: "0 0 10px", color: "var(--ink-strong)" }}>
              {unit.title}
            </Link>
            {unit.lessons.map((l, i) => (
              <Link key={l.slug} href={`/guide/${unit.slug}/${l.slug}`} className={l.slug === lesson.slug ? "on" : ""}>
                {ui + 1}.{i + 1} {l.title}
              </Link>
            ))}
          </aside>

          <article className="article">
            <p className="crumbs">
              <Link href="/guide">Course</Link> / <Link href={`/guide/${unit.slug}`}>{unit.title}</Link>
            </p>
            <h1 className="display" style={{ fontSize: "clamp(2rem,1.3rem + 2vw,2.8rem)", marginTop: 12 }}>
              {lesson.title}
            </h1>
            <p className="coord" style={{ marginTop: 10 }}>Lesson {ui + 1}.{li + 1} · Draft</p>

            <div className="box">
              <div className="box-h"><span className="kicker">Objectives</span></div>
              <ul>
                <li>Objective coming soon</li>
                <li>Objective coming soon</li>
                <li>Objective coming soon</li>
              </ul>
            </div>

            {Body ? (
              <Body />
            ) : (
              <>
                <p className="soon">
                  Lesson coming soon. Want to write it?{" "}
                  <a href={DISCORD_INVITE} style={{ color: "var(--accent)" }} target="_blank" rel="noopener noreferrer">
                    Say hi on Discord
                  </a>{" "}
                  or open a pull request on{" "}
                  <a href={REPO_URL} style={{ color: "var(--accent)" }} target="_blank" rel="noopener noreferrer">GitHub</a>.
                </p>
                <div style={{ marginTop: 28 }}><Placeholder lines={5} /></div>
                <div style={{ marginTop: 22 }}><Placeholder lines={4} /></div>
              </>
            )}

            <div className="box">
              <div className="box-h">
                <span className="kicker">Worked example</span>
                <span className="tag">Coming soon</span>
              </div>
              <Placeholder lines={2} label="Problem" />
              <div style={{ marginTop: 18 }}><Placeholder lines={4} label="Solution" /></div>
            </div>

            <div className="box">
              <div className="box-h">
                <span className="kicker">Practice problems</span>
                <Link href="/problems" className="coord">All problems</Link>
              </div>
              {["Easy", "Medium", "Hard"].map((d, i) => (
                <div key={d} className="prob">
                  <span className="row-n">{i + 1}</span>
                  <Placeholder lines={2} />
                  <span className="tag">{d}</span>
                </div>
              ))}
            </div>

            <nav className="pn">
              {prev ? (
                <Link href={`/guide/${prev.unit.slug}/${prev.slug}`}>
                  <small>Previous</small><span>{prev.title}</span>
                </Link>
              ) : <span />}
              {next ? (
                <Link href={`/guide/${next.unit.slug}/${next.slug}`} className="r">
                  <small>Next</small><span>{next.title}</span>
                </Link>
              ) : <span />}
            </nav>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
