/** Everything that makes this deployment the USAAAO Guide. */
export const SITE = {
  id: "usaaao",
  name: "USAAAO Guide",
  exam: "USAAAO",
  fullName: "USA Astronomy and Astrophysics Olympiad",
  repo: "shlok-madhekar/usaaao-guide",
  h1: "The free guide to the Astronomy Olympiad.",
  heroText:
    "Lessons and problems for the USA Astronomy and Astrophysics Olympiad. Open source, and still being written.",
  rounds: [
    { name: "First round", detail: "An online exam open to any high school student." },
    { name: "National round", detail: "A harder written exam for the top scorers." },
    { name: "Training camp", detail: "Theory, data analysis and night-sky observing." },
    { name: "IOAA", detail: "Team USA at the international olympiad." },
  ],
};

export const REPO_URL = `https://github.com/${SITE.repo}`;
export const DISCORD_INVITE = "https://discord.gg/KGWAxqxug2";
export const COMMONS_URL = "https://olympiad-commons.vercel.app";
