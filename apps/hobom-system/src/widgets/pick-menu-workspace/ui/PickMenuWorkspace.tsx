import { Box } from "@mui/material";
import { PickMenuFunnel } from "@/features/pick-menu";
import { TodayMenuIdContextProvider } from "@/entities/menu-recommendation";

export const PickMenuWorkspace = () => {
  return (
    <Box sx={{ width: "100%", height: "100%", overflowY: "hidden" }}>
      <TodayMenuIdContextProvider>
        <PickMenuFunnel />
      </TodayMenuIdContextProvider>
    </Box>
  );
};
