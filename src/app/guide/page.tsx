import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { UNITS, lessonCount } from "@/content/syllabus";

export const metadata: Metadata = { title: "Course" };

export default function Guide() {
  return (
    <>
      <Nav />
      <main className="wrap">
        <header className="head">
          <h1>Course</h1>
          <p className="sub">{UNITS.length} units, {lessonCount} lessons. Go in order, or jump to what you need.</p>
        </header>
        {UNITS.map((unit, ui) => (
          <section key={unit.slug} className="unit">
            <div>
              <span className="meta">Unit {ui + 1}</span>
              <h2><Link href={`/guide/${unit.slug}`}>{unit.title}</Link></h2>
              <p>{unit.blurb}</p>
            </div>
            <ol className="ls">
              {unit.lessons.map((l, li) => (
                <li key={l.slug}>
                  <Link href={`/guide/${unit.slug}/${l.slug}`}><span className="k">{ui + 1}.{li + 1}</span>{l.title}</Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
