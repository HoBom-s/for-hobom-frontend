import type { ScaleLinear } from "d3-scale";
import type { ChartMargin } from "./types";

interface AxesProps {
  yScale: ScaleLinear<number, number>;
  /** X tick positions (already offset by the left margin) and their labels. */
  xTicks: readonly { x: number; label: string }[];
  margin: ChartMargin;
  innerWidth: number;
  innerHeight: number;
  /** Number of horizontal gridlines / y ticks. */
  yTickCount?: number;
  formatY: (value: number) => string;
}

const AXIS_COLOR = "var(--hb-color-border)";
const LABEL_COLOR = "var(--hb-color-text-secondary)";
const LABEL_SIZE = 11;
const FONT = "'Inter', system-ui, sans-serif";

/** Horizontal gridlines with y-axis value labels and x-axis category labels. */
export const Axes = ({
  yScale,
  xTicks,
  margin,
  innerWidth,
  innerHeight,
  yTickCount = 4,
  formatY,
}: AxesProps) => {
  const yTicks = yScale.ticks(yTickCount);

  // Thin x labels so dense series (e.g. per-minute) don't overlap into a smear:
  // keep at most one label per ~56px, always including the first and last.
  const maxXLabels = Math.max(2, Math.floor(innerWidth / 56));
  const xStep = Math.max(1, Math.ceil(xTicks.length / maxXLabels));
  const shownXTicks = xTicks.filter(
    (_, index) => index % xStep === 0 || index === xTicks.length - 1,
  );

  return (
    <g>
      {yTicks.map((tick) => {
        const y = margin.top + yScale(tick);

        return (
          <g key={tick}>
            <line
              x1={margin.left}
              x2={margin.left + innerWidth}
              y1={y}
              y2={y}
              stroke={AXIS_COLOR}
              strokeOpacity={0.5}
            />
            <text
              x={margin.left - 10}
              y={y}
              textAnchor="end"
              dominantBaseline="central"
              fontSize={LABEL_SIZE}
              fontFamily={FONT}
              fill={LABEL_COLOR}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {formatY(tick)}
            </text>
          </g>
        );
      })}

      {shownXTicks.map((tick, index) => (
        <text
          key={`${tick.label}-${index}`}
          x={tick.x}
          y={margin.top + innerHeight + 18}
          textAnchor="middle"
          fontSize={LABEL_SIZE}
          fontFamily={FONT}
          fill={LABEL_COLOR}
        >
          {tick.label}
        </text>
      ))}
    </g>
  );
};
