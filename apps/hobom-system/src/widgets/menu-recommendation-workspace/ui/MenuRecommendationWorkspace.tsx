import { MenuRecommendationHeader } from "@/features/menu-recommendation-header";
import { MenuRecommendationTab } from "@/features/select-menu-tab";
import { Hb } from "@/shared/ui";

export const MenuRecommendationWorkspace = () => {
  return (
    <Hb.Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <MenuRecommendationHeader />
      <MenuRecommendationTab />
    </Hb.Box>
  );
};
