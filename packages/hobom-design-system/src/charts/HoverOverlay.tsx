import { nearestIndex } from "./chart-lib";
import type { MouseEvent } from "react";
import type { ChartHover, ChartMargin } from "./types";

/** One hoverable datum, positioned in inner-plot coordinates. */
export interface HitPoint {
  cx: number;
  anchorY: number;
  label: string;
  value: number;
}

interface HoverOverlayProps {
  points: readonly HitPoint[];
  margin: ChartMargin;
  innerWidth: number;
  innerHeight: number;
  color: string;
  hover: ChartHover | null;
  setHover: (hover: ChartHover | null) => void;
  /** Draw a point marker at the anchor (line/area). Off for bars. */
  marker?: boolean;
}

/**
 * A transparent capture rect over the plot that snaps to the nearest datum on
 * move, plus the vertical guide + marker for the active point. Positions are
 * translated from inner-plot to root SVG coordinates.
 */
export const HoverOverlay = ({
  points,
  margin,
  innerWidth,
  innerHeight,
  color,
  hover,
  setHover,
  marker = true,
}: HoverOverlayProps) => {
  const handleMove = (event: MouseEvent<SVGRectElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const cursorX = event.clientX - box.left;
    const bestIndex = nearestIndex(
      points.map((point) => point.cx),
      cursorX,
    );
    const point = points[bestIndex];

    if (!point) return;

    setHover({
      index: bestIndex,
      x: margin.left + point.cx,
      y: margin.top + point.anchorY,
      label: point.label,
      value: point.value,
    });
  };

  const active = hover ? points[hover.index] : undefined;

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
      {active && marker && (
        <circle
          cx={margin.left + active.cx}
          cy={margin.top + active.anchorY}
          r={5}
          fill={color}
          stroke="var(--hb-color-surface)"
          strokeWidth={2}
        />
      )}
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
