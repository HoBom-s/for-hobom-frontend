import { Box, Typography } from "@mui/material";

export const FutureMessageHeader = () => {
  return (
    <Box sx={{ p: 2, mt: 3 }}>
      <Box>
        <Typography
          sx={{ lineHeight: 1, fontSize: 20 }}
          variant="h6"
          component="div"
        >
          상대에게 전하고 싶은 말을 작성해보세요.
        </Typography>
        <Typography variant="caption" sx={{ fontSize: 14 }}>
          어떤 마음을 담고 싶으신가요?
        </Typography>
      </Box>
    </Box>
  );
};
