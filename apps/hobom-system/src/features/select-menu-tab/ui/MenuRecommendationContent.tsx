import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { Casino } from "@mui/icons-material";
import { RoutesConfig } from "@/shared/config";

export const MenuRecommendationContent = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 2,
        py: 8,
      }}
    >
      <Casino sx={{ fontSize: 64, color: "#dadce0" }} />
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "text.primary", mb: 0.5 }}
        >
          오늘의 메뉴를 추첨해 보세요
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          메뉴 목록에서 후보를 선택하고, 오늘의 메뉴를 추첨할 수 있어요.
        </Typography>
      </Box>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate(RoutesConfig.MENU.PICK)}
        sx={{ mt: 1, px: 4, borderRadius: 2, textTransform: "none" }}
      >
        메뉴 추천받기
      </Button>
    </Box>
  );
};
