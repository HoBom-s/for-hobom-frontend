import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { List } from "@mui/material";
import {
  fetchMenuRecommendationListQueryOption,
  MenuRecommendationListItem,
} from "@/entities/menu-recommendation";
import { HoBomSkeleton } from "@/shared/skeleton";
import { Bom } from "@/packages/bom";

export const MenuRecommendationList = () => (
  <Suspense
    fallback={Array.from({ length: 18 }).map((_, i) => (
      <HoBomSkeleton.List key={i} />
    ))}
  >
    <Inner />
  </Suspense>
);

const Inner = () => {
  const { data } = useSuspenseQuery(fetchMenuRecommendationListQueryOption());

  const itemList = Bom.prop(data, "items");

  return (
    <List
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      {itemList.map((item, index) => (
        <MenuRecommendationListItem
          key={item.id}
          item={item}
          showDivider={index < itemList.length - 1}
        />
      ))}
    </List>
  );
};
