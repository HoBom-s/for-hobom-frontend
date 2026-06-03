export { AppShell } from "./components/AppShell";
export type { AppShellNavItem, AppShellNavSection, NavEntry } from "./components/AppShell";
export { BottomSheetCTA } from "./components/BottomSheetCTA";
export { ConfirmDialog } from "./components/ConfirmDialog";
export { EmptyState } from "./components/EmptyState";
export { ErrorBoundary } from "./components/ErrorBoundary";
export { Funnel, Step } from "./components/Funnel";
export type { FunnelProps, StepProps } from "./components/Funnel";
export { OverlayProvider, OverlayContext } from "./components/OverlayProvider";
export { Sortable, arrayMove, useDroppable } from "./components/Sortable";
export type { DragEndEvent, DragStartEvent, DragOverEvent } from "./components/Sortable";
export { SuspenseLoader } from "./components/SuspenseLoader";

import { SkeletonCard } from "./components/SkeletonCard";
import { SkeletonList } from "./components/SkeletonList";
export const HoBomSkeleton = { Card: SkeletonCard, List: SkeletonList };

export { theme, DRAWER_WIDTH, DRAWER_WIDTH_COLLAPSED, APPBAR_HEIGHT } from "./theme";
export { createTheme } from "@mui/material";

export { Hb } from "./hb";

// MUI types re-export
export type { SxProps, Theme, SelectChangeEvent } from "@mui/material";
export type { SvgIconProps } from "@mui/material";

// MUI hooks re-export
export { useColorScheme } from "@mui/material/styles";
