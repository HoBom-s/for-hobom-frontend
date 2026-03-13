import { Box, Paper } from "@mui/material";
import {
  FutureMessageContent,
  FutureMessageHeader,
  FutureMessageStatusTab,
} from "@/features/send-future-message";

export const FutureMessageWorkspace = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 2,
      }}
    >
      <FutureMessageHeader />

      <Paper
        elevation={0}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <FutureMessageStatusTab />
        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <FutureMessageContent />
        </Box>
      </Paper>
    </Box>
  );
};
