import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { Axes } from "../Axes";
import { PRIMARY_COLOR, formatCategory, formatNumber, num, resolveMargin, str } from "../chart-lib";
import type { ChartRenderer } from "../types";

/** A bar path with only its top two corners rounded. */
const roundedTopRect = (x: number, y: number, w: number, h: number, r: number): string =>
  `M${x},${y + h} L${x},${y + r} Q${x},${y} ${x + r},${y} ` +
  `L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h} Z`;

export const barChart: ChartRenderer = ({ data, config, width, height }) => {
  const margin = resolveMargin(config);
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const categories = data.map((d) => str(d, config.x));
  const xScale = scaleBand<string>().domain(categories).range([0, innerWidth]).padding(0.3);
  const yMax = max(data, (d) => num(d, config.y)) ?? 0;
  const yScale = scaleLinear().domain([0, yMax]).range([innerHeight, 0]).nice();

  const color = config.color ?? PRIMARY_COLOR;

  const xTicks = data.map((d) => {
    const category = str(d, config.x);

    return {
      x: margin.left + (xScale(category) ?? 0) + xScale.bandwidth() / 2,
      label: formatCategory(config, category),
    };
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
        {data.map((d, index) => {
          const value = num(d, config.y);
          const barY = yScale(value);
          const barX = xScale(str(d, config.x)) ?? 0;
          const w = xScale.bandwidth();
          const h = Math.max(0, innerHeight - barY);
          const r = Math.min(5, w / 2, h);

          return <path key={index} d={roundedTopRect(barX, barY, w, h, r)} fill={color} />;
        })}
      </g>
    </>
  );
};
