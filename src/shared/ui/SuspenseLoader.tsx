import { Box, CircularProgress } from "@mui/material";

export const SuspenseLoader = () => (
  <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
    <CircularProgress />
  </Box>
);
