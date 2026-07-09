import { Box } from "../../components/Box/Box";
import { Skeleton } from "../../components/Skeleton/Skeleton";

export const SkeletonList = () => (
  <Box style={{ width: "100%" }}>
    <Skeleton animation="wave" />
  </Box>
);
