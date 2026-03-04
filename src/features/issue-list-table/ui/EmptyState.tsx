import { Box, Typography } from "@mui/material";
import { SearchOffOutlined } from "@mui/icons-material";

export const EmptyState = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 8,
      gap: 1.5,
    }}
  >
    <SearchOffOutlined sx={{ fontSize: 64, color: "#dadce0" }} />
    <Typography variant="body2" color="text.disabled">
      조건에 맞는 이슈가 없어요
    </Typography>
  </Box>
);
