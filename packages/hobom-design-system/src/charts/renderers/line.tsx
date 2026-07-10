import { scaleLinear, scalePoint } from "d3-scale";
import { curveMonotoneX, line as d3Line } from "d3-shape";
import { max } from "d3-array";
import { Axes } from "../Axes";
import { PRIMARY_COLOR, formatCategory, formatNumber, num, resolveMargin, str } from "../chart-lib";
import type { ChartDatum, ChartRenderer } from "../types";

export const lineChart: ChartRenderer = ({ data, config, width, height }) => {
  const margin = resolveMargin(config);
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const categories = data.map((d) => str(d, config.x));
  const xScale = scalePoint<string>().domain(categories).range([0, innerWidth]).padding(0.5);
  const yMax = max(data, (d) => num(d, config.y)) ?? 0;
  const yScale = scaleLinear().domain([0, yMax]).range([innerHeight, 0]).nice();

  const color = config.color ?? PRIMARY_COLOR;
  const path =
    d3Line<ChartDatum>()
      .x((d) => xScale(str(d, config.x)) ?? 0)
      .y((d) => yScale(num(d, config.y)))
      .curve(curveMonotoneX)(data) ?? "";

  const xTicks = data.map((d) => {
    const category = str(d, config.x);

    return { x: margin.left + (xScale(category) ?? 0), label: formatCategory(config, category) };
  });

  return (
    <>
      <Axes
        yScale={yScale}
        xTicks={xTicks}
        margin={margin}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        formatY={(v) => formatNumber(config, v)}
      />
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {data.map((d, index) => (
          <circle
            key={index}
            cx={xScale(str(d, config.x)) ?? 0}
            cy={yScale(num(d, config.y))}
            r={4}
            fill={color}
            stroke="var(--hb-color-surface)"
            strokeWidth={2}
          />
        ))}
      </g>
    </>
  );
};
