import { Box, Typography } from "@mui/material";

export const PickMenuHeader = () => {
  return (
    <Box sx={{ p: 2, mt: 3 }}>
      <Box>
        <Typography
          sx={{ lineHeight: 1, fontSize: 20 }}
          variant="h6"
          component="div"
        >
          메뉴를 선택해 주세요.
        </Typography>
        <Typography variant="caption" sx={{ fontSize: 14 }}>
          어떤 메뉴를 추첨 목록에 추가할까요?
        </Typography>
      </Box>
    </Box>
  );
};
