import type { SxProps, Theme } from "@mui/material";

export const SUBTLE_SCROLLBAR_SX: SxProps<Theme> = {
  scrollbarGutter: "stable",
  scrollbarWidth: "thin",
  scrollbarColor: "transparent transparent",
  "&:hover": {
    scrollbarColor: "rgba(0,0,0,0.15) transparent",
  },
  "&::-webkit-scrollbar": { width: 6 },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent",
    borderRadius: 3,
    transition: "background-color 0.2s ease",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    background: "rgba(0,0,0,0.15)",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "rgba(0,0,0,0.25)",
  },
};
