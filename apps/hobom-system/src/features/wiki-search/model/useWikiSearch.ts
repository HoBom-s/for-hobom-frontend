import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { wikiPageQueries } from "@/entities/wiki-page";

export const useWikiSearch = (spaceKey: string) => {
  const [query, setQuery] = useState("");

  const { data, isFetching } = useQuery({
    ...wikiPageQueries.search(spaceKey, query),
    enabled: query.length >= 2,
  });

  return {
    query,
    setQuery,
    results: data?.items.items ?? [],
    searching: isFetching,
  };
};
