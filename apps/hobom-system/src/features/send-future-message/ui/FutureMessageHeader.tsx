import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { RoutesConfig } from "@/shared/config";

export const FutureMessageHeader = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
          미래 메시지
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.25 }}>
          상대에게 전하고 싶은 말을 예약해보세요
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => navigate(RoutesConfig.MESSAGE.SEND_FUNNEL)}
        sx={{ flexShrink: 0 }}
      >
        메시지 예약
      </Button>
    </Box>
  );
};
