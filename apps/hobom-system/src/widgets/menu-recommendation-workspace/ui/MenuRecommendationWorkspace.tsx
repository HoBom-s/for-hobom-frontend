import { Box } from "@mui/material";
import { MenuRecommendationHeader } from "@/features/menu-recommendation-header";
import { MenuRecommendationTab } from "@/features/select-menu-tab";

export const MenuRecommendationWorkspace = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <MenuRecommendationHeader />
      <MenuRecommendationTab />
    </Box>
  );
};
