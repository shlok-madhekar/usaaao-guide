import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { UNITS } from "@/content/syllabus";
import { DISCORD_INVITE } from "@/site";

export function generateStaticParams() {
  return UNITS.map((u) => ({ unit: u.slug }));
}

export function generateMetadata({ params }: { params: { unit: string } }): Metadata {
  return { title: UNITS.find((u) => u.slug === params.unit)?.title ?? "Unit" };
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
          <p className="crumbs"><Link href="/guide">Course</Link> / Unit {i + 1}</p>
          <h1>{unit.title}</h1>
          <p className="sub">{unit.blurb}</p>
        </header>
        <ol className="ls" style={{ maxWidth: 720, borderTop: "1px solid var(--line)" }}>
          {unit.lessons.map((l, li) => (
            <li key={l.slug}>
              <Link href={`/guide/${unit.slug}/${l.slug}`}><span className="k">{i + 1}.{li + 1}</span>{l.title}</Link>
            </li>
          ))}
        </ol>
        <div className="btns">
          <Link href={`/guide/${unit.slug}/${unit.lessons[0].slug}`} className="btn solid">Start unit {i + 1}</Link>
          <a href={DISCORD_INVITE} className="btn" target="_blank" rel="noopener noreferrer">Help write it</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
