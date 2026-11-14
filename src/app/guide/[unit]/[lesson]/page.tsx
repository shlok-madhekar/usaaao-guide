import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
            <span className="crumbs">Unit {ui + 1}</span>
            <Link href={`/guide/${unit.slug}`} className="u">{unit.title}</Link>
            {unit.lessons.map((l, i) => (
              <Link key={l.slug} href={`/guide/${unit.slug}/${l.slug}`} className={`l${l.slug === lesson.slug ? " on" : ""}`}>
                <span>{ui + 1}.{i + 1}</span><span>{l.title}</span>
              </Link>
            ))}
          </aside>

          <article className="article">
            <p className="crumbs"><Link href="/guide">Course</Link> / <Link href={`/guide/${unit.slug}`}>{unit.title}</Link></p>
            <h1>{lesson.title}</h1>
            <p className="num">Lesson {ui + 1}.{li + 1}</p>

            {Body ? (
              <Body />
            ) : (
              <>
                <div className="part">
                  <h2>Notes</h2>
                  <p>
                    Not written yet. Want to write it? Say so on{" "}
                    <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">Discord</a> or open a pull request on{" "}
                    <a href={REPO_URL} target="_blank" rel="noopener noreferrer">GitHub</a>.
                  </p>
                </div>
                <div className="part"><h2>Worked example</h2><p>Not written yet.</p></div>
                <div className="part"><h2>Problems</h2><p>Not written yet. <Link href="/problems" style={{ color: "var(--accent)" }}>Problem bank</Link></p></div>
              </>
            )}

            <nav className="pn">
              {prev ? (
                <Link href={`/guide/${prev.unit.slug}/${prev.slug}`}><small>Previous</small><span>{prev.title}</span></Link>
              ) : <span />}
              {next ? (
                <Link href={`/guide/${next.unit.slug}/${next.slug}`} className="r"><small>Next</small><span>{next.title}</span></Link>
              ) : <span />}
            </nav>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
