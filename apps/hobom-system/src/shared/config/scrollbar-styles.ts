import type { SxProps, Theme } from "hobom-design-system";
export const SUBTLE_SCROLLBAR_SX: SxProps<Theme> = (theme) => {
  const isDark = theme.palette.mode === "dark";
  const thumbColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
  const thumbHover = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)";

  return {
    scrollbarGutter: "stable",
    scrollbarWidth: "thin",
    scrollbarColor: "transparent transparent",
    "&:hover": {
      scrollbarColor: `${thumbColor} transparent`,
    },
    "&::-webkit-scrollbar": { width: 6 },
    "&::-webkit-scrollbar-track": { background: "transparent" },
    "&::-webkit-scrollbar-thumb": {
      background: "transparent",
      borderRadius: 3,
      transition: "background-color 0.2s ease",
    },
    "&:hover::-webkit-scrollbar-thumb": {
      background: thumbColor,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: thumbHover,
    },
  };
};
