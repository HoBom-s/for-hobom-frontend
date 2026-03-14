import { useCallback, useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Bom } from "hobom-utils";
import { menuQueries } from "@/entities/menu-recommendation";

export const usePickMenuContentList = () => {
  const [selectedMenuIds, setSelectedMenuIds] = useState<Set<string>>(new Set());

  const { data } = useSuspenseQuery(menuQueries.recommendationList());
  const itemList = Bom.prop(data, "items");

  return {
    selectedMenuIds,
    itemList,
    selectedItems: useMemo(
      () =>
        Bom.pipe(
          itemList,
          Bom.filter((item) => selectedMenuIds.has(item.id)),
          Bom.map((item) => item.id),
        ),
      [itemList, selectedMenuIds],
    ),
    handleToggleId: useCallback((id: string) => {
      setSelectedMenuIds((prev) => {
        const next = new Set(prev);

        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }

        return next;
      });
    }, []),
  };
};
