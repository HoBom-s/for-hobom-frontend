import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { Axes } from "../Axes";
import { HoverOverlay } from "../HoverOverlay";
import {
  PRIMARY_COLOR,
  formatCategory,
  formatNumber,
  num,
  resolveMargin,
  roundedTopRect,
  str,
} from "../chart-lib";
import type { ChartRenderer } from "../types";

export const barChart: ChartRenderer = ({ data, config, width, height, hover, setHover }) => {
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
          const dimmed = hover !== null && hover.index !== index;

          return (
            <path
              key={index}
              d={roundedTopRect(barX, barY, w, h, r)}
              fill={color}
              fillOpacity={dimmed ? 0.5 : 1}
            />
          );
        })}
      </g>
      <HoverOverlay
        points={data.map((d) => ({
          cx: (xScale(str(d, config.x)) ?? 0) + xScale.bandwidth() / 2,
          anchorY: yScale(num(d, config.y)),
          label: formatCategory(config, str(d, config.x)),
          value: num(d, config.y),
        }))}
        margin={margin}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        color={color}
        hover={hover}
        setHover={setHover}
        marker={false}
      />
    </>
  );
};
