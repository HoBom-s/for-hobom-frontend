import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { formatCategory, num, resolveSeries, str } from "../chart-lib";
import type { ChartRenderer } from "../types";

const GRID_COLOR = "var(--hb-color-border)";
const LABEL_COLOR = "var(--hb-color-text-secondary)";
const RINGS = 4;

/** Anchor a spoke label by which side of the center it sits on. */
const anchorFor = (labelX: number, centerX: number): "start" | "middle" | "end" => {
  if (Math.abs(labelX - centerX) < 4) return "middle";

  return labelX > centerX ? "start" : "end";
};

/**
 * A polar/radar chart: one spoke per category, a filled polygon tracing the
 * value of the first series. Single-series (reads `config.y` or `series[0]`).
 */
export const radarChart: ChartRenderer = ({ data, config, width, height, hover, setHover }) => {
  const series = resolveSeries(config);
  const measure = series[0];

  if (!measure || data.length < 3) return null;

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.max(0, Math.min(width, height) / 2 - 28);
  const valueMax = max(data, (d) => num(d, measure.key)) ?? 0;
  const radial = scaleLinear().domain([0, valueMax]).range([0, radius]).nice();

  const angleAt = (index: number) => -Math.PI / 2 + (index * 2 * Math.PI) / data.length;
  const pointAt = (index: number, distance: number): [number, number] => [
    cx + distance * Math.cos(angleAt(index)),
    cy + distance * Math.sin(angleAt(index)),
  ];

  const polygon = (distance: (index: number) => number): string =>
    data.map((_, index) => pointAt(index, distance(index)).join(",")).join(" ");

  const shape = data
    .map((datum, index) => pointAt(index, radial(num(datum, measure.key))).join(","))
    .join(" ");

  return (
    <g>
      {radial
        .ticks(RINGS)
        .filter((tick) => tick > 0)
        .map((tick) => (
          <polygon
            key={tick}
            points={polygon(() => radial(tick))}
            fill="none"
            stroke={GRID_COLOR}
            strokeOpacity={0.6}
          />
        ))}
      {data.map((_, index) => {
        const [ex, ey] = pointAt(index, radius);

        return <line key={index} x1={cx} y1={cy} x2={ex} y2={ey} stroke={GRID_COLOR} strokeOpacity={0.6} />;
      })}

      <polygon points={shape} fill={measure.color} fillOpacity={0.3} stroke={measure.color} strokeWidth={2} />

      {data.map((datum, index) => {
        const value = num(datum, measure.key);
        const [px, py] = pointAt(index, radial(value));
        const dimmed = hover !== null && hover.index !== index;

        return (
          <circle
            key={index}
            cx={px}
            cy={py}
            r={4}
            fill={measure.color}
            fillOpacity={dimmed ? 0.5 : 1}
            stroke="var(--hb-color-surface)"
            strokeWidth={2}
            onMouseEnter={() =>
              setHover({
                index,
                x: px,
                y: py,
                title: formatCategory(config, str(datum, config.x)),
                entries: [{ label: measure.label, value, color: measure.color }],
              })
            }
          />
        );
      })}

      {data.map((datum, index) => {
        const [lx, ly] = pointAt(index, radius + 14);

        return (
          <text
            key={index}
            x={lx}
            y={ly}
            textAnchor={anchorFor(lx, cx)}
            dominantBaseline="central"
            fontSize={11}
            fontFamily="'Inter', system-ui, sans-serif"
            fill={LABEL_COLOR}
          >
            {formatCategory(config, str(datum, config.x))}
          </text>
        );
      })}
    </g>
  );
};
