import { useCallback, useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchMenuRecommendationListQueryOption } from "@/entities/menu-recommendation";
import { Bom } from "@/packages/bom";

export const usePickMenuContentList = () => {
  const [selectedMenuIds, setSelectedMenuIds] = useState<Set<string>>(
    new Set(),
  );

  const { data } = useSuspenseQuery(fetchMenuRecommendationListQueryOption());
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
