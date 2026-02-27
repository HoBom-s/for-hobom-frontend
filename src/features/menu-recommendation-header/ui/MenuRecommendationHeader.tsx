import { Box, Typography } from "@mui/material";

export const MenuRecommendationHeader = () => {
  return (
    <Box sx={{ px: 3, py: 2.5, flexShrink: 0 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
          오늘의 메뉴
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          추천받고 싶은 메뉴를 추가하고 추첨해 보세요.
        </Typography>
      </Box>
    </Box>
  );
};
