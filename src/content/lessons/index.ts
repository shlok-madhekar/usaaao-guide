import type { ComponentType } from "react";

/**
 * Written lessons, keyed by lesson slug (see src/content/syllabus.ts).
 * Example:
 *   "orbits-1": () => import("./orbits-1.mdx"),
 * Lessons not listed here render the placeholder template.
 */
export const LESSON_BODIES: Record<string, () => Promise<{ default: ComponentType }>> = {};
