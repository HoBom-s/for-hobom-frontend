import { Box, Typography } from "@mui/material";

export const MenuRecommendationHeader = () => {
  return (
    <Box sx={{ p: 2, mt: 3 }}>
      <Box>
        <Typography
          sx={{ lineHeight: 1, fontSize: 20 }}
          variant="h6"
          component="div"
        >
          오늘의 메뉴
        </Typography>
        <Typography variant="caption" sx={{ fontSize: 14 }}>
          추천받고 싶은 메뉴를 추가해 보세요.
        </Typography>
      </Box>
    </Box>
  );
};
