import { SearchOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { LogExplorerContent } from "@/features/log-explorer";

export const LogExplorerWorkspace = () => {
  return (
    <Hb.Box sx={{ p: 3 }}>
      <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Hb.Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchOutlined sx={{ color: "#fff", fontSize: 22 }} />
        </Hb.Box>
        <Hb.Box>
          <Hb.Text variant="h5" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            Log Explorer
          </Hb.Text>
          <Hb.Text variant="body2" sx={{ color: "text.secondary", mt: 0.25 }}>
            요청 및 에러 로그를 검색하고 트레이스를 추적할 수 있어요.
          </Hb.Text>
        </Hb.Box>
      </Hb.Box>

      <LogExplorerContent />
    </Hb.Box>
  );
};
