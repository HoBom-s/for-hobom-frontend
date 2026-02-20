import { Box, Paper } from "@mui/material";
import {
  FutureMessageContent,
  FutureMessageHeader,
} from "@/features/send-future-message";
import { FutureMessageStatusTab } from "@/features/send-future-message";
import { APPBAR_HEIGHT } from "@/shared/config";

// APPBAR_HEIGHT(56) + paper margins(~80) + header(~49) + status-tab(48)
const CONTENT_OFFSET = APPBAR_HEIGHT + 177;

export const FutureMessageWorkspace = () => {
  return (
    <Box sx={{ width: "100%", height: "100%", overflowY: "hidden" }}>
      <FutureMessageHeader />
      <Paper
        elevation={2}
        sx={{
          width: "95%",
          m: "0 auto",
          mt: "6px",
          mb: 3,
          bgcolor: "background.paper",
        }}
      >
        <FutureMessageStatusTab />
        <Box
          sx={{
            mt: 1,
            height: `calc(100vh - ${CONTENT_OFFSET}px)`,
            overflow: "hidden",
          }}
        >
          <FutureMessageContent />
        </Box>
      </Paper>
    </Box>
  );
};
