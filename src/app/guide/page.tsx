import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Pow from "@/components/Pow";
import { UNITS, SCALES, lessonCount } from "@/content/syllabus";

export const metadata: Metadata = { title: "Lessons" };

export default function Guide() {
  return (
    <>
      <Nav />
      <main className="wrap page">
        <h1 className="title">Lessons</h1>
        <p className="sub">{UNITS.length} units and {lessonCount} lessons, ordered roughly from the sky above you outward.</p>
        <div className="units">
          {UNITS.map((unit, ui) => {
            const sc = SCALES[unit.slug];
            return (
              <section key={unit.slug} className="urow">
                <div className="e">{sc?.exp ? <Pow n={sc.exp} /> : "any"}<small>{sc?.place}</small></div>
                <div>
                  <h2><Link href={`/guide/${unit.slug}`}>{ui + 1}. {unit.title}</Link></h2>
                  <p>{unit.blurb}</p>
                </div>
                <ol className="lessons">
                  {unit.lessons.map((l, li) => (
                    <li key={l.slug}><Link href={`/guide/${unit.slug}/${l.slug}`}><span className="mono">{ui + 1}.{li + 1}</span>{l.title}</Link></li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
