import { useNavigate } from "react-router-dom";
import { StopScreenShareOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Hb.Box style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
          <StopScreenShareOutlined sx={{ fontSize: 48 }} />
          <Hb.Text variant="h5" gutterBottom>
            404
          </Hb.Text>
          <Hb.Text variant="caption" color="text.secondary">
            해당 페이지를 찾을 수 없어요.
          </Hb.Text>
        </Hb.Box>
        <Hb.Box
          style={{
            marginTop: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Hb.Button
            variant="primary"
            size="small"
            onClick={() => {
              navigate(-1);
            }}
          >
            돌아가기
          </Hb.Button>
        </Hb.Box>
      </div>
    </div>
  );
}
