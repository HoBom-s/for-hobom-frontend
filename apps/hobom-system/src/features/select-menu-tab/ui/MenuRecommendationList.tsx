import { Suspense } from "react";
import { useSuspenseQuery } from "hobom-data";
import { MenuBook } from "hobom-design-system/icons";
import { Bom } from "hobom-utils";
import { menuQueries, MenuRecommendationListItem } from "@/entities/menu-recommendation";
import { Hb, HoBomSkeleton } from "@/shared/ui";

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
      <Hb.Box
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
        <Hb.Text variant="body1" sx={{ color: "text.disabled" }}>
          등록된 메뉴가 없어요
        </Hb.Text>
      </Hb.Box>
    );
  }

  return (
    <Hb.List.Root disablePadding>
      {itemList.map((item, index) => (
        <MenuRecommendationListItem
          key={item.id}
          item={item}
          showDivider={index < itemList.length - 1}
        />
      ))}
    </Hb.List.Root>
  );
};
