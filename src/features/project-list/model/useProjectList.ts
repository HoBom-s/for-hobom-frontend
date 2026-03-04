import { useSuspenseQuery } from "@tanstack/react-query";
import { projectQueries } from "@/entities/project";

export const useProjectList = () => {
  const { data } = useSuspenseQuery(projectQueries.list());
  return { projects: data.items };
};
