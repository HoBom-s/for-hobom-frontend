export { AppShell } from "./patterns/AppShell";
export type { AppShellNavItem, AppShellNavSection, NavEntry } from "./patterns/AppShell";
export { BottomSheetCTA } from "./patterns/BottomSheetCTA";
export { ConfirmDialog } from "./patterns/ConfirmDialog";
export { EmptyState } from "./patterns/EmptyState";
export { ErrorBoundary } from "./patterns/ErrorBoundary";
export { Funnel, Step } from "./patterns/Funnel";
export type { FunnelProps, StepProps } from "./patterns/Funnel";
export { OverlayProvider, OverlayContext } from "./patterns/OverlayProvider";
export { Sortable, arrayMove, useDroppable } from "./patterns/Sortable";
export type { DragEndEvent, DragStartEvent, DragOverEvent } from "./patterns/Sortable";
export { SuspenseLoader } from "./patterns/SuspenseLoader";

import { SkeletonCard } from "./patterns/SkeletonCard";
import { SkeletonList } from "./patterns/SkeletonList";
export const HoBomSkeleton = { Card: SkeletonCard, List: SkeletonList };

export { theme, DRAWER_WIDTH, DRAWER_WIDTH_COLLAPSED, APPBAR_HEIGHT } from "./foundations/theme";
export { createTheme } from "@mui/material";

export { Hb } from "./components";

// MUI types re-export
export type { SxProps, Theme, SelectChangeEvent } from "@mui/material";
export type { SvgIconProps } from "@mui/material";

// MUI hooks re-export
export { useColorScheme } from "@mui/material/styles";
