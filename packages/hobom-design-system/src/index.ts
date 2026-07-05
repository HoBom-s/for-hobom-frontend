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
export { ColorSchemeVars, useColorSchemeStyles } from "./foundations/color-scheme";

export { Hb } from "./components";

// Styling & theming surface (see foundations/styling.ts).
export { createTheme, useColorScheme } from "./foundations/styling";
export type { SxProps, Theme, SelectChangeEvent, SvgIconProps } from "./foundations/styling";
