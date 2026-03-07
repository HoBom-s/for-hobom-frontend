import { IconButton, Tooltip } from "@mui/material";
import { ContrastOutlined } from "@mui/icons-material";
import { useColorScheme } from "@mui/material/styles";

export const ColorSchemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const isDark = mode === "dark";

  return (
    <Tooltip title={isDark ? "라이트 모드" : "다크 모드"}>
      <IconButton
        size="small"
        onClick={() => setMode(isDark ? "light" : "dark")}
        sx={{ color: "text.secondary" }}
      >
        <ContrastOutlined sx={{ fontSize: 20 }} />
      </IconButton>
    </Tooltip>
  );
};
