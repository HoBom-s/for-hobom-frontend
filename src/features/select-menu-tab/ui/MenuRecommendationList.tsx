import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Box, List, Typography } from "@mui/material";
import { MenuBook } from "@mui/icons-material";
import {
  menuQueries,
  MenuRecommendationListItem,
} from "@/entities/menu-recommendation";
import { HoBomSkeleton } from "@/shared/ui";
import { Bom } from "@/packages/bom";

export const MenuRecommendationList = () => (
  <Suspense
    fallback={Array.from({ length: 8 }).map((_, i) => (
      <HoBomSkeleton.List key={i} />
    ))}
  >
    <Inner />
  </Suspense>
);

const Inner = () => {
  const { data } = useSuspenseQuery(menuQueries.recommendationList());
  const itemList = Bom.prop(data, "items");

  if (itemList.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 10,
          gap: 1.5,
        }}
      >
        <MenuBook sx={{ fontSize: 64, color: "#dadce0" }} />
        <Typography variant="body1" sx={{ color: "text.disabled" }}>
          등록된 메뉴가 없어요
        </Typography>
      </Box>
    );
  }

  return (
    <List disablePadding>
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
