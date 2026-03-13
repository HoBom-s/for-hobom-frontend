import { Box, Typography } from "@mui/material";

export const PickMenuHeader = () => {
  return (
    <Box sx={{ px: 3, py: 2.5, flexShrink: 0 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
        메뉴 추첨
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        추첨할 메뉴를 선택해 주세요.
      </Typography>
    </Box>
  );
};
