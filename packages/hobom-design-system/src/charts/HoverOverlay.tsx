import type { MouseEvent } from "react";
import { nearestIndex } from "./chart-lib";
import type { ChartHover, ChartHoverEntry, ChartMargin } from "./types";

/** A hoverable x-category: its position, tooltip rows, and per-series markers. */
export interface HoverColumn {
  /** Inner-plot x of the category. */
  cx: number;
  /** Inner-plot y the tooltip anchors to (usually the topmost point). */
  anchorY: number;
  title: string;
  entries: ChartHoverEntry[];
  /** Per-series marker points (line/area); empty for bars. */
  markers: readonly { cy: number; color: string }[];
}

interface HoverOverlayProps {
  columns: readonly HoverColumn[];
  margin: ChartMargin;
  innerWidth: number;
  innerHeight: number;
  hover: ChartHover | null;
  setHover: (hover: ChartHover | null) => void;
}

/**
 * A transparent capture rect over the plot that snaps to the nearest x-category
 * on move, drawing a vertical guide and per-series markers for the active one.
 */
export const HoverOverlay = ({
  columns,
  margin,
  innerWidth,
  innerHeight,
  hover,
  setHover,
}: HoverOverlayProps) => {
  const handleMove = (event: MouseEvent<SVGRectElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const cursorX = event.clientX - box.left;
    const index = nearestIndex(
      columns.map((column) => column.cx),
      cursorX,
    );
    const column = columns[index];

    if (!column) return;

    setHover({
      index,
      x: margin.left + column.cx,
      y: margin.top + column.anchorY,
      title: column.title,
      entries: column.entries,
    });
  };

  const active = hover ? columns[hover.index] : undefined;

  return (
    <g>
      {active && (
        <line
          x1={margin.left + active.cx}
          x2={margin.left + active.cx}
          y1={margin.top}
          y2={margin.top + innerHeight}
          stroke="var(--hb-color-border)"
        />
      )}
      {active?.markers.map((marker, index) => (
        <circle
          key={index}
          cx={margin.left + active.cx}
          cy={margin.top + marker.cy}
          r={5}
          fill={marker.color}
          stroke="var(--hb-color-surface)"
          strokeWidth={2}
        />
      ))}
      <rect
        x={margin.left}
        y={margin.top}
        width={innerWidth}
        height={innerHeight}
        fill="transparent"
        onMouseMove={handleMove}
      />
    </g>
  );
};
