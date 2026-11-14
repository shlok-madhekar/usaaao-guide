/**
 * The whole course outline lives here. DRAFT: unit titles are a first pass,
 * pending the astronomy lead's plan.
 *
 * To change how many lessons a unit has, edit its `lessons` array. Every page
 * (home contents, course index, unit pages, lesson pages, prev/next links,
 * counts) reads from this one file.
 *
 * To write a lesson, add src/content/lessons/<slug>.mdx and register it in
 * src/content/lessons/index.ts. Until then the lesson page shows the template
 * with "coming soon" placeholders.
 */
export type Lesson = { slug: string; title: string };
export type Unit = { slug: string; title: string; blurb: string; lessons: Lesson[] };

const u = (slug: string, title: string, blurb: string, lessons: string[]): Unit => ({
  slug,
  title,
  blurb,
  lessons: lessons.map((t, i) => ({ slug: `${slug}-${i + 1}`, title: t })),
});

export const UNITS: Unit[] = [
  u("celestial-sphere", "The celestial sphere", "Coordinates for pointing at the sky.", [
    "The sky as a sphere",
    "Horizon and equatorial coordinates",
    "Converting between coordinate systems",
    "Spherical trigonometry",
  ]),
  u("time", "Time and calendars", "Sidereal time, solar time and the seasons.", [
    "Solar and sidereal days",
    "Time zones and the equation of time",
    "Seasons and precession",
  ]),
  u("orbits", "Orbital mechanics", "Kepler, Newton and the two-body problem.", [
    "Kepler's laws",
    "Newtonian gravity and orbits",
    "Energy and the vis-viva equation",
    "Transfers and escape",
    "Tides and the Roche limit",
  ]),
  u("telescopes", "Telescopes and optics", "How instruments collect and resolve light.", [
    "Lenses, mirrors and focal ratios",
    "Magnification and resolution",
    "Detectors and the atmosphere",
  ]),
  u("radiation", "Radiation and blackbodies", "What light tells us about its source.", [
    "The electromagnetic spectrum",
    "Blackbody radiation",
    "Spectral lines",
    "Doppler shifts",
  ]),
  u("stars", "Stellar properties", "Brightness, distance, size and mass.", [
    "Magnitudes and flux",
    "Parallax and distance",
    "Luminosity, radius and temperature",
    "Binary stars and stellar masses",
    "The HR diagram",
  ]),
  u("stellar-evolution", "Stellar evolution", "How stars are born, live and die.", [
    "Star formation",
    "Main-sequence stars",
    "Late stages and remnants",
    "Compact objects",
  ]),
  u("galaxies", "Galaxies", "The Milky Way and beyond.", [
    "Structure of the Milky Way",
    "Types of galaxies",
    "Rotation curves and dark matter",
  ]),
  u("cosmology", "Cosmology", "The expanding universe.", [
    "Hubble's law",
    "Redshift and distances",
    "The early universe",
  ]),
  u("data", "Observation and data analysis", "Working with real measurements.", [
    "Errors and uncertainty",
    "Fitting and plotting data",
    "Reading star charts",
  ]),
];

export const ALL_LESSONS = UNITS.flatMap((unit) =>
  unit.lessons.map((lesson) => ({ ...lesson, unit }))
);

export const lessonCount = ALL_LESSONS.length;

export function findLesson(unitSlug: string, lessonSlug: string) {
  const i = ALL_LESSONS.findIndex((l) => l.unit.slug === unitSlug && l.slug === lessonSlug);
  if (i < 0) return null;
  return { lesson: ALL_LESSONS[i], prev: ALL_LESSONS[i - 1] ?? null, next: ALL_LESSONS[i + 1] ?? null };
}
