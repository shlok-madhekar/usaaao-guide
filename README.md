# USAAAO Guide

A free, open-source guide to the USA Astronomy and Astrophysics Olympiad (USAAAO). Part of [Olympiad Commons](https://olympiad-commons.vercel.app).

**Status: first run-through.** The full site UI is built, but there is no lesson content yet. The unit and lesson outline in `src/content/syllabus.ts` follows the astronomy lead's plan: 7 units, 31 lessons.

## Run it

```bash
npm install
npm run dev     # http://localhost:3103
npm run build
```

No environment variables are needed.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero, how USAAAO works, contents |
| `/guide` | Course index, every unit and lesson |
| `/guide/[unit]` | Unit page |
| `/guide/[unit]/[lesson]` | Lesson template: objectives, body, worked example, practice problems, prev/next |
| `/problems` | Problem bank (empty for now) |
| `/contribute` | How to help |
| `/privacy`, `/terms` | Legal |
| `/discord` | Short link to the Discord |

## Changing the outline

Everything reads from **`src/content/syllabus.ts`**. To add, remove or rename a unit or lesson, edit the `UNITS` list there. Lesson counts, the contents list, the sidebar and prev/next links all update on their own.

## Writing a lesson

1. Say which lesson you are taking on [Discord](https://discord.gg/KGWAxqxug2).
2. Find the lesson's slug in `src/content/syllabus.ts` (for example `mechanics-1`).
3. Write it as `src/content/lessons/mechanics-1.mdx`.
4. Register it in `src/content/lessons/index.ts`:
   ```ts
   "mechanics-1": () => import("./mechanics-1.mdx"),
   ```
5. Open a pull request.

Lessons not registered show the placeholder template.

Not affiliated with any olympiad organizer.
