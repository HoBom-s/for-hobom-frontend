import { useSuspenseQuery } from "hobom-data";
import { projectQueries } from "@/entities/project";

export const useProjectList = () => {
  const { data } = useSuspenseQuery(projectQueries.list());

  return { projects: data.items };
};
