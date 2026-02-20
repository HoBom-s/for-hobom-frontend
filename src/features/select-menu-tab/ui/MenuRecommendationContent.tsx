import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { RoutesConfig } from "@/shared/config";

export const MenuRecommendationContent = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", height: "calc(100% - 20px)" }}>
      <Box width="100%" display="flex" justifyContent="flex-end" mt={2}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => navigate(RoutesConfig.MENU.PICK)}
        >
          오늘의 메뉴 추천하기
        </Button>
      </Box>
      <Box
        width="100%"
        height="calc(100% - 130px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <div>
          <Typography typography="h6">오늘의 메뉴를 선택해 주세요.</Typography>
          <Typography typography="subtitle1">
            오늘은 어떤 음식을 먹어볼까요?
          </Typography>
          <Typography typography="caption">
            언제든지 원하는 메뉴를 추첨할 수 있어요.
          </Typography>
        </div>
      </Box>
    </div>
  );
};
