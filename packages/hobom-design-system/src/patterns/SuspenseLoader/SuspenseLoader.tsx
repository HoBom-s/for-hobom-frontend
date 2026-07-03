import { Box, LinearProgress, Typography } from "@mui/material";

interface Props {
  /** true이면 100vh 풀스크린, false이면 가장 가까운 positioned 부모 영역 정중앙 */
  fullScreen?: boolean;
}

export const SuspenseLoader = ({ fullScreen = false }: Props) => (
  <Box
    sx={{
      ...(fullScreen ? { width: "100%", height: "100vh" } : { position: "absolute", inset: 0 }),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 3,
      bgcolor: "background.default",
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: 800,
        color: "primary.main",
        letterSpacing: "-0.02em",
      }}
    >
      HoBom
    </Typography>
    <LinearProgress sx={{ width: 240, borderRadius: 1 }} />
  </Box>
);
