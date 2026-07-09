import type { CSSProperties } from "react";

/**
 * Studio 전용 다크 뉴트럴 테마. 디자인 툴 느낌(피그마 류)을 위해 앱의 라이트/다크와
 * 무관하게 고정한다. `--hb-*` 토큰을 서브트리에 덮어써 내부 컴포넌트가 상속받는다.
 * `display: contents`로 레이아웃에는 영향을 주지 않는다.
 */
export const STUDIO_THEME_VARS = {
  display: "contents",
  "--hb-color-accent": "#0d99ff",
  "--hb-color-accent-contrast": "#ffffff",
  "--hb-color-accent-dark": "#0a7ad1",
  "--hb-color-canvas": "#1e1e1e",
  "--hb-color-surface": "#2c2c2c",
  "--hb-color-text-primary": "#e6e6e6",
  "--hb-color-text-secondary": "#9b9b9b",
  "--hb-color-text-disabled": "#6b6b6b",
  "--hb-color-border": "rgba(255, 255, 255, 0.10)",
} as CSSProperties;
