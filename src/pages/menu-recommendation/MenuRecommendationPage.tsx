import { Box } from "@mui/material";
import { FixedBottomSheet } from "@/features/fixed-bottom-sheet";

export default function MenuRecommendationPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100dvh",
      }}
    >
      <FixedBottomSheet />
    </Box>
  );
}
