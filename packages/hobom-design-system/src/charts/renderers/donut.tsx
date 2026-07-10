import { arc as d3Arc, pie as d3Pie, type PieArcDatum } from "d3-shape";
import { DEFAULT_PALETTE, num, str } from "../chart-lib";
import type { ChartDatum, ChartRenderer } from "../types";

export const donutChart: ChartRenderer = ({ data, config, width, height }) => {
  const radius = Math.max(0, Math.min(width, height) / 2 - 2);
  const innerRadius = radius * 0.62;
  const palette = config.colors ?? DEFAULT_PALETTE;

  const slices = d3Pie<ChartDatum>()
    .value((d) => num(d, config.value))
    .sort(null)([...data]);

  const arcGenerator = d3Arc<PieArcDatum<ChartDatum>>()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .padAngle(0.012)
    .cornerRadius(2);

  const total = slices.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <g transform={`translate(${width / 2}, ${height / 2})`}>
      {slices.map((slice, index) => (
        <path
          key={str(slice.data, config.label) || index}
          d={arcGenerator(slice) ?? ""}
          fill={palette[index % palette.length]}
          stroke="var(--hb-color-surface)"
          strokeWidth={1}
        />
      ))}
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={Math.max(14, innerRadius * 0.5)}
        fontWeight={700}
        fill="var(--hb-color-text-primary)"
      >
        {config.formatValue ? config.formatValue(total) : total}
      </text>
    </g>
  );
};
