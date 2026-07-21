import type { ApplicationSummary } from "@/entities/application";

/** Merge the adoption + foster lists into one, newest first (nulls last). */
export const sortByRecent = (applications: readonly ApplicationSummary[]): ApplicationSummary[] =>
  [...applications].sort((a, b) => {
    if (a.createdAt === b.createdAt) return 0;
    if (a.createdAt === null) return 1;
    if (b.createdAt === null) return -1;

    return a.createdAt < b.createdAt ? 1 : -1;
  });
