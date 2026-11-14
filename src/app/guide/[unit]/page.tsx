import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Pow from "@/components/Pow";
import { UNITS, SCALES } from "@/content/syllabus";
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
  const sc = SCALES[unit.slug];
  return (
    <>
      <Nav />
      <main className="wrap page">
        <p className="crumbs"><Link href="/guide">Lessons</Link> / Unit {i + 1}</p>
        <div className="scale" style={{ marginTop: 36 }}><b>{sc?.exp ? <Pow n={sc.exp} /> : "any scale"}</b>{sc?.place}</div>
        <h1 className="title">{unit.title}</h1>
        <p className="sub">{unit.blurb}</p>
        <ol className="lessons" style={{ marginTop: 36, maxWidth: 680, borderTop: "1px solid var(--line)", paddingTop: 12 }}>
          {unit.lessons.map((l, li) => (
            <li key={l.slug}><Link href={`/guide/${unit.slug}/${l.slug}`}><span className="mono">{i + 1}.{li + 1}</span>{l.title}</Link></li>
          ))}
        </ol>
        <div className="cta">
          <Link href={`/guide/${unit.slug}/${unit.lessons[0].slug}`} className="go">Start unit {i + 1}</Link>
          <a href={DISCORD_INVITE} className="go ghost" target="_blank" rel="noopener noreferrer">Help write it</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
