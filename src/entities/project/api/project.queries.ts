import { queryOptions } from "@tanstack/react-query";
import { fetchProjects, fetchProjectById } from "./project.api";

export const projectQueries = {
  projects: () => ["projects"],

  list: () =>
    queryOptions({
      queryKey: ["projects", "list"],
      queryFn: fetchProjects,
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: ["projects", "detail", id],
      queryFn: () => fetchProjectById({ id }),
    }),
} as const;
