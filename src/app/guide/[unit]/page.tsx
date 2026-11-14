import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Placeholder from "@/components/Placeholder";
import { UNITS } from "@/content/syllabus";
import { DISCORD_INVITE } from "@/site";

export function generateStaticParams() {
  return UNITS.map((u) => ({ unit: u.slug }));
}

export function generateMetadata({ params }: { params: { unit: string } }): Metadata {
  const unit = UNITS.find((u) => u.slug === params.unit);
  return { title: unit?.title ?? "Unit" };
}

export default function UnitPage({ params }: { params: { unit: string } }) {
  const i = UNITS.findIndex((u) => u.slug === params.unit);
  if (i < 0) notFound();
  const unit = UNITS[i];
  return (
    <>
      <Nav />
      <main className="wrap">
        <header className="head">
          <p className="crumbs">
            <Link href="/guide">Course</Link> / Unit {String(i + 1).padStart(2, "0")}
          </p>
          <h1 className="display">{unit.title}</h1>
          <p className="lede">{unit.blurb}</p>
        </header>
        <section className="sec">
          <h2 className="kicker">Overview</h2>
          <div style={{ maxWidth: 640, marginTop: 20 }}>
            <Placeholder lines={3} label="Unit overview coming soon." />
          </div>
        </section>
        <section className="sec">
          <h2 className="kicker">Lessons</h2>
          <ol className="list-top" style={{ marginTop: 20, maxWidth: 720 }}>
            {unit.lessons.map((l, li) => (
              <li key={l.slug}>
                <Link href={`/guide/${unit.slug}/${l.slug}`} className="row">
                  <span className="row-n">{i + 1}.{li + 1}</span>
                  <span className="row-t">{l.title}</span>
                  <span className="row-c">Soon</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="btns">
            <Link href={`/guide/${unit.slug}/${unit.lessons[0].slug}`} className="btn">Start unit</Link>
            <a href={DISCORD_INVITE} className="btn-plain" target="_blank" rel="noopener noreferrer">Help write this unit</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
