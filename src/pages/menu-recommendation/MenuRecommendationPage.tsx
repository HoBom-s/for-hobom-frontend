import { Box } from "@mui/material";
import { FixedBottomSheet } from "@/features/fixed-bottom-sheet";
import { MenuRecommendationHeader } from "@/features/menu-recommendation-list";
import { MenuRecommendationTab } from "@/features/select-menu-tab";

export default function MenuRecommendationPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100dvh",
        overflowY: "hidden",
      }}
    >
      <MenuRecommendationHeader />
      <MenuRecommendationTab />
      <FixedBottomSheet />
    </Box>
  );
}
