import { queryOptions } from "@tanstack/react-query";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchProjects, fetchProjectById } from "./project.api";

export const projectQueries = {
  projects: () => ["projects"],

  list: () =>
    queryOptions({
      queryKey: ["projects", "list"],
      queryFn: fetchProjects,
      ...CACHE_PROFILE.SLOW,
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: ["projects", "detail", id],
      queryFn: () => fetchProjectById({ id }),
      ...CACHE_PROFILE.SLOW,
    }),
} as const;
