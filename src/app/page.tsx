import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Pow from "@/components/Pow";
import Universe from "@/components/Universe";
import { UNITS, SCALES, lessonCount } from "@/content/syllabus";
import { DISCORD_INVITE } from "@/site";
import { LESSON_BODIES } from "@/content/lessons";

export default function Home() {
  return (
    <>
      <Nav overlay />
      <main>
        <Universe />
        <section id="lessons" className="wrap all">
          <h2>All {lessonCount} lessons</h2>
          <p className="all-status mono">{Object.keys(LESSON_BODIES).length} written · {lessonCount - Object.keys(LESSON_BODIES).length} on the way</p>
          <div className="all-grid">
            {UNITS.map((unit, ui) => (
              <div key={unit.slug} className="all-u">
                <p className="mono all-s">{SCALES[unit.slug]?.exp ? <Pow n={SCALES[unit.slug].exp} /> : "any scale"}</p>
                <Link href={`/guide/${unit.slug}`} className="all-h">{ui + 1}. {unit.title}</Link>
                <ol>
                  {unit.lessons.map((l, li) => (
                    <li key={l.slug}>
                      <Link href={`/guide/${unit.slug}/${l.slug}`} className={LESSON_BODIES[l.slug] ? "written" : undefined}><span className="mono">{ui + 1}.{li + 1}</span>{l.title}</Link>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <p className="all-foot">
            Lessons are being written now. If you have taken USAAAO or the IOAA, <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">come help on Discord</a>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
