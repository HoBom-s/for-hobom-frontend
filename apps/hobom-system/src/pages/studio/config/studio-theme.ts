import { createTheme } from "hobom-design-system";

/**
 * Studio 전용 다크 뉴트럴 테마. 디자인 툴 느낌(피그마 류)을 위해 앱의 라이트/다크와
 * 무관하게 고정한다. 패널/캔버스/셀렉션 색을 토큰으로 제공해 내부 컴포넌트가 상속받는다.
 */
export const studioTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0d99ff", contrastText: "#ffffff" },
    background: { default: "#1e1e1e", paper: "#2c2c2c" },
    text: { primary: "#e6e6e6", secondary: "#9b9b9b" },
    divider: "rgba(255, 255, 255, 0.10)",
    action: {
      hover: "rgba(255, 255, 255, 0.06)",
      selected: "rgba(13, 153, 255, 0.16)",
    },
  },
  shape: { borderRadius: 6 },
});
