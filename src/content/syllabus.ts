/**
 * The whole course outline lives here, from the astronomy lead's plan (Nov 13).
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
  u("positional", "Positional astronomy", "Coordinates, the sky, the Sun and time.", [
    "Horizon and equatorial coordinates",
    "Spherical trigonometry and the astronomical triangle",
    "Coordinate transformations and celestial positioning",
    "Reading the sky: constellations, bright stars, latitude, date and time",
    "The Sun's path: declination, day length, polar day, shadows and sundials",
    "Time systems, calendars and precession",
    "Synodic motion: phases, the lunar cycle and planetary configurations",
  ]),
  u("mechanics", "Celestial mechanics", "Gravity, orbits and the two-body problem.", [
    "Gravity, circular orbits, escape and the shell theorem",
    "Conics, energy and angular momentum (vis-viva)",
    "The two-body problem, barycentre and Kepler III",
    "Manoeuvres and time along an orbit",
    "Rotating frames, Lagrange points and tides",
  ]),
  u("radiation", "Radiation and observational astrophysics", "What light tells us about its source.", [
    "Flux, luminosity and magnitudes",
    "Blackbody radiation and thermal equilibrium",
    "Radiation mechanisms",
    "Photons, spectra and the Doppler effect",
    "Optical depth and extinction",
    "Binary stars",
    "Transits and radial velocity",
  ]),
  u("instruments", "Astronomical instrumentation", "How telescopes collect and resolve light.", [
    "Telescope optics and image formation",
    "Angular resolution and the Rayleigh criterion",
    "Detectors and instrumentation",
  ]),
  u("stars", "Stellar physics", "How stars work, evolve and die.", [
    "Stellar parameters and the HR diagram",
    "Structure, fusion and the Sun",
    "Evolution, clusters and variables",
    "Compact objects, supernovae and accretion",
  ]),
  u("cosmology", "Galaxies and cosmology", "The Milky Way and the expanding universe.", [
    "The Milky Way, rotation curves and galaxy types",
    "Hubble's law, distances and expansion dynamics",
    "The CMB and the early universe",
  ]),
  u("supplementary", "Supplementary topics", "Tools that show up across units.", [
    "The virial theorem",
    "Conic sections",
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

/** Where each unit sits on the scale of the universe (meters across), used across the site. */
export const SCALES: Record<string, { exp: number; place: string }> = {
  positional: { exp: 7, place: "Earth and its sky" },
  mechanics: { exp: 12, place: "The solar system" },
  radiation: { exp: 17, place: "The nearest stars" },
  instruments: { exp: 1, place: "The telescope" },
  stars: { exp: 19, place: "Star clusters" },
  cosmology: { exp: 26, place: "The observable universe" },
  supplementary: { exp: 0, place: "Tools for every scale" },
};

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
export const pow10 = (n: number) => "10" + String(n).split("").map((d) => SUP[+d]).join("");
