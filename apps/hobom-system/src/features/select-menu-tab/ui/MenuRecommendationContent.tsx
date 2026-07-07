import { useNavigate } from "react-router-dom";
import { Casino } from "hobom-design-system/icons";
import { RoutesConfig } from "@/shared/config";
import { Hb } from "@/shared/ui";

export const MenuRecommendationContent = () => {
  const navigate = useNavigate();

  return (
    <Hb.Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 16,
        paddingTop: 64,
        paddingBottom: 64,
      }}
    >
      <Casino sx={{ fontSize: 64, color: "#dadce0" }} />
      <Hb.Box
        style={{
          textAlign: "center",
        }}
      >
        <Hb.Text
          variant="h6"
          style={{
            fontWeight: 600,
            color: "var(--hb-color-text-primary)",
            marginBottom: 4,
          }}
        >
          오늘의 메뉴를 추첨해 보세요
        </Hb.Text>
        <Hb.Text
          variant="body2"
          style={{
            color: "var(--hb-color-text-secondary)",
          }}
        >
          메뉴 목록에서 후보를 선택하고, 오늘의 메뉴를 추첨할 수 있어요.
        </Hb.Text>
      </Hb.Box>
      <Hb.Button
        variant="primary"
        size="large"
        onClick={() => navigate(RoutesConfig.MENU.PICK)}
        sx={{ mt: 1, px: 4, borderRadius: 2, textTransform: "none" }}
      >
        메뉴 추천받기
      </Hb.Button>
    </Hb.Box>
  );
};
