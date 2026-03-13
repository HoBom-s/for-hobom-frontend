import { useSuspenseQuery } from "@tanstack/react-query";
import { wikiPageQueries } from "@/entities/wiki-page";

export const usePageTree = (spaceKey: string) => {
  return useSuspenseQuery(wikiPageQueries.tree(spaceKey));
};
