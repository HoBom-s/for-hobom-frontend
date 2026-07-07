import { ContrastOutlined } from "hobom-design-system/icons";
import { useColorScheme, Hb } from "@/shared/ui";

export const ColorSchemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const isDark = mode === "dark";

  return (
    <Hb.Tooltip title={isDark ? "라이트 모드" : "다크 모드"}>
      <Hb.Button.Icon
        size="small"
        onClick={() => setMode(isDark ? "light" : "dark")}
        style={{
          color: "var(--hb-color-text-secondary)",
        }}
      >
        <ContrastOutlined sx={{ fontSize: 20 }} />
      </Hb.Button.Icon>
    </Hb.Tooltip>
  );
};
