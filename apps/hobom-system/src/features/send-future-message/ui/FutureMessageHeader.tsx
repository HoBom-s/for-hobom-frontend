import { useNavigate } from "react-router-dom";
import { Add } from "hobom-design-system/icons";
import { RoutesConfig } from "@/shared/config";
import { Hb } from "@/shared/ui";

export const FutureMessageHeader = () => {
  const navigate = useNavigate();

  return (
    <Hb.Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Hb.Box>
        <Hb.Text
          variant="h5"
          style={{
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          미래 메시지
        </Hb.Text>
        <Hb.Text
          variant="body2"
          style={{
            color: "var(--hb-color-text-secondary)",
            marginTop: 2,
          }}
        >
          상대에게 전하고 싶은 말을 예약해보세요
        </Hb.Text>
      </Hb.Box>
      <Hb.Button
        variant="primary"
        startIcon={<Add />}
        onClick={() => navigate(RoutesConfig.MESSAGE.SEND_FUNNEL)}
        style={{
          flexShrink: 0,
        }}
      >
        메시지 예약
      </Hb.Button>
    </Hb.Box>
  );
};
