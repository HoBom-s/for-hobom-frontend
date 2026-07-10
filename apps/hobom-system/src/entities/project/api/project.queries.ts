import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchProjects, fetchProjectById } from "./project.api";

export const projectQueries = {
  projects: () => ["projects"],

  list: () =>
    queryOptions({
      queryKey: ["projects", "list"],
      queryFn: ({ signal }) => fetchProjects(signal),
      ...CACHE_PROFILE.SLOW,
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: ["projects", "detail", id],
      queryFn: ({ signal }) => fetchProjectById({ id }, signal),
      ...CACHE_PROFILE.SLOW,
    }),
} as const;
