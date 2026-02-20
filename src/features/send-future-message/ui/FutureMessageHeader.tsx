import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { RoutesConfig } from "@/shared/config";

export const FutureMessageHeader = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: 2,
        mt: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
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

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => navigate(RoutesConfig.MESSAGE.SEND_FUNNEL)}
        sx={{ flexShrink: 0 }}
      >
        예약 메시지 등록
      </Button>
    </Box>
  );
};
