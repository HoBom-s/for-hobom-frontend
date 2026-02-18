import { Box } from "@mui/material";
import {
  FutureMessageContent,
  FutureMessageHeader,
} from "@/features/send-future-message";
import { FutureMessageStatusTab } from "@/entities/future-message";

export default function FutureMessagePage() {
  return (
    <Box sx={{ width: "100%", height: "100%", overflowY: "hidden" }}>
      <FutureMessageHeader />
      <FutureMessageStatusTab />
      <FutureMessageContent />
    </Box>
  );
}
