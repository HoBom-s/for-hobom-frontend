import { Box, Skeleton } from "@mui/material";

export const SkeletonList = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Skeleton animation="wave" />
    </Box>
  );
};
