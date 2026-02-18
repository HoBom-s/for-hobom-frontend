import { Box } from "@mui/material";
import { MenuRecommendationHeader } from "@/features/menu-recommendation-header";
import { MenuRecommendationTab } from "@/features/select-menu-tab";

export default function MenuRecommendationPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "hidden",
      }}
    >
      <MenuRecommendationHeader />
      <MenuRecommendationTab />
    </Box>
  );
}
