import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { UNITS, lessonCount } from "@/content/syllabus";

export const metadata: Metadata = { title: "Course" };
const pad = (n: number) => String(n).padStart(2, "0");

export default function Guide() {
  return (
    <>
      <Nav />
      <main className="wrap">
        <header className="head">
          <p className="crumbs">Course</p>
          <h1 className="display">The course</h1>
          <p className="lede">
            {UNITS.length} units, {lessonCount} lessons. Work through them in order, or jump to what you need.
          </p>
        </header>
        {UNITS.map((unit, ui) => (
          <section key={unit.slug} className="unit">
            <div>
              <span className="kicker">Unit {pad(ui + 1)}</span>
              <h2><Link href={`/guide/${unit.slug}`}>{unit.title}</Link></h2>
              <p>{unit.blurb}</p>
            </div>
            <ol className="list-top">
              {unit.lessons.map((l, li) => (
                <li key={l.slug}>
                  <Link href={`/guide/${unit.slug}/${l.slug}`} className="row">
                    <span className="row-n">{ui + 1}.{li + 1}</span>
                    <span className="row-t">{l.title}</span>
                    <span className="row-c">Soon</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
        <div style={{ height: 48 }} />
      </main>
      <Footer />
    </>
  );
}
