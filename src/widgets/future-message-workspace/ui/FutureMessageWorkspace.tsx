import { Box, Paper } from "@mui/material";
import {
  FutureMessageContent,
  FutureMessageHeader,
} from "@/features/send-future-message";
import { FutureMessageStatusTab } from "@/features/send-future-message";

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
        <Box sx={{ mt: 1, height: "calc(100vh - 233px)", overflow: "hidden" }}>
          <FutureMessageContent />
        </Box>
      </Paper>
    </Box>
  );
};
