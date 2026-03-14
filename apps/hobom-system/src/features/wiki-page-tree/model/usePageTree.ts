import { useSuspenseQuery } from "hobom-data";
import { wikiPageQueries } from "@/entities/wiki-page";

export const usePageTree = (spaceKey: string) => {
  return useSuspenseQuery(wikiPageQueries.tree(spaceKey));
};
