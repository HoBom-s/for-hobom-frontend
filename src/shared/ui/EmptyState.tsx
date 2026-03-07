import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface EmptyStateProps {
  icon?: ReactNode;
  message: string;
}

export const EmptyState = ({ icon, message }: EmptyStateProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 6,
      gap: 1,
    }}
  >
    {icon}
    <Typography variant="body2" color="text.disabled" sx={{ fontSize: 13 }}>
      {message}
    </Typography>
  </Box>
);
