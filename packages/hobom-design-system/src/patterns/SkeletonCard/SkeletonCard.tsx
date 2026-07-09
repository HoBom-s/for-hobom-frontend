import { Box } from "../../components/Box/Box";
import { Skeleton } from "../../components/Skeleton/Skeleton";

export const SkeletonCard = () => (
  <div>
    <Box style={{ display: "flex", alignItems: "center" }}>
      <Box style={{ margin: 8 }}>
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
      <Box style={{ width: "100%" }}>
        <Skeleton width="100%" />
      </Box>
    </Box>
    <Skeleton variant="rectangular" width="100%">
      <div style={{ paddingTop: "57%" }} />
    </Skeleton>
  </div>
);
